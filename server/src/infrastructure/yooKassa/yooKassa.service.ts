import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { CustomGraphQLError } from '../exceptions/customErrors'
import { ErrorCode } from '../exceptions/errorCode'
import { errorMessage } from '../exceptions/errorMessage'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { randomUUID } from 'crypto'

@Injectable()
export class YooKassaService {
	constructor(private mainConfig: MainConfigService) {}

	/**
	 * Отправляет запрос на ЮКассу для оплаты
	 * @param amount — текст вопроса
	 * @param userEmail — адрес почты пользователя
	 */
	async createPayment(amount: number, userEmail: string) {
		const paymentData = {
			amount: {
				value: amount / 100,
				currency: 'RUB',
			},
			capture: true,
			confirmation: {
				type: 'redirect',
				return_url: this.mainConfig.get().site.domainRootWithProtocol,
			},
			description: 'Пополнение баланса',
			receipt: {
				customer: {
					email: userEmail,
				},
				items: [
					{
						description: 'Пополнение баланса',
						quantity: '1.00',
						amount: {
							value: amount,
							currency: 'RUB',
						},
						vat_code: 1, // 1 — без НДС, 2-6 — если с НДС
					},
				],
			},
		}

		const createPaymentResponse = await this.makeRequest<CreatePaymentResponse>({
			requestBody: paymentData,
			relativeUrl: 'payments',
		})

		if (!createPaymentResponse) {
			throw new CustomGraphQLError(errorMessage.yookassaCannotCreatePayment, ErrorCode.InternalServerError_500)
		}

		return {
			yooKassaPaymentId: createPaymentResponse.id,
			confirmationUrl: createPaymentResponse.confirmation.confirmation_url,
		}
	}

	/**
	 * Отправляет запрос в ЮКассу методом POST
	 * @param input — объект с данными для настройки запроса
	 */
	async makeRequest<T>(input: { requestBody: any; relativeUrl: string }): Promise<undefined | T> {
		// Если режим тестирования, то возвращаем фиктивные данные
		if (this.mainConfig.get().mode === 'localtest') {
			const id = Math.round(Math.random() * 1000000).toString()
			return {
				id,
				confirmation: {
					confirmation_url: id + ' some-url',
				},
			} as T
		}

		const { rootUrl } = this.mainConfig.get().yooKassa
		const fullUrl = rootUrl + input.relativeUrl

		const { shopId, secretKey } = this.mainConfig.get().yooKassa
		const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64')

		try {
			const response = await axios.post(fullUrl, input.requestBody, {
				headers: {
					Authorization: `Basic ${auth}`,
					'Idempotence-Key': randomUUID(),
					'Content-Type': 'application/json',
				},
			})

			return response.data
		} catch (error: unknown) {
			console.log('Error in YooKassaService => makeRequest')
			console.error(error)
		}
	}
}

type CreatePaymentResponse = {
	id: string // '300d9011-000f-5001-8000-1fba2b85ca42'
	status: 'pending'
	amount: {
		value: string // '10.00'
		currency: string // 'RUB'
	}
	description: string // 'Заказ №1'
	recipient: {
		account_id: string // '1127600'
		gateway_id: string // '2496565'
	}
	created_at: string // '2025-07-19T11:06:57.593Z'
	confirmation: {
		type: 'redirect'
		confirmation_url: string // 'https://yoomoney.ru/checkout/payments/v2/contract?orderId=300d9011-000f-5001-8000-1fba2b85ca42'
	}
	test: boolean
	paid: false
	refundable: boolean // false
	metadata: any
}
