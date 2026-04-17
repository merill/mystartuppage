/**
 * Inline cache for URL-type link icons.
 *
 * Fetches remote icon bytes once, stores them as data URIs in
 * `chrome.storage.local` under `urlicon-${linkId}`. Subsequent new-tab renders
 * read from storage and never hit the network for that icon — eliminating the
 * 400 ms spinner that kicks in when the browser's HTTP cache needs to
 * revalidate or refetch.
 *
 * Falls back silently to URL loading whenever caching can't happen (CORS,
 * quota, oversized image, fetch error). See AGENTS.md: native-first, no
 * external deps.
 */

import type { Local, UrlIconCacheEntry } from '../../../types/local.ts'

/**
 * Storage key prefix. Kept distinct from `x-icon-` (used for user-uploaded file
 * icons) so the two caches can coexist without collision. Not typed in
 * `Local` because TypeScript's multiple-index-signature rules don't compose
 * across differently-typed template literals.
 */
const KEY_PREFIX = 'urlicon-'
const keyFor = (linkId: string) => `${KEY_PREFIX}${linkId}`

/** Hard cap per cached icon. Product logos are ~5–20 KB; anything above this
 *  is almost certainly a hero image being mislabelled as an icon. */
const MAX_ICON_BYTES = 500_000

/** Approx size of a data URI string in bytes (1 char ≈ 1 byte UTF-8 for ASCII). */
function approxBytes(dataUri: string): number {
    return dataUri.length
}

/** URLs that failed to cache in this session; don't retry until next reload. */
const uncacheable = new Set<string>()
/** Set once after the first quota error to avoid log spam. */
let quotaLogged = false

/**
 * Look up a cached entry for this link. Returns the data URI only if the
 * stored entry matches the currently-requested URL (so URL changes invalidate).
 */
export function getCachedIcon(linkId: string, url: string, local: Local): string | null {
    const entry = (local as unknown as Record<string, unknown>)[keyFor(linkId)] as UrlIconCacheEntry | undefined
    if (!entry) return null
    if (entry.url !== url) return null
    return entry.dataUri
}

/**
 * Fetch the icon, convert to a data URI, and persist it.
 * Returns the data URI on success, null on any failure (caller should
 * continue rendering from the original URL).
 */
export async function cacheIconForLink(linkId: string, url: string): Promise<string | null> {
    if (!isHttpUrl(url)) return null
    if (uncacheable.has(url)) return null

    try {
        const dataUri = await fetchAsDataUri(url)

        if (!dataUri) {
            uncacheable.add(url)
            return null
        }

        if (approxBytes(dataUri) > MAX_ICON_BYTES) {
            uncacheable.add(url)
            return null
        }

        const entry: UrlIconCacheEntry = { url, dataUri }

        try {
            await chrome.storage.local.set({ [keyFor(linkId)]: entry })
        } catch (err) {
            uncacheable.add(url)
            if (!quotaLogged) {
                console.warn('URL icon cache: storage write failed (quota?). Falling back to URL loading.', err)
                quotaLogged = true
            }
            return null
        }

        return dataUri
    } catch (err) {
        uncacheable.add(url)
        console.debug('URL icon cache: failed to cache', url, err)
        return null
    }
}

/** Remove the cached icon for a single link. */
export function removeCachedIcon(linkId: string): void {
    try {
        chrome.storage.local.remove(keyFor(linkId))
    } catch {
        // Ignore — already gone or storage unavailable.
    }
}

/**
 * Startup sweep: drop any `urlicon-*` entries whose link no longer exists.
 * Keeps the 10 MB local-storage quota tidy without any LRU bookkeeping.
 */
export async function purgeOrphanedIconCache(validLinkIds: Set<string>): Promise<void> {
    try {
        const all = await chrome.storage.local.get(null)
        const stale: string[] = []

        for (const key of Object.keys(all)) {
            if (!key.startsWith(KEY_PREFIX)) continue
            const id = key.slice(KEY_PREFIX.length)
            if (!validLinkIds.has(id)) stale.push(key)
        }

        if (stale.length > 0) {
            await chrome.storage.local.remove(stale)
        }
    } catch (err) {
        console.debug('URL icon cache: purge failed', err)
    }
}

// ─── Fetch strategies ───

function isHttpUrl(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://')
}

/**
 * Try to obtain the icon as a data URI via two strategies:
 *   1. Extension-origin `fetch()` — works for same-origin and any host listed
 *      in `host_permissions` (getyako.com today). Gets raw bytes directly.
 *   2. `<img crossOrigin=anonymous>` → canvas → `toDataURL` — works when the
 *      remote server returns CORS headers (common for favicon services).
 *      Canvas taints on CORS failure and `toDataURL` throws — we catch that.
 *
 * Returns null if both strategies fail.
 */
async function fetchAsDataUri(url: string): Promise<string | null> {
    const viaFetch = await tryFetchBlob(url)
    if (viaFetch) return viaFetch

    const viaCanvas = await tryCanvasDataUri(url)
    if (viaCanvas) return viaCanvas

    return null
}

async function tryFetchBlob(url: string): Promise<string | null> {
    try {
        const response = await fetch(url)
        if (!response.ok) return null

        const blob = await response.blob()
        if (blob.size === 0) return null
        if (blob.size > MAX_ICON_BYTES) return null

        return await blobToDataUri(blob)
    } catch {
        return null
    }
}

function blobToDataUri(blob: Blob): Promise<string | null> {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onerror = () => resolve(null)
        reader.onload = () => {
            const result = reader.result
            if (typeof result === 'string' && result.startsWith('data:')) {
                resolve(result)
            } else {
                resolve(null)
            }
        }
        reader.readAsDataURL(blob)
    })
}

async function tryCanvasDataUri(url: string): Promise<string | null> {
    try {
        const img = new Image()
        img.crossOrigin = 'anonymous'

        const loaded = await new Promise<boolean>((resolve) => {
            img.addEventListener('load', () => resolve(true), { once: true })
            img.addEventListener('error', () => resolve(false), { once: true })
            img.src = url
        })

        if (!loaded) return null
        if (img.naturalWidth === 0 || img.naturalHeight === 0) return null

        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight

        const ctx = canvas.getContext('2d')
        if (!ctx) return null

        ctx.drawImage(img, 0, 0)

        // Throws "tainted canvas" if the server didn't send CORS headers.
        const dataUri = canvas.toDataURL('image/png')

        if (!dataUri.startsWith('data:image/')) return null

        return dataUri
    } catch {
        return null
    }
}

/** Expose for debugging (not used internally). */
export const _internals = {
    uncacheable,
    MAX_ICON_BYTES,
}
