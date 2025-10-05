import Button from 'ui/formRelated/buttons/Button/Button'
import { useGetTranslatePhraseAndSentence } from './fn/onButtonClick'
import Paragraph from 'ui/Paragraph/Paragraph'
import { useGetParagraphVisibilityAndText } from '_pages/books/reading/analysis/wordsAnalysis/TranslatePhraseButtonBlock/fn/paragraphVisibilityAndText'
import { useGetButtonVisibilityAndText } from './fn/buttonVisibilityAndText'
import './TranslatePhraseBlock.scss'

function TranslatePhraseBlock() {
	const { isParagraphVisible, paragraphText } = useGetParagraphVisibilityAndText()
	const { isButtonVisible, buttonText } = useGetButtonVisibilityAndText()
	const onButtonClick = useGetTranslatePhraseAndSentence()

	return (
		<div className='translate-phrase-block'>
			{isParagraphVisible && (
				<Paragraph fontSize={14} extraClass='translate-phrase-block__hint'>
					{paragraphText}
				</Paragraph>
			)}
			{isButtonVisible && <Button onClick={onButtonClick}>{buttonText}</Button>}
		</div>
	)
}

export default TranslatePhraseBlock
