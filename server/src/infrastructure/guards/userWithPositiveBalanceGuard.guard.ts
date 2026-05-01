import { Injectable, CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common'
import { CustomGraphQLError } from '../exceptions/customErrors'
import { ErrorCode } from '../exceptions/errorCode'
import { errorMessage } from '../exceptions/errorMessage'
import { getRequestFromExecutionContext } from './getRequestFromExecutionContext'

/**
 * Guard factory that requires the authenticated user to have a balance
 * greater than or equal to `minBalanceKopecks`.
 *
 * Usage:
 *   @UseGuards(CheckSessionCookieGuard, UserWithMinBalanceGuard(1000))
 *
 * The threshold is expressed in kopecks (the unit used in the User.balance column).
 * For the previous "balance must be positive" semantics use UserWithPositiveBalanceGuard.
 */
export function UserWithMinBalanceGuard(minBalanceKopecks: number): Type<CanActivate> {
	@Injectable()
	class MixinMinBalanceGuard implements CanActivate {
		async canActivate(context: ExecutionContext) {
			const request = getRequestFromExecutionContext(context)

			if (!request.user) {
				throw new CustomGraphQLError(errorMessage.userUnauthorized, ErrorCode.Unauthorized_401)
			}

			if (request.user.balance < minBalanceKopecks) {
				const message =
					minBalanceKopecks <= 1 ? errorMessage.userBalanceIsNegative : errorMessage.userBalanceBelowMinimum
				throw new CustomGraphQLError(message, ErrorCode.BadRequest_400)
			}

			return true
		}
	}

	return mixin(MixinMinBalanceGuard)
}

/**
 * Backwards-compatible guard equivalent to "balance > 0".
 * Kept as a named export so existing usages keep working.
 */
export const UserWithPositiveBalanceGuard = UserWithMinBalanceGuard(1)
