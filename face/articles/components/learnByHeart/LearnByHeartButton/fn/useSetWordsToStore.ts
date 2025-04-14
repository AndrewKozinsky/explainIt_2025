// import { useMemo } from 'react'
// import ArticleType from '../../../../../articlesData/articleType'
// import articleService from '../../../../../articleService/articleService'
// import { useLearnByHeartStore } from '../../store/store'

/**
 * Получает объект статьи и вычленяет блоки со словами для заучивания
 * @param article — данные следующей статьи
 */
/*export function useSetWordsToStore(article: null | ArticleType.Art) {
	return useMemo(function () {
		if (!article || article.type !== ArticleType.ArtType.article) {
			return
		}

		const words = articleService.getArticleWordsByArticleSlug(article.meta.slug)

		useLearnByHeartStore.setState({ wordObjs: words })
	}, [])
}*/
