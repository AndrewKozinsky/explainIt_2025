import React from 'react'
import './BookFormSurface.scss'

type BookFormSurfaceProps = {
	children: React.ReactNode
	leftBottomButtons: React.ReactNode[]
	rightBottomButtons: React.ReactNode[]
}

function VideoFormSurface(props: BookFormSurfaceProps) {
	const { children, leftBottomButtons, rightBottomButtons } = props

	return (
		<div className='video-form-surface'>
			<div className='video-form-surface__content'>{children}</div>
			<div className='video-form-surface__bottom'>
				<div className='video-form-surface__bottom-buttons'>{leftBottomButtons}</div>
				<div className='video-form-surface__bottom-buttons'>{rightBottomButtons}</div>
			</div>
		</div>
	)
}

export default VideoFormSurface
