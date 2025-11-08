// import { useGetSelectedSentence } from '_pages/books/reading/logic'
// import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'

// type ContainerRef = React.RefObject<HTMLDivElement | null>

/*export type Highlight = {
	key: string
	top: number
	left: number
	width: number
	height: number
	classNames: string[]
}*/

// External paddings to enlarge highlight rectangle around a word
/*export const WORD_HIGHLIGHT_PADDING = {
	left: 2,
	right: 2,
	top: 0,
	bottom: 0,
}*/

/*export function useGetHighlights(containerRef: ContainerRef): Highlight[] {
	const selectedSentence = useGetSelectedSentence()
	const [highlights, setHighlights] = useState<Highlight[]>([])

	const phraseList = useMemo(() => selectedSentence?.phrases ?? [], [selectedSentence])

	const measure = useCallback(() => {
		const container = containerRef.current
		if (!container || !selectedSentence) {
			setHighlights([])
			return
		}

		const root: HTMLElement | null = container.closest('.analysis-sentence') as HTMLElement | null
		if (!root) {
			setHighlights([])
			return
		}

		const containerRect = container.getBoundingClientRect()

		const newHighlights: Highlight[] = []

		phraseList.forEach((phrase, phraseIdx) => {
			let classNames = ['word-highlight']
			if (phrase.type === 'idle') {
				classNames = ['word-highlight--idle']
			}

			phrase.wordIds.forEach((wordId, wordIdx) => {
				const el = root.querySelector<HTMLElement>(`.analysis-sentence__word[data-word-id="${wordId}"]`)
				if (!el) {
					return
				}
				const rect = el.getBoundingClientRect()
				const left = rect.left - containerRect.left - WORD_HIGHLIGHT_PADDING.left
				const top = rect.top - containerRect.top - WORD_HIGHLIGHT_PADDING.top
				const width = rect.width + WORD_HIGHLIGHT_PADDING.left + WORD_HIGHLIGHT_PADDING.right
				const height = rect.height + WORD_HIGHLIGHT_PADDING.top + WORD_HIGHLIGHT_PADDING.bottom

				newHighlights.push({
					key: `${phraseIdx}-${wordIdx}-${wordId}`,
					left,
					top,
					width,
					height,
					classNames,
				})
			})
		})

		setHighlights(newHighlights)
	}, [containerRef, phraseList, selectedSentence])

	useLayoutEffect(() => {
		measure()
		function onResize() {
			measure()
		}
		window.addEventListener('resize', onResize)
		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [measure])

	return highlights
}*/
