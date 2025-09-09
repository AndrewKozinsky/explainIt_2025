import React from 'react'
import Button from 'ui/formRelated/buttons/Button/Button'
import Paragraph from 'ui/Paragraph/Paragraph'
import { useGetButtonLogic, useGetParagraphLogic } from './fn/hooks'
import './TranslatePhraseBlock.scss'

function TranslatePhraseBlock() {
	const { isParagraphVisible, paragraphText } = useGetParagraphLogic()
	const { isButtonVisible, buttonText } = useGetButtonLogic()

	return (
		<div className='translate-phrase-block'>
			{isParagraphVisible && (
				<Paragraph fontSize={14} extraClass='translate-phrase-block__hint'>
					{paragraphText}
				</Paragraph>
			)}
			{isButtonVisible && <Button>{buttonText}</Button>}
		</div>
	)
}

export default TranslatePhraseBlock
