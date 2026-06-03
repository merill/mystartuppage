import type { TenantConfig } from '../../types/sync.ts'

// Microsoft hosts that accept the tenant as a path prefix, e.g.
// https://portal.azure.com/<tenant-id>. These are Azure-shell portals that
// route the first path segment to a tenant context.
// The lists are intentionally curated (not exhaustive for all 900+ catalog
// portals) — extend as needed.
const PATH_HOSTS = new Set<string>([
    'portal.azure.com',
    'entra.microsoft.com',
    'intune.microsoft.com',
    'security.microsoft.com',
    'purview.microsoft.com',
    'compliance.microsoft.com',
    'endpoint.microsoft.com',
])

// Microsoft hosts that target a tenant via a ?tenantId= query parameter.
const QUERY_HOSTS = new Set<string>([
    'admin.microsoft.com',
    'admin.exchange.microsoft.com',
    'portal.office.com',
])

const GUID_RE = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
const DOMAIN_RE = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/

/** A tenant id is valid if it is a GUID or a (verified) domain name. */
export function isValidTenantId(value: string): boolean {
    const trimmed = value.trim()
    return GUID_RE.test(trimmed) || DOMAIN_RE.test(trimmed)
}

/**
 * Rewrite a URL to target a dedicated Microsoft tenant.
 *
 * - Azure-shell hosts get the tenant prepended as the first path segment.
 * - Other known Microsoft admin hosts get a ?tenantId= query parameter.
 * - Unknown hosts and non-absolute URLs are returned unchanged.
 *
 * The transform is idempotent and never mutates the stored link — it only
 * shapes the URL at render/open time.
 */
export function applyTenantToUrl(url: string, tenant?: TenantConfig): string {
    if (!tenant || tenant.mode !== 'dedicated' || !tenant.id) {
        return url
    }

    const id = tenant.id.trim()

    let u: URL
    try {
        u = new URL(url)
    } catch (_) {
        return url
    }

    if (PATH_HOSTS.has(u.hostname)) {
        const segments = u.pathname.split('/').filter(Boolean)
        // Skip if a tenant is already present as the first path segment
        // (handles re-runs and links that already target another tenant,
        // e.g. the External ID / B2C tenant links).
        if (segments[0] && isValidTenantId(segments[0])) {
            return url
        }
        u.pathname = `/${id}${u.pathname}`
        return u.toString()
    }

    if (QUERY_HOSTS.has(u.hostname)) {
        if (u.searchParams.has('tenantId')) {
            return url // already targeted
        }
        u.searchParams.set('tenantId', id)
        return u.toString()
    }

    return url
}
