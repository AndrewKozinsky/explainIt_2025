'use client'

import ArticleType from '../../../articleBuilder/articlesData/articleType'
import { useSetUpExercisesStore } from './exercisesStore/useSetUpExercisesStore'

type ExercisesStoreWrapperProps = {
	articleContent: ArticleType.Content
}

function ExercisesStoreWrapper(props: ExercisesStoreWrapperProps) {
	useSetUpExercisesStore(props.articleContent)

	return null
}

export default ExercisesStoreWrapper
