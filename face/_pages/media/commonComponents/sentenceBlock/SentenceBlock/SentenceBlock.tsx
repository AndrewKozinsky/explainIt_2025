import { LanguageCode } from 'utils/languages'
import { ChapterTextStructurePopulated } from '@/_pages/media/reading/readingStore'
import PhraseDetails from '../PhraseDetails/PhraseDetails'
import Sentence from '../Sentence/Sentence'
import SentenceTranslation from '../sentenceTranslation/SentenceTranslation/SentenceTranslation'
import SentenceTools from '../tools/SentenceTools/SentenceTools'
import './SentenceBlock.scss'

type ChapterSentenceProps = {
	sentence: ChapterTextStructurePopulated.Sentence
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	languageCode: LanguageCode
	environmentColor: 'white' | 'gray'
}

function SentenceBlock(props: ChapterSentenceProps) {
	const { sentence, selectedSentenceId, selectedWordId, selectWord, languageCode, environmentColor } = props

	return (
		<div className='sentence-block'>
			<Sentence
				sentenceId={sentence.id}
				sentenceText={sentence.sentence}
				selectedSentenceId={selectedSentenceId}
				selectedWordId={selectedWordId}
				selectWord={selectWord}
			/>
			<div className='sentence-block__tools'>
				<SentenceTools sentence={sentence} />
			</div>
			<div className='sentence-block__translation'>
				<SentenceTranslation
					sentenceId={sentence.id}
					bgColor={environmentColor === 'gray' ? 'white' : 'gray'}
				/>
			</div>
			<div className='sentence-block__phase'>
				<PhraseDetails sentenceId={sentence.id} languageCode={languageCode} />
			</div>
		</div>
	)
}

export default SentenceBlock
