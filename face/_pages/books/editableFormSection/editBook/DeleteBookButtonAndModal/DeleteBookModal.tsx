import React from 'react'
import Button from '../../../../../ui/formRelated/buttons/Button/Button'
import Modal from '../../../../../ui/Modal/Modal'
import Paragraph from '../../../../../ui/Paragraph/Paragraph'
import { publicFolderFilesUrls } from '../../../../../utils/publicFolderFilesUrls'
import { useGetDeleteBook } from './fn/getDeleteBook'

type DeleteBookModalProps = {
	isModalOpen: boolean
	closeModal: () => void
}

function DeleteBookModal(props: DeleteBookModalProps) {
	const { isModalOpen, closeModal } = props

	const { onDeleteBookClick, status } = useGetDeleteBook(closeModal)

	return (
		<Modal header='Удаление книги' isOpen={isModalOpen} close={closeModal}>
			<Paragraph fontSize='15'>Вы действительно хотите удалить книгу вместе со всеми главами?</Paragraph>
			<Button
				theme='danger'
				onClick={onDeleteBookClick}
				icon={publicFolderFilesUrls.icons.trashButtonIcon}
				loading={status === 'loading'}
			>
				Удалить книгу
			</Button>
		</Modal>
	)
}

export default DeleteBookModal
