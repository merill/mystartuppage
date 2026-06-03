import './init.test.ts'

// Import scripts after test init, document needs to be loaded first
import { applyExternalTenantLinks, EXTERNAL_TENANTS_GROUP } from '../src/scripts/features/links/external-tenants.ts'
import { applyTenantToUrl, isValidTenantId } from '../src/scripts/shared/tenant.ts'
import { SYNC_DEFAULT } from '../src/scripts/defaults.ts'
import { assert, assertEquals } from '@std/assert'
import type { Sync } from '../src/types/sync.ts'
import type { LinkElem } from '../src/types/shared.ts'

const GUID = '3f2504e0-4f89-11d3-9a0c-0305e82c3301'
const OTHER_GUID = '11111111-1111-1111-1111-111111111111'

function freshSync(): Sync {
    return structuredClone(SYNC_DEFAULT)
}

function externalLinkKeys(data: Sync): string[] {
    return Object.keys(data).filter((key) => key.startsWith('linksext'))
}

// ─── Tenant id validation (wizard inputs) ───

Deno.test('isValidTenantId', async (t) => {
    await t.step('accepts a GUID', () => {
        assert(isValidTenantId(GUID))
    })

    await t.step('accepts a verified domain', () => {
        assert(isValidTenantId('contoso.onmicrosoft.com'))
    })

    await t.step('trims surrounding whitespace', () => {
        assert(isValidTenantId(`  ${GUID}  `))
    })

    await t.step('rejects an empty string', () => {
        assert(isValidTenantId('') === false)
    })

    await t.step('rejects garbage', () => {
        assert(isValidTenantId('not a tenant') === false)
        assert(isValidTenantId('1234') === false)
    })
})

// ─── Dedicated-tenant URL rewriting (wizard step 1) ───

Deno.test('applyTenantToUrl', async (t) => {
    const url = 'https://portal.azure.com'

    await t.step('leaves urls untouched without a dedicated tenant', () => {
        assertEquals(applyTenantToUrl(url, undefined), url)
        assertEquals(applyTenantToUrl(url, { mode: 'default' }), url)
        assertEquals(applyTenantToUrl(url, { mode: 'dedicated' }), url) // no id
    })

    await t.step('prefixes the tenant for Azure-shell hosts', () => {
        assertEquals(
            applyTenantToUrl('https://portal.azure.com', { mode: 'dedicated', id: GUID }),
            `https://portal.azure.com/${GUID}/`,
        )
        assertEquals(
            applyTenantToUrl('https://entra.microsoft.com/users', { mode: 'dedicated', id: GUID }),
            `https://entra.microsoft.com/${GUID}/users`,
        )
    })

    await t.step('adds a tenantId query for query hosts', () => {
        const out = applyTenantToUrl('https://admin.microsoft.com', { mode: 'dedicated', id: GUID })
        assert(out.includes(`tenantId=${GUID}`))
    })

    await t.step('leaves unknown hosts untouched', () => {
        const other = 'https://example.com/page'
        assertEquals(applyTenantToUrl(other, { mode: 'dedicated', id: GUID }), other)
    })

    await t.step('leaves non-absolute urls untouched', () => {
        assertEquals(applyTenantToUrl('#config', { mode: 'dedicated', id: GUID }), '#config')
    })

    await t.step('is idempotent / never double-prefixes an existing tenant', () => {
        const already = `https://portal.azure.com/${GUID}/`
        // Same tenant
        assertEquals(applyTenantToUrl(already, { mode: 'dedicated', id: GUID }), already)
        // A different global tenant must not prepend in front of the external one
        assertEquals(applyTenantToUrl(already, { mode: 'dedicated', id: OTHER_GUID }), already)
    })

    await t.step('does not duplicate the tenantId query', () => {
        const already = `https://admin.microsoft.com/?tenantId=${GUID}`
        assertEquals(applyTenantToUrl(already, { mode: 'dedicated', id: OTHER_GUID }), already)
    })
})

// ─── External ID / B2C tenant links (wizard step 2) ───

Deno.test('applyExternalTenantLinks', async (t) => {
    await t.step('places the group right after Admin', () => {
        const data = applyExternalTenantLinks(freshSync(), [{ id: GUID }])

        assertEquals(data.linkgroups.groups, ['Microsoft 365', 'Admin', EXTERNAL_TENANTS_GROUP])
        assertEquals(data.linkgroups.pinned, ['Microsoft 365', 'Admin', EXTERNAL_TENANTS_GROUP])
    })

    await t.step('creates Azure and Entra links per tenant', () => {
        const data = applyExternalTenantLinks(freshSync(), [{ id: GUID, name: 'Contoso' }])
        const links = externalLinkKeys(data).map((key) => data[key] as LinkElem)

        assertEquals(links.length, 2)

        const azure = links.find((l) => l.url.includes('portal.azure.com'))
        const entra = links.find((l) => l.url.includes('entra.microsoft.com'))

        assert(azure, 'expected an Azure link')
        assert(entra, 'expected an Entra link')

        assertEquals(azure?.url, `https://portal.azure.com/${GUID}/`)
        assertEquals(entra?.url, `https://entra.microsoft.com/${GUID}/`)

        // Both belong to the dedicated group and use the provided name as label
        assertEquals(azure?.parent, EXTERNAL_TENANTS_GROUP)
        assertEquals(entra?.parent, EXTERNAL_TENANTS_GROUP)
        assert(azure?.title.includes('Contoso'))
        assert(entra?.title.includes('Contoso'))
    })

    await t.step('ids are recognised as links (start with "links")', () => {
        const data = applyExternalTenantLinks(freshSync(), [{ id: GUID }])
        for (const key of externalLinkKeys(data)) {
            assert((data[key] as LinkElem)._id.startsWith('links'))
        }
    })

    await t.step('falls back to the id as label when no name is given', () => {
        const data = applyExternalTenantLinks(freshSync(), [{ id: GUID }])
        const azure = externalLinkKeys(data)
            .map((key) => data[key] as LinkElem)
            .find((l) => l.url.includes('portal.azure.com'))
        assert(azure?.title.includes(GUID))
    })

    await t.step('generates two links for each of several tenants', () => {
        const data = applyExternalTenantLinks(freshSync(), [
            { id: GUID, name: 'A' },
            { id: 'contoso.onmicrosoft.com', name: 'B' },
        ])
        assertEquals(externalLinkKeys(data).length, 4)
    })

    await t.step('is idempotent when re-applied with the same list', () => {
        let data = applyExternalTenantLinks(freshSync(), [{ id: GUID }])
        data = applyExternalTenantLinks(data, [{ id: GUID }])

        assertEquals(externalLinkKeys(data).length, 2)
        assertEquals(data.linkgroups.groups.filter((g) => g === EXTERNAL_TENANTS_GROUP).length, 1)
    })

    await t.step('ignores rows with an empty id', () => {
        const data = applyExternalTenantLinks(freshSync(), [{ id: '   ' }])
        assertEquals(externalLinkKeys(data).length, 0)
        assert(data.linkgroups.groups.includes(EXTERNAL_TENANTS_GROUP) === false)
    })

    await t.step('removes the group and links when the list becomes empty', () => {
        let data = applyExternalTenantLinks(freshSync(), [{ id: GUID }])
        assert(data.linkgroups.groups.includes(EXTERNAL_TENANTS_GROUP))

        data = applyExternalTenantLinks(data, [])
        assertEquals(externalLinkKeys(data).length, 0)
        assert(data.linkgroups.groups.includes(EXTERNAL_TENANTS_GROUP) === false)
        assert(data.linkgroups.pinned.includes(EXTERNAL_TENANTS_GROUP) === false)
    })

    await t.step('generated links survive the dedicated-tenant transform unchanged', () => {
        const data = applyExternalTenantLinks(freshSync(), [{ id: GUID }])
        const azure = externalLinkKeys(data)
            .map((key) => data[key] as LinkElem)
            .find((l) => l.url.includes('portal.azure.com'))

        // Even with a different global dedicated tenant, the per-tenant link is left alone
        assertEquals(applyTenantToUrl(azure?.url ?? '', { mode: 'dedicated', id: OTHER_GUID }), azure?.url)
    })
})
