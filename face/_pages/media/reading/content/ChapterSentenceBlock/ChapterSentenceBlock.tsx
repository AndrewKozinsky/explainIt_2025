import { LanguageCode } from 'utils/utils'
import SentenceTranslation from '_pages/media/detailsBlock/sentenceTranslation/SentenceTranslation/SentenceTranslation'
import SentenceBlock from '../../../commonComponents/SentenceBlock/SentenceBlock'
import { ChapterTextStructurePopulated } from '../../readingStore'
import PhraseDetails from '../PhraseDetails/PhraseDetails'
import SentenceTools from '../tools/SentenceTools/SentenceTools'
import './ChapterSentenceBlock.scss'

type ChapterSentenceProps = {
	sentence: ChapterTextStructurePopulated.Sentence
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	languageCode: LanguageCode
}

function ChapterSentenceBlock(props: ChapterSentenceProps) {
	const { sentence, selectedSentenceId, selectedWordId, selectWord, languageCode } = props

	return (
		<div className='chapter-sentence-block'>
			<SentenceBlock
				sentenceId={sentence.id}
				sentenceText={sentence.sentence}
				selectedSentenceId={selectedSentenceId}
				selectedWordId={selectedWordId}
				selectWord={selectWord}
			/>
			<SentenceTools sentence={sentence} />
			<SentenceTranslation sentenceId={sentence.id} />
			<PhraseDetails sentenceId={sentence.id} languageCode={languageCode} />
		</div>
	)
}

export default ChapterSentenceBlock
