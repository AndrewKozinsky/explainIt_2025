import { useCallback, useContext } from 'react'
import { ExercisesContext } from '../../../logic/exercisesContext'

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
