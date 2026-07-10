import { useRef, useState, useEffect, useCallback } from 'react'
import cn from 'classnames'

type ContainerWidthObserverProps = {
	/** Массив ширин (пикселей), по которым вычисляется диапазон. Например [500, 1000] */
	widths: number[]
	/** Render-prop: получает номер диапазона (начиная с 1) */
	children: (range: number) => React.ReactNode
	/** Дополнительные CSS-классы */
	extraClass?: string
}

/**
 * Универсальная обёртка, которая отслеживает свою ширину через ResizeObserver
 * и передаёт номер диапазона в дочерний компонент через render-prop.
 *
 * Диапазоны вычисляются так:
 * - widths = [500, 1000]
 * - range 1: 0 … 499
 * - range 2: 500 … 999
 * - range 3: 1000+
 */
function ContainerWidthObserver(props: ContainerWidthObserverProps) {
	const { widths, children, extraClass } = props

	const containerRef = useRef<HTMLDivElement>(null)
	const [range, setRange] = useState(1)

	const computeRange = useCallback(
		(width: number) => {
			for (let i = 0; i < widths.length; i++) {
				if (width < widths[i]) return i + 1
			}

			return widths.length + 1
		},
		[widths],
	)

	useEffect(() => {
		const el = containerRef.current
		if (!el) return

		const observer = new ResizeObserver((entries) => {
			const entry = entries[0]
			if (entry) {
				const newRange = computeRange(entry.contentRect.width)
				setRange((prev) => (prev !== newRange ? newRange : prev))
			}
		})

		observer.observe(el)

		return () => observer.disconnect()
	}, [computeRange])

	return (
		<div ref={containerRef} className={cn(extraClass)}>
			{children(range)}
		</div>
	)
}

export default ContainerWidthObserver
