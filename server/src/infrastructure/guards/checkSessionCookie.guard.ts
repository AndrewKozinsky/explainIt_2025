import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { UserRepository } from 'repo/user.repository'
import { CustomGraphQLError } from '../exceptions/customErrors'
import { ErrorCode } from '../exceptions/errorCode'
import { errorMessage } from '../exceptions/errorMessage'
import { getRequestFromExecutionContext } from './getRequestFromExecutionContext'

@Injectable()
export class CheckSessionCookieGuard implements CanActivate {
	constructor(private userRepository: UserRepository) {}

	async canActivate(context: ExecutionContext) {
		const request = getRequestFromExecutionContext(context)

		if (!request.session?.userId) {
			throw new CustomGraphQLError(errorMessage.userUnauthorized, ErrorCode.Unauthorized_401)
		}

		const user = await this.userRepository.getUserById(request.session.userId)
		if (!user) {
			throw new CustomGraphQLError(errorMessage.userUnauthorized, ErrorCode.BadRequest_400)
		}

		request.user = user
		return true
	}
}
