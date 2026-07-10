import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
	useFlashcardControllerRemoveFlashcard,
	getFlashcardControllerGetMyFlashcardsQueryKey,
} from '@/shared/api/generated/flashcard/flashcard'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'

type DeleteFlashcardButtonProps = {
	flashcardId: number
}

function DeleteFlashcardButton(props: DeleteFlashcardButtonProps) {
	const { flashcardId } = props

	const queryClient = useQueryClient()

	const { mutateAsync: deleteFlashcard, isPending: loading } = useFlashcardControllerRemoveFlashcard({
		mutation: {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: getFlashcardControllerGetMyFlashcardsQueryKey(),
				})
			},
		},
	})

	const handleDelete = async () => {
		try {
			await deleteFlashcard({
				data: {
					flashcardId: flashcardId,
				},
			})
			console.log('Flashcard deleted successfully!')
		} catch (e) {
			console.error('Error deleting flashcard:', e)
		}
	}

	return <Button icon={<TrashButtonIcon />} size='big' onClick={handleDelete} disabled={loading} />
}

export default DeleteFlashcardButton
