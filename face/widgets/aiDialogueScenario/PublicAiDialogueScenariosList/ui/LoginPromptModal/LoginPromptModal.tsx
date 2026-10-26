'use client'

import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import Modal from '@/shared/ui/Modal/Modal'
import ModalHeaderAndContent from '@/shared/ui/Modal/ModalHeaderAndContent'
import './LoginPromptModal.scss'

type LoginPromptModalProps = {
	isOpen: boolean
	onClose: () => void
	onLogin: () => void
	onRegister: () => void
}

function LoginPromptModal(props: LoginPromptModalProps) {
	const { isOpen, onClose, onLogin, onRegister } = props

	return (
		<Modal isOpen={isOpen} close={onClose}>
			<ModalHeaderAndContent header='Войдите в учётную запись'>
				<div className='login-prompt-modal__content'>
					<p>Войдите в учётную запись, чтобы создать диалог с ИИ.</p>
					<div className='login-prompt-modal__actions'>
						<Button onClick={onLogin}>Войти</Button>
						<Button theme='outline' onClick={onRegister}>
							Регистрация
						</Button>
					</div>
				</div>
			</ModalHeaderAndContent>
		</Modal>
	)
}

export default LoginPromptModal
