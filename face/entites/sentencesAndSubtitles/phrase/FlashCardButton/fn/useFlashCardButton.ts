import { useContext, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useDetailsStore } from '@/entites/detailsBlock/detailsStore'
import { FlashcardApi } from '@/entites/flashcard/repository/FlashcardApi'
import { useUser } from '@/shared/api/auth/UserProvider'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'

const FLASHCARDS_QUERY_KEY = ['/api/flashcard'] as const

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

	const flashcardApi = useMemo(() => new FlashcardApi(), [])

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

				flashcardApi
					.removeFlashcard({ flashcardId })
					.then(function (result) {
						if (result.error) {
							setPhraseFlashcardId({
								sentencePhraseId: input.sentencePhraseId,
								flashcardId,
							})

							notify({
								type: 'error',
								message: 'Не удалось удалить карточку. Попробуйте ещё раз.',
							})
							return
						}

						queryClient.invalidateQueries({ queryKey: FLASHCARDS_QUERY_KEY })
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

			flashcardApi
				.addFlashcard({ sentencePhraseTranslationId: input.sentencePhraseId })
				.then(function (result) {
					if (result.error) {
						setPhraseFlashcardId({
							sentencePhraseId: input.sentencePhraseId,
							flashcardId: null,
						})

						notify({
							type: 'error',
							message: 'Не удалось добавить карточку. Попробуйте ещё раз.',
						})
						return
					}

					if (result.data?.id) {
						setPhraseFlashcardId({
							sentencePhraseId: input.sentencePhraseId,
							flashcardId: result.data.id,
						})

						queryClient.invalidateQueries({ queryKey: FLASHCARDS_QUERY_KEY })
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
