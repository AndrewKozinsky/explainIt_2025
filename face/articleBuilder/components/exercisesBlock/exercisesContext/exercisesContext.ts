import { createContext } from 'react'
import { ExercisesContextType } from './exercisesStoreTypes'

export type IExercisesContext = {
	exercisesBlock: ExercisesContextType.ExercisesBlock
	switchExercisesType: () => void
	switchToExercise: (exerciseId: number) => void
	switchToFirstExercise: () => void
	useGetCurrentExercise: () => undefined | ExercisesContextType.Exercise
	useChangeCurrentExercise: (changeObj: Partial<ExercisesContextType.Exercise>) => void
	getNextExercise: () => null | ExercisesContextType.Exercise
	checkCurrentExercise: () => void
}

export const ExercisesContext = createContext<IExercisesContext>(null as any)
