import { GraphQLError } from 'graphql'
import { ErrorCode } from './errorCode'

export class CustomGraphQLError extends GraphQLError {
	constructor(message: string, statusCode: ErrorCode) {
		const obj: Record<ErrorCode, string> = {
			[ErrorCode.BadRequest_400]: 'Bad Request',
			[ErrorCode.Unauthorized_401]: 'Unauthorized',
			[ErrorCode.Forbidden_403]: 'Forbidden',
			[ErrorCode.NotFound_404]: 'Not Found',
			[ErrorCode.InternalServerError_500]: 'Internal Server Error',
		}

		super(message, {
			extensions: {
				code: obj[statusCode],
				statusCode,
				message,
			}, // Add the `code` property to the `extensions` field
		})
	}
}
