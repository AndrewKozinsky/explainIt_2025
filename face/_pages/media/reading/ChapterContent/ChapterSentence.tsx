import { findCoveringPhrase, findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import SentenceBlock from '../../commonComponents/SentenceBlock/SentenceBlock'
import SentencePhraseAnalysis from '../../detailsBlock/SentencePhraseAnalysis/SentencePhraseAnalysis'
import SentenceTranslationText from '../../detailsBlock/SentenceTranslationText/SentenceTranslationText'
import { ChapterTextStructurePopulated } from '../readingStore'
import { SentenceWordLoading } from './SentenceWordStatus'

type ChapterSentenceProps = {
	sentence: ChapterTextStructurePopulated.Sentence
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	languageCode: string
}

function ChapterSentence(props: ChapterSentenceProps) {
	const { sentence, selectedSentenceId, selectedWordId, selectWord, languageCode } = props

	return (
		<div className='chapter-content__sentence'>
			<SentenceBlock
				sentenceId={sentence.id}
				sentenceText={sentence.sentence}
				selectedSentenceId={selectedSentenceId}
				selectedWordId={selectedWordId}
				selectWord={selectWord}
			/>
			<SentenceDetails sentenceId={sentence.id} languageCode={languageCode} />
		</div>
	)
}

export default ChapterSentence

type SentenceDetailsProps = {
	sentenceId: number
	languageCode: string
}

function SentenceDetails(props: SentenceDetailsProps) {
	const { sentenceId, languageCode } = props

	const sentenceEntry = useDetailsStore(function (s) {
		return findSentenceEntry({ sentences: s.sentences, sentenceId })
	})

	const coveringPhrase = useDetailsStore(function (s) {
		if (s.currentSentenceId !== sentenceId) return null

		const entry = findSentenceEntry({ sentences: s.sentences, sentenceId })
		if (!entry) return null

		return findCoveringPhrase({
			phrases: entry.data.phrases,
			startOffset: s.currentWordStartOffset,
			endOffset: s.currentWordEndOffset,
		})
	})

	if (!sentenceEntry) {
		return null
	}

	return (
		<div className='chapter-content__details'>
			{sentenceEntry.data.sentence.translation && (
				<SentenceTranslationText translation={sentenceEntry.data.sentence.translation} bgColor='gray' />
			)}
			{sentenceEntry.data.sentence.loading && <SentenceWordLoading />}
			{coveringPhrase && (
				<SentencePhraseAnalysis
					phraseAnalysis={coveringPhrase}
					extraClass='chapter-content__word-analysis'
					languageCode={languageCode}
				/>
			)}
			<div className='chapter-content__separator' />
		</div>
	)
}
