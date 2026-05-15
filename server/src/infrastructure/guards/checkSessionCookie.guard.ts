import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { UserRepository } from 'repo/user.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { CustomError } from '../exceptions/customErrors'
import { errorMessage } from '../exceptions/errorMessage'
import { getRequestFromExecutionContext } from './getRequestFromExecutionContext'

@Injectable()
export class CheckSessionCookieGuard implements CanActivate {
	constructor(private userRepository: UserRepository) {}

	async canActivate(context: ExecutionContext) {
		const request = getRequestFromExecutionContext(context)

		if (!request.session?.userId) {
			throw new CustomError(errorMessage.userUnauthorized, ErrorStatusCode.Unauthorized_401)
		}

		const user = await this.userRepository.getUserById(request.session.userId)
		if (!user) {
			throw new CustomError(errorMessage.userUnauthorized, ErrorStatusCode.BadRequest_400)
		}

		request.user = user
		return true
	}
}
