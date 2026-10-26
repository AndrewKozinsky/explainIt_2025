import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/TrashButtonIcon'
import Button from '../formRelated/buttons/Button/Button'
import Modal from '../Modal/Modal'
import ModalHeaderAndContent from '../Modal/ModalHeaderAndContent'
import Paragraph from '../Paragraph/Paragraph'
import { useGetDeleteEntity } from './fn/getDeleteEntity'

type DeleteBookModalProps = {
	isModalOpen: boolean
	closeModal: () => void
	onDeleteButtonClick: () => Promise<void>
	isDeleteButtonLoading: boolean
	modal: {
		header: string
		content: string
		confirmButtonText: string
	}
}

function DeleteEntityModal(props: DeleteBookModalProps) {
	const { isModalOpen, closeModal, onDeleteButtonClick, isDeleteButtonLoading, modal } = props

	const deleteEntity = useGetDeleteEntity(onDeleteButtonClick, closeModal)

	return (
		<Modal isOpen={isModalOpen} close={closeModal}>
			<ModalHeaderAndContent header={modal.header}>
				<Paragraph fontSize='15'>{modal.content}</Paragraph>
				<Button
					type='button'
					theme='danger'
					onClick={deleteEntity}
					icon={<TrashButtonIcon />}
					loading={isDeleteButtonLoading}
				>
					{modal.confirmButtonText}
				</Button>
			</ModalHeaderAndContent>
		</Modal>
	)
}

export default DeleteEntityModal
