import React from 'react'
import mainConfig from '../../../../сonsts/mainConfig'
import ApolloProvider from '../ApolloProvider/ApolloProvider'
import CurrentUserLoader from '../CurrentUserLoader/CurrentUserLoader'
import Metrika from '../Metrika/Metrika'
import SystemStoreSetUp from '../SystemStoreSetUp/SystemStoreSetUp'
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
				<SystemStoreSetUp />
				{children}
			</ApolloProvider>
		</>
	)
}

export default MainPageLayout
