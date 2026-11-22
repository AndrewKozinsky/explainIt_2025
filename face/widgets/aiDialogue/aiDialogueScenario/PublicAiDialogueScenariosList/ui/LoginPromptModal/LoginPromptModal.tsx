'use client'

import { useTranslations } from 'next-intl'
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
	const t = useTranslations('aiDialogueScenariosList.loginModal')

	return (
		<Modal isOpen={isOpen} close={onClose}>
			<ModalHeaderAndContent header={t('header')}>
				<div className='login-prompt-modal__content'>
					<p>{t('text')}</p>
					<div className='login-prompt-modal__actions'>
						<Button onClick={onLogin}>{t('login')}</Button>
						<Button theme='outline' onClick={onRegister}>
							{t('register')}
						</Button>
					</div>
				</div>
			</ModalHeaderAndContent>
		</Modal>
	)
}

export default LoginPromptModal
