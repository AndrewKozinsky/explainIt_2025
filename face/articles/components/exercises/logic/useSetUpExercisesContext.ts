import { useState } from 'react'
import ExercisesType from '../../../articlesData/exercisesType'
import articleService from '../../../articleService/articleService'
import { exerciseChecker } from './exerciseChecker'
import { IExercisesContext } from './exercisesContext'
import { ExercisesContextType } from './exercisesContextTypes'

/** Хук настраивает Хранилище блоков с упражнениями статьи. */
export function useGetExercisesData(exercises: ExercisesType.Exercise[]): IExercisesContext {
	const [exercisesBlock, setExercisesBlock] = useState<ExercisesContextType.ExercisesBlock>({
		currentExerciseId: 0,
		currentExerciseType: ExercisesContextType.ExerciseType.write,
		exercises: convertRowExercisesToStoreExercises(exercises),
		analysis: {
			status: ExercisesContextType.AnalysisStatus.hidden,
		},
	})

	return {
		exercisesBlock,
		switchExercisesType() {
			setExercisesBlock((exercisesBlock) => {
				const exercisesBlockCopy = { ...exercisesBlock }
				exercisesBlockCopy.currentExerciseType =
					exercisesBlockCopy.currentExerciseType === ExercisesContextType.ExerciseType.write
						? ExercisesContextType.ExerciseType.oral
						: ExercisesContextType.ExerciseType.write

				return exercisesBlockCopy
			})
		},
		switchToExercise(exerciseId: number) {
			setExercisesBlock((exercisesBlock) => {
				const exercisesBlockCopy = { ...exercisesBlock }
				exercisesBlockCopy.currentExerciseId = exerciseId

				exercisesBlockCopy.analysis = { status: ExercisesContextType.AnalysisStatus.hidden }

				return exercisesBlockCopy
			})
		},
		switchToFirstExercise() {
			setExercisesBlock((exercisesBlock) => {
				const exercisesBlockCopy = { ...exercisesBlock }
				exercisesBlockCopy.currentExerciseId = exercisesBlockCopy.exercises[0].id

				exercisesBlockCopy.analysis = { status: ExercisesContextType.AnalysisStatus.hidden }

				return exercisesBlockCopy
			})
		},
		useGetCurrentExercise() {
			const { currentExerciseId } = exercisesBlock
			return exercisesBlock.exercises.find((exercise) => exercise.id === currentExerciseId)
		},
		resetCurrentExercise() {
			const exercisesBlockCopy = { ...exercisesBlock }

			const currentExerciseIdx = exercisesBlockCopy.exercises.findIndex(
				(exercise) => exercise.id === exercisesBlockCopy.currentExerciseId,
			)
			if (currentExerciseIdx === -1) return

			exercisesBlockCopy.exercises = [...exercisesBlockCopy.exercises]
			exercisesBlockCopy.exercises[currentExerciseIdx] = {
				...exercisesBlockCopy.exercises[currentExerciseIdx],
				userTranslate: '',
			}

			setExercisesBlock(exercisesBlockCopy)
		},
		useChangeCurrentExercise(changeObj: Partial<ExercisesContextType.Exercise>) {
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
		changeExercisesBlock(changeObj: Partial<ExercisesContextType.ExercisesBlock>) {
			const exercisesBlockCopy = { ...exercisesBlock, ...changeObj }
			setExercisesBlock(exercisesBlockCopy)
		},
		getNextExercise() {
			const { currentExerciseId } = exercisesBlock

			const currentExerciseIdx = exercisesBlock.exercises.findIndex(
				(exercise) => exercise.id === currentExerciseId,
			)
			if (currentExerciseIdx === -1) return null
			console.log(exercisesBlock.exercises[currentExerciseIdx + 1])

			return exercisesBlock.exercises[currentExerciseIdx + 1] || null
		},
	}
}

function convertRowExercisesToStoreExercises(rowExercises: ExercisesType.Exercise[]): ExercisesContextType.Exercise[] {
	return rowExercises.map((rowExercise, i) => {
		return {
			...rowExercise,
			id: i,
			userTranslate: '',
			words: articleService.prepareArticleWords(rowExercise.words),
		}
	})
}
