import { useContext, useMemo } from 'react'
import { ExercisesContext } from '../../logic/exercisesContext'
import { ExercisesContextType } from '../../logic/exercisesContextTypes'
import { exercisesLogic } from '../../logic/exercisesLogic'

/** Возвращает правду если текущее упражнение голосовое и показан результат */
export function useIsResultInOralExerciseShown() {
	const { exercisesBlock } = useContext(ExercisesContext)
	const exercise = exercisesLogic.useGetCurrentExercise()

	if (!exercise) return null

	return useMemo(
		function () {
			return (
				exercisesBlock.currentExerciseType === ExercisesContextType.ExerciseType.oral &&
				exercisesBlock.analysis.status === ExercisesContextType.AnalysisStatus.visible
			)
		},
		[exercisesBlock.currentExerciseType, exercisesBlock.analysis.status],
	)
}
