import { useWatchingStore } from '_pages/video/watching/watchingStore'
import cn from 'classnames'
import { useLongPress } from 'utils/events'
import { useGetOnWordClick, useGetOnWordLongTap } from './fn/selectSentenceAndWord'
import { useGetIsWordSelected } from './fn/isWordSelected'
import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
import './Word.scss'

type WordProps = {
	subtitle: PopulatedSubtitlesStructure.Subtitle
	sentenceId: number
	wordData: PopulatedSubtitlesStructure.Word
}

function Word(props: WordProps) {
	const { subtitle, sentenceId, wordData } = props
	const deviceType = useWatchingStore((state) => state.deviceType)

	const isWordSelected = useGetIsWordSelected(subtitle.id, sentenceId, wordData.id)
	const onWordClick = useGetOnWordClick()
	const onWordLongTap = useGetOnWordLongTap()

	const { onMouseDown, onMouseUp } = useLongPress({
		onLongPress: () => onWordLongTap(subtitle.id, sentenceId, wordData.id),
		onClick: () => onWordClick(subtitle.id, sentenceId, wordData.id),
		delay: 400,
		vibrate: 50,
	})

	return (
		<span
			className={cn('word', isWordSelected && 'word--selected')}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		>
			<span
				className={cn('word__text', deviceType === 'touch' && 'no-select')}
				onContextMenu={(e) => e.preventDefault()}
			>
				{wordData.value}
			</span>
		</span>
	)
}

export default Word
