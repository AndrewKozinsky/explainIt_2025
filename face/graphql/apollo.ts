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

// Create a function to get the appropriate URI based on the environment
function getUri() {
	const mode = process.env.NEXT_PUBLIC_WORK_MODE

	// When running on the server, connect directly to the server container
	if (isServerComponent()) {
		const hostMapper = {
			development: 'http://localhost',
			serverDevelop: 'https://dev.explainit.ru',
			serverMaster: 'https://explainit.ru',
		}

		const host = hostMapper[mode]
		return `${host}/graphql`
	}
	// When running in the browser, use Nginx as a proxy
	return '/graphql'
}
