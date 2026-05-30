import React, { useState, useEffect } from 'react'
import { filesUrls } from 'utils/filesUrls'
import Button from '@/ui/formRelated/buttons/Button/Button'
import Modal from '@/ui/Modal/Modal'
import './OnboardingModal.scss'

const LOCAL_STORAGE_KEY = 'hideOnboardingModal'

function OnboardingModal() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		const shouldShowModal = localStorage.getItem(LOCAL_STORAGE_KEY) !== 'true'
		if (shouldShowModal) {
			setIsModalOpen(true)
		}
	}, [])

	const handleClose = () => {
		setIsModalOpen(false)
	}

	const handleDoNotShowAgain = () => {
		localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
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
