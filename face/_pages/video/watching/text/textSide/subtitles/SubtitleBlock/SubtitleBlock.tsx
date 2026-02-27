import { PopulatedSubtitlesStructure } from '@/_pages/video/watching/common/populatedSubtitlesStructure'
import { useWatchingStore } from '@/_pages/video/watching/watchingStore'
import SentenceBlock from '_pages/bookAndVideoCommon/SentenceBlock/SentenceBlock'
import './SubtitleBlock.scss'

type SubtitleBlockProps = {
	subtitle: PopulatedSubtitlesStructure.Subtitle
}

function SubtitleBlock(props: SubtitleBlockProps) {
	const { subtitle } = props

	const selection = useWatchingStore((s) => s.selection)
	const selectWord = useWatchingStore((s) => s.selectWord)

	return (
		<div className='subtitle-block' data-subtitle-id={subtitle.id} id={`subtitle-${subtitle.id}`}>
			<div className='subtitle-block__subtitle'>
				{subtitle.texts.map((sentence) => {
					return (
						<SentenceBlock
							sentenceId={sentence.sentenceId}
							sentenceText={sentence.text}
							selectedSentenceId={selection.sentenceId}
							selectedWordIds={selection.wordIds}
							key={`${subtitle.id}-${sentence.sentenceId}-${sentence.wordOffset}`}
							selectWord={selectWord}
							wordIdOffset={sentence.wordOffset}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default SubtitleBlock
