import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { CreateYooKassaPaymentOutModel } from 'models/payment/payment.out.model'
import { TopUpBalanceWithYooKassaDto } from './dto/top-up-balance-with-yookassa.dto'

export function ApiTopUpBalanceWithYooKassa() {
	return applyDecorators(
		ApiOperation({
			summary: 'Top up balance with YooKassa',
			description: 'Creates a YooKassa payment and returns a confirmation URL for the authenticated user.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: TopUpBalanceWithYooKassaDto }),
		ApiResponse({ status: 200, description: 'OK', type: CreateYooKassaPaymentOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({
			status: 400,
			description: errorMessage.cannotDepositAmountLessThanZero.errorMessageCode,
		}),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.unknownDbError.errorMessageCode,
				errorMessage.unknownError.errorMessageCode,
			].join(' | '),
		}),
	)
}
