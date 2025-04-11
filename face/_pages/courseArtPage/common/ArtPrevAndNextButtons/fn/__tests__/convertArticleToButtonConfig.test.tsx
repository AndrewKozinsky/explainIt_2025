// import { PrevAndNextButtonConfig } from '../../../PrevAndNextButtons/PrevAndNextButtons'
// import ArticleType from '../../../../../../articlesData/articleType'
// import { convertArticleToButtonConfig } from '../getPrevAndNextButtonsConfig'

/*describe('convertArticleToButtonConfig function', () => {
	it('should return undefined if null was passed', () => {
		expect(convertArticleToButtonConfig(null)).toBeUndefined()
	})

	it('should convert article data with type ArticleType.ArtArticle to PrevOrNextButton config data', () => {
		const artArticle: ArticleType.Art = {

			meta: {
				number: 4,
				caption: 'Глава 2',
				slug: 'personal-pronouns',
				articleName: 'Личные местоимения',
				articleDescription: 'Личные местоимения в английском языке.',

			},
			content: [],
		}

		const expectedPrevOrNextButtonConfig: PrevAndNextButtonConfig = {
			topText: 'Глава 2',
			name: 'Личные местоимения',
			description: 'Личные местоимения в английском языке.',
			href: '/course/personal-pronouns',
		}

		const result = convertArticleToButtonConfig(artArticle)

		expect(result).toEqual(expectedPrevOrNextButtonConfig)
	})

	it('should convert article data with type ArticleType.ArtLevel to PrevOrNextButton config data', () => {
		const levelArticle: ArticleType.ArtLevel = {
			type: ArticleType.ArtType.level,
			level: 'a1' as any,
			meta: {
				number: 2,
				caption: 'Уровень А1',
				slug: 'level',
				articleName: 'Уровень A1',
				articleDescription: 'Добро пожаловать на курс',

			},
		}

		const expectedPrevOrNextButtonConfig: PrevAndNextButtonConfig = {
			topText: 'Уровень А1',
			name: 'Уровень A1',
			description: 'Добро пожаловать на курс',
			href: '/course/level',
		}

		const result = convertArticleToButtonConfig(levelArticle)

		expect(result).toEqual(expectedPrevOrNextButtonConfig)
	})
})*/
