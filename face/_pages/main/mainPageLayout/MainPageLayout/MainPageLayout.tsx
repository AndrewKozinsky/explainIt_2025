import React from 'react'
import mainConfig from '@/сonsts/mainConfig'
import GoogleTagManager from '../GoogleTagManager/GoogleTagManager'
import '../style/global.scss'

type MainPageLayoutProps = {
	children: React.ReactNode
}

function MainPageLayout(props: MainPageLayoutProps) {
	const { children } = props

	return (
		<>
			{mainConfig.workingMode === 'servermaster' && <GoogleTagManager />}
			{children}
		</>
	)
}

export default MainPageLayout
