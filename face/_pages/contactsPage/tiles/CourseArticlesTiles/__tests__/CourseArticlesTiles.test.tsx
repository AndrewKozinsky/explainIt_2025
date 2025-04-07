// import { render, screen } from '@testing-library/react'
// import ArticleType from '../../../../../articlesData/articleType'
// import { ArticleTileType } from '../../ArticleTile/fn/types'
// import { CourseArticlesTiles } from '../CourseArticlesTiles'

/*const tilesConfig: ArticleTileType.Tile[] = [
	{
		type: 'welcome',
		url: 'url-1',
	},
	{
		type: 'level',
		level: ArticleType.LangLevel.a1,
		name: ArticleType.LangLevelName.a1,
		url: 'url-2',
	},
	{
		type: 'article',
		top: 'string',
		header: 'string',
		description: 'string',
		url: 'url-3',
	},
	{
		type: 'media',
		url: 'url-4',
	},
]*/

/*jest.mock('../fn/getTilesData', () => {
	return {
		useGetTilesData: () => tilesConfig,
	}
})*/

/*describe('LevelArticlesNames', () => {
	it('should render paragraph with 3 articles names divided by star', () => {
		const { container } = render(<CourseArticlesTiles />)

		// Check if tiles wrapper exists
		expect(screen.getByTestId('tiles-wrapper')).toBeInTheDocument()

		const $tiles = container.querySelectorAll('a')
		expect($tiles).toHaveLength(4)
		expect($tiles[0].getAttribute('data-testid')).toBe('article-tile--welcome')
		expect($tiles[1].getAttribute('data-testid')).toBe('article-tile--level')
		expect($tiles[2].getAttribute('data-testid')).toBe('article-tile--article')
		expect($tiles[3].getAttribute('data-testid')).toBe('article-tile--media')
	})
})*/
