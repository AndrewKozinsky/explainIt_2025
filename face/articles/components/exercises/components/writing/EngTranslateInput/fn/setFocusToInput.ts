import React, { useContext, useEffect } from 'react'
import { ExercisesContext } from '../../../../logic/exercisesContext'

/**
 * Хук при изменении упражнения ставит фокус на поле ввода и стирает существующее значение.
 * @param inputRef — ссылка на поле ввода перевода.
 */
export function usePrepareInput(inputRef: React.MutableRefObject<HTMLTextAreaElement | null>) {
	const { exercisesBlock } = useContext(ExercisesContext)

	useEffect(
		function () {
			if (!inputRef.current) return

			inputRef.current.value = ''
		},
		[exercisesBlock.currentExerciseId],
	)
}
