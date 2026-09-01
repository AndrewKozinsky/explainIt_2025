import { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { flashcardQueries } from '@/entities/flashcard/FlashcardQueryFacade'
import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import { useUser } from '@/shared/api/auth/UserProvider'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'

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
	const mediaStore = useMediaStoreContext()
	const setPhraseFlashcardId = mediaStore((s) => s.setPhraseFlashcardId)
	const queryClient = useQueryClient()
	const removeFlashcard = useMutation(flashcardQueries.removeFlashcard(queryClient))
	const addFlashcard = useMutation(flashcardQueries.addFlashcard(queryClient))

	const [isLoading, setIsLoading] = useState(false)

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

				setIsLoading(true)

				setPhraseFlashcardId({
					sentencePhraseId: input.sentencePhraseId,
					flashcardId: null,
				})

				removeFlashcard
					.mutateAsync({ flashcardId })
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
					.finally(function () {
						setIsLoading(false)
					})
			},
		}
	}

	return {
		state: 'add',
		disabled: isLoading,
		onClick: function handleAdd() {
			if (isLoading) return

			setIsLoading(true)

			setPhraseFlashcardId({
				sentencePhraseId: input.sentencePhraseId,
				flashcardId: -1,
			})

			addFlashcard
				.mutateAsync({ sentencePhraseTranslationId: input.sentencePhraseId })
				.then(function (flashcard) {
					if (flashcard.id) {
						setPhraseFlashcardId({
							sentencePhraseId: input.sentencePhraseId,
							flashcardId: flashcard.id,
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
				.finally(function () {
					setIsLoading(false)
				})
		},
	}
}
