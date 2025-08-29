import React from 'react'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { publicFolderFilesUrls } from '@/utils/publicFolderFilesUrls'
import DeleteBookModal from './DeleteBookModal'

function DeleteBookButtonAndModal() {
	const [isModalOpen, setIsModalOpen] = React.useState(false)

	return (
		<>
			<Button
				theme='danger'
				onClick={() => setIsModalOpen(true)}
				icon={publicFolderFilesUrls.icons.trashButtonIcon}
			>
				Удалить...
			</Button>
			<DeleteBookModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
		</>
	)
}

export default DeleteBookButtonAndModal
