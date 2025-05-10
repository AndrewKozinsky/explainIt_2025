import React from 'react'
import mainConfig from '../../../сonsts/mainConfig'
import ApolloProvider from '../ApolloProvider/ApolloProvider'
import Metrika from '../Metrika/Metrika'
import '../style/global.scss'

type MainPageLayoutProps = {
	children: React.ReactNode
}

function MainPageLayout(props: MainPageLayoutProps) {
	const { children } = props

	return (
		<>
			{mainConfig.workingMode === 'server' && <Metrika />}
			<ApolloProvider>{children}</ApolloProvider>
		</>
	)
}

export default MainPageLayout
