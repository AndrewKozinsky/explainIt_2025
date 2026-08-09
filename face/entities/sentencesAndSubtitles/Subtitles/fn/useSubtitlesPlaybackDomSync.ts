import { RefObject, useEffect, useRef } from 'react'
import { VideoSubtitlesModel } from '@/entities/video/repository/VideosRepository'

type UseSubtitlesPlaybackDomSyncParams = {
	containerRef: RefObject<HTMLElement | null>
	subtitles: VideoSubtitlesModel.Structure['subtitles']
	currentTime: number
	bottomThresholdPx?: number
	topPaddingPx?: number
}

/**
 * Синхронизирует UI списка субтитров с текущим временем плеера, не вызывая
 * React-рендер на каждый тик `player.currentTime`.
 *
 * Идея: список субтитров рендерится один раз, а при смене активного блока
 * мы точечно переключаем CSS-классы в DOM и выполняем автоскролл.
 *
 * Требования к разметке:
 * - у каждого элемента должен быть `id="subtitle-<id>"` и `data-subtitle-id="<id>"`.
 *
 * @param params.containerRef - контейнер со списком субтитров
 * @param params.subtitles - массив субтитров/пауз (в порядке воспроизведения)
 * @param params.currentTime - текущее время плеера в секундах
 * @param params.bottomThresholdPx - насколько близко к низу считать "не видно"
 * @param params.topPaddingPx - отступ сверху при автоскролле
 */
export function useSubtitlesPlaybackDomSync(params: UseSubtitlesPlaybackDomSyncParams) {
	const { containerRef, subtitles, currentTime, bottomThresholdPx = 40, topPaddingPx = 20 } = params

	const currentSubtitleIdxRef = useRef(0)
	const currentSubtitleIdRef = useRef<number | null>(null)
	const didInitialAutoScrollRef = useRef(false)

	// Сбрасываем состояние только при смене субтитров (новое видео), а не на каждый тик currentTime.
	useEffect(() => {
		if (!subtitles?.length) {
			return
		}

		currentSubtitleIdxRef.current = 0
		currentSubtitleIdRef.current = null
		didInitialAutoScrollRef.current = false
	}, [subtitles])

	useEffect(() => {
		if (!subtitles?.length) {
			return
		}

		const applyCurrent = (nextId: number) => {
			const container = containerRef.current
			if (!container) return

			const prevId = currentSubtitleIdRef.current
			if (prevId != null && prevId !== nextId) {
				const prevEl = container.querySelector(`#subtitle-${prevId}`) as HTMLElement | null
				if (prevEl) {
					const prevSubtitleInner = prevEl.querySelector('.subtitle-block__subtitle') as HTMLElement | null
					prevSubtitleInner?.classList.remove('subtitle-block__subtitle--current')
					prevEl.classList.remove('speechless-bar--active')
				}
			}

			const nextEl = container.querySelector(`#subtitle-${nextId}`) as HTMLElement | null
			if (nextEl) {
				const nextSubtitleInner = nextEl.querySelector('.subtitle-block__subtitle') as HTMLElement | null
				if (nextSubtitleInner) {
					nextSubtitleInner.classList.add('subtitle-block__subtitle--current')
				} else {
					nextEl.classList.add('speechless-bar--active')
				}
			}

			currentSubtitleIdRef.current = nextId

			autoScrollToCurrent({
				container,
				currentSubtitleId: nextId,
				bottomThresholdPx,
				topPaddingPx,
				forceAlignBelowVideo: !didInitialAutoScrollRef.current,
			})

			didInitialAutoScrollRef.current = true
		}

		const sync = (timeSeconds: number) => {
			const nextIdx = findCurrentSubtitleIdx({
				subtitles,
				timeSeconds,
				currentIdx: currentSubtitleIdxRef.current,
			})

			currentSubtitleIdxRef.current = nextIdx
			const nextId = subtitles[nextIdx]?.id
			if (nextId == null) return

			if (nextId === currentSubtitleIdRef.current) return
			applyCurrent(nextId)
		}

		sync(currentTime)

		// Классы --current переключаются в applyCurrent при смене субтитра.
		// Отдельная очистка на каждом ре-рендере не нужна и только создаёт
		// лишние DOM-запросы на каждом кадре.
	}, [currentTime, bottomThresholdPx, containerRef, subtitles, topPaddingPx])
}

/**
 * Быстро находит индекс блока (subtitle/speechlessBar), соответствующего времени.
 *
 * - Нормальное воспроизведение: O(1) — текущий индекс обычно ещё активен.
 * - Постепенное движение вперёд/назад: линейный скан на несколько шагов.
 * - Перемотка (большой скачок): бинарный поиск O(log n).
 */
function findCurrentSubtitleIdx(params: {
	subtitles: VideoSubtitlesModel.Structure['subtitles']
	timeSeconds: number
	currentIdx: number
}): number {
	const { subtitles, timeSeconds, currentIdx } = params
	const n = subtitles.length
	if (n <= 1) return 0

	let idx = Math.min(Math.max(0, currentIdx), n - 1)
	const cur = subtitles[idx]

	// Fast path: current subtitle is still active.
	if (cur.fromSeconds <= timeSeconds && cur.toSeconds >= timeSeconds) {
		return idx
	}

	// Gradual forward playback: scan ahead a few steps.
	if (timeSeconds > cur.toSeconds) {
		while (idx < n - 1 && subtitles[idx].toSeconds < timeSeconds) idx += 1
		const next = subtitles[idx]
		if (next.fromSeconds <= timeSeconds && next.toSeconds >= timeSeconds) return idx
		// Если линейный скан не попал точно (например, попали в промежуток
		// между блоками) — используем бинарный поиск.
		return binarySearchSubtitleIdx(subtitles, timeSeconds)
	}

	// Gradual backward playback: scan back a few steps.
	if (timeSeconds < cur.fromSeconds) {
		while (idx > 0 && subtitles[idx].fromSeconds > timeSeconds) idx -= 1
		const prev = subtitles[idx]
		if (prev.fromSeconds <= timeSeconds && prev.toSeconds >= timeSeconds) return idx
		return binarySearchSubtitleIdx(subtitles, timeSeconds)
	}

	return idx
}

/**
 * Бинарный поиск первого блока, у которого toSeconds >= timeSeconds.
 * Используется при перемотке — O(log n) вместо линейного O(n).
 */
function binarySearchSubtitleIdx(subtitles: VideoSubtitlesModel.Structure['subtitles'], timeSeconds: number): number {
	let lo = 0
	let hi = subtitles.length - 1

	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2)
		if (subtitles[mid].toSeconds < timeSeconds) {
			lo = mid + 1
		} else {
			hi = mid
		}
	}

	return lo
}

/**
 * Скроллит контейнер так, чтобы текущий элемент был видим, но без "дёрганий".
 *
 * Видимая область под видео делится на две половины:
 * 1. Первая видимая часть (верхняя половина) — безопасная зона.
 *    Если субтитр здесь — скролл не происходит.
 * 2. Вторая видимая часть (нижняя половина) — triggers scroll.
 *
 * В любом случае скролл выравнивает субтитр к верху безопасной зоны
 * (сразу под видео).
 *
 * При первом автоскролле (forceAlignBelowVideo=true) — принудительно
 * ставит субтитр ниже видео без проверок.
 */
function autoScrollToCurrent(params: {
	container: HTMLElement
	currentSubtitleId: number
	bottomThresholdPx: number
	topPaddingPx: number
	forceAlignBelowVideo: boolean
}) {
	const { container, currentSubtitleId, bottomThresholdPx, topPaddingPx, forceAlignBelowVideo } = params

	const currentEl = container.querySelector(`#subtitle-${currentSubtitleId}`) as HTMLElement | null
	if (!currentEl) return

	const scrollContainer = getScrollableParent(container) ?? getScrollableParent(currentEl)
	if (!scrollContainer) {
		scrollWindowToReveal({
			currentEl,
			bottomThresholdPx,
			topPaddingPx,
			forceAlignBelowVideo,
		})
		return
	}

	const containerRect = scrollContainer.getBoundingClientRect()
	const elRect = currentEl.getBoundingClientRect()

	const videoBottom = getStickyVideoBottomPx(container)
	const visibleTop = Math.max(containerRect.top, videoBottom)
	const visibleHeight = containerRect.bottom - visibleTop

	const safeTop = visibleTop + topPaddingPx
	// Середина видимой области субтитров — граница между первой и второй половинами.
	const safeBottom = visibleTop + visibleHeight / 2

	const isAboveSafe = elRect.top < safeTop
	const isBelowSafe = elRect.bottom > safeBottom

	if (!forceAlignBelowVideo && !isAboveSafe && !isBelowSafe) {
		return
	}

	const delta = elRect.top - safeTop
	scrollContainer.scrollTo({ top: scrollContainer.scrollTop + delta, behavior: 'smooth' })
}

/**
 * Ищет ближайшего родителя со скроллом по оси Y.
 * Возвращает `null`, если подходящего контейнера нет.
 */
function getScrollableParent(element: HTMLElement | null) {
	let el: HTMLElement | null = element

	while (el) {
		const style = window.getComputedStyle(el)
		const overflowY = style.overflowY
		const isScrollableOverflow = overflowY === 'auto' || overflowY === 'scroll'
		const canScroll = el.scrollHeight > el.clientHeight

		if (isScrollableOverflow && canScroll) {
			return el
		}

		el = el.parentElement
	}

	return null
}

function scrollWindowToReveal(params: {
	currentEl: HTMLElement
	bottomThresholdPx: number
	topPaddingPx: number
	forceAlignBelowVideo: boolean
}) {
	const { currentEl, bottomThresholdPx, topPaddingPx, forceAlignBelowVideo } = params

	const elRect = currentEl.getBoundingClientRect()

	const videoBottom = getStickyVideoBottomPx(currentEl)
	const visibleHeight = (window.innerHeight || 0) - videoBottom

	const safeTop = videoBottom + topPaddingPx
	// Середина видимой области субтитров — граница между первой и второй половинами.
	const safeBottom = videoBottom + visibleHeight / 2

	const isAboveSafe = elRect.top < safeTop
	const isBelowSafe = elRect.bottom > safeBottom

	if (!forceAlignBelowVideo && !isAboveSafe && !isBelowSafe) return

	const delta = elRect.top - safeTop
	window.scrollBy({ top: delta, behavior: 'smooth' })
}

function getStickyVideoBottomPx(fromEl: HTMLElement): number {
	const doc = fromEl.ownerDocument ?? document
	const root = (fromEl.closest('.root-surface') as HTMLElement | null) ?? doc.documentElement
	const videoEl =
		(root.querySelector('[data-sticky-video]') as HTMLElement | null) ??
		(doc.querySelector('[data-sticky-video]') as HTMLElement | null)
	if (!videoEl) return 0

	const rect = videoEl.getBoundingClientRect()
	if (!Number.isFinite(rect.bottom)) return 0

	// If video is offscreen (e.g. scrolled far away), don't apply offset.
	if (rect.bottom <= 0 || rect.top >= (window.innerHeight || 0)) return 0

	return Math.max(0, Math.min(window.innerHeight || 0, rect.bottom))
}
