import { SentenceModel } from '@/entites/media/repository/SentenceTypes'
import Sentence from '@/entites/sentencesAndSubtitles/Sentence/Sentence'
import { LanguageCode } from '@/shared/utils/languages'
import SentenceAndPhraseTranslationBlock from '../SentenceTranslationBlock/SentenceAndPhraseTranslationBlock'
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
			<SentenceAndPhraseTranslationBlock
				sentenceId={sentence.id}
				languageCode={languageCode}
				bgColor={environmentColor === 'gray' ? 'white' : 'gray'}
			/>
		</div>
	)
}

export default SentenceBlock
