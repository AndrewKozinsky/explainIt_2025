import { useCallback, useContext, useMemo } from 'react'
import { ExercisesContext } from './exercisesContext'
import { ExercisesContextType } from './exercisesContextTypes'

export const exercisesLogic = {
	useGetCurrentExercise() {
		const { exercisesBlock } = useContext(ExercisesContext)
		const { currentExerciseId } = exercisesBlock

		return useMemo(
			function () {
				return exercisesBlock.exercises.find((exercise) => exercise.id === currentExerciseId)
			},
			[exercisesBlock],
		)
	},
	useGetNextExercise() {
		const { exercisesBlock } = useContext(ExercisesContext)

		return useCallback(
			function () {
				const { currentExerciseId } = exercisesBlock

				const currentExerciseIdx = exercisesBlock.exercises.findIndex(
					(exercise) => exercise.id === currentExerciseId,
				)
				if (currentExerciseIdx === -1) return null

				return exercisesBlock.exercises[currentExerciseIdx + 1] || null
			},
			[exercisesBlock],
		)
	},
	useGetChangeCurrentExercise() {
		const { exercisesBlock, setExercisesBlock } = useContext(ExercisesContext)
		const { currentExerciseId } = exercisesBlock

		return useCallback(
			function (changeObj: Partial<ExercisesContextType.Exercise>) {
				const exercisesBlockCopy = { ...exercisesBlock }

				const currentExerciseIdx = exercisesBlockCopy.exercises.findIndex(
					(exercise) => exercise.id === exercisesBlockCopy.currentExerciseId,
				)
				if (currentExerciseIdx === -1) return

				exercisesBlockCopy.exercises = [...exercisesBlockCopy.exercises]
				exercisesBlockCopy.exercises[currentExerciseIdx] = {
					...exercisesBlockCopy.exercises[currentExerciseIdx],
					...changeObj,
				}

				setExercisesBlock(exercisesBlockCopy)
			},
			[currentExerciseId],
		)
	},
	useGetChangeExercisesBlock() {
		const { exercisesBlock, setExercisesBlock } = useContext(ExercisesContext)
		const { currentExerciseId } = exercisesBlock

		return useCallback(
			function (changeObj: Partial<ExercisesContextType.ExercisesBlock>) {
				const exercisesBlockCopy = { ...exercisesBlock, ...changeObj }
				setExercisesBlock(exercisesBlockCopy)
			},
			[exercisesBlock],
		)
	},
	useGetSwitchExercisesType() {
		const { setExercisesBlock } = useContext(ExercisesContext)

		return useCallback(function () {
			setExercisesBlock((exercisesBlock) => {
				const exercisesBlockCopy = { ...exercisesBlock }

				exercisesBlockCopy.currentExerciseType =
					exercisesBlockCopy.currentExerciseType === ExercisesContextType.ExerciseType.write
						? ExercisesContextType.ExerciseType.oral
						: ExercisesContextType.ExerciseType.write

				exercisesBlockCopy.analysis = { status: ExercisesContextType.AnalysisStatus.hidden }

				return exercisesBlockCopy
			})
		}, [])
	},
	useGetSwitchToExercise() {
		const { setExercisesBlock } = useContext(ExercisesContext)

		return useCallback(function (exerciseId: number) {
			setExercisesBlock((exercisesBlock) => {
				const exercisesBlockCopy = { ...exercisesBlock }
				exercisesBlockCopy.currentExerciseId = exerciseId

				exercisesBlockCopy.analysis = { status: ExercisesContextType.AnalysisStatus.hidden }

				exercisesBlockCopy.exercises = exercisesBlockCopy.exercises.map((exercise) => {
					return { ...exercise, userTranslate: '' }
				})

				return exercisesBlockCopy
			})
		}, [])
	},
	useGetSwitchToFirstExercise() {
		const { setExercisesBlock } = useContext(ExercisesContext)

		return useCallback(function () {
			setExercisesBlock((exercisesBlock) => {
				const exercisesBlockCopy = { ...exercisesBlock }
				exercisesBlockCopy.currentExerciseId = exercisesBlockCopy.exercises[0].id

				exercisesBlockCopy.analysis = { status: ExercisesContextType.AnalysisStatus.hidden }

				return exercisesBlockCopy
			})
		}, [])
	},
}
