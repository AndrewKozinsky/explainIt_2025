import { useMemo } from 'react'
import { useExercisesModalStore } from '../../../../store/store'

/** Возвращает массив правильных переводов текущего упражнения */
export function useGetExerciseCorrectTranslations() {
	const exercise = useExercisesModalStore().store.currentExercise

	return useMemo(
		function () {
			return exercise.engSentences.filter((sentence) => {
				return sentence.isCorrect
			})
		},
		[exercise],
	)
}
