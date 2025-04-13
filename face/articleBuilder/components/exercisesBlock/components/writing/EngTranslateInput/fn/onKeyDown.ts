import React, { useCallback, useContext } from 'react'
import { ExercisesContext } from '../../../../exercisesContext/exercisesContext'

/** Обработчик ввода текста в поле перевода русского предложения. */
export function useGetOnInput() {
	const { useChangeCurrentExercise } = useContext(ExercisesContext)

	return useCallback(function (e: React.KeyboardEvent<HTMLTextAreaElement>) {
		const $textInput = e.target as HTMLTextAreaElement

		useChangeCurrentExercise({ userTranslate: $textInput.value })
	}, [])
}
