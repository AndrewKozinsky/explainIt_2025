import React, { useContext } from 'react'
import Button from '@/ui/buttons/Button/Button'
import { ExercisesContext } from '../../../logic/exercisesContext'
import { useGetButtonText, useGetOnButtonClick, useSetEnterKeyHandler } from './fn/buttonFn'

/** Кнопка действия в модальном окне прохождения упражнений */
function BottomButton() {
	const buttonText = useGetButtonText()
	const onButtonClick = useGetOnButtonClick()
	useSetEnterKeyHandler()

	return <Button text={buttonText} onClick={onButtonClick} />
}

export default BottomButton
