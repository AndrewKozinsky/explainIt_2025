'use client'

import { ReactNode } from 'react'
import { ApolloProvider as BaseApolloProvider } from '@apollo/client'
import apolloClient from '../../../../graphql/apollo'

interface ApolloProviderProps {
	children: ReactNode
}

export default function ApolloProvider({ children }: ApolloProviderProps) {
	return <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>
}
