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

	// Достаём предложения с переводами из Хранилища
	// const sentences = useWatchingStore((s) => s.populatedSubtitles.sentences)

	// Готовим переводы для предложений, которые начинаются в этом субтитре
	/*const translationsToRender = useMemo(() => {
		if (!startingSentenceIds || startingSentenceIds.length === 0) return [] as string[]
		const byId = new Map<number, { translation?: string }>(sentences.map((s) => [s.id, s]))

		return startingSentenceIds
			.map((id) => byId.get(id)?.translation?.trim())
			.filter((t): t is string => !!t && t.length > 0)
	}, [sentences, startingSentenceIds])*/

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
					/*const sentenceStructure = getSentenceStructure(text.text)

					return sentenceStructure.map((part) => {
						if (part.isWord) {
							return <Word text={part.value} key={part.id} />
						}

						return part.value
					})*/
				})}
			</div>
			{/*{translationsToRender.length && (
				<p className='subtitle-block__translation'>{translationsToRender.join(' ')}</p>
			)}*/}
		</div>
	)
}

export default SubtitleBlock
