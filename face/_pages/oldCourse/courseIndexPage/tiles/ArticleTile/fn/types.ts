export namespace ArticleTileType {
	export type Tile = ArticleTile

	// Карточка статьи
	export type ArticleTile = {
		type: 'article'
		top?: string
		header: string
		description: string
		url: string
	}
}
