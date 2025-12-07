import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { z } from 'zod'
import { SetPaymentResultWithYooKassaCommand } from 'features/payment/SetPaymentResultWithYooKassa.command'
import { Request } from 'express'
import * as ipaddr from 'ipaddr.js'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

@Injectable()
export class WebhookService {
	constructor(
		private commandBus: CommandBus,
		private mainConfigService: MainConfigService,
	) {}

	async yookassa(req: Request, unsafeDataFromYooKassa: any) {
		if (['serverdevelop', 'servermaster'].includes(this.mainConfigService.get().mode ?? '')) {
			if (this.isRequestFromYooKassaServer(req)) {
				console.log('Request is not from YooKassa server')
				return
			}
		}

		const checkDataResult = YooKassaPaymentSchema.passthrough().safeParse(unsafeDataFromYooKassa)
		if (!checkDataResult.success) {
			console.log('Check data result from YooKassa is not success')
			return
		}

		const dataFromYooKassa = checkDataResult.data

		await this.commandBus.execute(
			new SetPaymentResultWithYooKassaCommand({
				paymentResult: dataFromYooKassa.event,
				yooKassaPaymentId: dataFromYooKassa.object.id,
			}),
		)
	}

	isRequestFromYooKassaServer(req: Request): boolean {
		const allowedYooKassaIPs = [
			'185.71.76.0/27',
			'185.71.77.0/27',
			'77.75.153.0/25',
			'77.75.156.11/32',
			'77.75.156.35/32',
			'77.75.154.128/25',
			'2a02:5180::/32',
		]

		const rawIp = req.ip || req.connection.remoteAddress
		if (!rawIp) return false

		// Strip port if present (e.g. ::ffff:127.0.0.1:port)
		const cleanIp = rawIp.replace(/^.*:/, '').includes('.') ? rawIp : rawIp.split('%')[0]

		let addr: ipaddr.IPv4 | ipaddr.IPv6
		try {
			addr = ipaddr.parse(cleanIp)
		} catch {
			return false
		}

		return allowedYooKassaIPs.some((cidr) => {
			const [range, prefix] = cidr.split('/')
			if (!prefix) return false

			try {
				const parsedRange = ipaddr.parse(range)

				// Check if both addresses are of the same type
				if (addr.kind() !== parsedRange.kind()) {
					return false
				}

				// Use the correct match method based on address type
				if (addr.kind() === 'ipv4') {
					return (addr as ipaddr.IPv4).match(parsedRange as ipaddr.IPv4, parseInt(prefix))
				} else {
					return (addr as ipaddr.IPv6).match(parsedRange as ipaddr.IPv6, parseInt(prefix))
				}
			} catch {
				return false
			}
		})
	}
}

const YooKassaPaymentSchema = z.object({
	type: z.literal('notification'),
	event: z.enum(['payment.succeeded', 'payment.canceled']),
	object: z.object({
		id: z.string(), // '300dab13-000f-5000-8000-10aada9fc601'
		status: z.enum(['succeeded', 'canceled']),
		amount: z.object({
			value: z.string(), // '10.00'
			currency: z.string(), // 'RUB'
		}),
		income_amount: z.object({
			value: z.string(), // '9.65'
			currency: z.string(), // 'RUB'
		}),
		recipient: z.object({
			account_id: z.string(), // '1127600'
			gateway_id: z.string(), // '2496565'
		}),
		payment_method: z.object({
			type: z.string(), // z.literal('yoo_money'), z.literal('sberbank')
			id: z.string(), // '300dab13-000f-5000-8000-10aada9fc601'
			saved: z.boolean(), // false
			status: z.literal('inactive'),
		}),
		captured_at: z.string().datetime(), // '2025-07-19T13:02:21.886Z'
		created_at: z.string().datetime(), // '2025-07-19T13:02:11.551Z'
		test: z.boolean(),
		refunded_amount: z.object({
			value: z.string(), //  '0.00'
			currency: z.string(), // 'RUB'
		}),
		paid: z.boolean(), // true
		refundable: z.boolean(), // true
		metadata: z.record(z.any(), z.any()), // {}
	}),
})
