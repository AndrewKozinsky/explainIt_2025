'use client'

import React from 'react'

type UseTariffRowHeightsParams = {
	tableRef: React.RefObject<HTMLDivElement | null>
	tariffsCount: number
}

export function useTariffRowHeights(params: UseTariffRowHeightsParams) {
	const { tableRef, tariffsCount } = params

	const rafIdRef = React.useRef<number | null>(null)

	const resetRowHeights = React.useCallback(
		function resetRowHeights() {
			const el = tableRef.current
			if (!el) {
				return
			}
			el.style.removeProperty('--tariff-slogan-h')
			el.style.removeProperty('--tariff-name-h')
			el.style.removeProperty('--tariff-features-h')
			el.style.removeProperty('--tariff-description-h')
		},
		[tableRef],
	)

	const recalcRowHeights = React.useCallback(
		function recalcRowHeights() {
			const el = tableRef.current
			if (!el) {
				return
			}

			if (window.innerWidth <= 650) {
				resetRowHeights()
				return
			}

			const cardEls = Array.from(el.querySelectorAll<HTMLElement>('.tariff'))
			if (cardEls.length === 0) {
				return
			}

			function getMaxHeight(selector: string) {
				let max = 0
				for (const cardEl of cardEls) {
					const sectionEl = cardEl.querySelector<HTMLElement>(selector)
					if (!sectionEl) {
						continue
					}
					const h = sectionEl.getBoundingClientRect().height
					if (h > max) {
						max = h
					}
				}
				return max
			}
			const sloganH = getMaxHeight('.tariff__slogan')
			const nameH = getMaxHeight('.tariff__name')
			const featuresH = getMaxHeight('.tariff__features')
			const descriptionH = getMaxHeight('.tariff__description')

			el.style.setProperty('--tariff-slogan-h', `${sloganH}px`)
			el.style.setProperty('--tariff-name-h', `${nameH}px`)
			el.style.setProperty('--tariff-features-h', `${featuresH}px`)
			el.style.setProperty('--tariff-description-h', `${descriptionH}px`)
		},
		[resetRowHeights, tableRef],
	)

	const scheduleRecalc = React.useCallback(
		function scheduleRecalc() {
			if (window.innerWidth <= 650) {
				resetRowHeights()
				return
			}

			if (rafIdRef.current) {
				window.cancelAnimationFrame(rafIdRef.current)
			}

			rafIdRef.current = window.requestAnimationFrame(function () {
				resetRowHeights()
				const el = tableRef.current
				if (el) {
					// Force reflow so elements can shrink after min-height reset.
					void el.offsetHeight
				}
				recalcRowHeights()
			})
		},
		[recalcRowHeights, resetRowHeights, tableRef],
	)

	React.useLayoutEffect(
		function () {
			scheduleRecalc()

			const el = tableRef.current
			if (!el) {
				return function () {
					if (rafIdRef.current) {
						window.cancelAnimationFrame(rafIdRef.current)
					}
				}
			}

			function handleWindowResize() {
				scheduleRecalc()
			}
			window.addEventListener('resize', handleWindowResize)

			let observer: ResizeObserver | null = null
			if ('ResizeObserver' in window) {
				observer = new ResizeObserver(function () {
					scheduleRecalc()
				})
				observer.observe(el)
			}

			return function () {
				window.removeEventListener('resize', handleWindowResize)
				if (rafIdRef.current) {
					window.cancelAnimationFrame(rafIdRef.current)
				}
				observer?.disconnect()
			}
		},
		[recalcRowHeights, scheduleRecalc, tableRef, tariffsCount],
	)
}
