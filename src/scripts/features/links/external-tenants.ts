import type { ExternalTenant, Sync } from '../../../types/sync.ts'
import type { LinkElem } from '../../../types/shared.ts'

// Quick-links group that holds the per-tenant Azure / Entra links.
export const EXTERNAL_TENANTS_GROUP = 'External ID or B2C Tenants'

// Generated link ids share this prefix so they can be reconciled in bulk.
// It must start with "links" to be recognised as a link (see helpers.isLink).
const LINK_ID_PREFIX = 'linksext'

const AZURE_ICON = 'https://getyako.com/ms/logos/azure/azure-256x256-padded.png'
const ENTRA_ICON = 'https://getyako.com/ms/logos/entra-id/microsoft-entra-id-color-icon.svg'

function tenantKey(id: string, index: number): string {
    return `${id.replace(/[^a-z0-9]/gi, '').toLowerCase()}${index}`
}

/**
 * Materialise the user-defined External ID / B2C tenants into a dedicated
 * quick-links group placed right after "Admin". Each tenant yields two links:
 * one for the Azure portal and one for Entra, both already targeting the
 * tenant via its path segment.
 *
 * Idempotent: previously generated links are dropped and rebuilt from the list.
 * Mutates and returns `data`.
 */
export function applyExternalTenantLinks(data: Sync, tenants: ExternalTenant[]): Sync {
    const lg = data.linkgroups

    // Drop previously generated external-tenant links.
    for (const key of Object.keys(data)) {
        if (key.startsWith(LINK_ID_PREFIX)) {
            delete data[key]
        }
    }

    const valid = tenants.filter((t) => t.id.trim().length > 0)

    if (valid.length === 0) {
        lg.groups = lg.groups.filter((g) => g !== EXTERNAL_TENANTS_GROUP)
        lg.pinned = lg.pinned.filter((g) => g !== EXTERNAL_TENANTS_GROUP)
        if (lg.selected === EXTERNAL_TENANTS_GROUP) {
            lg.selected = lg.groups[0]
        }
        return data
    }

    insertAfterAdmin(lg.groups, EXTERNAL_TENANTS_GROUP)
    insertAfterAdmin(lg.pinned, EXTERNAL_TENANTS_GROUP)

    let order = 0

    valid.forEach((tenant, index) => {
        const id = tenant.id.trim()
        const label = (tenant.name?.trim() || id).trim()
        const key = tenantKey(id, index)

        const azure: LinkElem = {
            _id: `${LINK_ID_PREFIX}${key}azure`,
            parent: EXTERNAL_TENANTS_GROUP,
            order: order++,
            title: `${label} – Azure`,
            url: `https://portal.azure.com/${id}/`,
            icon: { type: 'url', value: AZURE_ICON },
        }

        const entra: LinkElem = {
            _id: `${LINK_ID_PREFIX}${key}entra`,
            parent: EXTERNAL_TENANTS_GROUP,
            order: order++,
            title: `${label} – Entra`,
            url: `https://entra.microsoft.com/${id}/`,
            icon: { type: 'url', value: ENTRA_ICON },
        }

        data[azure._id] = azure
        data[entra._id] = entra
    })

    return data
}

// Insert `group` directly after "Admin" (or append if Admin is missing).
function insertAfterAdmin(list: string[], group: string): void {
    if (list.includes(group)) {
        return
    }

    const adminIndex = list.indexOf('Admin')

    if (adminIndex === -1) {
        list.push(group)
    } else {
        list.splice(adminIndex + 1, 0, group)
    }
}
