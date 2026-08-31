import { LanguageCode } from '@/shared/utils/languages'
import PhraseDetails from '../PhraseDetails/PhraseDetails'
import SentenceTranslation from '../sentenceTranslation/SentenceTranslation/SentenceTranslation'
import './SentenceAndPhraseTranslationBlock.scss'

type SentenceAndPhraseTranslationBlockProps = {
	sentenceId: number
	languageCode: LanguageCode
	bgColor: 'white' | 'gray'
}

function SentenceAndPhraseTranslationBlock(props: SentenceAndPhraseTranslationBlockProps) {
	const { sentenceId, languageCode, bgColor } = props

	return (
		<>
			<div className='sentence-and-phrasetranslation-block__translation'>
				<SentenceTranslation sentenceId={sentenceId} bgColor={bgColor} />
			</div>
			<div className='sentence-and-phrase-translation-block__phrase'>
				<PhraseDetails sentenceId={sentenceId} languageCode={languageCode} />
			</div>
		</>
	)
}

export default SentenceAndPhraseTranslationBlock
