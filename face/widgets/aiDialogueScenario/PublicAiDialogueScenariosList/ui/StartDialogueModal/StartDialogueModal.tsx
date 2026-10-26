import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import Modal from '@/shared/ui/Modal/Modal'
import ModalHeaderAndContent from '@/shared/ui/Modal/ModalHeaderAndContent'

type Props = {
	title: string
	isOpen: boolean
	loading: boolean
	onClose: () => void
	onStart: () => void
}

export default function StartDialogueModal({ title, isOpen, loading, onClose, onStart }: Props) {
	return (
		<Modal isOpen={isOpen} close={onClose}>
			<ModalHeaderAndContent header={title}>
				<Button theme='accent' loading={loading} onClick={onStart}>
					Начать диалог
				</Button>
			</ModalHeaderAndContent>
		</Modal>
	)
}
