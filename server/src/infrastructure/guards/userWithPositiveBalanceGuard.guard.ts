import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'
import { CustomGraphQLError } from '../exceptions/customErrors'
import { ErrorCode } from '../exceptions/errorCode'
import { errorMessage } from '../exceptions/errorMessage'

@Injectable()
export class UserWithPositiveBalanceGuard implements CanActivate {
	constructor() {}

	async canActivate(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		const request = ctx.getContext().req as Request

		if (!request.user) {
			throw new CustomGraphQLError(errorMessage.userUnauthorized, ErrorCode.Unauthorized_401)
		}

		if (request.user.balance <= 0) {
			throw new CustomGraphQLError(errorMessage.userBalanceIsNegative, ErrorCode.BadRequest_400)
		}

		return true
	}
}
