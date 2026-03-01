import ArticleType from '@/articles/articleTypes/articleType'
import { pageUrls } from '@/сonsts/pageUrls'
import articleService from '../../../../../articles/articleService/articleService'
import { ArticleTileType } from '../../ArticleTile/fn/types'

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
		url: pageUrls.courseArticle(article.meta.slug).path,
	}
}
