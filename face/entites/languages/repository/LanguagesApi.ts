import { languageControllerGetLanguages } from '@/shared/api/generated/language/language'
import type { LanguageOutModel } from '@/shared/api/generated/models'
import type { Language, LanguagesRepository } from './LanguagesRepository'

/**
 * Реализация LanguagesRepository через REST API.
 * Внутри использует Orval-сгенерированные функции, снаружи отдаёт унифицированные типы.
 *
 * ## Обработка ошибок
 *
 * Методы НЕ содержат try/catch. Вместо этого они полагаются на цепочку:
 *
 * ```
 * Сервер (ошибка)
 *   → GlobalExceptionFilter формирует JSON с errorMessageCode
 *   → customMutator видит !res.ok и выбрасывает ApiError
 *   → метод НЕ ловит — ошибка прокидывается наверх
 *   → useFetchData / useAsyncMutation ловит в try/catch
 *   → resolveError извлекает errorMessageCode → читаемый текст
 *   → Компонент получает { error: "…" }
 * ```
 */
export class LanguagesApi implements LanguagesRepository {
	async getLanguages(): Promise<Language[]> {
		const response = await languageControllerGetLanguages()

		// При ошибке customMutator выбрасывает ApiError, сюда попадаем только при успехе.
		return response.data.map(mapToLanguage)
	}
}

// ─── Приватные мапперы ─────────────────────────────────────────────────────

function mapToLanguage(raw: LanguageOutModel): Language {
	return {
		name: raw.name,
		nameEng: raw.nameEng,
		code: raw.code,
	}
}
