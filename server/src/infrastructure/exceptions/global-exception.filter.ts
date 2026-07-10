import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from '@nestjs/common'
import { Response } from 'express'
import { CustomError } from './customErrors'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		this.handleHttpException(exception, host)
	}

	private handleHttpException(exception: unknown, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response>()

		if (exception instanceof HttpException) {
			response.status(exception.getStatus()).json(exception.getResponse())
			return
		}

		if (exception instanceof CustomError) {
			response.status(exception.statusCode).json({
				message: exception.message,
				code: exception.code,
				statusCode: exception.statusCode,
			})
			return
		}

		response.status(500).json({ message: 'Internal server error', statusCode: 500 })
	}
}
