// import { useMemo } from 'react'
// import articleService from '../../../../../articleService/articleService'
// import ArticleType from '../../../../../articlesData/articleType'
// import { ArticleTileType } from '../../ArticleTile/fn/types'
// import { PageUrls } from '../../../../../сonsts/pageUrls'

/** Возвращает массив объектов конфигурации для отрисовки плиток-ссылок на статьи курса */
/*export function useGetTilesData(): ArticleTileType.Tile[] {
	return useMemo(function () {
		const articles = articleService.getArticles()

		return articles.map((art) => {
			const articleType = art.type

			if (articleType === ArticleType.ArtType.welcome) {
				return getWelcomeTileConf(art)
			} else if (articleType === ArticleType.ArtType.level) {
				return getLevelTileConf(art)
			} else if (articleType === ArticleType.ArtType.media) {
				return getMediaTileConf(art)
			}

			return getArticleTileConf(art)
		})
	}, [])
}*/

/**
 * Делает из вводной статьи объект конфигурации плитки-ссылки для вводной статьи
 * @param article — вводная статья
 */
/*function getWelcomeTileConf(article: ArticleType.ArtWelcome): ArticleTileType.WelcomeTile {
	return {
		type: 'welcome',
		url: PageUrls.courseArticle(article.meta.slug).url,
	}
}*/

/**
 * Делает из статьи нового уровня объект конфигурации плитки-ссылки для статьи нового уровня
 * @param article — статья нового уровня
 */
/*function getLevelTileConf(article: ArticleType.ArtLevel): ArticleTileType.LevelTile {
	const levelNames = {
		[ArticleType.LangLevel.a1]: ArticleType.LangLevelName.a1,
		[ArticleType.LangLevel.a2]: ArticleType.LangLevelName.a2,
		[ArticleType.LangLevel.b1]: ArticleType.LangLevelName.b1,
		[ArticleType.LangLevel.b2]: ArticleType.LangLevelName.b2,
	}

	return {
		type: 'level',
		level: article.level,
		name: levelNames[article.level],
		url: PageUrls.courseArticle(article.meta.slug).url,
	}
}*/

/**
 * Делает из медиа-статьи объект конфигурации плитки-ссылки для медиа-статьи
 * @param article — медиа-статья
 */
/*function getMediaTileConf(article: ArticleType.ArtMedia): ArticleTileType.MediaTile {
	return {
		type: 'media',
		url: PageUrls.courseArticle(article.meta.slug).url,
	}
}*/

/**
 * Делает из стандартной статьи объект конфигурации плитки-ссылки для стандартной статьи
 * @param article — стандартная статья
 */
/*function getArticleTileConf(article: ArticleType.Art): ArticleTileType.ArticleTile {
	return {
		type: 'article',
		top: article.meta.caption,
		header: article.meta.articleName,
		description: article.meta.articleDescription,
		url: PageUrls.courseArticle(article.meta.slug).url,
	}
}*/
