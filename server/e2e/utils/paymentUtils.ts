import { INestApplication } from '@nestjs/common'
import { agent as request } from 'supertest'
import { App } from 'supertest/types'
import { queries } from '../../src/features/test/queries'
import { MainConfigService } from '../../src/infrastructure/mainConfig/mainConfig.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { PaymentRepository } from '../../src/repo/payment.repository'
import { makeGraphQLReqWithTokens } from '../makeGQReq'
import { YooKassaService } from '../../src/infrastructure/yooKassa/yooKassa.service'

type PaymentResultStatus = 'payment.succeeded' | 'payment.canceled'

export const paymentUtils = {
	async makePaymentAndPay(
		params: {
			app: INestApplication<App>
			userId: number
			moneyAmount: number
			sessionToken: {
				value: string
				path: '/'
				expires: string
				sameSite: string
			}
			mainConfig: MainConfigService
			paymentRepository: PaymentRepository
			yooKassaService: YooKassaService
		},
		paymentResult: PaymentResultStatus,
	) {
		// 1. Create a payment in the YooKassa, save details in the table Payment in my database.
		const topUpBalanceQuery = queries.payment.topUpBalanceWithYooKassa(params.moneyAmount)
		const [topUpBalanceResp] = await makeGraphQLReqWithTokens({
			app: params.app,
			query: topUpBalanceQuery,
			sessionToken: params.sessionToken,
			mainConfig: params.mainConfig,
		})

		// Get user's last payment
		let lastPaymentObject = await this.getUserLastPaymentOrThrowError(params.paymentRepository, params.userId)

		// Check if the last payment is pending and amount is correct
		if (lastPaymentObject.status !== 'PENDING') {
			throw new Error('Payment status is not pending')
		}

		expect(lastPaymentObject.amount).toBe(params.moneyAmount * 100)

		// 2. After a user opens the confirmation page and makes a payment or cancel this operation
		// YooKassa send a request to POST /webhook/yookassa with a confirmation of payment.
		// I simulate this behavior by requestion to POST /webhook/yookassa
		const paymentConfirmationResp = await request(params.app.getHttpServer())
			.post('/api/' + RouteNames.WEBHOOK.YOOKASSA)
			.send(
				createYooKassaWebHookBodyAfterUserFinishPayment({
					yooKassaPaymentId: lastPaymentObject.externalId,
					amount: lastPaymentObject.amount,
					status: paymentResult,
				}),
			)
			.expect(200)

		// Check if the status of the last payment was updated
		lastPaymentObject = await this.getUserLastPaymentOrThrowError(params.paymentRepository, params.userId)
		if (paymentResult === 'payment.succeeded') {
			lastPaymentObject.status = 'SUCCEEDED'
		} else if (paymentResult === 'payment.canceled') {
			lastPaymentObject.status = 'CANCELED'
		}
	},
	async getUserLastPaymentOrThrowError(paymentRepository: PaymentRepository, userId: number) {
		return paymentRepository
			.getPaymentsByUserId(userId)
			.then((payments) => {
				console.log(payments)
				return payments[payments.length - 1]
			})
			.catch((err: string) => {
				throw new Error(err)
			})
	},
}

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
