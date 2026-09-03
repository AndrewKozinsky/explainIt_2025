'use client'

import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import Modal from '@/shared/ui/Modal/Modal'
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
		<Modal header='Войдите в учётную запись' isOpen={isOpen} close={onClose}>
			<div className='login-prompt-modal__content'>
				<p>Войдите в учётную запись, чтобы создать диалог с ИИ.</p>
				<div className='login-prompt-modal__actions'>
					<Button onClick={onLogin}>Войти</Button>
					<Button theme='outline' onClick={onRegister}>
						Регистрация
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default LoginPromptModal
