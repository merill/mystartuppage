import { hexColorFromSplitRange } from '../shared/dom.ts'
import { tradThis } from '../utils/translations.ts'
import { opacityFromHex } from '../shared/generic.ts'
import { onSettingsLoad } from '../utils/onsettingsload.ts'
import { eventDebounce } from '../utils/debounce.ts'
import PocketEditor from 'pocket-editor'
import { storage } from '../storage.ts'

import type { Notes } from '../../types/sync.ts'

type NotesEvent = {
    text?: string
    align?: string
    width?: string
    background?: true
}

const container = document.getElementById('notes_container')

// In-memory cache of the notes object, populated during initNotes.
// Text changes write through this cache directly to storage without
// debounce, because Chromium new-tab pages are torn down instantly
// when the user navigates via the address bar (no beforeunload fires).
let notesCache: Notes | undefined
let editor: PocketEditor | undefined

export function notes(init?: Notes, event?: NotesEvent): void {
    if (event) {
        updateNotes(event)
        return
    }

    if (init) {
        init.on ? initNotes(init) : onSettingsLoad(() => initNotes(init))
    }
}

function updateNotes(event: NotesEvent): void {
    if (!notesCache) {
        return
    }

    // Text changes bypass debounce entirely — write to storage immediately
    // so the save completes before the page can be torn down.
    if (event?.text !== undefined) {
        notesCache.text = event.text
        storage.sync.set({ notes: notesCache })

        // PocketEditor's removeLines dispatches a synthetic input event
        // before its MutationObserver updates the internal lines array,
        // so toMarkdown() can return stale content after multi-line
        // deletion. Schedule a second save after the observer runs to
        // capture the correct value.
        if (editor) {
            const ed = editor
            queueMicrotask(() => {
                const fresh = ed.value
                if (fresh !== notesCache?.text) {
                    notesCache!.text = fresh
                    storage.sync.set({ notes: notesCache })
                }
            })
        }

        return
    }

    if (event?.align !== undefined) {
        notesCache.align = event.align
        handleAlign(notesCache.align)
    }

    if (event?.width !== undefined) {
        notesCache.width = Number.parseInt(event.width)
        handleWidth(notesCache.width)
    }

    if (event?.background) {
        notesCache.background = hexColorFromSplitRange('notes-background-range')
        handleBackground(notesCache.background)
    }

    eventDebounce({ notes: notesCache })
}

//
//	Funcs
//

function initNotes(init: Notes): void {
    document.getElementById('pocket-editor')?.remove()

    handleAlign(init.align)
    handleWidth(init.width)
    handleBackground(init.background)
    handleToggle(init.on)

    init.text = init.text ?? translateNotesText()
    notesCache = init

    editor = new PocketEditor('#notes_container', { text: init.text, id: 'pocket-editor' })
    editor.oninput((content) => {
        updateNotes({ text: content })
    })
}

function handleToggle(state: boolean): void {
    container?.classList.toggle('hidden', !state)
}

function handleAlign(value: string): void {
    container?.classList.toggle('center-align', value === 'center')
    container?.classList.toggle('right-align', value === 'right')
}

function handleWidth(value?: number): void {
    if (value) {
        document.documentElement.style.setProperty('--notes-width', `${value.toString()}em`)
    }
}

function handleBackground(hex = '#fff2'): void {
    if (container) {
        container?.classList.toggle('opaque', hex.includes('#fff') && opacityFromHex(hex) > 7)
        document.documentElement.style.setProperty('--notes-background', hex)
    }
}

function translateNotesText(): string {
    const line1 = tradThis('Edit this note')
    const line2 = tradThis('With markdown titles, lists, and checkboxes')
    const line3 = tradThis('Learn more on <url>')

    return `## ${line1}!\n\n[ ] ${line2}\n\n[ ] ${line3.replace('<url>', 'https://getyako.com')}`
}
