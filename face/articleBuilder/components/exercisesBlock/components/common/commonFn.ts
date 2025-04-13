import { useMemo } from 'react'
import { ExercisesStoreType } from '../../../../../_pages/courseArticlePage/ExercisesStoreWrapper/exercisesStore/exercisesStoreTypes'

import exercisesLogic from '../../logic/exercisesLogic'

/** Возвращает правду если текущее упражнение голосовое и показан результат */
export function useIsShownResultInOralExercise(exercisesBlockId: number) {
	const exercisesBlock = exercisesLogic.useGetExercisesBlock(exercisesBlockId)
	const exercise = exercisesLogic.useGetCurrentSentence(exercisesBlockId)

	if (!exercisesBlock || !exercise) return null

	return useMemo(
		function () {
			return (
				exercisesBlock.currentExerciseType === ExercisesStoreType.ExerciseType.oral &&
				exercisesBlock.analysis.status === ExercisesStoreType.AnalysisStatus.visible
			)
		},
		[exercise],
	)
}
