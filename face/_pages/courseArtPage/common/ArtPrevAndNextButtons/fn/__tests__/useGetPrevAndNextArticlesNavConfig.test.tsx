// import { renderHook } from '@testing-library/react'
// import { PrevAndNextButtonConfig } from '../../../PrevAndNextButtons/PrevAndNextButtons'
// import ArticleType from '../../../../../../articlesData/articleType'
// import { useGetPrevAndNextArticlesNavConfig } from '../getPrevAndNextButtonsConfig'

/*describe('useGetPrevAndNextArticlesNavConfig function', () => {
	it('should return empty data if empty articles were passed', () => {
		const hookWrapper = () => useGetPrevAndNextArticlesNavConfig(null, null)
		const { result } = renderHook(hookWrapper)

		expect(result.current).toEqual({ prevBtnConfig: undefined, nextBtnConfig: undefined })
	})

	it('should take 2 articles and return object with PrevOrNextButtons config data', () => {
		const artArticle: ArticleType.Art = {

			meta: {
				number: 4,
				caption: 'Art caption',
				slug: 'personal-pronouns',
				articleName: 'Art article name',
				articleDescription: 'Art description',
				isPaid: false,
			},
			content: [],
		}

		const levelArticle: ArticleType.ArtLevel = {
			type: ArticleType.ArtType.level,
			level: ArticleType.LangLevel.a1,
			meta: {
				number: 2,
				caption: 'Level caption',
				slug: 'level',
				articleName: 'Level article name',
				articleDescription: 'Добро пожаловать на курс',
				isPaid: false,
			},
		}

		const expectedPrevButtonConfig: PrevAndNextButtonConfig = {
			topText: 'Art caption',
			name: 'Art article name',
			description: 'Art description',
			href: '/course/personal-pronouns',
		}

		const expectedNextButtonConfig: PrevAndNextButtonConfig = {
			topText: 'Level caption',
			name: 'Level article name',
			description: 'Добро пожаловать на курс',
			href: '/course/level',
		}

		const hookWrapper = () => useGetPrevAndNextArticlesNavConfig(artArticle, levelArticle)
		const { result } = renderHook(hookWrapper)

		expect(result.current).toEqual({
			prevBtnConfig: expectedPrevButtonConfig,
			nextBtnConfig: expectedNextButtonConfig,
		})
	})
})*/
