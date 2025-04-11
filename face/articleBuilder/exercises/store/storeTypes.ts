import { ExercisesManagerTypes } from '../logic/exercisesManagerTypes'

export namespace ExercisesModalStoreType {
	export type State = {
		// Данные для отрисовки содержимого модального окна прохождения упражнений
		store: ExercisesManagerTypes.Store
	}
}
