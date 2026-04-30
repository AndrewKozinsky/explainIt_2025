import { useUserStore } from 'stores/userStore'
import {
	Flashcard_Get_MyDocument,
	Flashcard_Get_MyQuery,
	useFlashcard_Add,
	useFlashcard_Remove,
} from '@/graphql'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'

type UseFlashCardButtonInput = {
	sentencePhraseId: number
	flashcardId: null | number
}

export type FlashCardButtonView =
	| { state: 'hidden' }
	| { state: 'add'; onClick: () => void; disabled: false }
	| { state: 'remove'; onClick: () => void; disabled: false }
	| { state: 'loading'; onClick: undefined; disabled: true }

export function useFlashCardButton(input: UseFlashCardButtonInput): FlashCardButtonView {
	const user = useUserStore((s) => s.user)
	const setPhraseFlashcardId = useDetailsStore((s) => s.setPhraseFlashcardId)

	const [flashcardAdd, addState] = useFlashcard_Add({
		update(cache, { data: addData }) {
			const existingData = cache.readQuery<Flashcard_Get_MyQuery>({
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

	if (!user) {
		return { state: 'hidden' }
	}

	if (addState.loading || removeState.loading) {
		return { state: 'loading', onClick: undefined, disabled: true }
	}

	if (input.flashcardId !== null) {
		return {
			state: 'remove',
			disabled: false,
			onClick: function handleRemove() {
				const flashcardId = input.flashcardId
				if (flashcardId === null) return

				flashcardRemove({
					variables: { input: { flashcardId } },
				})
					.then(function (response) {
						if (!response.data?.flashcard_remove) return
						setPhraseFlashcardId({
							sentencePhraseId: input.sentencePhraseId,
							flashcardId: null,
						})
					})
					.catch(function () {})
			},
		}
	}

	return {
		state: 'add',
			disabled: false,
			onClick: function handleAdd() {
			flashcardAdd({
				variables: { input: { sentencePhraseTranslationId: input.sentencePhraseId } },
			})
				.then(function (response) {
					const created = response.data?.flashcard_add
					if (!created) return
					setPhraseFlashcardId({
						sentencePhraseId: input.sentencePhraseId,
						flashcardId: created.id,
					})
				})
				.catch(function () {})
		},
	}
}

