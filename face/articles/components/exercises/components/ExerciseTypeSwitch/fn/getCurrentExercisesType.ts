import { useCallback } from 'react'
import { exercisesLogic } from '../../../logic/exercisesLogic'

export function useGetOnExerciseTypeButtonClick(isCurrent: boolean) {
	const switchExercisesType = exercisesLogic.useGetSwitchExercisesType()

	return useCallback(
		function () {
			if (isCurrent) return

			switchExercisesType()
		},
		[isCurrent],
	)
}
