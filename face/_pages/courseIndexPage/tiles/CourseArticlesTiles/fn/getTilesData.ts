import articleService from '../../../../../articles/articleService/articleService'
import ArticleType from '../../../../../articles/articleTypes/articleType'
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
		top: 'Глава ' + article.meta.number,
		header: article.meta.name,
		description: article.meta.description,
		url: PageUrls.courseArticle(article.meta.slug).url,
	}
}
