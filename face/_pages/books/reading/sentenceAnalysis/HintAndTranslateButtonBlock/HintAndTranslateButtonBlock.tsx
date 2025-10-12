import { useGetIdlePhraseFromSelectedSentence, useGetSelectedSentence } from '_pages/books/reading/logic'
import { TranslatePhraseButton } from '_pages/books/reading/sentenceAnalysis/TranslatePhraseButton/TranslatePhraseButton'
import Paragraph from 'ui/Paragraph/Paragraph'
import { useGetHintText, useGetHintVisibility } from './fn/paragraphVisibilityAndText'
import { useIsButtonVisible } from './fn/buttonVisibilityAndText'
import './HintAndTranslateButtonBlock.scss'

function HintAndTranslateButtonBlock() {
	const selectedSentence = useGetSelectedSentence()
	const idlePhrase = useGetIdlePhraseFromSelectedSentence()

	const isHintVisible = useGetHintVisibility()
	const hintText = useGetHintText()
	const isButtonVisible = useIsButtonVisible()

	return (
		<div className='translate-phrase-block'>
			{isHintVisible && (
				<Paragraph fontSize={14} extraClass='translate-phrase-block__hint'>
					{hintText}
				</Paragraph>
			)}
			{isButtonVisible && idlePhrase && (
				<TranslatePhraseButton sentenceId={selectedSentence.id} phraseWordIds={idlePhrase.wordIds} />
			)}
		</div>
	)
}

export default HintAndTranslateButtonBlock
