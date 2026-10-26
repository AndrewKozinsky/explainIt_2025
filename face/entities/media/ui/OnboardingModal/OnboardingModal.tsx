'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import Modal from '@/shared/ui/Modal/Modal'
import ModalHeaderAndContent from '@/shared/ui/Modal/ModalHeaderAndContent'
import { filesUrls } from '@/shared/utils/filesUrls'
import { localStorageManager } from '@/shared/utils/localStorageManager'
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
		<Modal isOpen={isModalOpen} close={handleClose} extraClass='onboarding-modal'>
			<ModalHeaderAndContent header='Перевод слов'>
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
			</ModalHeaderAndContent>
		</Modal>
	)
}

export default OnboardingModal
