import ArticleType from '../../../../../articleBuilder/articlesData/articleType'

export namespace ArticleTileType {
	export type Tile = LevelTile | ArticleTile | MediaTile

	// Карточка начала нового уровня изучения языка
	export type LevelTile = {
		type: 'level'
		level: ArticleType.LangLevel
		name: ArticleType.LangLevelName
		url: string
	}

	// Карточка статьи
	export type ArticleTile = {
		type: 'article'
		top?: string
		header: string
		description: string
		url: string
	}

	// Карточка с фильмами и книгами
	export type MediaTile = {
		type: 'media'
		url: string
	}
}
