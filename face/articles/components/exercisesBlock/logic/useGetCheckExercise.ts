import { useCallback, useContext } from 'react'
import { exerciseChecker } from './exerciseChecker'
import { ExercisesContext } from './exercisesContext'
import { ExercisesContextType } from './exercisesStoreTypes'

export function useGetCheckCurrentExercise() {
	const { useGetCurrentExercise, exercisesBlock, useChangeExercisesBlock } = useContext(ExercisesContext)
	const exercise = useGetCurrentExercise()

	return useCallback(function () {
		if (!exercise) return

		const analysisInLocalDataRes = exerciseChecker.checkInLocalData(exercise, exercisesBlock.currentExerciseType)
		if (analysisInLocalDataRes) {
			useChangeExercisesBlock({ analysis: analysisInLocalDataRes })
			return
		}

		useChangeExercisesBlock({ analysis: { status: ExercisesContextType.AnalysisStatus.loading } })
		/*const gigaChatAnalysis = await this.exerciseChecker.checkByAI(exercise)

		this.sendMessageToTelegramAboutUnknownTranslation(exercise, gigaChatAnalysis)

		this.store.analysis = gigaChatAnalysis*/
	}, [])
}
