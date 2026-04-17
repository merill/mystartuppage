import { ensureDirSync, existsSync } from '@std/fs'

// ─── Microsoft Cloud Logos ───

const LOGOS_REPO_URL = 'https://github.com/merill/MicrosoftCloudLogos'
const LOGOS_BRANCH = 'main'
const LOGOS_TARBALL_URL = `${LOGOS_REPO_URL}/archive/refs/heads/${LOGOS_BRANCH}.tar.gz`
const MS_OUTPUT_DIR = 'website/public/ms'
const MS_CATALOG_PATH = 'website/public/ms/catalog.json'
// Top-level folders from the upstream repo we want to copy (others are skipped).
const INCLUDED_TOP_DIRS = ['logos', 'icons']
const IMAGE_EXTENSIONS = ['.png', '.svg']
const SKIP_PREFIXES = ['zzlegacy', '.devcontainer', '.github']

// ─── cmd.ms ───

const CMD_CSV_URL = 'https://raw.githubusercontent.com/merill/cmd/main/website/config/commands.csv'
const CMD_OUTPUT_PATH = 'website/public/data/commands.csv'

// ─── msportals.io ───

const MSPORTALS_BASE = 'https://raw.githubusercontent.com/adamfowlerit/msportals.io/master/_data/portals/'
const MSPORTALS_OUTPUT_DIR = 'website/public/data/portals'
const MSPORTALS_FILES = [
    'admin.json',
    'china.json',
    'consumer.json',
    'edu.json',
    'licensing.json',
    'thirdparty.json',
    'training.json',
    'us-govt.json',
    'user.json',
]

// ─── Unified manifests (for the Yako extension) ───

const PORTALS_MANIFEST_PATH = 'website/public/data/portals.json'
const PORTALS_BY_CATEGORY_PATH = 'website/public/data/portals-by-category.json'
const MS_PUBLIC_PREFIX = 'https://getyako.com/ms/'

// ─── Main ───

async function syncAll(): Promise<void> {
    // Step 1: pull the three upstream sources in parallel.
    await Promise.all([
        syncLogos(),
        syncCmdCsv(),
        syncMsPortals(),
    ])

    // Step 2: derive the two unified manifests the extension actually consumes.
    // These depend on the outputs of step 1, so they must run afterwards.
    syncPortalsByCategory()
    syncPortalsManifest()
}

// ─── Microsoft Cloud Logos ───

async function syncLogos(): Promise<void> {
    console.log('Downloading MicrosoftCloudLogos archive...')

    const response = await fetch(LOGOS_TARBALL_URL)

    if (!response.ok) {
        throw new Error(`Failed to download logos: ${response.status} ${response.statusText}`)
    }

    // Clean previous output
    if (existsSync(MS_OUTPUT_DIR)) {
        Deno.removeSync(MS_OUTPUT_DIR, { recursive: true })
    }

    ensureDirSync(MS_OUTPUT_DIR)

    // Save tarball to temp file
    const tempTar = await Deno.makeTempFile({ suffix: '.tar.gz' })

    try {
        const bytes = new Uint8Array(await response.arrayBuffer())
        await Deno.writeFile(tempTar, bytes)

        console.log('Extracting images...')

        // Extract tarball using tar command
        const tempDir = await Deno.makeTempDir()

        const extract = new Deno.Command('tar', {
            args: ['-xzf', tempTar, '-C', tempDir],
        })

        const extractResult = extract.outputSync()

        if (!extractResult.success) {
            throw new Error('Failed to extract tarball: ' + new TextDecoder().decode(extractResult.stderr))
        }

        // Find the extracted directory (MicrosoftCloudLogos-main/)
        const extractedEntries = Array.from(Deno.readDirSync(tempDir))
        const repoDir = extractedEntries.find((e) => e.isDirectory)

        if (!repoDir) {
            throw new Error('No directory found in extracted archive')
        }

        const repoPath = `${tempDir}/${repoDir.name}`

        // Walk the extracted repo and copy image files from included top-level dirs only
        const allImages: string[] = []
        for (const topDir of INCLUDED_TOP_DIRS) {
            const topDirPath = `${repoPath}/${topDir}`
            if (!existsSync(topDirPath)) continue
            copyImages(repoPath, topDir, allImages)
        }

        // Build the unified catalog:
        //   - Active products from logos/ (metadata-driven, one per metadata.md)
        //   - Loose icons from icons/ (one entry per file)
        REPO_PATH_FOR_DETECTION = repoPath
        const productDirSet = new Set(findProductDirs(repoPath))
        const products = buildProductIndex(repoPath, allImages, productDirSet)
        const orphanLogos = buildOrphanLogoIndex(repoPath, allImages, productDirSet)
        const looseIcons = buildLooseIconIndex(allImages)
        const entries = [...products, ...orphanLogos, ...looseIcons]

        entries.sort((a, b) => {
            const g = a.group.localeCompare(b.group)
            if (g !== 0) return g
            return a.name.localeCompare(b.name)
        })

        const catalog = { generatedAt: new Date().toISOString(), entries }
        Deno.writeTextFileSync(MS_CATALOG_PATH, JSON.stringify(catalog))

        console.log(`Synced ${allImages.length} images to ${MS_OUTPUT_DIR}`)
        console.log(
            `Catalog written to ${MS_CATALOG_PATH} (${products.length} products + ${orphanLogos.length} orphan logos + ${looseIcons.length} loose icons = ${entries.length} entries)`,
        )

        // Cleanup temp dir
        Deno.removeSync(tempDir, { recursive: true })
    } finally {
        Deno.removeSync(tempTar)
    }
}

function copyImages(basePath: string, relativePath: string, tree: string[]): void {
    const fullPath = relativePath ? `${basePath}/${relativePath}` : basePath

    for (const entry of Deno.readDirSync(fullPath)) {
        const entryRelative = relativePath ? `${relativePath}/${entry.name}` : entry.name

        if (entry.isDirectory) {
            // Skip non-useful directories
            const lowerName = entry.name.toLowerCase()
            if (SKIP_PREFIXES.some((prefix) => lowerName.startsWith(prefix))) {
                continue
            }

            copyImages(basePath, entryRelative, tree)
            continue
        }

        if (!entry.isFile) continue

        // Only copy image files
        const lowerName = entry.name.toLowerCase()
        const isImage = IMAGE_EXTENSIONS.some((ext) => lowerName.endsWith(ext))
        if (!isImage) continue

        // Copy to output directory preserving relative path
        const destPath = `${MS_OUTPUT_DIR}/${entryRelative}`
        const destDir = destPath.substring(0, destPath.lastIndexOf('/'))

        ensureDirSync(destDir)
        Deno.copyFileSync(`${basePath}/${entryRelative}`, destPath)

        tree.push(entryRelative)
    }
}

// ─── Catalog entries ───

interface CatalogEntry {
    id: string
    name: string
    altnames: string
    group: string
    icon: string
    source: 'product' | 'icon'
    // Only populated for products
    type?: string
    prodfamilies?: string[]
    // True when the icon is a single-colour black SVG (fills/strokes are black/currentColor/none)
    // — these need theme-aware recolouring (e.g. invert in dark mode) to stay visible.
    monochrome?: boolean
}

interface Metadata {
    name: string
    type: string
    status: string
    altnames: string
    prodfamilies: string[]
}

// ─── Products (from logos/*/metadata.md) ───

function buildProductIndex(repoPath: string, tree: string[], productDirSet: Set<string>): CatalogEntry[] {
    // productDirSet is the set of directories under logos/ containing a metadata.md.
    const productDirs = Array.from(productDirSet)

    // Set of all image paths that were copied (for existence checks)
    const imageSet = new Set(tree)

    const products: CatalogEntry[] = []

    for (const dir of productDirs) {
        const metaPath = `${repoPath}/${dir}/metadata.md`

        let meta: Metadata
        try {
            meta = parseMetadata(Deno.readTextFileSync(metaPath))
        } catch (err) {
            console.warn(`Skipping ${dir}: cannot read metadata (${err})`)
            continue
        }

        // Filter: only Active products/families
        if (meta.status.toLowerCase() !== 'active') continue
        if (!meta.name) continue

        // Collect icons belonging to this product: walk subtree, stop at sub-product dirs
        const icons = collectProductIcons(dir, productDirSet, imageSet)
        if (icons.length === 0) continue

        // Pick the best icon (SVG wins over PNG)
        const bestIcon = pickBestIcon(icons)

        const group = pickGroup(meta)

        products.push({
            id: 'product:' + dir.replace(/^logos\//, '').replace(/\//g, '-'),
            name: meta.name,
            altnames: meta.altnames,
            group,
            icon: bestIcon,
            source: 'product',
            type: meta.type,
            prodfamilies: meta.prodfamilies,
            monochrome: detectMonochrome(repoPath, bestIcon),
        })
    }

    return products
}

// ─── Orphan logos (logos/* folders without metadata.md) ───
//
// Not every folder under `logos/` carries a metadata.md (e.g. `logos/copilot/`
// has 25+ images but no metadata). Those files are still copied to the CDN,
// but the product index skips them and they become invisible to the icon
// picker / fuzzy search. This pass recovers them: for every image under
// `logos/` not claimed by a product, group sibling variants by their base
// filename (`foo-(general)---250x250.png`, `foo-(general).png`, ... →
// one entry) and pick the best variant.

function buildOrphanLogoIndex(
    repoPath: string,
    tree: string[],
    productDirSet: Set<string>,
): CatalogEntry[] {
    const imageSet = new Set(tree)

    // Compute the set of images already claimed by some product.
    const claimed = new Set<string>()
    for (const dir of productDirSet) {
        for (const icon of collectProductIcons(dir, productDirSet, imageSet)) {
            claimed.add(icon)
        }
    }

    const orphans = tree.filter((p) => p.startsWith('logos/') && !claimed.has(p))
    if (orphans.length === 0) return []

    // Group orphans by (folder + base-filename-without-variant-suffix).
    const groups = new Map<string, string[]>()
    for (const path of orphans) {
        const lastSlash = path.lastIndexOf('/')
        const folder = path.substring(0, lastSlash)
        const filename = path.substring(lastSlash + 1)
        const base = stripVariantSuffix(filename)
        const key = `${folder}|${base}`
        const list = groups.get(key)
        if (list) {
            list.push(path)
        } else {
            groups.set(key, [path])
        }
    }

    const entries: CatalogEntry[] = []
    for (const [key, paths] of groups) {
        const [folder, base] = key.split('|')
        const best = pickBestIcon(paths)
        const name = cleanIconFilename(`${base}.png`)
        if (!name) continue

        // Group = title-cased top-level folder under logos/ (e.g. 'copilot' → 'Copilot')
        const topFolder = folder.split('/')[1] ?? 'Other'
        const group = titleCaseSlug(topFolder)

        entries.push({
            id: `orphan:${folder}/${base}`,
            name,
            altnames: '',
            group,
            icon: best,
            source: 'product',
            monochrome: detectMonochrome(repoPath, best),
        })
    }

    return entries
}

// Strips the upstream repo's variant markers from a filename so sibling
// variants collapse into a single catalog entry:
//   'copilot-(general)---250x250.png' → 'copilot-(general)'
//   'github-copilot---256x256-padded.png' → 'github-copilot'
//   'github-copilot-monochrome.png' → 'github-copilot'
function stripVariantSuffix(filename: string): string {
    let name = filename.replace(/\.(png|svg)$/i, '')
    // '---...' is the upstream's variant separator.
    name = name.replace(/-{2,}.*$/, '')
    // Trailing -monochrome / -padded modifier.
    name = name.replace(/-(monochrome|padded)$/i, '')
    return name
}

function titleCaseSlug(slug: string): string {
    return slug
        .split(/[-_]/)
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
}

function findProductDirs(repoPath: string): string[] {
    const results: string[] = []
    walk(`${repoPath}/logos`, 'logos')

    function walk(fullPath: string, relativePath: string): void {
        let entries: Deno.DirEntry[]
        try {
            entries = Array.from(Deno.readDirSync(fullPath))
        } catch {
            return
        }

        const hasMetadata = entries.some((e) => e.isFile && e.name === 'metadata.md')
        if (hasMetadata) {
            results.push(relativePath)
        }

        for (const entry of entries) {
            if (!entry.isDirectory) continue
            const lowerName = entry.name.toLowerCase()
            if (SKIP_PREFIXES.some((prefix) => lowerName.startsWith(prefix))) continue
            walk(`${fullPath}/${entry.name}`, `${relativePath}/${entry.name}`)
        }
    }

    return results
}

function collectProductIcons(productDir: string, productDirSet: Set<string>, imageSet: Set<string>): string[] {
    const collected: string[] = []
    const prefix = productDir + '/'

    for (const imagePath of imageSet) {
        if (!imagePath.startsWith(prefix)) continue

        // Skip if this image lives inside another (sub-)product's directory tree
        if (isUnderSubProduct(imagePath, productDir, productDirSet)) continue

        collected.push(imagePath)
    }

    return collected
}

function isUnderSubProduct(imagePath: string, productDir: string, productDirSet: Set<string>): boolean {
    // Walk up from the image's directory toward productDir. If we encounter any dir
    // that is itself a product dir (other than `productDir`), the image belongs to a sub-product.
    const lastSlash = imagePath.lastIndexOf('/')
    let dir = lastSlash === -1 ? '' : imagePath.substring(0, lastSlash)

    while (dir.length > productDir.length) {
        if (productDirSet.has(dir) && dir !== productDir) return true
        const nextSlash = dir.lastIndexOf('/')
        if (nextSlash === -1) break
        dir = dir.substring(0, nextSlash)
    }

    return false
}

function pickBestIcon(paths: string[]): string {
    let best = paths[0]
    let bestScore = variantScore(best)

    for (let i = 1; i < paths.length; i++) {
        const score = variantScore(paths[i])
        if (score > bestScore) {
            best = paths[i]
            bestScore = score
        }
    }

    return best
}

function variantScore(path: string): number {
    const lower = path.toLowerCase()

    // Penalise padded variants (large transparent borders)
    const padded = lower.includes('padded') ? -50 : 0
    // Penalise monochrome variants — we want the colour logo by default.
    const monochrome = lower.includes('monochrome') ? -60 : 0
    // Penalise deeply nested variants
    const depth = (path.match(/\//g) || []).length
    const subdirPenalty = depth > 2 ? -20 : 0

    const penalty = padded + monochrome + subdirPenalty

    // SVG always wins over PNG (vector scales perfectly)
    if (lower.endsWith('.svg')) return 1000 + penalty

    if (lower.includes('512')) return 100 + penalty
    if (lower.includes('300x300')) return 95 + penalty
    if (lower.includes('256x256')) return 90 + penalty
    if (lower.includes('scalable')) return 85 + penalty
    if (lower.includes('128x128') || lower.includes('128')) return 70 + penalty
    if (lower.includes('64x64') || lower.includes('64')) return 50 + penalty

    return 40 + penalty
}

function pickGroup(meta: Metadata): string {
    if (meta.prodfamilies.length > 0) return meta.prodfamilies[0]
    if (meta.type.toLowerCase() === 'family') return meta.name
    return 'Other'
}

function parseMetadata(text: string): Metadata {
    const meta: Metadata = { name: '', type: '', status: '', altnames: '', prodfamilies: [] }

    for (const rawLine of text.split(/\r?\n/)) {
        const line = rawLine.trim()
        if (!line) continue

        const colonIdx = line.indexOf(':')
        if (colonIdx === -1) continue

        const key = line.substring(0, colonIdx).trim().toLowerCase()
        const value = line.substring(colonIdx + 1).trim()

        switch (key) {
            case 'name':
                meta.name = value
                break
            case 'type':
                meta.type = value
                break
            case 'status':
                meta.status = value
                break
            case 'altnames':
                meta.altnames = value
                break
            case 'prodfamilies':
                meta.prodfamilies = value ? value.split(/[,;]/).map((v) => v.trim()).filter(Boolean) : []
                break
        }
    }

    return meta
}

// ─── Loose icons (from icons/**) ───

function buildLooseIconIndex(tree: string[]): CatalogEntry[] {
    const entries: CatalogEntry[] = []

    for (const path of tree) {
        if (!path.startsWith('icons/')) continue

        const parts = path.split('/')
        // parts[0] === 'icons', parts[1] === top subfolder (azure / fabric / intune / ...)
        if (parts.length < 3) continue

        const topSubfolder = parts[1]
        const filename = parts[parts.length - 1]

        entries.push({
            id: 'icon:' + path,
            name: cleanIconFilename(filename),
            altnames: '',
            group: looseIconGroup(topSubfolder),
            icon: path,
            source: 'icon',
            monochrome: detectMonochrome(REPO_PATH_FOR_DETECTION, path),
        })
    }

    return entries
}

// ─── Monochrome detection ───
//
// A catalog entry is flagged `monochrome: true` when every fill/stroke token in
// its SVG resolves to black (or currentColor/none/transparent). These icons get
// a `.monochrome` class in consumers so dark-theme CSS can invert them.
// PNGs and anything with gradients or embedded rasters are never flagged.

// Set by the main build function before buildLooseIconIndex runs, so we can
// read SVG files off disk without changing the loose-icon function signature.
let REPO_PATH_FOR_DETECTION = ''

function detectMonochrome(repoPath: string, relativePath: string): boolean {
    if (!repoPath) return false
    if (!relativePath.toLowerCase().endsWith('.svg')) return false

    let text: string
    try {
        text = Deno.readTextFileSync(`${repoPath}/${relativePath}`)
    } catch {
        return false
    }

    return isMonochromeSvg(text)
}

function isMonochromeSvg(text: string): boolean {
    // Reject any raster content or colour gradients — they carry colour info we can't flatten.
    if (/<image\b/i.test(text)) return false
    if (/<linearGradient\b|<radialGradient\b/i.test(text)) return false

    // Collect every fill / stroke colour token, from both attributes and inline styles.
    const tokens: string[] = []
    for (const m of text.matchAll(/(?:fill|stroke)\s*=\s*["']([^"']+)["']/gi)) {
        tokens.push(m[1])
    }
    for (const m of text.matchAll(/(?:fill|stroke)\s*:\s*([^;"'}\s]+)/gi)) {
        tokens.push(m[1])
    }

    if (tokens.length === 0) return false // no colour info to judge — play it safe

    const blackLike = new Set(['black', '#000', '#000000', 'currentcolor'])
    const neutral = new Set(['none', 'transparent', 'inherit', ''])

    let sawBlack = false
    for (const raw of tokens) {
        const norm = raw.trim().toLowerCase().replace(/\s+/g, '')

        if (blackLike.has(norm)) {
            sawBlack = true
            continue
        }
        if (neutral.has(norm)) continue
        if (norm === 'rgb(0,0,0)' || /^rgba\(0,0,0,/.test(norm)) {
            sawBlack = true
            continue
        }
        // Any other colour (hex, rgb, named) disqualifies the SVG.
        return false
    }

    return sawBlack
}

function looseIconGroup(topSubfolder: string): string {
    const lower = topSubfolder.toLowerCase()
    if (lower === 'azure') return 'Azure Services'
    if (lower === 'fabric') return 'Fabric Services'
    if (lower === 'intune') return 'Intune Services'
    // Fallback: title-case + " Services"
    const pretty = topSubfolder
        .split(/[-_\s]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
    return `${pretty} Services`
}

function cleanIconFilename(filename: string): string {
    let name = filename.replace(/\.(png|svg)$/i, '')

    // Strip the repo's conventional Azure prefix "00001-icon-service-"
    name = name.replace(/^\d+[-_]icon[-_]service[-_]/i, '')
    // Strip any other leading "NNNN-" numeric prefix
    name = name.replace(/^\d+[-_]/, '')

    // Remove size suffixes like "_256x256", "-48x48", "_512"
    name = name.replace(/[-_ ]\d+x\d+/g, '')
    name = name.replace(/[-_ ]\d{2,}$/g, '')

    // Remove parentheticals
    name = name.replace(/\s*\([^)]*\)\s*/g, ' ')

    // Replace hyphens/underscores with spaces, collapse whitespace
    name = name.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim()

    // Title-case
    if (name) {
        name = name
            .split(' ')
            .map((w) => (w.length > 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
            .join(' ')
    }

    return name || filename
}

// ─── cmd.ms ───

async function syncCmdCsv(): Promise<void> {
    console.log('Downloading cmd.ms commands.csv...')

    const response = await fetch(CMD_CSV_URL)

    if (!response.ok) {
        throw new Error(`Failed to download cmd CSV: ${response.status} ${response.statusText}`)
    }

    const text = await response.text()
    const destDir = CMD_OUTPUT_PATH.substring(0, CMD_OUTPUT_PATH.lastIndexOf('/'))
    ensureDirSync(destDir)
    Deno.writeTextFileSync(CMD_OUTPUT_PATH, text)

    console.log(`Synced cmd.ms CSV to ${CMD_OUTPUT_PATH}`)
}

// ─── msportals.io ───

async function syncMsPortals(): Promise<void> {
    console.log('Downloading msportals.io portal data...')

    if (existsSync(MSPORTALS_OUTPUT_DIR)) {
        Deno.removeSync(MSPORTALS_OUTPUT_DIR, { recursive: true })
    }

    ensureDirSync(MSPORTALS_OUTPUT_DIR)

    let count = 0

    const results = await Promise.allSettled(
        MSPORTALS_FILES.map(async (file) => {
            const response = await fetch(MSPORTALS_BASE + file)

            if (!response.ok) {
                throw new Error(`Failed to download ${file}: ${response.status} ${response.statusText}`)
            }

            const text = await response.text()
            Deno.writeTextFileSync(`${MSPORTALS_OUTPUT_DIR}/${file}`, text)
            return file
        }),
    )

    for (const result of results) {
        if (result.status === 'fulfilled') {
            count++
        } else {
            console.warn(`Failed to sync: ${result.reason}`)
        }
    }

    console.log(`Synced ${count}/${MSPORTALS_FILES.length} msportals.io files to ${MSPORTALS_OUTPUT_DIR}`)
}

// ─── Unified portals manifests ───

// Shape emitted in portals-by-category.json (matches the extension's MsPortalGroup).
interface PortalGroupJson {
    groupName: string
    portals: {
        portalName: string
        primaryURL: string
        shortURL?: string
        secondaryURLs?: { icon: string; url: string }[]
        note?: string
    }[]
}

// Shape emitted in portals.json (matches the extension's CatalogEntry).
interface ExtCatalogEntry {
    name: string
    url: string
    description: string
    keywords: string
    category: string
    source: 'cmd' | 'msportals'
    iconUrl?: string
}

/**
 * Writes website/public/data/portals-by-category.json — a single bundle of all
 * msportals.io categories keyed by category slug (admin, user, ...). Lets the
 * extension fetch 1 file instead of 9.
 */
function syncPortalsByCategory(): void {
    const bundle: Record<string, PortalGroupJson[]> = {}

    for (const file of MSPORTALS_FILES) {
        const key = file.replace(/\.json$/, '')
        const path = `${MSPORTALS_OUTPUT_DIR}/${file}`

        if (!existsSync(path)) {
            console.warn(`portals-by-category: ${file} missing, skipping`)
            continue
        }

        try {
            bundle[key] = JSON.parse(Deno.readTextFileSync(path)) as PortalGroupJson[]
        } catch (err) {
            console.warn(`portals-by-category: failed to parse ${file}: ${err}`)
        }
    }

    Deno.writeTextFileSync(PORTALS_BY_CATEGORY_PATH, JSON.stringify(bundle))
    console.log(`Wrote ${PORTALS_BY_CATEGORY_PATH} with ${Object.keys(bundle).length} categories`)
}

/**
 * Writes website/public/data/portals.json — a flat, deduplicated list of
 * searchable entries combining cmd.ms commands and msportals.io portals, with
 * iconUrl resolved against the Microsoft Cloud Logos catalog. This is what the
 * settings "Add Microsoft Portal link" dialog consumes.
 *
 * Icon matching is fuzzy (exact normalised name, then altname, then substring).
 * Unmatched entries get `iconUrl: undefined` and the extension falls back to
 * pastel initials. Unmatched entries are logged so upstream gaps can be fixed.
 */
function syncPortalsManifest(): void {
    const iconIndex = buildIconIndex()

    const cmdEntries = parseCmdEntriesForManifest(iconIndex)
    const portalEntries = parsePortalEntriesForManifest(iconIndex)

    const combined = dedupeByUrl([...cmdEntries, ...portalEntries])

    const unmatched = combined.filter((e) => !e.iconUrl)
    console.log(`portals.json: ${combined.length} entries (${combined.length - unmatched.length} with icon)`)

    if (unmatched.length > 0) {
        console.warn(`portals.json: ${unmatched.length} entries without a matched icon:`)
        const sample = unmatched.slice(0, 30)
        for (const e of sample) console.warn(`  - ${e.name} [${e.source}]`)
        if (unmatched.length > sample.length) {
            console.warn(`  ...and ${unmatched.length - sample.length} more`)
        }
    }

    Deno.writeTextFileSync(PORTALS_MANIFEST_PATH, JSON.stringify(combined))
    console.log(`Wrote ${PORTALS_MANIFEST_PATH}`)
}

// ─── Icon matching ───

const STOPWORDS = new Set(['portal', 'portals', 'admin', 'center', 'microsoft', 'the', 'ms'])

function normaliseName(s: string): string {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w && !STOPWORDS.has(w))
        .join(' ')
        .trim()
}

function buildIconIndex(): Map<string, string> {
    const map = new Map<string, string>()

    if (!existsSync(MS_CATALOG_PATH)) {
        console.warn('ms catalog.json missing — iconUrl resolution will be empty')
        return map
    }

    const catalog = JSON.parse(Deno.readTextFileSync(MS_CATALOG_PATH)) as { entries: CatalogEntry[] }

    for (const entry of catalog.entries) {
        // Skip loose icons for primary matches — they have cleaned filenames which are noisy.
        // They still act as fallback via altnames/substring below.
        const primary = normaliseName(entry.name)
        if (primary && !map.has(primary)) map.set(primary, entry.icon)

        if (entry.altnames) {
            for (const alt of entry.altnames.split(/[,;]/).map((s) => s.trim()).filter(Boolean)) {
                const n = normaliseName(alt)
                if (n && !map.has(n)) map.set(n, entry.icon)
            }
        }
    }

    return map
}

function resolveIconUrl(name: string, iconIndex: Map<string, string>): string | undefined {
    const normalised = normaliseName(name)
    if (!normalised) return undefined

    // 1. Exact normalised match.
    const exact = iconIndex.get(normalised)
    if (exact) return MS_PUBLIC_PREFIX + encodeURI(exact)

    // 2. Substring match (either direction, minimum 4-char key to avoid noise).
    for (const [key, icon] of iconIndex) {
        if (key.length < 4) continue
        if (normalised.includes(key) || key.includes(normalised)) {
            return MS_PUBLIC_PREFIX + encodeURI(icon)
        }
    }

    return undefined
}

// ─── CSV parsing (mirrors the extension's parser) ───

function parseCmdEntriesForManifest(iconIndex: Map<string, string>): ExtCatalogEntry[] {
    const text = Deno.readTextFileSync(CMD_OUTPUT_PATH)
    const lines = text.split('\n')
    const entries: ExtCatalogEntry[] = []

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        const fields = parseCsvLine(line)
        if (fields.length < 6) continue

        const [command, alias, description, keywords, category, url] = fields
        if (!url || !description) continue

        const searchKeywords = [command, alias, keywords].filter(Boolean).join(' ')

        entries.push({
            name: description,
            url,
            description,
            keywords: searchKeywords,
            category: category || 'Other',
            source: 'cmd',
            iconUrl: resolveIconUrl(description, iconIndex),
        })
    }

    return entries
}

function parsePortalEntriesForManifest(iconIndex: Map<string, string>): ExtCatalogEntry[] {
    const entries: ExtCatalogEntry[] = []

    for (const file of MSPORTALS_FILES) {
        const path = `${MSPORTALS_OUTPUT_DIR}/${file}`
        if (!existsSync(path)) continue

        let groups: PortalGroupJson[]
        try {
            groups = JSON.parse(Deno.readTextFileSync(path)) as PortalGroupJson[]
        } catch (err) {
            console.warn(`portals.json: failed to parse ${file}: ${err}`)
            continue
        }

        for (const group of groups) {
            for (const portal of group.portals) {
                entries.push({
                    name: portal.portalName,
                    url: portal.primaryURL,
                    description: portal.note ? `${portal.portalName} - ${portal.note}` : portal.portalName,
                    keywords: [group.groupName, portal.note ?? ''].filter(Boolean).join(' '),
                    category: group.groupName,
                    source: 'msportals',
                    iconUrl: resolveIconUrl(portal.portalName, iconIndex),
                })
            }
        }
    }

    return entries
}

function parseCsvLine(line: string): string[] {
    const fields: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
        const char = line[i]

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"'
                i++
            } else {
                inQuotes = !inQuotes
            }
        } else if (char === ',' && !inQuotes) {
            fields.push(current.trim())
            current = ''
        } else {
            current += char
        }
    }

    fields.push(current.trim())
    return fields
}

function dedupeByUrl(entries: ExtCatalogEntry[]): ExtCatalogEntry[] {
    const seen = new Map<string, ExtCatalogEntry>()

    for (const entry of entries) {
        const key = entry.url.replace(/\/?\??$/, '').toLowerCase()
        const existing = seen.get(key)

        // Prefer cmd entries (richer keywords); otherwise prefer entries with an iconUrl.
        if (!existing) {
            seen.set(key, entry)
        } else if (entry.source === 'cmd' && existing.source !== 'cmd') {
            seen.set(key, entry)
        } else if (!existing.iconUrl && entry.iconUrl) {
            seen.set(key, { ...existing, iconUrl: entry.iconUrl })
        }
    }

    return Array.from(seen.values())
}

await syncAll()
