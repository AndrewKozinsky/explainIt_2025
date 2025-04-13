import { useContext, useMemo } from 'react'
import { ExercisesContext } from '../../../../exercisesContext/exercisesContext'

/** Возвращает массив правильных переводов текущего упражнения */
export function useGetExerciseCorrectTranslations() {
	const { useGetCurrentExercise } = useContext(ExercisesContext)
	const exercise = useGetCurrentExercise()

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
