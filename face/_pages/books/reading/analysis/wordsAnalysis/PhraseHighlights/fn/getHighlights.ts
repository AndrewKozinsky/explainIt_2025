import { Sentence, useReadingStore } from '_pages/books/reading/readingStore'
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
	const selectedSentence = useReadingStore.getState().selectedSentence
	const [highlights, setHighlights] = React.useState<Highlight[]>([])

	const computeHighlights = React.useCallback(() => {
		calculateHighlights(containerRef, setHighlights, selectedSentence)
	}, [containerRef, selectedSentence])

	useEffect(() => {
		setTimeout(computeHighlights, 100)
	}, [computeHighlights])

	// Recompute on mount and when dependencies change
	React.useLayoutEffect(() => {
		const onResize = () => computeHighlights()
		window.addEventListener('resize', onResize)

		// Subscribe to store updates in case layout/phrase changes without remount
		const unsubscribe = useReadingStore.subscribe(() => {
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
	const container = containerRef.current
	if (!container || !sentence) {
		setHighlights([])
		return
	}

	const containerRect = container.getBoundingClientRect()

	// Find the sentence element that contains the word spans
	const rootEl = container.parentElement
	if (!rootEl) {
		setHighlights([])
		return
	}

	const wordEls = Array.from(
		rootEl.querySelectorAll<HTMLElement>('.analysis-sentence_sentence .analysis-sentence__word'),
	)

	if (!wordEls.length) {
		setHighlights([])
		return
	}

	// Build word index by id according to sentence order (only words)
	const orderedWordIds = sentence.sentence.filter((p) => p.type === 'word').map((p: any) => p.id as number)

	const idToOrderIndex = new Map<number, number>()
	orderedWordIds.forEach((id, idx) => idToOrderIndex.set(id, idx))

	// Measure DOM rects for each word id
	const idToRect = new Map<number, { top: number; left: number; width: number; height: number; rowKey: number }>()
	for (const el of wordEls) {
		const idAttr = el.getAttribute('data-word-id')
		if (!idAttr) continue
		const id = Number(idAttr)
		const rect = el.getBoundingClientRect()
		const top = rect.top - containerRect.top
		const left = rect.left - containerRect.left
		const width = rect.width
		const height = rect.height
		// Use a rounded row key to group elements on the same visual line
		const rowKey = Math.round(top)
		idToRect.set(id, { top, left, width, height, rowKey })
	}

	const highlights: Highlight[] = []

	function addHighlightSegment(
		key: string,
		segment: { top: number; left: number; width: number; height: number },
		classes: string[],
	) {
		highlights.push({
			key,
			top: segment.top,
			left: segment.left,
			width: segment.width,
			height: segment.height,
			classNames: classes,
		})
	}

	function buildHighlightsForGroup(groupKey: string, wordIds: number[], extraClasses: string[] = []) {
		// Filter to ids that we can measure and sort by sentence order
		const filteredIds = wordIds
			.filter((id) => idToRect.has(id))
			.sort((a, b) => idToOrderIndex.get(a)! - idToOrderIndex.get(b)!)

		if (filteredIds.length === 0) return

		// Group by visual row
		const byRow = new Map<number, number[]>()
		for (const id of filteredIds) {
			const rowKey = idToRect.get(id)!.rowKey
			if (!byRow.has(rowKey)) byRow.set(rowKey, [])
			byRow.get(rowKey)!.push(id)
		}

		for (const [rowKey, idsOnRow] of Array.from(byRow.entries()).sort((a, b) => a[0] - b[0])) {
			// Split idsOnRow into contiguous runs by sentence order
			const runs: number[][] = []
			let currentRun: number[] = []
			for (let i = 0; i < idsOnRow.length; i++) {
				const id = idsOnRow[i]
				if (currentRun.length === 0) {
					currentRun.push(id)
					continue
				}
				const prevId = currentRun[currentRun.length - 1]
				const prevIdx = idToOrderIndex.get(prevId)!
				const currIdx = idToOrderIndex.get(id)!
				if (currIdx === prevIdx + 1) {
					currentRun.push(id)
				} else {
					runs.push(currentRun)
					currentRun = [id]
				}
			}
			if (currentRun.length) runs.push(currentRun)

			// Create a merged highlight per run
			runs.forEach((run, runIdx) => {
				const firstRect = idToRect.get(run[0])!
				const lastRect = idToRect.get(run[run.length - 1])!
				const top = firstRect.top
				const height = firstRect.height
				const left = Math.min(firstRect.left, lastRect.left)
				const right = Math.max(firstRect.left + firstRect.width, lastRect.left + lastRect.width)
				const width = right - left
				addHighlightSegment(`${groupKey}-row${rowKey}-run${runIdx}`, { top, left, width, height }, [
					'phrase-highlight',
					'phrase-highlight--both-round',
					...extraClasses,
				])
			})
		}
	}

	// Translated phrases
	for (const phrase of sentence.translatedPhrases || []) {
		buildHighlightsForGroup(`phrase-${phrase.id}`, phrase.wordIds)
	}

	// Currently selected words (single group) with additional class
	if (sentence.selectedWordIds && sentence.selectedWordIds.length) {
		buildHighlightsForGroup('current', sentence.selectedWordIds, ['phrase-highlight--current'])
	}

	setHighlights(highlights)
}
