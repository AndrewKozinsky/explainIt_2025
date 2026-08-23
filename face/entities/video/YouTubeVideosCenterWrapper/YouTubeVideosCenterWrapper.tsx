import React from 'react'
import './YouTubeVideosCenterWrapper.scss'

type YouTubeVideosCenterWrapperProps = {
	children: React.ReactNode
}

function YouTubeVideosCenterWrapper(props: YouTubeVideosCenterWrapperProps) {
	const { children } = props

	return <div className='youtube-videos-center-wrapper'>{children}</div>
}

export default YouTubeVideosCenterWrapper
