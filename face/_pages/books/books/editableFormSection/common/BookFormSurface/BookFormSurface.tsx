import React from 'react'
import './BookFormSurface.scss'

type BookFormSurfaceProps = {
	children: React.ReactNode
	leftBottomButtons: React.ReactNode[]
	rightBottomButtons: React.ReactNode[]
}

function BookFormSurface(props: BookFormSurfaceProps) {
	const { children, leftBottomButtons, rightBottomButtons } = props

	return (
		<div className='book-form-surface'>
			<div className='book-form-surface__content'>{children}</div>
			<div className='book-form-surface__divider' />
			<div className='book-form-surface__bottom'>
				<div className='book-form-surface__bottom-buttons'>{leftBottomButtons}</div>
				<div className='book-form-surface__bottom-buttons'>{rightBottomButtons}</div>
			</div>
		</div>
	)
}

export default BookFormSurface
