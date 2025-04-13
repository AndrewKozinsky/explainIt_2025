import { useCallback, useMemo } from 'react'
import { useExercisesStore } from '../../../../../../_pages/courseArticlePage/ExercisesStoreWrapper/exercisesStore/exercisesStore'
import { ExercisesStoreType } from '../../../../../../_pages/courseArticlePage/ExercisesStoreWrapper/exercisesStore/exercisesStoreTypes'

export function useGetCurrentExercisesType(exercisesBlockId: number) {
	const currentExerciseType = useExercisesStore((s) => s.exercises).find((exercisesBlock) => {
		return exercisesBlock.exercisesBlockId === exercisesBlockId
	})?.currentExerciseType

	return useMemo(
		function () {
			return currentExerciseType === ExercisesStoreType.ExerciseType.oral
				? ExercisesStoreType.ExerciseType.oral
				: ExercisesStoreType.ExerciseType.write
		},
		[currentExerciseType],
	)
}

export function useGetOnExerciseTypeButtonClick(isCurrent: boolean, exercisesBlockId: number) {
	return useCallback(
		function () {
			if (isCurrent) return

			useExercisesStore.getState().toggleExercisesType(exercisesBlockId)
		},
		[isCurrent],
	)
}
