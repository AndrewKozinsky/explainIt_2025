// import ExercisesType from '../../articlesData/exercisesType'
// import { ArticleService } from '../articleService'
// import ArticleType from '../../articlesData/articleType'
// import { pureArticles } from './mockData'

/*describe('ArticleService', () => {
	let articleService = new ArticleService(pureArticles)

	beforeEach(() => {
		articleService = new ArticleService(pureArticles)
	})

	describe('getArticles method', () => {
		it('should return all articles', () => {
			const articles = articleService.getArticles()
			expect(articles).toHaveLength(pureArticles.length)
			expect(articles).toEqual(pureArticles)
		})
	})

	describe('getArticle method', () => {
		it('should return null if a article is not exists', () => {
			const article = articleService.getArticle('wrong')
			expect(article).toBeNull()
		})

		it('should return article with a slug `level`', () => {
			const article = articleService.getArticle('level')
			expect(article).toEqual(pureArticles[1])
		})

		it('should return previous and next article of the article with a slug `level`', () => {
			const articlePrev = articleService.getArticle('level', 'prev')
			const articleNext = articleService.getArticle('level', 'next')

			expect(articlePrev).toEqual(pureArticles[0])
			expect(articleNext).toEqual(pureArticles[2])
		})
	})

	describe('getArticlesOfLevel method', () => {
		it('should return articles of the level a1`', () => {
			const receivedArticles = articleService.getArticlesOfLevel(ArticleType.LangLevel.a1)

			const expectedArticles: { name: string; url: string }[] = [
				{ name: 'Имя статьи 1', url: '/course/my-art-1' },
				{ name: 'Имя статьи 2', url: '/course/my-art-2' },
			]

			expect(receivedArticles).toEqual(expectedArticles)
		})

		it('should return articles of the level a2`', () => {
			const receivedArticles = articleService.getArticlesOfLevel(ArticleType.LangLevel.a2)

			const expectedArticles: { name: string; url: string }[] = [
				{ name: 'Имя статьи 3', url: '/course/my-art-3' },
			]

			expect(receivedArticles).toEqual(expectedArticles)
		})
	})

	describe('getArticleWords method', () => {
		it('should return article words`', () => {
			const receivedWords = articleService.getArticleWordsByArticleSlug('my-art-1')

			const expectedWords: ExercisesType.Word[] = [
				{ rusWord: 'книга', engWord: 'a book', transcription: 'ə bʊk' },
				{ rusWord: 'это', engWord: 'it', transcription: undefined },
				{ rusWord: 'строитель', engWord: 'a builder', transcription: undefined },
				{ rusWord: 'журнал', engWord: 'a magazine', transcription: 'mæɡəˈziːn' },
				{ rusWord: 'рад', engWord: 'glad', transcription: 'ɡlæd' },
			]

			expect(receivedWords).toEqual(expectedWords)
		})
	})
})*/
