// import articleService from '../../articleService/articleService'
// import { EventEmitter } from '../../../utils/eventEmitter'
// import { TelegramGroup } from '../../../utils/telegramGroup'
// import ExercisesType from '../../articlesData/exercisesType'
// import { ExerciseChecker } from './ExerciseChecker'
// import { ExercisesManagerTypes } from './exercisesManagerTypes'

// import { useExercisesStore } from '../../../../_pages/courseArticlePage/ExercisesStoreWrapper/exercisesStore/exercisesStore'

/** Класс предоставляющий методы для формирования данных и прохождения упражнений */
const exercisesLogic = {
	/** Проверяет перевод текущего упражнения на правильность */
	/*async checkCurrentExercise() {

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
