import { RefObject, useEffect, useState } from 'react'

// Класс баннера главной страницы: пока баннер на экране, у него своя кнопка и липкий призыв не нужен
const bannerSelector = '.main-page-banner'

/**
 * Следит за липким блоком призыва и возвращает его состояние:
 * isInPlace — блок докрутили до его места на странице (или уже проскроллили мимо), и он раскрыт;
 * isBannerVisible — на экране баннер главной страницы, поэтому прилипший блок прячется
 */
export function useCallToActionState(sectionRef: RefObject<HTMLElement | null>) {
	const isInPlace = useIsInPlace(sectionRef)
	const isBannerVisible = useIsBannerVisible()

	return { isInPlace, isBannerVisible }
}

/**
 * Блок прилип, когда его низ стоит ровно на отступе от низа экрана, заданном в bottom.
 * Если низ выше — блок на своём месте или выше экрана. Высота блока постоянна,
 * поэтому смена состояния не двигает страницу и не вызывает обратного переключения
 */
function useIsInPlace(sectionRef: RefObject<HTMLElement | null>) {
	const [isInPlace, setIsInPlace] = useState(false)

	useEffect(
		function () {
			const section = sectionRef.current
			if (!section) return

			let frameId = 0

			function update() {
				frameId = 0
				if (!section) return

				const stickyBottom = parseFloat(getComputedStyle(section).bottom) || 0
				const stuckBottom = window.innerHeight - stickyBottom
				const isStuck = Math.abs(section.getBoundingClientRect().bottom - stuckBottom) < 1

				setIsInPlace(!isStuck)
			}

			// Пересчёт не чаще одного раза за кадр
			function scheduleUpdate() {
				if (!frameId) {
					frameId = requestAnimationFrame(update)
				}
			}

			update()
			window.addEventListener('scroll', scheduleUpdate, { passive: true })
			window.addEventListener('resize', scheduleUpdate)

			return function () {
				cancelAnimationFrame(frameId)
				window.removeEventListener('scroll', scheduleUpdate)
				window.removeEventListener('resize', scheduleUpdate)
			}
		},
		[sectionRef],
	)

	return isInPlace
}

/** Виден ли баннер главной страницы. Если баннера нет, считается, что он не виден */
function useIsBannerVisible() {
	const [isBannerVisible, setIsBannerVisible] = useState(true)

	useEffect(function () {
		const banner = document.querySelector(bannerSelector)
		if (!banner) {
			setIsBannerVisible(false)
			return
		}

		const observer = new IntersectionObserver(function ([entry]) {
			setIsBannerVisible(entry.isIntersecting)
		})
		observer.observe(banner)

		return function () {
			observer.disconnect()
		}
	}, [])

	return isBannerVisible
}
