export const paymentUtils = {}

type PaymentResultStatus = 'payment.succeeded' | 'payment.canceled'

export function createYooKassaWebHookBodyAfterUserFinishPayment(dto: {
	yooKassaPaymentId: string
	amount: number
	status: PaymentResultStatus
}) {
	return {
		type: 'notification',
		event: dto.status,
		object: {
			id: dto.yooKassaPaymentId,
			status: dto.status === 'payment.succeeded' ? 'succeeded' : 'canceled',
			amount: {
				value: dto.amount.toFixed(2), // '10.00'
				currency: 'RUB',
			},
			income_amount: {
				value: '9.65',
				currency: 'RUB',
			},
			recipient: {
				account_id: '1127600',
				gateway_id: '2496565',
			},
			payment_method: {
				type: 'yoo_money',
				id: dto.yooKassaPaymentId,
				saved: false,
				status: 'inactive',
				title: 'YooMoney wallet 410011758831136',
				account_number: '410011758831136',
			},
			captured_at: '2025-07-19T13:02:21.886Z',
			created_at: '2025-07-19T13:02:11.551Z',
			test: true,
			refunded_amount: {
				value: '0.00',
				currency: 'RUB',
			},
			paid: true,
			refundable: true,
			metadata: {},
		},
	}
}
