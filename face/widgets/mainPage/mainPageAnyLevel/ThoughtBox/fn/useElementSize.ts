import { RefObject, useEffect, useState } from 'react'

type ElementSize = { width: number; height: number }

/** Размер элемента вместе с внутренними отступами. До первого измерения возвращает null */
export function useElementSize(elementRef: RefObject<HTMLElement | null>) {
	const [size, setSize] = useState<ElementSize | null>(null)

	useEffect(() => {
		const element = elementRef.current
		if (!element) return

		const observer = new ResizeObserver(() => {
			setSize({ width: element.offsetWidth, height: element.offsetHeight })
		})
		observer.observe(element)

		return () => observer.disconnect()
	}, [elementRef])

	return size
}
