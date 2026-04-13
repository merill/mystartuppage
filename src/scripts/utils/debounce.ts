import { storage } from '../storage.ts'

// Typing from
// https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940?permalink_comment_id=4276799#gistcomment-4276799
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
    callback: F,
    waitFor: number,
): ((...args: Parameters<F>) => void) & { cancel: () => void; flush: () => void } {
    let timeout: ReturnType<typeof setTimeout>
    let pendingArgs: Parameters<F> | undefined

    const debounced = (...args: Parameters<F>) => {
        clearTimeout(timeout)
        pendingArgs = args
        timeout = setTimeout(() => {
            pendingArgs = undefined
            callback(...args)
        }, waitFor)
    }

    debounced.cancel = () => {
        clearTimeout(timeout)
        pendingArgs = undefined
    }

    debounced.flush = () => {
        if (pendingArgs) {
            clearTimeout(timeout)
            const args = pendingArgs
            pendingArgs = undefined
            // deno-lint-ignore no-explicit-any
            callback(...(args as any))
        }
    }

    return debounced
}

export const eventDebounce = debounce((value: { [key: string]: unknown }) => {
    storage.sync.set(value)
}, 400)
