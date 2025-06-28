import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { SentryExceptionCaptured } from '@sentry/nestjs'
import { CustomGraphQLError } from './customErrors'

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
	@SentryExceptionCaptured()
	catch(exception: unknown, host: ArgumentsHost) {
		throw exception
	}
}
