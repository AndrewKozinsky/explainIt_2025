import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { CustomGraphQLError } from './customErrors'

@Catch()
export class ApolloExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		// @ts-ignore
		if (host.contextType !== 'graphql') {
			throw exception
		}

		let errorResponse: any = {
			errors: [
				{
					message: 'Internal server error',
					extensions: {
						message: 'Something went wrong',
						code: 'INTERNAL_SERVER_ERROR',
						statusCode: 500,
					},
				},
			],
		}

		if (exception instanceof BadRequestException) {
			// Validation error
			const res = exception.getResponse()
			let validationErrors = []
			if (Array.isArray(res)) {
				// Custom exceptionFactory returns array
				validationErrors = res
			} else if (typeof res === 'object' && (res as any).message && Array.isArray((res as any).message)) {
				// Default NestJS returns { message: [..], error: ..., statusCode: ... }
				validationErrors = (res as any).message
			}

			// console.log(validationErrors)

			errorResponse = {
				errors: [
					{
						message: 'Validation failed',
						extensions: {
							message: 'Validation failed',
							code: 'Bad Request',
							statusCode: 400,
							validationErrors,
						},
					},
				],
			}
		} else if (exception instanceof CustomGraphQLError) {
			errorResponse = {
				errors: [
					{
						message: exception.message,
						extensions: exception.extensions,
					},
				],
			}
		} else {
			console.log('UNKNOWN EXCEPTION. Pay attention!!!')
		}

		// In GraphQL context, always throw the formatted error object
		throw Object.assign(new Error(errorResponse.errors[0].message), {
			extensions: errorResponse.errors[0].extensions,
		})
	}
}
