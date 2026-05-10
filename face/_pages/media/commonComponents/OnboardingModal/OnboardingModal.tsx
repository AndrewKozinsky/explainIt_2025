'use client'

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
		<Modal header='Перевод слов' isOpen={isModalOpen} close={handleClose}>
			<div>
				<p>Для просмотра перевода нажмите на незнакомое слово.</p>
				<img
					src={filesUrls.onboardingModal.selectedWord['1x']}
					srcSet={`${filesUrls.onboardingModal.selectedWord['2x']} 2x`}
					alt='Selected word example'
					className='onboarding-modal__image'
				/>
				<Button onClick={handleDoNotShowAgain} extraClass='mt-20'>
					Больше не показывать
				</Button>
			</div>
		</Modal>
	)
}

export default OnboardingModal
