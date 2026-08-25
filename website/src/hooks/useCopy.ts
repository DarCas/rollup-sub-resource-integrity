/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * MIT
 */

import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopy(resetAfterMs = 2000): [boolean, (text: string) => void] {
    const [copied, setCopied] = useState(false)
    const timer = useRef<number | undefined>(undefined)

    useEffect(() => () => window.clearTimeout(timer.current), [])

    const copy = useCallback(
        (text: string) => {
            if (text.startsWith('$')) {
                text = text.slice(1).trim()
            }

            navigator.clipboard.writeText(text).then(
                () => {
                    setCopied(true)
                    window.clearTimeout(timer.current)
                    timer.current = window.setTimeout(() => setCopied(false), resetAfterMs)
                },
                () => setCopied(false),
            )
        },
        [resetAfterMs],
    )

    return [copied, copy]
}
