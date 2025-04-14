import { useContext, useMemo } from 'react'
import { ExercisesContext } from '../../logic/exercisesContext'
import { ExercisesContextType } from '../../logic/exercisesStoreTypes'

/** Возвращает правду если текущее упражнение голосовое и показан результат */
export function useIsShownResultInOralExercise() {
	const { useGetCurrentExercise, exercisesBlock } = useContext(ExercisesContext)
	const exercise = useGetCurrentExercise()

	if (!exercise) return null

	return useMemo(
		function () {
			return (
				exercisesBlock.currentExerciseType === ExercisesContextType.ExerciseType.oral &&
				exercisesBlock.analysis.status === ExercisesContextType.AnalysisStatus.visible
			)
		},
		[exercise],
	)
}
