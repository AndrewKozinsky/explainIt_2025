import Button from 'ui/formRelated/buttons/Button/Button'
import { useGetTranslatePhraseAndSentence } from './fn/onButtonClick'
import Paragraph from 'ui/Paragraph/Paragraph'
import { useGetHintVisibilityAndText } from './fn/paragraphVisibilityAndText'
import { useGetButtonVisibilityAndText } from './fn/buttonVisibilityAndText'
import './TranslatePhraseBlock.scss'

function TranslatePhraseBlock() {
	const { isHintVisible, hintText } = useGetHintVisibilityAndText()
	const { isButtonVisible, buttonText } = useGetButtonVisibilityAndText()
	const onButtonClick = useGetTranslatePhraseAndSentence()

	return (
		<div className='translate-phrase-block'>
			{isHintVisible && (
				<Paragraph fontSize={14} extraClass='translate-phrase-block__hint'>
					{hintText}
				</Paragraph>
			)}
			{isButtonVisible && <Button onClick={onButtonClick}>{buttonText}</Button>}
		</div>
	)
}

export default TranslatePhraseBlock
