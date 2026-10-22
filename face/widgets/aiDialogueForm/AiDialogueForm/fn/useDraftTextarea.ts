import { useLayoutEffect, useRef } from 'react'
import type { DraftPart } from './aiDialogueDraftState'

/** Автовысота, сохранение позиции курсора и видимое выделение текущего фрагмента диктовки. */
export function useDraftTextarea(part: DraftPart, dictating: boolean) {
	const ref = useRef<HTMLTextAreaElement>(null)
	const wasDictating = useRef(false)
	useLayoutEffect(() => {
		const input = ref.current
		if (!input) return

		function resize() {
			if (!input) return
			input.style.height = 'auto'
			input.style.height = `${input.scrollHeight}px`
		}
		resize()
		input.setSelectionRange(part.selection.start, part.selection.end)
		if (dictating && !wasDictating.current) input.focus({ preventScroll: true })

		wasDictating.current = dictating
		const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
		observer?.observe(input)

		return () => observer?.disconnect()
	}, [part.text, part.selection.start, part.selection.end, dictating])
	return ref
}
