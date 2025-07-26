import React from 'react'
import mainConfig from '../../../../сonsts/mainConfig'
import ApolloProvider from '../ApolloProvider/ApolloProvider'
import CurrentUserLoader from '../CurrentUserLoader/CurrentUserLoader'
import Metrika from '../Metrika/Metrika'
import '../style/global.scss'

type MainPageLayoutProps = {
	children: React.ReactNode
}

function MainPageLayout(props: MainPageLayoutProps) {
	const { children } = props

	return (
		<>
			{mainConfig.workingMode === 'servermaster' && <Metrika />}
			<ApolloProvider>
				<CurrentUserLoader />
				{children}
			</ApolloProvider>
		</>
	)
}

export default MainPageLayout
