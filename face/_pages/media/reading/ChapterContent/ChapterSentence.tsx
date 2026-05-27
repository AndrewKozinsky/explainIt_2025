import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { SentenceLoading } from '_pages/media/reading/ChapterContent/SentenceStatus'
import GrammarConceptLinks from '../../commonComponents/GrammarConceptLinks/GrammarConceptLinks'
import SentenceBlock from '../../commonComponents/SentenceBlock/SentenceBlock'
import SentencePhraseAnalysis from '../../detailsBlock/SentencePhraseAnalysis/SentencePhraseAnalysis'
import SentenceTranslationText from '../../detailsBlock/SentenceTranslationText/SentenceTranslationText'
import { ChapterTextStructurePopulated } from '../readingStore'

type ChapterSentenceProps = {
	sentence: ChapterTextStructurePopulated.Sentence
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	languageCode: string
	onFetchGrammarConcepts: (sentenceId: number) => void
	grammarLoading: boolean
}

function ChapterSentence(props: ChapterSentenceProps) {
	const {
		sentence,
		selectedSentenceId,
		selectedWordId,
		selectWord,
		languageCode,
		onFetchGrammarConcepts,
		grammarLoading,
	} = props

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
			<GrammarConceptLinks
				grammarConcepts={sentence.grammarConcepts}
				missingGrammarConcepts={sentence.missingGrammarConcepts}
				loading={grammarLoading}
				onFetch={() => onFetchGrammarConcepts(sentence.id)}
			/>
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
		const entry = findSentenceEntry({ sentences: s.sentences, sentenceId })
		if (!entry || !entry.selectedPhraseId) return null

		return entry.data.phrases.find((p) => p.randomGeneratedPhraseId === entry.selectedPhraseId) ?? null
	})

	if (!sentenceEntry) {
		return null
	}

	return (
		<div className='chapter-content__details'>
			{sentenceEntry.data.sentence.error && <ErrorMessage text={sentenceEntry.data.sentence.error} />}
			{sentenceEntry.data.sentence.translation && (
				<SentenceTranslationText translation={sentenceEntry.data.sentence.translation} bgColor='gray' />
			)}
			{sentenceEntry.data.sentence.loading && <SentenceLoading />}
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
