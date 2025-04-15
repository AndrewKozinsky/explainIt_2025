import { useMemo } from 'react'
import { exercisesLogic } from '../../../../logic/exercisesLogic'

/** Возвращает массив правильных переводов текущего упражнения */
export function useGetExerciseCorrectTranslations() {
	const exercise = exercisesLogic.useGetCurrentExercise()

	return useMemo(
		function () {
			if (!exercise) return []

			return exercise.engSentences.filter((sentence) => {
				return sentence.isCorrect
			})
		},
		[exercise],
	)
}
