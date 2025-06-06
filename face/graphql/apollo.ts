import { InMemoryCache, ApolloClient, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { isServerComponent } from '../utils/utils'

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
		)
	if (networkError) console.error(`[Network error]: ${networkError}`)
})

// Create a function to get the appropriate host based on environment
const getHost = () => {
	// When running on the server, use the Docker service name
	if (isServerComponent()) {
		// return 'explain-server:3001'
		return 'localhost'
	}
	// When running in the browser, use Nginx as a proxy
	return 'localhost'
}

// Create a function to get the appropriate URI based on environment
const getUri = () => {
	// When running on the server, connect directly to the server container
	if (isServerComponent()) {
		return `http://${getHost()}/graphql`
	}
	// When running in the browser, use Nginx as a proxy
	return '/graphql'
}

// HTTP link
const httpLink = new HttpLink({
	uri: getUri(),
	credentials: 'same-origin',
})

// Create the Apollo Client instance
export const apolloClient = new ApolloClient({
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		},
	},
	// Disable SSR for now to avoid hydration issues
	ssrMode: typeof window === 'undefined',
})

export default apolloClient
