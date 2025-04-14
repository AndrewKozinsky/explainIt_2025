import articleService from '../../../../../articles/articleService/articleService'
import ArticleType from '../../../../../articles/articlesData/articleType'
import { ArticleTileType } from '../../ArticleTile/fn/types'
import { PageUrls } from '../../../../../сonsts/pageUrls'

/** Возвращает массив объектов конфигурации для отрисовки плиток-ссылок на статьи курса */
export function getTilesData(): ArticleTileType.Tile[] {
	const articles = articleService.getArticles()

	return articles.map((art) => {
		return getArticleTileConf(art)
	})
}

/**
 * Делает из стандартной статьи объект конфигурации плитки-ссылки для стандартной статьи
 * @param article — стандартная статья
 */
function getArticleTileConf(article: ArticleType.Art): ArticleTileType.ArticleTile {
	return {
		type: 'article',
		top: article.meta.caption,
		header: article.meta.articleName,
		description: article.meta.articleDescription,
		url: PageUrls.courseArticle(article.meta.slug).url,
	}
}
