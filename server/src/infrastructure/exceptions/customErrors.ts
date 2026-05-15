import { GraphQLError } from 'graphql'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'

export class CustomError extends GraphQLError {
	constructor(message: string, statusCode: ErrorStatusCode) {
		const obj: Record<ErrorStatusCode, string> = {
			[ErrorStatusCode.BadRequest_400]: 'Bad Request',
			[ErrorStatusCode.Unauthorized_401]: 'Unauthorized',
			[ErrorStatusCode.Forbidden_403]: 'Forbidden',
			[ErrorStatusCode.NotFound_404]: 'Not Found',
			[ErrorStatusCode.InternalServerError_500]: 'Internal Server Error',
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
