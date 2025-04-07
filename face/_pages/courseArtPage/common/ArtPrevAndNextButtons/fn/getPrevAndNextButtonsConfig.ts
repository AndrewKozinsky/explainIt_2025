// import { useMemo } from 'react'
// import { PrevAndNextButtonConfig } from '../../PrevAndNextButtons/PrevAndNextButtons'
// import ArticleType from '../../../../../articlesData/articleType'
// import { PageUrls } from '../../../../../сonsts/pageUrls'

/**
 * Возвращает объект конфигурации для отрисовки кнопок-ссылок на предыдущую и следующую статью.
 * @param prevArticle — объект предыдущей статьи относительно текущей.
 * @param nextArticle — объект следующей статьи относительно текущей.
 */
/*export function useGetPrevAndNextArticlesNavConfig(
	prevArticle: ArticleType.Art | null,
	nextArticle: ArticleType.Art | null,
) {
	return useMemo(function (): {
		prevBtnConfig: PrevAndNextButtonConfig | undefined
		nextBtnConfig: PrevAndNextButtonConfig | undefined
	} {
		return {
			prevBtnConfig: convertArticleToButtonConfig(prevArticle),
			nextBtnConfig: convertArticleToButtonConfig(nextArticle),
		}
	}, [])
}*/

/**
 * Возвращает объект конфигурации для отрисовки кнопки-ссылки
 * @param article — объект статьи
 */
/*export function convertArticleToButtonConfig(
	article: ArticleType.Art | null,
): undefined | PrevAndNextButtonConfig {
	if (!article) return

	return {
		topText: article.meta.caption,
		name: article.meta.articleName,
		description: article.meta.articleDescription,
		href: PageUrls.courseArticle(article.meta.slug).url,
	}
}*/
