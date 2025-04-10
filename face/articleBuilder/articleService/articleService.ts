import ArticleType from '../articlesData/articleType'
import articles from '../articlesData/courseArticles/articlesData'
// import ExercisesType from '../articlesData/exercisesType'
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

	/*prepareArticleWords(wordBlocks?: ExercisesType.Word[]) {
		if (!wordBlocks) return []

		const newWordBlocks: ExercisesType.Word[] = []

		// Set transcriptions to English words
		wordBlocks.forEach((wordBlock) => {
			const wordBlockCopy = { ...wordBlock }
			wordBlockCopy.transcription = this.getEnglishWordTranscription(wordBlock.engWord)

			newWordBlocks.push(wordBlockCopy)
		})

		// Clear words from repeated ones
		const clearedWords: ExercisesType.Word[] = []

		newWordBlocks.forEach((currentWord) => {
			// Найти текущий блок слов в уже очищенном массиве
			const searchWordInClearedWords = clearedWords.find((clearedWord) => {
				return (
					currentWord.rusWord == clearedWord.rusWord &&
					currentWord.engWord == clearedWord.engWord
				)
			})

			// Если не найден, то поставить
			if (!searchWordInClearedWords) {
				clearedWords.push(currentWord)
			}
		})

		return clearedWords
	}*/

	/**
	 * Получает английское слово и возвращает его транскрипцию (если есть)
	 * @param engWord
	 */
	/*getEnglishWordTranscription(engWord: string) {
		const wordTranscriptions = {
			book: 'bʊk',
			magazine: 'mæɡəˈziːn',
			teacher: 'ˈtiːtʃə',
			doctor: 'ˈdɒktə',
			student: 'ˈstjuːd(ə)nt',
			sick: 'sɪk',
			child: 'tʃaɪld',
			glad: 'ɡlæd',
			ready: 'ˈredɪ',
			soon: 'suːn',
			happy: 'ˈhæpɪ',
			builder: 'ˈbɪldə',
			phone: 'fəʊn',
			door: 'dɔː',
			they: 'ðeɪ',
			still: 'stɪl',
			children: 'ˈtʃɪldrən',
			captains: 'ˈkæptɪnz',
			already: 'ɔːlˈredɪ',
			mechanic: 'mɪˈkænɪk',
			scientist: 'ˈsaɪəntɪst',
			challenge: 'ˈtʃælɪn(d)ʒ',
			completely: 'kəmˈpliːtlɪ',
			alone: 'əˈləʊn',
			professional: 'prəˈfeʃ(ə)n(ə)l',
			workaholic: 'wɜːkəˈhɒlɪk',
			builders: 'ˈbɪldəz',
			robbers: 'ˈrɒbəz',
			home: 'həʊm',
			adult: 'ˈædʌlt',
			tomorrow: 'təˈmɒrəʊ',
			new: 'njuː',
			day: 'deɪ',
			leader: 'ˈliːdə',
			team: 'tiːm',
			salesman: 'ˈseɪlzmən',
			cashier: 'kæˈʃɪə',
			frog: 'frɒɡ',
			princess: 'ˌprɪnˈses',
			savage: 'ˈsævɪdʒ',
			idiot: 'ˈɪdɪət',
			minute: 'ˈmɪnɪt',
			every: 'ˈevrɪ',
			ideal: 'aɪˈdɪəl',
			vine: 'vaɪn',
			policeman: 'pəˈliːsmən',
			airport: 'ˈeəpɔːt',
			envelope: 'ˈenvələʊp',
			advice: 'ədˈvaɪs',
			iron: 'ˈaɪən',
			artist: 'ˈɑːtɪst',
			curious: 'ˈkjʊərɪəs',
			that: 'ðæt',
			quiet: 'ˈkwaɪət',
			wrong: 'rɒŋ',
			way: 'weɪ',
			tough: 'tʌf',
			decision: 'dɪˈsɪʒ(ə)n',
			crazy: 'ˈkreɪzɪ',
			mountain: 'ˈmaʊntɪn',
			always: 'ˈɔːlweɪz',
			majestic: 'məˈdʒestɪk',
			often: 'ˈɒf(ə)n',
			busy: 'ˈbɪzɪ',
			potatoes: 'pəˈteɪtəʊz',
			tomatoes: 'təˈmɑːtəʊz',
			onions: 'ˈʌnjənz',
			common: 'ˈkɒmən',
			tired: 'taɪəd',
			talented: 'ˈtæləntɪd',
			singer: 'ˈsɪŋə',
			limited: 'ˈlɪmɪtɪd',
			series: 'ˈsɪəriːz',
			instructions: 'ɪnˈstrʌkʃənz',
			really: 'ˈriːəlɪ',
			confusing: 'kənˈfjuːzɪŋ',
			disappointed: 'dɪsəˈpɔɪntɪd',
			noticed: 'ˈnəʊtɪst',
			disgusting: 'dɪsˈɡʌstɪŋ',
			probably: 'ˈprɒbəblɪ',
			poisonous: 'ˈpɔɪzənəs',
			only: 'ˈəʊnlɪ',
			very: 'ˈverɪ',
			spoiled: 'spɔɪld',
			confused: 'kənˈfjuːzd',
			exciting: 'ɪkˈsaɪtɪŋ',
			show: 'ʃəʊ',
			irreplaceable: 'ɪrɪˈpleɪsəb(ə)l',
			inaccurate: 'ɪnˈækjʊrət',
			illiterate: 'ɪˈlɪt(ə)rət',
			beautiful: 'ˈbjuːtɪfʊl',
			open: 'ˈəʊpən',
			Russia: 'ˈrʌʃə',
			political: 'pəˈlɪtɪk(ə)l',
			party: 'ˈpɑːtɪ',
			issue: 'ˈɪʃuː',
			unknown: 'ʌnˈnəʊn',
			place: 'pleɪs',
			among: 'əˈmʌŋ',
			people: 'ˈpiːp(ə)l',
			unhappy: 'ʌnˈhæpɪ',
			sure: 'ʃʊə(r)',
			this: 'ðɪs',
			yellow: 'ˈjeləʊ',
			folder: 'ˈfəʊldə',
			real: 'rɪəl',
			man: 'mæn',
			pretty: 'ˈprɪtɪ',
			girl: 'ɡɜːl',
			black: 'blæk',
			just: 'dʒʌst',
			fun: 'fʌn',
			fact: 'fækt',
			good: 'ɡʊd',
			hysterical: 'hɪˈsterɪk(ə)l',
			fool: 'fuːl',
			narcissistic: 'ˌnɑːsɪˈsɪstɪk',
			metal: 'ˈmet(ə)l',
			bench: 'ben(t)ʃ',
			less: 'les',
			popular: 'ˈpɒpjʊlə',
			than: 'ðən',
			wooden: 'ˈwʊd(ə)n',
			mobile: 'ˈməʊbaɪl',
			secure: 'sɪˈkjʊə',
			dog: 'dɒɡ',
			loyal: 'ˈlɔɪəl',
			pet: 'pet',
			human: 'ˈhjuːmən',
			baby: 'ˈbeɪbɪ',
			totally: 'ˈtəʊtəlɪ',
			helpless: 'ˈhelpləs',
			criminal: 'ˈkrɪmɪn(ə)l',
			must: 'mʌst',
			famous: 'ˈfeɪməs',
			old: 'əʊld',
			village: 'ˈvɪlɪdʒ',
		}

		// @ts-ignore
		return wordTranscriptions[engWord]
	}*/
}

const articleService = new ArticleService(articles)
export default articleService
