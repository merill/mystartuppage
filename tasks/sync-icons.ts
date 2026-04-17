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

// ─── Main ───

async function syncAll(): Promise<void> {
    await Promise.all([
        syncLogos(),
        syncCmdCsv(),
        syncMsPortals(),
    ])
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
        const products = buildProductIndex(repoPath, allImages)
        const looseIcons = buildLooseIconIndex(allImages)
        const entries = [...products, ...looseIcons]

        entries.sort((a, b) => {
            const g = a.group.localeCompare(b.group)
            if (g !== 0) return g
            return a.name.localeCompare(b.name)
        })

        const catalog = { generatedAt: new Date().toISOString(), entries }
        Deno.writeTextFileSync(MS_CATALOG_PATH, JSON.stringify(catalog))

        console.log(`Synced ${allImages.length} images to ${MS_OUTPUT_DIR}`)
        console.log(
            `Catalog written to ${MS_CATALOG_PATH} (${products.length} products + ${looseIcons.length} loose icons = ${entries.length} entries)`,
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
}

interface Metadata {
    name: string
    type: string
    status: string
    altnames: string
    prodfamilies: string[]
}

// ─── Products (from logos/*/metadata.md) ───

function buildProductIndex(repoPath: string, tree: string[]): CatalogEntry[] {
    // Find every directory under `logos/` that contains a metadata.md
    const productDirs = findProductDirs(repoPath)

    // Fast lookup: set of all product dirs (relative paths) to stop subtree walks
    const productDirSet = new Set(productDirs)

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
        })
    }

    return products
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
    // Penalise deeply nested variants
    const depth = (path.match(/\//g) || []).length
    const subdirPenalty = depth > 2 ? -20 : 0

    // SVG always wins over PNG (vector scales perfectly)
    if (lower.endsWith('.svg')) return 1000 + padded + subdirPenalty

    if (lower.includes('512')) return 100 + padded + subdirPenalty
    if (lower.includes('300x300')) return 95 + padded + subdirPenalty
    if (lower.includes('256x256')) return 90 + padded + subdirPenalty
    if (lower.includes('scalable')) return 85 + padded + subdirPenalty
    if (lower.includes('128x128') || lower.includes('128')) return 70 + padded + subdirPenalty
    if (lower.includes('64x64') || lower.includes('64')) return 50 + padded + subdirPenalty

    return 40 + padded + subdirPenalty
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
        })
    }

    return entries
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

await syncAll()
