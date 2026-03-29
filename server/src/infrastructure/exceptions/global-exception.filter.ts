import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, Inject } from '@nestjs/common'
import { GqlContextType } from '@nestjs/graphql'
import { Response } from 'express'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { CustomGraphQLError } from './customErrors'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

	catch(exception: unknown, host: ArgumentsHost) {
		if (host.getType<GqlContextType>() === 'graphql') {
			this.handleGraphQLException(exception)
		} else {
			this.handleHttpException(exception, host)
		}
	}

	private handleGraphQLException(exception: unknown): never {
		if (exception instanceof BadRequestException) {
			const res = exception.getResponse()
			let validationErrors: any[] = []
			if (Array.isArray(res)) {
				validationErrors = res
			} else if (typeof res === 'object' && (res as any).message && Array.isArray((res as any).message)) {
				validationErrors = (res as any).message
			}

			throw Object.assign(new Error('Validation failed'), {
				extensions: { message: 'Validation failed', code: 'Bad Request', statusCode: 400, validationErrors },
			})
		}

		if (exception instanceof CustomGraphQLError) {
			throw Object.assign(new Error(exception.message), { extensions: exception.extensions })
		}

		this.logger.error('Unexpected GraphQL error', { exception })
		throw Object.assign(new Error('Internal server error'), {
			extensions: { message: 'Something went wrong', code: 'INTERNAL_SERVER_ERROR', statusCode: 500 },
		})
	}

	private handleHttpException(exception: unknown, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response>()

		if (exception instanceof HttpException) {
			response.status(exception.getStatus()).json(exception.getResponse())
			return
		}

		this.logger.error('Unexpected HTTP error', { exception })
		response.status(500).json({ message: 'Internal server error', statusCode: 500 })
	}
}
