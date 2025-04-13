// import articleService from '../../articleService/articleService'
// import { EventEmitter } from '../../../utils/eventEmitter'
// import { TelegramGroup } from '../../../utils/telegramGroup'
// import ExercisesType from '../../articlesData/exercisesType'
// import { ExerciseChecker } from './ExerciseChecker'
// import { ExercisesManagerTypes } from './exercisesManagerTypes'

import { useExercisesStore } from '../../../../_pages/courseArticlePage/ExercisesStoreWrapper/exercisesStore/exercisesStore'

/** Класс предоставляющий методы для формирования данных и прохождения упражнений */
const exercisesLogic = {
	useGetExercisesBlock(exercisesBlockId: number) {
		const exercises = useExercisesStore((s) => s.exercises)
		return exercises.find((exercisesBlock) => exercisesBlock.exercisesBlockId === exercisesBlockId)
	},
	useGetCurrentSentence(exercisesBlockId: number) {
		const exercises = useExercisesStore((s) => s.exercises)
		const thisExercises = exercises.find((exercisesBlock) => exercisesBlock.exercisesBlockId === exercisesBlockId)
		if (!thisExercises) return null

		const currentSentenceId = thisExercises.currentSentenceId
		return thisExercises.exercises.find((exercise) => exercise.id === currentSentenceId)
	},
	/** Делает первое письменное упражнение текущим */
	/*switchToFirstWritingExercise() {
		const firstWritingExerciseId = this.store.exercisesWriting[0].id
		this.switchToExerciseById(firstWritingExerciseId)
	}*/
	/** Делает первое голосовое упражнение текущим */
	/*switchToFirstOralExercise() {
		const firstWritingExerciseId = this.store.exercisesOral[0].id
		this.switchToExerciseById(firstWritingExerciseId)
	}*/
	/** Находит следующее письменное упражнение относительно текущего или возвращает undefined */
	/*getNextWritingExercise() {
		return this.getNextExercise(this.store.exercisesWriting)
	}*/
	/** Находит следующее письменное упражнение относительно текущего или возвращает undefined */
	/*getNextOralExercise() {
		return this.getNextExercise(this.store.exercisesOral)
	}*/
	/** Находит следующее упражнение в массиве упражнений относительно текущего или возвращает undefined */
	/*getNextExercise(exercises: ExercisesManagerTypes.Exercise[]): undefined | ExercisesManagerTypes.Exercise {
		const currentExerciseId = this.store.currentExercise.id

		let nextExercise: undefined | ExercisesManagerTypes.Exercise = undefined

		exercises.forEach((exercise, i) => {
			if (exercise.id === currentExerciseId) {
				nextExercise = exercises[i + 1]
			}
		})

		return nextExercise
	}*/
	/** Проверяет перевод текущего упражнения на правильность */
	/*async checkCurrentExercise() {
		const exercise = this.store.currentExercise

		const analysisInLocalDataRes = this.exerciseChecker.checkInLocalData(exercise)

		if (analysisInLocalDataRes) {
			this.store.analysis = analysisInLocalDataRes

			this.eventEmitter.emit(ExercisesManagerTypes.Event.storeChanged)
			return
		}

		this.store.analysis = { status: ExercisesManagerTypes.AnalysisStatus.loading }
		this.eventEmitter.emit(ExercisesManagerTypes.Event.storeChanged)

		const gigaChatAnalysis = await this.exerciseChecker.checkByAI(exercise)

		this.sendMessageToTelegramAboutUnknownTranslation(exercise, gigaChatAnalysis)

		this.store.analysis = gigaChatAnalysis
		this.eventEmitter.emit(ExercisesManagerTypes.Event.storeChanged)
	}*/
	/**
	 * Отправляет в группу Телеграма сообщение о новом варианте перевода русского предложения
	 * @param exercise — данные упражнения
	 * @param analysis — данные анализа упражнения
	 */
	/*sendMessageToTelegramAboutUnknownTranslation(exercise: ExercisesManagerTypes.Exercise, analysis: any) {
		let analysisText = 'При разборе произошла ошибка'

		try {
			analysisText = analysis.translateAnalysis[0].children[0].text
		} catch (err: unknown) {}

		this.telegramGroup.sendMessage(
			`У главы «${this.chapterName}» появился новый перевод:
Предложение: ${exercise.rusSentence}
Перевод: ${exercise.userTranslate}
Разбор:  ${analysisText}`,
		)
	}*/
	/**
	 * Ставит в данные упражнения перевод данный пользователем.
	 * @param translateText — перевод данный пользователем
	 */
	/*setUserTranslateToExercise(translateText: string) {
		this.store.currentExercise.userTranslate = translateText
		this.store.analysis.status = ExercisesManagerTypes.AnalysisStatus.hidden

		this.eventEmitter.emit(ExercisesManagerTypes.Event.storeChanged)
	}*/
}

export default exercisesLogic
