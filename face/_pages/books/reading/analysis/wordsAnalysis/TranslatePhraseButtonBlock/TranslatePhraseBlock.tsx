import Button from 'ui/formRelated/buttons/Button/Button'
import { useGetOnButtonClick } from './fn/onButtonClick'
import Paragraph from 'ui/Paragraph/Paragraph'
import { useGetButtonLogic, useGetParagraphLogic } from './fn/hooks'
import './TranslatePhraseBlock.scss'

function TranslatePhraseBlock() {
	const { isParagraphVisible, paragraphText } = useGetParagraphLogic()
	const { isButtonVisible, buttonText } = useGetButtonLogic()
	const onButtonClick = useGetOnButtonClick()

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
