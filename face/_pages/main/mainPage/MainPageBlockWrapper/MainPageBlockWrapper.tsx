import React from 'react'
import Header from 'ui/Header/Header'
import './MainPageBlockWrapper.scss'

type MainPageBlockWrapperProps = {
	header: string
	children: React.ReactNode | React.ReactNode[]
}

function MainPageBlockWrapper(props: MainPageBlockWrapperProps) {
	const { header, children } = props

	return (
		<div className='main-page-block-wrapper'>
			<Header hStyle={2}>{header}</Header>
			<div className='main-page-block-wrapper__content'>{children}</div>
		</div>
	)
}

export default MainPageBlockWrapper
