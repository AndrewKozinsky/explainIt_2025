import React from 'react'
import '../style/global.scss'
import ApolloProvider from '../ApolloProvider/ApolloProvider'
import Metrika from '../Metrika/Metrika'

type MainPageLayoutProps = {
	children: React.ReactNode
}

function MainPageLayout(props: MainPageLayoutProps) {
	const { children } = props

	return (
		<>
			<Metrika />
			<ApolloProvider>{children}</ApolloProvider>
		</>
	)
}

export default MainPageLayout
