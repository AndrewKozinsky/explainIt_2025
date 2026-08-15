import { useCallback, useEffect } from 'react'
import type { RefObject } from 'react'

export function useAutoResizeTextarea(textAreaRef: RefObject<HTMLTextAreaElement | null>, value: string) {
	const adjustHeight = useCallback(() => {
		const el = textAreaRef.current
		if (!el) return

		el.style.height = 'auto'
		el.style.height = el.scrollHeight + 'px'
	}, [textAreaRef])

	useEffect(() => {
		adjustHeight()
	}, [value, adjustHeight])

	useEffect(() => {
		window.addEventListener('resize', adjustHeight)

		return () => window.removeEventListener('resize', adjustHeight)
	}, [adjustHeight])
}
