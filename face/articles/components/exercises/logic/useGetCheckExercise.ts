import { useCallback, useContext } from 'react'
import { exerciseChecker } from './exerciseChecker'
import { ExercisesContext } from './exercisesContext'
import { ExercisesContextType } from './exercisesContextTypes'

export function useGetCheckCurrentExercise() {
	const { useGetCurrentExercise, exercisesBlock, changeExercisesBlock } = useContext(ExercisesContext)
	const exercise = useGetCurrentExercise()

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
			/*const gigaChatAnalysis = await this.exerciseChecker.checkByAI(exercise)

		this.sendMessageToTelegramAboutUnknownTranslation(exercise, gigaChatAnalysis)

		this.store.analysis = gigaChatAnalysis*/
		},
		[exercise],
	)
}
