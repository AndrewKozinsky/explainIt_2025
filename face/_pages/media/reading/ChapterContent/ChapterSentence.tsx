import cn from 'classnames'
import SentenceWordAnalysis from '_pages/media/commonComponents/detailsBlock/SentenceWordAnalysis/SentenceWordAnalysis'
import SentenceBlock from '../../commonComponents/SentenceBlock/SentenceBlock'
import { ChapterTextStructurePopulated } from '../readingStore'
import SentenceTranslationText from './SentenceTranslationText'
import { SentenceWordLoading, SentenceWordNotFound } from './SentenceWordStatus'

type ChapterSentenceProps = {
	sentence: ChapterTextStructurePopulated.Sentence
	selectedSentenceId: null | number
	selectedWordIds: number[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	languageCode: string
}

type SentenceDetailsProps = {
	translation: ChapterTextStructurePopulated.Sentence['translation']
	languageCode: string
}

function ChapterSentence(props: ChapterSentenceProps) {
	const { sentence, selectedSentenceId, selectedWordIds, selectWord, languageCode } = props

	const rootClasses = cn(
		'chapter-content__sentence',
		sentence.translation.isVisible && 'chapter-content__sentence--with-translation',
	)

	return (
		<div className={rootClasses}>
			<SentenceBlock
				sentenceId={sentence.id}
				sentenceText={sentence.sentence}
				selectedSentenceId={selectedSentenceId}
				selectedWordIds={selectedWordIds}
				selectWord={selectWord}
			/>
			<SentenceDetails translation={sentence.translation} languageCode={languageCode} />
		</div>
	)
}

export default ChapterSentence

function SentenceDetails(props: SentenceDetailsProps) {
	const { translation, languageCode } = props

	const detailsClassName = translation.isVisible
		? 'chapter-content__details chapter-content__details--visible'
		: 'chapter-content__details'

	return (
		<div className={detailsClassName}>
			<SentenceTranslationText translation={translation} />
			<SentenceWordLoading translation={translation} />
			<SentenceWordNotFound translation={translation} />
			<SentenceWordAnalysis
				wordAnalysis={translation.wordAnalysis}
				extraClass='chapter-content__word-analysis'
				languageCode={languageCode}
			/>
			<div className='chapter-content__separator' />
		</div>
	)
}
