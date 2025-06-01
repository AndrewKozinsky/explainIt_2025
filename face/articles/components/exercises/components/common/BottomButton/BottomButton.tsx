import React from 'react'
import Button from '@/ui/buttons/Button/Button'
import { useGetButtonText, useGetCheckTranslationOrMoveToAnotherExercise } from './fn/buttonFn'

/** Кнопка действия в модальном окне прохождения упражнений */
function BottomButton() {
	const buttonText = useGetButtonText()
	const onButtonClick = useGetCheckTranslationOrMoveToAnotherExercise()

	return <Button text={buttonText} onClick={onButtonClick} data-testid='exercise-action-button' />
}

export default BottomButton
