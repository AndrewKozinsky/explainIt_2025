import React from 'react'
import { TrashButtonIcon } from 'ui/icons/TrashButtonIcon'
import { Flashcard_Get_MyDocument, useFlashcard_Remove } from '@/graphql'
import Button from '@/ui/formRelated/buttons/Button/Button'

type DeleteFlashcardButtonProps = {
	flashcardId: number
}

function DeleteFlashcardButton(props: DeleteFlashcardButtonProps) {
	const { flashcardId } = props

	const [deleteFlashcard, { loading, error }] = useFlashcard_Remove({
		refetchQueries: [Flashcard_Get_MyDocument],
	})

	const handleDelete = async () => {
		try {
			await deleteFlashcard({
				variables: {
					input: {
						flashcardId: flashcardId,
					},
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
