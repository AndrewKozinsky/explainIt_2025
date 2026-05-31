import React, { useState, useEffect } from 'react'
import { filesUrls } from 'utils/filesUrls'
import { localStorageManager } from 'utils/localStorageManager'
import Button from '@/ui/formRelated/buttons/Button/Button'
import Modal from '@/ui/Modal/Modal'
import './OnboardingModal.scss'

function OnboardingModal() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		if (localStorageManager.onboarding.shouldShow()) {
			setIsModalOpen(true)
		}
	}, [])

	const handleClose = () => {
		setIsModalOpen(false)
	}

	const handleDoNotShowAgain = () => {
		localStorageManager.onboarding.hide()
		handleClose()
	}

	return (
		<Modal header='Перевод слов' isOpen={isModalOpen} close={handleClose} extraClass='onboarding-modal'>
			<div>
				<p>Для просмотра перевода нажмите на незнакомое слово.</p>
				<video
					src={filesUrls.onboardingModal.selectedWord}
					className='onboarding-modal__video'
					autoPlay
					muted
					loop
				/>
				<Button onClick={handleDoNotShowAgain} extraClass='mt-20'>
					Больше не показывать
				</Button>
			</div>
		</Modal>
	)
}

export default OnboardingModal
