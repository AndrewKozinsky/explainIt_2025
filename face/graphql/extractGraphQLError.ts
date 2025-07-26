import { ApolloError } from '@apollo/client'

type GraphQLExtension = {
	message: 'Validation failed'
	code: 'Bad Request'
	statusCode: 400
	validationErrors?: GraphQLFieldError[]
}

type GraphQLFieldError = { field: 'password'; messages: ['Минимальное количество символов: 6'] }

export function extractGraphQLError(error: unknown) {
	if (error instanceof ApolloError) {
		const firstError = error.graphQLErrors[0]

		const { extensions } = firstError
		if (!extensions) return null

		return {
			code: extensions.code,
			message: extensions.message,
			statusCode: extensions.statusCode,
			validationErrors: extensions.validationErrors,
		} as GraphQLExtension
	}

	return null
}
