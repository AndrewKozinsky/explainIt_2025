import { InMemoryCache, ApolloClient, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { isServerComponent } from 'utils/utils'

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			// console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
		})
	}

	if (networkError) {
		console.error(`[Network error]: ${networkError}`)
	}
})

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
			fetchPolicy: 'cache-first',
		},
		query: {
			fetchPolicy: 'cache-first',
		},
	},
	// Disable SSR for now to avoid hydration issues
	ssrMode: typeof window === 'undefined',
})

export default apolloClient

// Create a function to get the appropriate URI based on environment
/*function getUri() {
	// When running on the server, connect directly to the server container
	if (isServerComponent()) {
		return `http://${getHost()}/graphql`
	}
	// When running in the browser, use Nginx as a proxy
	return '/graphql'
}*/
function getUri() {
	// When running on the server, connect directly to the server container
	if (isServerComponent()) {
		return `https://${getHost()}/graphql`
	}
	// When running in the browser, use Nginx as a proxy
	return '/graphql'
}

// Create a function to get the appropriate host based on environment
/*function getHost() {
	// When running on the server, use the Docker service name
	if (isServerComponent()) {
		return 'localhost'
	}
	// When running in the browser, use Nginx as a proxy
	return 'localhost'
}*/
function getHost() {
	return 'dev.explainit.ru'
}
