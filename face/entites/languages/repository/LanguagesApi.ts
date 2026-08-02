import { languageControllerGetLanguages } from '@/shared/api/generated/language/language'
import type { LanguageOutModel } from '@/shared/api/generated/models'
import { ApiResult, executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { LanguageModel, LanguagesRepository } from './LanguagesRepository'

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
	async getLanguages(): Promise<ApiResult<LanguageModel[]>> {
		return executeApiCall(
			() => languageControllerGetLanguages(),
			(data) => data.map(mapToLanguage),
		)
	}
}

// ─── Приватные мапперы ─────────────────────────────────────────────────────

function mapToLanguage(raw: LanguageOutModel): LanguageModel {
	return {
		name: raw.name,
		nameEng: raw.nameEng,
		code: raw.code,
	}
}
