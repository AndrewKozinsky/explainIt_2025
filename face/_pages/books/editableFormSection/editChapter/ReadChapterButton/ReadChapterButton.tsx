import React from 'react'
import Button from '../../../../../ui/formRelated/buttons/Button/Button'
import { useGetOnReadButtonClick, useIsReadButtonDisabled } from './fn/buttonLogic'

function ReadChapterButton() {
	const isButtonDisabled = useIsReadButtonDisabled()
	const onButtonClick = useGetOnReadButtonClick()

	return (
		<Button onClick={onButtonClick} disabled={isButtonDisabled}>
			Читать
		</Button>
	)
}

export default ReadChapterButton
