import React from 'react'
import { exercisesLogic } from '../../../../logic/exercisesLogic'

/** Обработчик ввода текста в поле перевода русского предложения. */
export function useGetOnInput() {
	const changeCurrentExercise = exercisesLogic.useGetChangeCurrentExercise()

	return function (e: React.KeyboardEvent<HTMLTextAreaElement>) {
		const $textInput = e.target as HTMLTextAreaElement

		changeCurrentExercise({ userTranslate: $textInput.value })
	}
}
