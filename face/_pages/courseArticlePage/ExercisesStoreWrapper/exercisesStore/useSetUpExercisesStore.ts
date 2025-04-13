import { useEffect } from 'react'
import ArticleType from '../../../../articleBuilder/articlesData/articleType'
import ExercisesType from '../../../../articleBuilder/articlesData/exercisesType'
import articleService from '../../../../articleBuilder/articleService/articleService'
import { useExercisesStore } from './exercisesStore'
import { ExercisesStoreType } from './exercisesStoreTypes'

/** Хук настраивает Хранилище блоков с упражнениями статьи. */
export function useSetUpExercisesStore(articleContent: ArticleType.Content) {
	useEffect(function () {
		const rowExercisesBlocks = articleContent.filter((artItem) => artItem.type === 'exercises')

		const storeExercisesBlocks = rowExercisesBlocks.map((exercisesBlock) => {
			return {
				exercisesBlockId: exercisesBlock.id,
				currentSentenceId: 0,
				currentExerciseType: ExercisesStoreType.ExerciseType.write,
				exercises: convertRowExercisesToStoreExercises(exercisesBlock.exercises),
			}
		})

		useExercisesStore.setState({ exercises: storeExercisesBlocks })
	}, [])
}

function convertRowExercisesToStoreExercises(rowExercises: ExercisesType.Exercise[]): ExercisesStoreType.Exercise[] {
	return rowExercises.map((rowExercise, i) => {
		return {
			...rowExercise,
			id: i,
			userTranslate: '',
			words: articleService.prepareArticleWords(rowExercise.words),
		}
	})
}
