import { useGetTranslateSentencesButtonDetails } from './fn/translateSentences'
import React from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Button from 'ui/formRelated/buttons/Button/Button'
import './TranslateSentences.scss'

function TranslateSentences() {
	const { onButtonClick, isButtonDisabled, isButtonVisible, error } = useGetTranslateSentencesButtonDetails()
	if (!isButtonVisible) return null

	return (
		<div className='translate-sentences'>
			{error && <ErrorMessage text={error} />}
			<Button disabled={isButtonDisabled} onClick={onButtonClick} loading={isButtonDisabled}>
				Перевести предложения
			</Button>
		</div>
	)
}

export default TranslateSentences
