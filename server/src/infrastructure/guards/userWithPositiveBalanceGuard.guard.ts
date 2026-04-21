import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { CustomGraphQLError } from '../exceptions/customErrors'
import { ErrorCode } from '../exceptions/errorCode'
import { errorMessage } from '../exceptions/errorMessage'
import { getRequestFromExecutionContext } from './getRequestFromExecutionContext'

@Injectable()
export class UserWithPositiveBalanceGuard implements CanActivate {
	constructor() {}

	async canActivate(context: ExecutionContext) {
		const request = getRequestFromExecutionContext(context)

		if (!request.user) {
			throw new CustomGraphQLError(errorMessage.userUnauthorized, ErrorCode.Unauthorized_401)
		}

		if (request.user.balance <= 0) {
			throw new CustomGraphQLError(errorMessage.userBalanceIsNegative, ErrorCode.BadRequest_400)
		}

		return true
	}
}
