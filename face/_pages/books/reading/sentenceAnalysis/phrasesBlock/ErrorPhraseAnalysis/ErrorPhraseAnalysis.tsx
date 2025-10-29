import { useGetSelectedSentence } from '_pages/books/reading/logic'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import Paragraph from 'ui/Paragraph/Paragraph'
import { useGetPhraseData } from './fn/getPhraseData'
import PhraseAnalysisPhrase from '../PhraseAnalysisPhrase/PhraseAnalysisPhrase'
import { TranslatePhraseButton } from '../../translateButtonsBlock/TranslatePhraseButton/TranslatePhraseButton'
import './ErrorPhraseAnalysis.scss'

type ErrorPhraseAnalysisProps = {
	phrase: ChapterTextStructurePopulated.ErrorPhrase
}

function ErrorPhraseAnalysis(props: ErrorPhraseAnalysisProps) {
	const { phrase } = props

	const sentence = useGetSelectedSentence()
	const phraseData = useGetPhraseData(phrase)

	return (
		<div className='phrase-analysis-error'>
			<PhraseAnalysisPhrase>{phraseData.phraseText}</PhraseAnalysisPhrase>
			<Paragraph fontSize={14} extraClass='phrase-analysis-error__error-text'>
				{phraseData.errorMessage}
			</Paragraph>
			<TranslatePhraseButton sentenceId={sentence.id} phraseWordIds={phrase.wordIds} />
		</div>
	)
}

export default ErrorPhraseAnalysis
