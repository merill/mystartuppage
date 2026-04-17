import { getHTMLTemplate } from '../../shared/dom.ts'

const ICON_BASE_URL = 'https://getyako.com/ms/'
const CATALOG_URL = 'https://getyako.com/ms/catalog.json'
const CACHE_KEY = 'icon-picker-catalog-v1'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

// ─── Types ───

interface CatalogEntry {
    id: string
    name: string
    altnames: string
    group: string
    icon: string
    source: 'product' | 'icon'
    type?: string
    prodfamilies?: string[]
}

interface CatalogCache {
    timestamp: number
    entries: CatalogEntry[]
}

// ─── State ───

let dialog: HTMLDialogElement | null = null
let products: CatalogEntry[] = []
let loaded = false
let activeGroup = 'All'
let onSelectCallback: ((iconUrl: string) => void) | null = null

// ─── Group ordering ───

const GROUP_ORDER = [
    'Microsoft 365',
    'Azure',
    'Entra',
    'Power Platform',
    'Dynamics 365',
    'Viva Suite',
    'Viva',
    'Fabric',
    'Copilot',
    'Other',
    'Azure Services',
    'Fabric Services',
    'Intune Services',
]

// ─── Public API ───

export async function openIconPicker(onSelect: (iconUrl: string) => void): Promise<void> {
    onSelectCallback = onSelect

    if (!dialog) {
        dialog = createDialog()
    }

    document.body.appendChild(dialog)
    dialog.showModal()

    requestAnimationFrame(() => {
        dialog!.classList.add('shown')
    })

    if (!loaded) {
        showLoading(true)
        products = await loadProducts()
        loaded = true
        showLoading(false)
    }

    populateCategoryDropdown()
    renderGrid()

    const search = dialog.querySelector<HTMLInputElement>('#icon-picker-search')
    setTimeout(() => search?.focus(), 50)
}

export function closeIconPicker(): void {
    if (!dialog) return

    dialog.classList.remove('shown')

    setTimeout(() => {
        dialog?.close()
        dialog?.remove()
    }, 350)
}

function showLoading(visible: boolean): void {
    if (!dialog) return
    const el = dialog.querySelector<HTMLDivElement>('#icon-picker-loading')
    if (el) {
        el.style.display = visible ? '' : 'none'
    }
}

// ─── Dialog creation ───

function createDialog(): HTMLDialogElement {
    const dlg = getHTMLTemplate<HTMLDialogElement>('icon-picker-template', 'dialog')

    const closeBtn = dlg.querySelector<HTMLButtonElement>('#icon-picker-close')
    closeBtn?.addEventListener('click', closeIconPicker)

    dlg.addEventListener('click', (event) => {
        if (event.target === dlg) {
            closeIconPicker()
        }
    })

    dlg.addEventListener('cancel', (event) => {
        event.preventDefault()
        closeIconPicker()
    })

    const search = dlg.querySelector<HTMLInputElement>('#icon-picker-search')
    search?.addEventListener('input', () => {
        renderGrid()
    })

    const select = dlg.querySelector<HTMLSelectElement>('#icon-picker-category')
    select?.addEventListener('change', () => {
        activeGroup = select.value
        renderGrid()
    })

    return dlg
}

// ─── Data loading ───

async function loadProducts(): Promise<CatalogEntry[]> {
    const cached = readCache()
    if (cached) return cached

    const fetched = await fetchProducts()
    writeCache(fetched)
    return fetched
}

async function fetchProducts(): Promise<CatalogEntry[]> {
    const response = await fetch(CATALOG_URL)

    if (!response.ok) {
        console.warn('Icon picker: failed to fetch catalog manifest, status', response.status)
        return []
    }

    const data = await response.json()
    return (data.entries ?? []) as CatalogEntry[]
}

function readCache(): CatalogEntry[] | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (!raw) return null
        const cache: CatalogCache = JSON.parse(raw)
        if (Date.now() - cache.timestamp > CACHE_TTL_MS) return null
        return cache.entries
    } catch {
        return null
    }
}

function writeCache(list: CatalogEntry[]): void {
    try {
        const cache: CatalogCache = { timestamp: Date.now(), entries: list }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
    } catch {
        // Storage full or unavailable — ignore
    }
}

// ─── Category dropdown ───

function populateCategoryDropdown(): void {
    if (!dialog) return

    const select = dialog.querySelector<HTMLSelectElement>('#icon-picker-category')
    if (!select) return

    while (select.options.length > 1) {
        select.remove(1)
    }

    for (const g of getGroups()) {
        const option = document.createElement('option')
        option.value = g
        option.textContent = g
        select.appendChild(option)
    }

    select.value = activeGroup
}

function getGroups(): string[] {
    const set = new Set<string>()
    for (const p of products) set.add(p.group)

    const ordered: string[] = []
    for (const g of GROUP_ORDER) {
        if (set.has(g)) {
            ordered.push(g)
            set.delete(g)
        }
    }

    const remaining = Array.from(set).sort()
    return [...ordered, ...remaining]
}

// ─── Rendering ───

function renderGrid(): void {
    if (!dialog) return

    const grid = dialog.querySelector<HTMLDivElement>('#icon-picker-grid')
    if (!grid) return

    grid.innerHTML = ''

    const search = dialog.querySelector<HTMLInputElement>('#icon-picker-search')
    const query = (search?.value ?? '').toLowerCase().trim()
    const tokens = query ? query.split(/\s+/).filter(Boolean) : []

    let filtered = products

    if (tokens.length > 0) {
        filtered = filtered.filter((p) => {
            const fams = p.prodfamilies ? p.prodfamilies.join(' ') : ''
            const haystack = `${p.name} ${p.altnames} ${p.group} ${fams}`.toLowerCase()
            return tokens.every((token) => haystack.includes(token))
        })
    }

    if (activeGroup !== 'All') {
        filtered = filtered.filter((p) => p.group === activeGroup)
    }

    if (filtered.length === 0) {
        const noRes = document.createElement('div')
        noRes.className = 'icon-picker-no-results'
        noRes.textContent = 'No icons found.'
        grid.appendChild(noRes)
        return
    }

    const groups = new Map<string, CatalogEntry[]>()

    for (const p of filtered) {
        const list = groups.get(p.group)
        if (list) {
            list.push(p)
        } else {
            groups.set(p.group, [p])
        }
    }

    const orderedGroups = getGroups()

    for (const g of orderedGroups) {
        const groupProducts = groups.get(g)
        if (!groupProducts || groupProducts.length === 0) continue

        groupProducts.sort((a, b) => a.name.localeCompare(b.name))

        const panel = document.createElement('div')
        panel.className = 'icon-picker-group'

        const titleEl = document.createElement('h2')
        titleEl.textContent = g
        panel.appendChild(titleEl)

        const itemsContainer = document.createElement('div')
        itemsContainer.className = 'icon-picker-items'

        for (const product of groupProducts) {
            const item = createIconTile(product)
            itemsContainer.appendChild(item)
        }

        panel.appendChild(itemsContainer)
        grid.appendChild(panel)
    }
}

function createIconTile(product: CatalogEntry): HTMLDivElement {
    const item = document.createElement('div')
    item.className = 'icon-picker-item'
    item.title = product.altnames ? `${product.name} (${product.altnames})` : product.name

    const iconUrl = ICON_BASE_URL + encodeURI(product.icon)

    const iconWrap = document.createElement('div')
    iconWrap.className = 'icon-picker-item-icon'

    const img = document.createElement('img')
    img.src = iconUrl
    img.alt = ''
    img.loading = 'lazy'

    iconWrap.appendChild(img)

    const nameEl = document.createElement('span')
    nameEl.className = 'icon-picker-item-name'
    nameEl.textContent = product.name

    item.appendChild(iconWrap)
    item.appendChild(nameEl)

    item.addEventListener('click', () => {
        if (onSelectCallback) {
            onSelectCallback(iconUrl)
        }
        closeIconPicker()
    })

    return item
}
