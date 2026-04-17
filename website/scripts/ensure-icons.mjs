#!/usr/bin/env node
// Runs before `npm run dev` (and optionally `npm run build`).
// If the Microsoft Cloud icons haven't been synced yet, kick off the Deno sync task.
// This keeps `website/public/ms/` out of the source repo while ensuring a fresh
// checkout doesn't 404 every icon on first `astro dev`.

import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..', '..')
const catalog = resolve(repoRoot, 'website', 'public', 'ms', 'catalog.json')

if (existsSync(catalog)) {
    // Already synced - nothing to do.
    process.exit(0)
}

console.log('[ensure-icons] website/public/ms/catalog.json not found - running `deno task sync-icons`...')

const result = spawnSync('deno', ['task', 'sync-icons'], {
    cwd: repoRoot,
    stdio: 'inherit',
})

if (result.error) {
    console.error('[ensure-icons] Failed to invoke deno. Install Deno (https://deno.land) or run `deno task sync-icons` manually.')
    console.error(result.error.message)
    process.exit(1)
}

process.exit(result.status ?? 0)
