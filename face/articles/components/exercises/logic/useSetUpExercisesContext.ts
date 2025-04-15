import { useState } from 'react'
import ExercisesType from '../../../articleTypes/exercisesType'
import articleService from '../../../articleService/articleService'
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
		setExercisesBlock,
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
