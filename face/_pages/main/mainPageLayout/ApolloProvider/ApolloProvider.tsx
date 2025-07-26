'use client'

import { ApolloProvider as BaseApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'
import apolloClient from '../../../../graphql/apollo'

interface ApolloProviderProps {
	children: ReactNode
}

export default function ApolloProvider({ children }: ApolloProviderProps) {
	return <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>
}
