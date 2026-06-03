import { getHTMLTemplate } from '../shared/dom.ts'
import { isValidTenantId } from '../shared/tenant.ts'
import { applyExternalTenantLinks } from '../features/links/external-tenants.ts'
import { quickLinks } from '../features/links/index.ts'
import { storage } from '../storage.ts'

import type { Local } from '../../types/local.ts'
import type { ExternalTenant, Sync, TenantConfig } from '../../types/sync.ts'

/**
 * First-run setup wizard.
 *
 * Step 1 — keep the standard setup or target a dedicated Microsoft tenant.
 * Step 2 — list any External ID / B2C tenants, which become a dedicated
 * quick-links group (Azure + Entra links per tenant).
 *
 * Runs once: it is skipped as soon as `sync.tenant` is set (which then syncs
 * across devices).
 */
export function setupWizard(sync: Sync, local: Local): void {
    if (sync.tenant !== undefined) {
        return
    }

    const dialog = getHTMLTemplate<HTMLDialogElement>('setup-wizard-template', '#setup-wizard')
    const tenantBlock = dialog.querySelector<HTMLDivElement>('#setup-wizard-tenant')
    const tenantInput = dialog.querySelector<HTMLInputElement>('#i_wizard-tenantid')
    const hint = dialog.querySelector<HTMLSpanElement>('#setup-wizard-hint')
    const list = dialog.querySelector<HTMLDivElement>('#setup-wizard-tenant-list')
    const addButton = dialog.querySelector<HTMLButtonElement>('#b_setup-wizard-add')
    const backButton = dialog.querySelector<HTMLButtonElement>('#b_setup-wizard-back')
    const confirm = dialog.querySelector<HTMLButtonElement>('#b_setup-wizard-confirm')

    let step = 1

    document.body.appendChild(dialog)
    dialog.showModal()
    setTimeout(() => dialog.classList.add('shown'))

    const getMode = (): TenantConfig['mode'] => {
        const checked = dialog.querySelector<HTMLInputElement>('input[name="setup-mode"]:checked')
        return checked?.value === 'dedicated' ? 'dedicated' : 'default'
    }

    const showStep = (next: number): void => {
        step = next
        for (const el of dialog.querySelectorAll<HTMLElement>('.setup-wizard-step')) {
            el.toggleAttribute('hidden', el.dataset.step !== String(step))
        }
        backButton?.toggleAttribute('hidden', step === 1)
        if (confirm) {
            confirm.textContent = step === 1 ? 'Continue' : 'Finish'
        }
        if (step === 2 && list && list.children.length === 0) {
            addRow()
        }
    }

    function addRow(): void {
        if (!list) {
            return
        }
        const row = getHTMLTemplate<HTMLDivElement>('setup-wizard-row-template', '.setup-wizard-tenant-row')
        row.querySelector<HTMLButtonElement>('.setup-wizard-row-remove')?.addEventListener('click', () => {
            row.remove()
        })
        list.appendChild(row)
    }

    const collectTenants = (): ExternalTenant[] | null => {
        const tenants: ExternalTenant[] = []
        let valid = true

        for (const row of list?.querySelectorAll<HTMLDivElement>('.setup-wizard-tenant-row') ?? []) {
            const idInput = row.querySelector<HTMLInputElement>('.setup-wizard-row-id')
            const nameInput = row.querySelector<HTMLInputElement>('.setup-wizard-row-name')
            const id = idInput?.value.trim() ?? ''

            if (id === '') {
                idInput?.classList.remove('invalid')
                continue
            }

            if (!isValidTenantId(id)) {
                idInput?.classList.add('invalid')
                valid = false
                continue
            }

            idInput?.classList.remove('invalid')
            tenants.push({ id, name: nameInput?.value.trim() || undefined })
        }

        return valid ? tenants : null
    }

    for (const radio of dialog.querySelectorAll<HTMLInputElement>('input[name="setup-mode"]')) {
        radio.addEventListener('change', () => {
            const dedicated = getMode() === 'dedicated'
            tenantBlock?.toggleAttribute('hidden', !dedicated)
            hint?.classList.remove('invalid')
            if (dedicated) {
                tenantInput?.focus()
            }
        })
    }

    addButton?.addEventListener('click', addRow)
    backButton?.addEventListener('click', () => showStep(1))

    confirm?.addEventListener('click', async () => {
        if (step === 1) {
            if (getMode() === 'dedicated' && !isValidTenantId(tenantInput?.value.trim() ?? '')) {
                hint?.classList.add('invalid')
                tenantInput?.focus()
                return
            }
            showStep(2)
            return
        }

        const externalTenants = collectTenants()
        if (externalTenants === null) {
            return // an entered tenant id is invalid
        }

        const tenant: TenantConfig = getMode() === 'dedicated'
            ? { mode: 'dedicated', id: tenantInput?.value.trim() ?? '' }
            : { mode: 'default' }

        let data = await storage.sync.get()
        data.tenant = tenant
        data.externalTenants = externalTenants
        data = applyExternalTenantLinks(data, externalTenants)
        await storage.sync.set(data)

        dialog.classList.remove('shown')
        setTimeout(() => {
            dialog.close()
            dialog.remove()
        }, 350)

        quickLinks({ sync: data, local })
    })
}
