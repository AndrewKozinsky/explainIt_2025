'use client'

import React, { ReactNode } from 'react'
import cn from 'classnames'
import CloseButton from '../formRelated/buttons/CloseButton/CloseButton'
import { useFixBodyScrolling } from './fn/fixBodyScrolling'
import './Modal.scss'

type ModalProps = {
	children: ReactNode
	isOpen: boolean
	close: () => void
	extraClass?: string
}

function Modal(props: ModalProps) {
	const { children, isOpen, close, extraClass } = props

	useFixBodyScrolling(isOpen)

	if (!isOpen) return null

	return (
		<div className='modal' onClick={close}>
			<div
				className={cn('modal__body', extraClass)}
				onClick={(e) => {
					e.stopPropagation()
				}}
			>
				<div className='modal__close-button-wrapper'>
					<CloseButton onClick={close} extraClass='modal__close-button' />
				</div>
				{children}
			</div>
		</div>
	)
}

export default Modal
