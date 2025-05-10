import ArticleType from '../articleTypes/articleType'
import articles from '../articlesData/articlesData'
import ExercisesType from '../articleTypes/exercisesType'
import wordTranscriptions from '../transcriptions/wordTranscriptions'
// import { PageUrls } from '../сonsts/pageUrls'
// import ArtType = ArticleType.ArtType

// type ArticleOfLevel = { name: string; url: string }

// Класс с методами работы со статьями
export class ArticleService {
	constructor(private articles: ArticleType.Art[]) {}

	/** Возвращает все статьи */
	getArticles() {
		return this.articles
	}

	/**
	 * Получение статьи по слагу
	 * @param articleSlug — слаг
	 * @param articleType — тип статьи:
	 * prev — предыдущая статья статьи с указанным слагом.
	 * this — статья с указанным слагом.
	 * next — следующая статья статьи с указанным слагом.
	 */
	getArticle(articleSlug: string, articleType: 'prev' | 'this' | 'next' = 'this'): null | ArticleType.Art {
		const articleIdx = this.articles.findIndex((article) => article.meta.slug === articleSlug)

		if (articleIdx < 0) {
			return null
		}

		if (articleType === 'prev') {
			return articleIdx > 0 ? this.articles[articleIdx - 1] : (null as any)
		} else if (articleType === 'next') {
			return articleIdx < this.articles.length - 1 ? this.articles[articleIdx + 1] : (null as any)
		}

		return this.articles[articleIdx]
	}

	/*getArticleExercises(
		articleSlug: string,
		exercisesId: number,
	): undefined | ExercisesType.ExercisesObj {
		const article = this.getArticle(articleSlug)
		if (!article || article.type !== ArtType.article) return

		const exercisesObj = article.content.find((contentItem) => {
			return contentItem.type === 'exercises' && contentItem.id === exercisesId
		})
		if (!exercisesObj) return

		// @ts-ignore
		return exercisesObj
	}*/

	/**
	 * Получает объект статьи и вычленяет блоки со словами для заучивания
	 * @param articleSlug — слаг статьи
	 */
	/*getArticleWordsByArticleSlug(articleSlug: string): ExercisesType.Word[] {
		const article = this.getArticle(articleSlug)
		if (!article || article.type !== ArticleType.ArtType.article) return []

		const wordBlocks: ExercisesType.Word[] = []

		// Get article's words
		article.content.forEach((currentComp) => {
			if (currentComp.type !== 'exercises') return

			currentComp.exercises.forEach((exercise) => {
				if (!exercise.words) return

				wordBlocks.push(...exercise.words)
			})
		})

		return this.prepareArticleWords(wordBlocks)
	}*/

	prepareArticleWords(wordBlocks?: ExercisesType.Word[]) {
		if (!wordBlocks) return []

		const newWordBlocks: ExercisesType.Word[] = []

		// Set transcriptions to English words
		wordBlocks.forEach((wordBlock) => {
			const wordBlockCopy = { ...wordBlock }
			wordBlockCopy.transcription = wordTranscriptions[wordBlock.engWord]

			newWordBlocks.push(wordBlockCopy)
		})

		// Clear words from repeated ones
		const clearedWords: ExercisesType.Word[] = []

		newWordBlocks.forEach((currentWord) => {
			// Найти текущий блок слов в уже очищенном массиве
			const searchWordInClearedWords = clearedWords.find((clearedWord) => {
				return currentWord.rusWord == clearedWord.rusWord && currentWord.engWord == clearedWord.engWord
			})

			// Если не найден, то поставить
			if (!searchWordInClearedWords) {
				clearedWords.push(currentWord)
			}
		})

		return clearedWords
	}
}

const articleService = new ArticleService(articles)
export default articleService
