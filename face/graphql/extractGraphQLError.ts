import { ApolloError } from '@apollo/client'
import { getTextByServerErrorMessage } from '@/utils/errorMessages'

type GraphQLExtension = {
	message: string
	code: string
	statusCode: number
	validationErrors?: GraphQLFieldError[]
}

type GraphQLFieldError = { field: string; messages: string[] }

type RawGraphQLFieldError = { field: string; messages: unknown[] }

type RawGraphQLExtensions = {
	message?: unknown
	code?: unknown
	statusCode?: unknown
	validationErrors?: RawGraphQLFieldError[]
}

export function extractGraphQLError(error: unknown) {
	if (error instanceof ApolloError) {
		const firstError = error.graphQLErrors[0]
		if (!firstError) return null

		const { extensions } = firstError
		if (!extensions) return null
		const rawExtensions = extensions as RawGraphQLExtensions

		return {
			code: String(rawExtensions.code ?? ''),
			message: getTextByServerErrorMessage(rawExtensions.message),
			statusCode: Number(rawExtensions.statusCode ?? 0),
			validationErrors: rawExtensions.validationErrors?.map((validationError) => ({
				field: validationError.field,
				messages: validationError.messages.map(getTextByServerErrorMessage),
			})),
		} as GraphQLExtension
	}

	return null
}
