import { useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '@/shared/api/auth/UserProvider'
import {
	useFlashcardControllerAddFlashcard,
	useFlashcardControllerRemoveFlashcard,
	getFlashcardControllerGetMyFlashcardsQueryKey,
} from '@/shared/api/generated/flashcard/flashcard'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'

type UseFlashCardButtonInput = {
	sentencePhraseId: number
	flashcardId: null | number
}

export type FlashCardButtonView =
	| { state: 'hidden' }
	| { state: 'add'; onClick: () => void; disabled: boolean }
	| { state: 'remove'; onClick: () => void; disabled: boolean }

export function useFlashCardButton(input: UseFlashCardButtonInput): FlashCardButtonView {
	const user = useUser()
	const { notify } = useContext(NotificationContext)
	const setPhraseFlashcardId = useDetailsStore((s) => s.setPhraseFlashcardId)
	const queryClient = useQueryClient()

	const { mutateAsync: flashcardAdd, isPending: isAddPending } = useFlashcardControllerAddFlashcard()
	const { mutateAsync: flashcardRemove, isPending: isRemovePending } = useFlashcardControllerRemoveFlashcard()
	const isLoading = isAddPending || isRemovePending

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

				flashcardRemove({ data: { flashcardId } })
					.then(function () {
						queryClient.invalidateQueries({
							queryKey: getFlashcardControllerGetMyFlashcardsQueryKey(),
						})
					})
					.catch(function () {
						setPhraseFlashcardId({
							sentencePhraseId: input.sentencePhraseId,
							flashcardId,
						})

						notify({
							type: 'error',
							message: 'Не удалось удалить карточку. Попробуйте ещё раз.',
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
				data: { sentencePhraseTranslationId: input.sentencePhraseId },
			})
				.then(function (response) {
					const created = response as unknown as { id: number }

					if (created?.id) {
						setPhraseFlashcardId({
							sentencePhraseId: input.sentencePhraseId,
							flashcardId: created.id,
						})

						queryClient.invalidateQueries({
							queryKey: getFlashcardControllerGetMyFlashcardsQueryKey(),
						})
						return
					}

					setPhraseFlashcardId({
						sentencePhraseId: input.sentencePhraseId,
						flashcardId: null,
					})

					notify({
						type: 'error',
						message: 'Не удалось добавить карточку. Попробуйте ещё раз.',
					})
				})
				.catch(function () {
					setPhraseFlashcardId({
						sentencePhraseId: input.sentencePhraseId,
						flashcardId: null,
					})

					notify({
						type: 'error',
						message: 'Не удалось добавить карточку. Попробуйте ещё раз.',
					})
				})
		},
	}
}
