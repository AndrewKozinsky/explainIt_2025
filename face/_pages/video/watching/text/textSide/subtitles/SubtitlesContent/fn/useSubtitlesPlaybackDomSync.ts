import { RefObject, useEffect, useRef } from 'react'
import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
import { useWatchingStore } from '_pages/video/watching/watchingStore'

type UseSubtitlesPlaybackDomSyncParams = {
	containerRef: RefObject<HTMLElement | null>
	subtitles: PopulatedSubtitlesStructure.Structure['subtitles']
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
 * @param params.bottomThresholdPx - насколько близко к низу считать "не видно"
 * @param params.topPaddingPx - отступ сверху при автоскролле
 */
export function useSubtitlesPlaybackDomSync(params: UseSubtitlesPlaybackDomSyncParams) {
	const { containerRef, subtitles, bottomThresholdPx = 40, topPaddingPx = 20 } = params

	const currentSubtitleIdxRef = useRef(0)
	const currentSubtitleIdRef = useRef<number | null>(null)

	useEffect(() => {
		if (!subtitles?.length) {
			return
		}

		currentSubtitleIdxRef.current = Math.min(Math.max(0, currentSubtitleIdxRef.current), subtitles.length - 1)
		currentSubtitleIdRef.current = null

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
			})
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

		sync(useWatchingStore.getState().player.currentTime)

		const unsubscribe = useWatchingStore.subscribe((state, prevState) => {
			const t = state.player.currentTime
			const prevT = prevState.player.currentTime
			if (t === prevT) return
			sync(t)
		})

		return () => {
			unsubscribe()

			const container = containerRef.current
			if (!container) return

			const prevId = currentSubtitleIdRef.current
			if (prevId == null) return

			const prevEl = container.querySelector(`#subtitle-${prevId}`) as HTMLElement | null
			if (!prevEl) return

			const prevSubtitleInner = prevEl.querySelector('.subtitle-block__subtitle') as HTMLElement | null
			prevSubtitleInner?.classList.remove('subtitle-block__subtitle--current')
			prevEl.classList.remove('speechless-bar--active')
		}
	}, [bottomThresholdPx, containerRef, subtitles, topPaddingPx])
}

/**
 * Быстро находит индекс блока (subtitle/speechlessBar), соответствующего времени.
 * Оптимизировано под типичный кейс воспроизведения (время растёт постепенно),
 * при этом корректно обрабатывает перемотку назад.
 */
function findCurrentSubtitleIdx(params: {
	subtitles: PopulatedSubtitlesStructure.Structure['subtitles']
	timeSeconds: number
	currentIdx: number
}): number {
	const { subtitles, timeSeconds, currentIdx } = params
	const n = subtitles.length
	if (n <= 1) return 0

	let idx = Math.min(Math.max(0, currentIdx), n - 1)
	let cur = subtitles[idx]

	if (cur.fromSeconds <= timeSeconds && cur.toSeconds >= timeSeconds) {
		return idx
	}

	// Common case: time increases gradually during playback.
	if (timeSeconds > cur.toSeconds) {
		while (idx < n - 1 && subtitles[idx].toSeconds < timeSeconds) idx += 1
		cur = subtitles[idx]
		if (cur.fromSeconds <= timeSeconds && cur.toSeconds >= timeSeconds) return idx
	}

	// Seek backwards.
	if (timeSeconds < cur.fromSeconds) {
		while (idx > 0 && subtitles[idx].fromSeconds > timeSeconds) idx -= 1
		cur = subtitles[idx]
		if (cur.fromSeconds <= timeSeconds && cur.toSeconds >= timeSeconds) return idx
	}

	// Fallback: move forward until the first block that ends after timeSeconds.
	while (idx < n - 1 && subtitles[idx].toSeconds < timeSeconds) idx += 1
	return idx
}

/**
 * Скроллит контейнер так, чтобы текущий элемент был видим, но без "дёрганий":
 * если элемент уже в пределах видимой области — ничего не делает.
 */
function autoScrollToCurrent(params: {
	container: HTMLElement
	currentSubtitleId: number
	bottomThresholdPx: number
	topPaddingPx: number
}) {
	const { container, currentSubtitleId, bottomThresholdPx, topPaddingPx } = params

	const currentEl = container.querySelector(`#subtitle-${currentSubtitleId}`) as HTMLElement | null
	if (!currentEl) return

	const scrollContainer = getScrollableParent(container) ?? getScrollableParent(currentEl)
	if (!scrollContainer) {
		currentEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
		return
	}

	const containerRect = scrollContainer.getBoundingClientRect()
	const elRect = currentEl.getBoundingClientRect()

	const isAbove = elRect.top < containerRect.top
	const isBelow = elRect.bottom > containerRect.bottom - bottomThresholdPx

	if (!isAbove && !isBelow) {
		return
	}

	const top = scrollContainer.scrollTop + (elRect.top - containerRect.top) - topPaddingPx
	scrollContainer.scrollTo({ top, behavior: 'smooth' })
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
