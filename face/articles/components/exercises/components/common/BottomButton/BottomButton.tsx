import React from 'react'
import ExerciseButton from '@/ui/formRelated/buttons/ExerciseButton/ExerciseButton'
import { useGetButtonText, useGetCheckTranslationOrMoveToAnotherExercise } from './fn/buttonFn'

/** Кнопка действия в модальном окне прохождения упражнений */
function BottomButton() {
	const buttonText = useGetButtonText()
	const onButtonClick = useGetCheckTranslationOrMoveToAnotherExercise()

	return <ExerciseButton text={buttonText} onClick={onButtonClick} data-testid='exercise-action-button' />
}

export default BottomButton
