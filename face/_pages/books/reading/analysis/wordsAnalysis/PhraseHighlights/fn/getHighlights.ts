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
	const { selectedSentence } = useChapterStore.getState()
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
	// Write code here...
}
