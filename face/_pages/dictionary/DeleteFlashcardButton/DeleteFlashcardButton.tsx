import React, { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { FlashcardApi } from '@/entites/flashcard/repository/FlashcardApi'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'

const FLASHCARDS_QUERY_KEY = ['/api/flashcard'] as const

type DeleteFlashcardButtonProps = {
	flashcardId: number
}

function DeleteFlashcardButton(props: DeleteFlashcardButtonProps) {
	const { flashcardId } = props

	const queryClient = useQueryClient()
	const flashcardApi = useMemo(() => new FlashcardApi(), [])

	const [loading, setLoading] = useState(false)

	const handleDelete = async () => {
		setLoading(true)
		try {
			const result = await flashcardApi.removeFlashcard({ flashcardId })

			if (result.error) {
				console.error('Error deleting flashcard:', result.error)
				return
			}

			queryClient.invalidateQueries({ queryKey: FLASHCARDS_QUERY_KEY })
			console.log('Flashcard deleted successfully!')
		} catch (e) {
			console.error('Error deleting flashcard:', e)
		} finally {
			setLoading(false)
		}
	}

	return <Button icon={<TrashButtonIcon />} size='big' onClick={handleDelete} disabled={loading} />
}

export default DeleteFlashcardButton
