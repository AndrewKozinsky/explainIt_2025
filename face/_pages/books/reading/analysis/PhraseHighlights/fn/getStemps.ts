import { Sentence, useChapterStore } from '_pages/books/reading/chapterStore'
import React, { useEffect } from 'react'

type ContainerRef = React.RefObject<HTMLDivElement | null>

type Highlight = {
	key: string
	top: number
	left: number
	width: number
	height: number
	classNames: string[]
}

export function useGetHighlights(containerRef: ContainerRef) {
	const { sentence } = useChapterStore.getState()
	const [highlights, setHighlights] = React.useState<Highlight[]>([])

	const computeHighlights = React.useCallback(() => {
		calculateHighlights(containerRef, setHighlights, sentence)
	}, [containerRef, sentence])

	useEffect(() => {
		setTimeout(computeHighlights, 100)
	}, [computeHighlights])

	// Recompute on mount and when dependencies change
	React.useLayoutEffect(() => {
		const onResize = () => computeHighlights()
		window.addEventListener('resize', onResize)

		// Subscribe to store updates in case layout/phrase changes without remount
		const unsubscribe = useChapterStore.subscribe(() => {
			// Defer to next frame to ensure DOM has updated
			requestAnimationFrame(() => computeHighlights())
		})

		return () => {
			window.removeEventListener('resize', onResize)
			if (unsubscribe) unsubscribe()
		}
	}, [computeHighlights])

	return highlights
}

function calculateHighlights(
	containerRef: ContainerRef,
	setHighlights: React.Dispatch<React.SetStateAction<Highlight[]>>,
	sentence: Sentence,
) {
	const root = containerRef.current?.closest('.analysis-sentence') as HTMLElement | null
	if (!root || !sentence) {
		setHighlights([])
		return
	}

	const containerRect = root.getBoundingClientRect()
	const wordNodes = Array.from(root.querySelectorAll<HTMLElement>('.analysis-sentence__word'))

	// Build maps for word id -> element and order index in sentence
	const wordOrder: Record<number, number> = {}
	let order = 0
	for (const part of sentence.parts || []) {
		if (part.type === 'word') {
			order += 1
			wordOrder[part.id] = order
		}
	}

	const wordElById: Record<number, HTMLElement> = {}
	for (const el of wordNodes) {
		const idAttr = el.getAttribute('data-word-id')
		if (!idAttr) continue
		const id = Number(idAttr)
		if (!Number.isFinite(id)) continue
		wordElById[id] = el
	}

	const allHighlights: Highlight[] = []

	const phrases = sentence.phrases || []
	for (const phrase of phrases) {
		const wordIds: number[] = (phrase.wordIds || [])
			.filter((id: any) => Number.isFinite(Number(id)))
			.map((id: any) => Number(id))
			.filter((id: number) => !!wordElById[id])

		if (wordIds.length === 0) continue

		// Sort by sentence order (visual/reading order)
		wordIds.sort((a, b) => (wordOrder[a] || 0) - (wordOrder[b] || 0))

		// Break into contiguous runs (by order index being consecutive)
		const runs: number[][] = []
		let currentRun: number[] = []
		for (let i = 0; i < wordIds.length; i++) {
			const id = wordIds[i]
			if (currentRun.length === 0) {
				currentRun.push(id)
			} else {
				const prev = currentRun[currentRun.length - 1]
				if ((wordOrder[id] || 0) === (wordOrder[prev] || 0) + 1) {
					currentRun.push(id)
				} else {
					runs.push(currentRun)
					currentRun = [id]
				}
			}
		}
		if (currentRun.length > 0) runs.push(currentRun)

		const isCurrent = sentence.currentPhraseId === phrase.id

		// For each contiguous run, we may still need to split across lines
		for (let ri = 0; ri < runs.length; ri++) {
			const run = runs[ri]
			// Build line segments by comparing top positions
			type SegmentWord = { id: number; rect: DOMRect }
			const segmentWords: SegmentWord[] = run.map((id) => ({
				id,
				rect: wordElById[id].getBoundingClientRect(),
			}))
			// Sort by top then left to ensure stable segments
			segmentWords.sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left)

			const lineSegments: SegmentWord[][] = []
			let currentSeg: SegmentWord[] = []
			const sameLine = (r1: DOMRect, r2: DOMRect) => Math.abs(r1.top - r2.top) < 2 // 2px tolerance

			for (let i = 0; i < segmentWords.length; i++) {
				const w = segmentWords[i]
				if (currentSeg.length === 0) {
					currentSeg.push(w)
				} else {
					const prev = currentSeg[currentSeg.length - 1]
					if (sameLine(prev.rect, w.rect)) {
						currentSeg.push(w)
					} else {
						lineSegments.push(currentSeg)
						currentSeg = [w]
					}
				}
			}
			if (currentSeg.length > 0) lineSegments.push(currentSeg)

			// Determine rounding classes per line segment
			for (let si = 0; si < lineSegments.length; si++) {
				const seg = lineSegments[si]
				const left = Math.min(...seg.map((w) => w.rect.left)) - containerRect.left
				const right = Math.max(...seg.map((w) => w.rect.right)) - containerRect.left
				const top = seg[0].rect.top - containerRect.top
				const height = seg[0].rect.height
				const width = Math.max(0, right - left)

				const classNames: string[] = ['phrase-highlight']
				if (isCurrent) classNames.push('phrase-highlight--current')

				const runsCount = runs.length
				if (runsCount === 1) {
					// Single contiguous run for the phrase
					if (lineSegments.length === 1) {
						// Entire phrase fits on one line
						classNames.push('phrase-highlight--both-round')
					} else {
						// Multi-line within a single run
						if (si === 0) {
							classNames.push('phrase-highlight--left-round')
						} else if (si === lineSegments.length - 1) {
							classNames.push('phrase-highlight--right-round')
						} else {
							classNames.push('phrase-highlight--no-round')
						}
					}
				} else {
					// Multiple runs in the phrase (e.g., [1,2] and [5])
					const isFirstRun = ri === 0
					const isLastRun = ri === runsCount - 1

					if (isFirstRun) {
						// First run should have the left rounding on its left-most segment
						if (si === 0) {
							classNames.push('phrase-highlight--left-round')
						} else {
							classNames.push('phrase-highlight--no-round')
						}
					} else if (isLastRun) {
						// Last run should have the right rounding on its right-most segment
						if (si === lineSegments.length - 1) {
							classNames.push('phrase-highlight--right-round')
						} else {
							classNames.push('phrase-highlight--no-round')
						}
					} else {
						// Middle runs: no rounding
						classNames.push('phrase-highlight--no-round')
					}
				}

				allHighlights.push({
					key: `p${phrase.id}-run-${run[0]}-${run[run.length - 1]}-seg-${si}`,
					top,
					left,
					width,
					height,
					classNames,
				})
			}
		}
	}

	setHighlights(allHighlights)
}
