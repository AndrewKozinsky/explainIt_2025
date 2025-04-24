import { useCallback, useContext } from 'react'
import graphqlAIQueries from '../../../../graphql/ai/graphqlAIQueries'
import { exerciseChecker } from './exerciseChecker'
import { ExercisesContext } from './exercisesContext'
import { ExercisesContextType } from './exercisesContextTypes'
import { exercisesLogic } from './exercisesLogic'

export function useGetCheckCurrentExercise() {
	const { exercisesBlock } = useContext(ExercisesContext)
	const exercise = exercisesLogic.useGetCurrentExercise()
	const changeExercisesBlock = exercisesLogic.useGetChangeExercisesBlock()

	return useCallback(
		async function () {
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

			const { data } = await graphqlAIQueries.checkTranslation({
				rusSentence: 'My rus sentence',
				engSentence: 'My eng sentence',
			})

			if ('error' in data.ai_checkTranslation) {
				changeExercisesBlock({ analysis: { status: ExercisesContextType.AnalysisStatus.error } })
			} else {
				console.log(data.ai_checkTranslation.analysis)
			}
		},
		[exercise],
	)
}
