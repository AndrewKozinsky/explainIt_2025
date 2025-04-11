// import { renderHook } from '@testing-library/react'
// import articleService from '../../../../../../articleService/articleService'
// import ArticleType from '../../../../../../articlesData/articleType'
// import { ArticleTileType } from '../../../ArticleTile/fn/types'
// import { useGetTilesData } from '../getTilesData'

/*const pureArticles: ArticleType.Art[] = [
	{
		type: ArticleType.ArtType.welcome,
		meta: {
			number: 1,
			caption: 'Вводная глава',
			slug: 'welcome',
			articleName: 'Welcome',
			articleDescription: 'Добро пожаловать на курс',

		},
	},
	{
		type: ArticleType.ArtType.level,
		level: ArticleType.LangLevel.a1,
		meta: {
			number: 2,
			caption: 'Уровень А1',
			slug: 'level',
			articleName: 'Уровень A1',
			articleDescription: 'Добро пожаловать на курс',

		},
	},
	{

		meta: {
			number: 5,
			caption: 'Глава 1',
			slug: 'article',
			articleName: 'Имя статьи 1',
			articleDescription: 'Описание статьи 1',

		},
		content: [],
	},
	{
		type: ArticleType.ArtType.media,
		meta: {
			number: 3,
			caption: 'В бой!',
			slug: 'media',
			articleName: 'Media',
			articleDescription: 'Фильмы',

		},
	},
]*/

// jest.spyOn(articleService, 'getArticles').mockReturnValue(pureArticles)

/*describe('useGetTilesData', () => {
	it('should return correct array with tiles config', () => {
		const { result } = renderHook(useGetTilesData)

		const expectedResult: ArticleTileType.Tile[] = [
			{
				type: 'welcome',
				url: '/course/welcome',
			},
			{
				type: 'level',
				level: ArticleType.LangLevel.a1,
				name: ArticleType.LangLevelName.a1,
				url: '/course/level',
			},
			{
				type: 'article',
				top: 'Глава 1',
				header: 'Имя статьи 1',
				description: 'Описание статьи 1',
				url: '/course/article',
			},
			{
				type: 'media',
				url: '/course/media',
			},
		]

		expect(result.current).toEqual(expectedResult)
	})
})*/
