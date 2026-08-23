// import React, { useState } from 'react'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { flashcardQueries } from '@/entities/flashcard/FlashcardQueryFacade'
// import Button from '@/shared/ui/formRelated/buttons/Button/Button'
// import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'

/*type DeleteFlashcardButtonProps = {
	flashcardId: number
}*/

/*function DeleteFlashcardButton(props: DeleteFlashcardButtonProps) {
	const { flashcardId } = props

	const queryClient = useQueryClient()
	const removeFlashcard = useMutation(flashcardQueries.removeFlashcard(queryClient))
	const [loading, setLoading] = useState(false)

	const handleDelete = async () => {
		setLoading(true)
		try {
			await removeFlashcard.mutateAsync({ flashcardId })
			console.log('Flashcard deleted successfully!')
		} catch (e) {
			console.error('Error deleting flashcard:', e)
		} finally {
			setLoading(false)
		}
	}

	return <Button icon={<TrashButtonIcon />} size='big' onClick={handleDelete} disabled={loading} />
}*/

// export default DeleteFlashcardButton
