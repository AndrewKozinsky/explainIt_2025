// import { LanguagesApi } from './repository/LanguagesApi'
// import type { LanguagesRepository } from './repository/LanguagesRepository'

// export type { LanguageModel, LanguagesRepository } from './repository/LanguagesRepository'

/**
 * Сервис языков — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link LanguagesRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new LanguagesApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
/*export class LanguagesService {
	private languagesRepository: LanguagesRepository

	constructor(languagesRepository: LanguagesRepository) {
		this.languagesRepository = languagesRepository
	}

	/!** Получить список доступных языков *!/
	async getLanguages() {
		return this.languagesRepository.getLanguages()
	}
}*/

/** Готовый экземпляр сервиса с реальным API */
// export const languagesService = new LanguagesService(new LanguagesApi())
