import type { CreateYooKassaPaymentOutModel } from '@/shared/api/generated/models'
import { paymentControllerTopUpBalanceWithYooKassa } from '@/shared/api/generated/payment/payment'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type { PaymentRepository, TopUpBalanceInput, TopUpBalanceResult } from './PaymentRepository'

/**
 * Реализация PaymentRepository через REST API.
 * Внутри использует Orval-сгенерированные функции, снаружи отдаёт унифицированные типы.
 */
export class PaymentApi implements PaymentRepository {
	async topUpBalance(input: TopUpBalanceInput): Promise<ApiResult<TopUpBalanceResult>> {
		return executeApiCall(
			() => paymentControllerTopUpBalanceWithYooKassa({ amountInKopecks: input.amountInKopecks }),
			(data) => mapToTopUpBalanceResult(data),
		)
	}
}

// ─── Приватные мапперы ─────────────────────────────────────────────────────

function mapToTopUpBalanceResult(raw: CreateYooKassaPaymentOutModel): TopUpBalanceResult {
	return {
		confirmationUrl: raw.confirmationUrl,
	}
}
