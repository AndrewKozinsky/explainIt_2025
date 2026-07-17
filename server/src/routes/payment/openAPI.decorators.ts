import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { TopUpBalanceWithYooKassaDto } from 'routes/payment/inputs/top-up-balance-with-yookassa.dto'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { CreateYooKassaPaymentOutModel } from 'models/payment/payment.out.model'

export function ApiTopUpBalanceWithYooKassa() {
	return applyDecorators(
		ApiOperation({
			summary: 'Top up balance with YooKassa',
			description: 'Creates a YooKassa payment and returns a confirmation URL for the authenticated user.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: TopUpBalanceWithYooKassaDto }),
		ApiResponse({ status: 200, description: 'OK', type: CreateYooKassaPaymentOutModel }),
	)
}
