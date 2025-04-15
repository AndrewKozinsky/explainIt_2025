import { createContext, Dispatch, SetStateAction } from 'react'
import { ExercisesContextType } from './exercisesContextTypes'

export type IExercisesContext = {
	exercisesBlock: ExercisesContextType.ExercisesBlock
	setExercisesBlock: Dispatch<SetStateAction<ExercisesContextType.ExercisesBlock>>
}

export const ExercisesContext = createContext<IExercisesContext>(null as any)
