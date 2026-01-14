import { useLongPress } from 'utils/events'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { EMPTY_WORD_IDS, WordProps } from './types'

export function useWord(props: WordProps) {
	const deviceType = useWatchingStore((state) => state.deviceType)
	const changeWordsAddingMode = useWatchingStore((state) => state.changeWordsAddingMode)

	const updateSelectedPlainText = useWatchingStore((state) => state.updateSelectedPlainText)
	const updateSelectedSubtitle = useWatchingStore((state) => state.updateSelectedSubtitle)

	const plainSelectedSentenceId = useWatchingStore((state) => state.populatedPlainText?.selected?.sentenceId ?? null)
	const plainSelectedWordIds = useWatchingStore(
		(state) => state.populatedPlainText?.selected?.wordIds ?? EMPTY_WORD_IDS,
	)
	const subtitlesSelectedSentenceId = useWatchingStore(
		(state) => state.populatedSubtitles?.selected?.sentenceId ?? null,
	)
	const subtitlesSelectedWordIds = useWatchingStore(
		(state) => state.populatedSubtitles?.selected?.wordIds ?? EMPTY_WORD_IDS,
	)

	const isSelected =
		props.contentType === 'plainText'
			? plainSelectedSentenceId === props.sentenceId && plainSelectedWordIds.includes(props.wordId)
			: subtitlesSelectedSentenceId === props.sentenceId && subtitlesSelectedWordIds.includes(props.wordId)

	function handleClick() {
		if (props.contentType === 'plainText') {
			updateSelectedPlainText(props.sentenceId, props.wordId)
		} else {
			updateSelectedSubtitle(props.sentenceId, props.wordId)
		}
	}

	function handleLongPress() {
		if (deviceType !== 'touch') return
		changeWordsAddingMode(true)
		handleClick()
		changeWordsAddingMode(false)
	}

	const { onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel } = useLongPress(
		{
			onLongPress: handleLongPress,
			onClick: handleClick,
			delay: 400,
			vibrate: 50,
			getScrollContainer: (e) => (e.currentTarget as HTMLElement).closest('.watching-text-side__content'),
		},
	)

	return {
		deviceType,
		isSelected,
		handlers: {
			onMouseDown,
			onMouseUp,
			onMouseLeave,
			onTouchStart,
			onTouchMove,
			onTouchEnd,
			onTouchCancel,
		},
	}
}
