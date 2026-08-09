import { queryOptions, type QueryClient } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { flashcardService } from './FlashcardService'
import type {
	AddFlashcardInput,
	FlashcardService,
	GetMyFlashcardsParams,
	RemoveFlashcardInput,
} from './FlashcardService'

/**
 * Ключи кэша серверных данных флеш-карточек.
 *
 * Параметры, влияющие на ответ, входят в ключ. Это позволяет React Query
 * хранить независимые списки для разных языков и инвалидировать их одним
 * префиксом `all` после любой мутации.
 */
export const flashcardQueryKeys = {
	all: ['flashcards'] as const,
	list: (params?: GetMyFlashcardsParams) =>
		[...flashcardQueryKeys.all, 'list', { languageCode: params?.languageCode ?? null }] as const,
}

/**
 * Адаптер между доменным сервисом и TanStack Query.
 *
 * В кэш попадают `FlashcardModel`, а не DTO OpenAPI: все источники данных
 * продолжают соответствовать контракту `FlashcardRepository`.
 */
export class FlashcardQueryFacade {
	constructor(private readonly service: FlashcardService) {}

	getMyFlashcards(params?: GetMyFlashcardsParams) {
		return queryOptions({
			queryKey: flashcardQueryKeys.list(params),
			queryFn: () => unwrapApiResult(this.service.getMyFlashcards(params)),
		})
	}

	addFlashcard(queryClient: QueryClient) {
		return {
			mutationFn: (input: AddFlashcardInput) => unwrapApiResult(this.service.addFlashcard(input)),
			onSuccess: () => this.invalidateMyFlashcards(queryClient),
		}
	}

	removeFlashcard(queryClient: QueryClient) {
		return {
			mutationFn: (input: RemoveFlashcardInput) => unwrapApiResult(this.service.removeFlashcard(input)),
			onSuccess: () => this.invalidateMyFlashcards(queryClient),
		}
	}

	invalidateMyFlashcards(queryClient: QueryClient) {
		return queryClient.invalidateQueries({ queryKey: flashcardQueryKeys.all })
	}
}

export const flashcardQueries = new FlashcardQueryFacade(flashcardService)
