import ArticleType from '../../../articleTypes/articleType'
import ExercisesType from '../../../articleTypes/exercisesType'
import { ExercisesContextType } from './exercisesContextTypes'

/** Класс с методами проверки перевода данного пользователем */
export const exerciseChecker = {
	/**
	 * Ищет в данных упражнения перевод похожий на тот, который дал пользователь.
	 * И если находит, то возвращает объект с данными, чтобы показать разбор перевода.
	 * Если не находит, то возвращает undefined.
	 * @param exercise — данные упражнения
	 * @param exerciseType
	 */
	checkInLocalData(
		exercise: ExercisesContextType.Exercise,
		exerciseType: ExercisesContextType.ExerciseType,
	): undefined | ExercisesContextType.Analysis {
		// Массив правильных ответов на это упражнение
		const correctTranslations = this.getCorrectTranslations(exercise)

		// Анализ первого правильного упражнения
		let firstCorrectTranslationAnalysis: ArticleType.Content = []
		if (correctTranslations.length && correctTranslations[0].analysis) {
			firstCorrectTranslationAnalysis = correctTranslations[0].analysis
		}

		// Если упражнение голосовое, нужно просто вернуть правильный ответ потому что ученик ничего не вводит.
		if (exerciseType === ExercisesContextType.ExerciseType.oral) {
			return {
				status: ExercisesContextType.AnalysisStatus.visible,
				isTranslateCorrect: true, // Значение не важно
				correctTranslations,
				translateAnalysis: firstCorrectTranslationAnalysis,
			}
		}

		// Если никакой перевод не написали, то помечать такое упражнение проваленным.
		if (!exercise.userTranslate) {
			return {
				status: ExercisesContextType.AnalysisStatus.visible,
				isTranslateCorrect: false,
				correctTranslations,
				translateAnalysis: firstCorrectTranslationAnalysis,
			}
		}

		// Найти в данных перевод похожий на тот, что написал ученик...
		const similarTranslation = this.findSimilarTranslation(exercise.engSentences, exercise.userTranslate)

		if (similarTranslation) {
			let translateAnalysis = similarTranslation.analysis
			if (!translateAnalysis) {
				if (similarTranslation.isCorrect) {
					translateAnalysis = [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Перевод написан правильно.' }],
						},
					]
				} else {
					translateAnalysis = [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Перевод написан неверно.' }],
						},
					]
				}
			}

			return {
				status: ExercisesContextType.AnalysisStatus.visible,
				isTranslateCorrect: similarTranslation.isCorrect,
				correctTranslations,
				translateAnalysis,
			}
		}
	},
	/**
	 * Получает упражнение и вычленяет правильные варианты переводов
	 * @param exercise — объект упражнения
	 */
	getCorrectTranslations(exercise: ExercisesContextType.Exercise) {
		return exercise.engSentences.filter((engSentence) => {
			return engSentence.isCorrect
		})
	},

	/**
	 * Находит в переданных переводах перевод похожий на тот, что дал пользователь.
	 * @param translations — список существующих вариантов перевода в данных упражнения
	 * @param userTranslation — перевод, данный пользователем
	 */
	findSimilarTranslation(translations: ExercisesType.EngSentence[], userTranslation: string) {
		const userDryTranslation = this.drySentence(userTranslation)

		return translations.find((translation) => {
			const foundSentences = translation.engSentences.find((engSentence) => {
				return this.drySentence(engSentence) === userDryTranslation
			})

			return !!foundSentences
		})
	},

	/**
	 * Получает предложение и приводит его к «высушенному» виду чтобы можно было сравнивать с похожими предложениями.
	 * Например, буквы приводятся к нижнему регистру, убираются знаки препинания, сокращения заменяются на полные варианты.
	 * @param sentence — предложение, которое нужно высушить
	 */
	drySentence(sentence: string) {
		// Обрезать пробелы с двух сторон
		let dryText = sentence.trim()

		// Удалить знаки препинания
		dryText = dryText.replace(/[\.,!?¯_一ー−‐‑]/g, '')

		// Привести апострофы к единому виду
		dryText = dryText.replace(/[`′᾿'ˈꞌ]/g, "'")

		// Привести буквы к нижнему регистру
		dryText = dryText.toLowerCase()

		// Привести сокращения к единому виду
		dryText = dryText.replace(/don't/g, 'do not')
		dryText = dryText.replace(/doesn't/g, 'does not')
		dryText = dryText.replace(/didn't/g, 'did not')
		dryText = dryText.replace(/can't/g, 'cannot')
		dryText = dryText.replace(/couldn't/g, 'could not')
		dryText = dryText.replace(/hadn't/g, 'had not')
		dryText = dryText.replace(/hasn't/g, 'has not')
		dryText = dryText.replace(/haven't/g, 'have not')
		dryText = dryText.replace(/i've/g, 'i have')
		dryText = dryText.replace(/mustn't/g, 'must not')
		dryText = dryText.replace(/shouldn't/g, 'should not')
		dryText = dryText.replace(/weren't/g, 'were not')
		dryText = dryText.replace(/won't/g, 'will not')
		dryText = dryText.replace(/you're/g, 'you are')
		dryText = dryText.replace(/you've/g, 'you have')

		return dryText
	},
}
