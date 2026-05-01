import { useContext } from 'react'
import { useUserStore } from 'stores/userStore'
import { Flashcard_Get_MyDocument, Flashcard_Get_My, useFlashcard_Add, useFlashcard_Remove } from '@/graphql'
import { extractGraphQLError } from '@/graphql/extractGraphQLError'
import { NotificationContext } from '@/ui/Notification/context'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'

type UseFlashCardButtonInput = {
	sentencePhraseId: number
	flashcardId: null | number
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
	const graphQLError = extractGraphQLError(error)

	if (graphQLError?.message) return graphQLError.message
	if (error instanceof Error && error.message) return error.message

	return fallbackMessage
}

export type FlashCardButtonView =
	| { state: 'hidden' }
	| { state: 'add'; onClick: () => void; disabled: boolean }
	| { state: 'remove'; onClick: () => void; disabled: boolean }

export function useFlashCardButton(input: UseFlashCardButtonInput): FlashCardButtonView {
	const user = useUserStore((s) => s.user)
	const { notify } = useContext(NotificationContext)
	const setPhraseFlashcardId = useDetailsStore((s) => s.setPhraseFlashcardId)

	const [flashcardAdd, addState] = useFlashcard_Add({
		update(cache, { data: addData }) {
			const existingData = cache.readQuery<Flashcard_Get_My>({
				query: Flashcard_Get_MyDocument,
				variables: { input: {} },
			})

			if (existingData && addData?.flashcard_add) {
				cache.writeQuery({
					query: Flashcard_Get_MyDocument,
					variables: { input: {} },
					data: {
						flashcard_get_my: [...existingData.flashcard_get_my, addData.flashcard_add],
					},
				})
			}
		},
	})
	const [flashcardRemove, removeState] = useFlashcard_Remove()
	const isLoading = addState.loading || removeState.loading

	if (!user) {
		return { state: 'hidden' }
	}

	if (input.flashcardId !== null) {
		return {
			state: 'remove',
			disabled: isLoading,
			onClick: function handleRemove() {
				const flashcardId = input.flashcardId
				if (flashcardId === null) return
				if (isLoading) return

				setPhraseFlashcardId({
					sentencePhraseId: input.sentencePhraseId,
					flashcardId: null,
				})

				flashcardRemove({
					variables: { input: { flashcardId } },
				})
					.then(function (response) {
						if (response.data?.flashcard_remove) return

						const responseErrorMessage =
							response.errors?.[0]?.message || 'Не удалось удалить карточку. Попробуйте ещё раз.'

						setPhraseFlashcardId({
							sentencePhraseId: input.sentencePhraseId,
							flashcardId,
						})

						notify({
							type: 'error',
							message: responseErrorMessage,
						})
					})
					.catch(function (error) {
						setPhraseFlashcardId({
							sentencePhraseId: input.sentencePhraseId,
							flashcardId,
						})

						notify({
							type: 'error',
							message: getErrorMessage(error, 'Не удалось удалить карточку. Попробуйте ещё раз.'),
						})
					})
			},
		}
	}

	return {
		state: 'add',
		disabled: isLoading,
		onClick: function handleAdd() {
			if (isLoading) return

			setPhraseFlashcardId({
				sentencePhraseId: input.sentencePhraseId,
				flashcardId: -1,
			})

			flashcardAdd({
				variables: { input: { sentencePhraseTranslationId: input.sentencePhraseId } },
			})
				.then(function (response) {
					const created = response.data?.flashcard_add
					const responseErrorMessage =
						response.errors?.[0]?.message || 'Не удалось добавить карточку. Попробуйте ещё раз.'

					if (created) {
						setPhraseFlashcardId({
							sentencePhraseId: input.sentencePhraseId,
							flashcardId: created.id,
						})
						return
					}

					setPhraseFlashcardId({
						sentencePhraseId: input.sentencePhraseId,
						flashcardId: null,
					})

					notify({
						type: 'error',
						message: responseErrorMessage,
					})
				})
				.catch(function (error) {
					setPhraseFlashcardId({
						sentencePhraseId: input.sentencePhraseId,
						flashcardId: null,
					})

					notify({
						type: 'error',
						message: getErrorMessage(error, 'Не удалось добавить карточку. Попробуйте ещё раз.'),
					})
				})
		},
	}
}
