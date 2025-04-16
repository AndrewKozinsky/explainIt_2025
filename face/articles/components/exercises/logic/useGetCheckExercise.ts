import { useCallback, useContext } from 'react'
import { exerciseChecker } from './exerciseChecker'
import { ExercisesContext } from './exercisesContext'
import { ExercisesContextType } from './exercisesContextTypes'
import { exercisesLogic } from './exercisesLogic'

export function useGetCheckCurrentExercise() {
	const { exercisesBlock } = useContext(ExercisesContext)
	const exercise = exercisesLogic.useGetCurrentExercise()
	const changeExercisesBlock = exercisesLogic.useGetChangeExercisesBlock()

	return useCallback(
		function () {
			if (!exercise) return

			const analysisInLocalDataRes = exerciseChecker.checkInLocalData(
				exercise,
				exercisesBlock.currentExerciseType,
			)

			if (analysisInLocalDataRes) {
				changeExercisesBlock({ analysis: analysisInLocalDataRes })
				return
			}

			changeExercisesBlock({ analysis: { status: ExercisesContextType.AnalysisStatus.loading } })
			// checkByAI(exercise) ...
		},
		[exercise],
	)
}
