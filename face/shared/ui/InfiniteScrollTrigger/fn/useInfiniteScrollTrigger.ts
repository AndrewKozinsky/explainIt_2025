import { useEffect, useRef } from 'react'

type UseInfiniteScrollTriggerArgs = {
	/** Вызывается, когда сентинел попадает в зону видимости */
	onTrigger: () => void
	/** Если false — наблюдение отключено */
	enabled: boolean
	/** Расширение зоны наблюдения вокруг вьюпорта (префетч) */
	rootMargin?: string
}

/**
 * Наблюдает за элементом-сентинелом через IntersectionObserver
 * и вызывает onTrigger, когда он попадает в зону видимости.
 *
 * Возвращает ref, который нужно повесить на сентинел.
 */
export function useInfiniteScrollTrigger(args: UseInfiniteScrollTriggerArgs) {
	const { onTrigger, enabled, rootMargin = '180px' } = args

	const triggerRef = useRef<HTMLDivElement>(null)
	const onTriggerRef = useRef(onTrigger)

	useEffect(
		function () {
			onTriggerRef.current = onTrigger
		},
		[onTrigger],
	)

	useEffect(
		function () {
			const element = triggerRef.current
			if (!element || !enabled) return

			const observer = new IntersectionObserver(
				function (entries) {
					if (entries[0]?.isIntersecting) {
						onTriggerRef.current()
					}
				},
				{ rootMargin },
			)

			observer.observe(element)

			return function () {
				observer.disconnect()
			}
		},
		[enabled, rootMargin],
	)

	return triggerRef
}
