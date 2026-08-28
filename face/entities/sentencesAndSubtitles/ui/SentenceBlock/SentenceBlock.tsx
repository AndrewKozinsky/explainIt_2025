import { SentenceModel } from '@/entities/media/repository/SentenceTypes'
import { LanguageCode } from '@/shared/utils/languages'
// import SentenceAndPhraseTranslationBlock from '../SentenceTranslationBlock/SentenceAndPhraseTranslationBlock'
import Sentence from '../Sentence/Sentence'
import './SentenceBlock.scss'

type ChapterSentenceProps = {
	sentence: SentenceModel
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
			{/*<SentenceAndPhraseTranslationBlock
				sentenceId={sentence.id}
				languageCode={languageCode}
				bgColor={environmentColor === 'gray' ? 'white' : 'gray'}
			/>*/}
		</div>
	)
}

export default SentenceBlock
