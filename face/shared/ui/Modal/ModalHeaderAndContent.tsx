import { ReactNode } from 'react'
import './ModalHeaderAndContent.scss'

type ModalHeaderAndContentProps = {
	header: string
	children: ReactNode
}

function ModalHeaderAndContent({ header, children }: ModalHeaderAndContentProps) {
	return (
		<div className='modal__content-wrapper'>
			<h2 className='modal__header'>{header}</h2>
			<div className='modal__content'>{children}</div>
		</div>
	)
}

export default ModalHeaderAndContent
