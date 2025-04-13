import { useState } from 'react'
import ExercisesType from '../../../../articleBuilder/articlesData/exercisesType'
import articleService from '../../../../articleBuilder/articleService/articleService'
import { exerciseChecker } from './exerciseChecker'
import { IExercisesContext } from './exercisesContext'
import { ExercisesContextType } from './exercisesStoreTypes'

/** Хук настраивает Хранилище блоков с упражнениями статьи. */
export function useGetExercisesData(exercises: ExercisesType.Exercise[]): IExercisesContext {
	const [exercisesBlock, setExercisesBlock] = useState<ExercisesContextType.ExercisesBlock>({
		currentExercisesId: 0,
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
				exercisesBlockCopy.currentExercisesId = exerciseId

				return exercisesBlockCopy
			})
		},
		switchToFirstExercise() {
			setExercisesBlock((exercisesBlock) => {
				const exercisesBlockCopy = { ...exercisesBlock }
				exercisesBlockCopy.currentExercisesId = exercisesBlockCopy.exercises[0].id

				return exercisesBlockCopy
			})
		},
		useGetCurrentExercise() {
			const { currentExercisesId } = exercisesBlock
			return exercisesBlock.exercises.find((exercise) => exercise.id === currentExercisesId)
		},
		useChangeCurrentExercise(changeObj: Partial<ExercisesContextType.Exercise>) {
			const exercisesBlockCopy = { ...exercisesBlock }

			const { currentExercisesId } = exercisesBlockCopy
			const currentExerciseIdx = exercisesBlockCopy.exercises.findIndex(
				(exercise) => exercise.id === currentExercisesId,
			)
			if (currentExerciseIdx === -1) return

			exercisesBlockCopy.exercises = [...exercisesBlockCopy.exercises]
			exercisesBlockCopy.exercises[currentExerciseIdx] = {
				...exercisesBlockCopy.exercises[currentExerciseIdx],
				...changeObj,
			}

			setExercisesBlock(exercisesBlockCopy)
		},
		getNextExercise() {
			const { currentExercisesId } = exercisesBlock

			const currentExerciseIdx = exercisesBlock.exercises.findIndex(
				(exercise) => exercise.id === currentExercisesId,
			)
			if (currentExerciseIdx === -1) return null

			return exercisesBlock.exercises[currentExerciseIdx + 1] || null
		},
		checkCurrentExercise() {
			const { currentExercisesId } = exercisesBlock
			const exercise = exercisesBlock.exercises.find((exercise) => exercise.id === currentExercisesId)
			if (!exercise) return

			const analysisInLocalDataRes = exerciseChecker.checkInLocalData(
				exercise,
				exercisesBlock.currentExerciseType,
			)

			if (analysisInLocalDataRes) {
				exercisesBlock.analysis = analysisInLocalDataRes
				return
			}

			/*this.store.analysis = { status: ExercisesManagerTypes.AnalysisStatus.loading }
			this.eventEmitter.emit(ExercisesManagerTypes.Event.storeChanged)

			const gigaChatAnalysis = await this.exerciseChecker.checkByAI(exercise)

			this.sendMessageToTelegramAboutUnknownTranslation(exercise, gigaChatAnalysis)

			this.store.analysis = gigaChatAnalysis
			this.eventEmitter.emit(ExercisesManagerTypes.Event.storeChanged)*/
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
