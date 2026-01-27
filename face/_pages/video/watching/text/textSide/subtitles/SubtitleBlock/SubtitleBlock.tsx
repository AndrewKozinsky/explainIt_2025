import cn from 'classnames'
import { PopulatedSubtitlesStructure } from '@/_pages/video/watching/common/populatedSubtitlesStructure'
import { useWatchingStore } from '@/_pages/video/watching/watchingStore'
import { getSentenceStructure } from '_pages/readingAndWatchingCommon/functions/getSentenceStructure'
import SentenceBlock from '_pages/readingAndWatchingCommon/SentenceBlock/SentenceBlock'
import Word from '_pages/readingAndWatchingCommon/Word/Word'
import './SubtitleBlock.scss'

type SubtitleBlockProps = {
	subtitle: PopulatedSubtitlesStructure.Subtitle
	isCurrent: boolean
	// Идентификаторы предложений, которые начинаются в данном субтитре.
	// Если не переданы, компонент отрисует все тексты субтитра; переводы ниже появятся только если есть такие идентификаторы.
	startingSentenceIds?: number[]
}

function SubtitleBlock(props: SubtitleBlockProps) {
	const { subtitle, isCurrent, startingSentenceIds } = props

	const selection = useWatchingStore((s) => s.selection)
	const selectWord = useWatchingStore((s) => s.selectWord)

	return (
		<div className='subtitle-block' data-subtitle-id={subtitle.id}>
			<div className={cn('subtitle-block__subtitle', isCurrent && 'subtitle-block__subtitle--current')}>
				{subtitle.texts.map((sentence) => {
					return (
						<SentenceBlock
							sentenceId={sentence.sentenceId}
							sentenceText={sentence.text}
							selectedSentenceId={selection.sentenceId}
							selectedWordIds={selection.wordIds}
							key={sentence.sentenceId}
							selectWord={selectWord}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default SubtitleBlock
