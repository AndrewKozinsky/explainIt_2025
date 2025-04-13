import { create } from 'zustand'
import { ExercisesStoreType } from './exercisesStoreTypes'

export const useExercisesStore = create<ExercisesStoreType.State>((set, get) => {
	return {
		exercises: [],
		toggleExercisesType(exercisesBlockId: number) {
			set((state) => {
				const thisExercisesBlockIdx = state.getExercisesBlockIdx(exercisesBlockId)
				if (thisExercisesBlockIdx === -1) {
					return {}
				}

				const newExercises = [...state.exercises]
				newExercises[thisExercisesBlockIdx] = {
					...newExercises[thisExercisesBlockIdx],
					currentExerciseType:
						newExercises[thisExercisesBlockIdx].currentExerciseType ===
						ExercisesStoreType.ExerciseType.write
							? ExercisesStoreType.ExerciseType.oral
							: ExercisesStoreType.ExerciseType.write,
				}

				return { exercises: newExercises }
			})
		},
		/*getExercisesBlock(exercisesBlockId: number) {
			return get().exercises.find((exercisesBlock) => exercisesBlock.exercisesBlockId === exercisesBlockId)
		},*/
		getExercisesBlockIdx(exercisesBlockId: number) {
			return get().exercises.findIndex((exercisesBlock) => exercisesBlock.exercisesBlockId === exercisesBlockId)
		},
		switchToSentence(exercisesBlockId: number, sentenceId: number) {
			set((state) => {
				const thisExercisesBlockIdx = get().getExercisesBlockIdx(exercisesBlockId)
				if (thisExercisesBlockIdx === -1) {
					return {}
				}

				const newExercises = [...state.exercises]

				newExercises[thisExercisesBlockIdx] = {
					...newExercises[thisExercisesBlockIdx],
					currentSentenceId: sentenceId,
				}

				return { exercises: newExercises }
			})
		},
	}
})
