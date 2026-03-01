import React from 'react'
import './MainPageMediaContent.scss'

type MainPageMediaContentProps = {
	children: React.ReactNode[]
}

function MainPageMediaContent(props: MainPageMediaContentProps) {
	const { children } = props

	return <div className='main-page-media-content'>{children}</div>
}

export default MainPageMediaContent
