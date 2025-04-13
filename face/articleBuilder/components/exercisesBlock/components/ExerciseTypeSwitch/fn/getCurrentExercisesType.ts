import { useCallback, useContext } from 'react'
import { ExercisesContext } from '../../../exercisesContext/exercisesContext'

export function useGetOnExerciseTypeButtonClick(isCurrent: boolean) {
	const { switchExercisesType } = useContext(ExercisesContext)

	return useCallback(
		function () {
			if (isCurrent) return

			switchExercisesType()
		},
		[isCurrent],
	)
}
