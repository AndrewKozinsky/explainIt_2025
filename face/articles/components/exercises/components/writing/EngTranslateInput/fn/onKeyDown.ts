import React from 'react'
import { exercisesLogic } from '../../../../logic/exercisesLogic'

/** Обработчик ввода текста в поле перевода русского предложения. */
export function useGetOnInput() {
	const changeCurrentExercise = exercisesLogic.useGetChangeCurrentExercise()

	return function (e: React.FormEvent<HTMLTextAreaElement>) {
		const $textInput = e.currentTarget

		changeCurrentExercise({ userTranslate: $textInput.value })
	}
}
