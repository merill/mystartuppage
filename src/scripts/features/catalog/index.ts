import { storage } from '../../storage.ts'

import type { CatalogCache, CatalogEntry } from '../../../types/local.ts'

const PORTALS_MANIFEST_URL = 'https://getyako.com/data/portals.json'

const ONE_DAY_MS = 24 * 60 * 60 * 1000

/**
 * Get the cached catalog or fetch fresh data.
 * Called on extension startup and from the settings catalog browser.
 *
 * The manifest is pre-built server-side (see tasks/sync-icons.ts) and combines
 * cmd.ms commands + msportals.io portals, with iconUrl already resolved.
 */
export async function getCatalog(): Promise<CatalogEntry[]> {
    const local = await storage.local.get('catalogCache')
    const cache = local.catalogCache

    if (cache && Date.now() - cache.lastFetch < ONE_DAY_MS) {
        return cache.entries
    }

    // Fetch in background, return cache if available
    refreshCatalog(cache?.entries)

    return cache?.entries ?? []
}

/**
 * Force a refresh of the catalog manifest. Falls back to existing cache on
 * network failure.
 */
async function refreshCatalog(fallback?: CatalogEntry[]): Promise<void> {
    try {
        const response = await fetch(PORTALS_MANIFEST_URL)

        if (!response.ok) {
            throw new Error(`portals.json fetch failed: ${response.status}`)
        }

        const entries = (await response.json()) as CatalogEntry[]

        const catalogCache: CatalogCache = {
            lastFetch: Date.now(),
            entries,
        }

        storage.local.set({ catalogCache })
    } catch (err) {
        console.warn('Catalog refresh failed, using cache', err)

        // If we have no cache at all, store empty to avoid repeated failures
        if (!fallback) {
            storage.local.set({
                catalogCache: { lastFetch: Date.now(), entries: [] },
            })
        }
    }
}
