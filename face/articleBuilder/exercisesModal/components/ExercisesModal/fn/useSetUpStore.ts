// import { useEffect } from 'react'
// import ArticleType from '../../../../../articlesData/articleType'
// import articleService from '../../../../../articleService/articleService'
// import { exercisesLogic, useExercisesModalStore } from '../../../store/store'

/** Хук настраивает Хранилище модального окна прохождения упражнений. */
/*export function useSetUpStore(article: ArticleType.ArtArticle) {
	const { exercisesId } = useExercisesModalStore()

	useEffect(
		function () {
			if (exercisesId === null) return

			const currentExercises = articleService.getArticleExercises(
				article.meta.slug,
				exercisesId,
			)
			if (!currentExercises) return

			exercisesLogic.initStore(currentExercises.exercises)
			exercisesLogic.setChapterName(article.meta.articleName)
		},
		[exercisesId],
	)
}*/
