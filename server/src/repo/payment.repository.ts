import { Injectable } from '@nestjs/common'
import { Payment, PaymentStatus } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { PaymentServiceModel } from '../models/payment/payment.service.model'

@Injectable()
export class PaymentRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getPaymentsByUserId(userId: number) {
		const payments = await this.prisma.payment.findMany({
			where: {
				user_id: userId,
			},
			orderBy: {
				created_at: 'asc',
			},
		})

		return this.mapDbPaymentsToServicePayments(payments)
	}

	@CatchDbError()
	async createPayment(dto: { userId: number; amount: number; externalId: string }) {
		const newPaymentParams = {
			user_id: dto.userId,
			amount: dto.amount,
			external_id: dto.externalId,
		}

		const payment = await this.prisma.payment.create({
			data: newPaymentParams,
		})

		return this.mapDbPaymentToServicePayment(payment)
	}

	@CatchDbError()
	async makePaymentSuccessful(yooKassaPaymentId: string) {
		const payment = await this.prisma.payment.update({
			where: { external_id: yooKassaPaymentId },
			data: {
				status: PaymentStatus.SUCCESS,
			},
		})

		return this.mapDbPaymentToServicePayment(payment)
	}

	@CatchDbError()
	async makePaymentCancelled(yooKassaPaymentId: string) {
		const payment = await this.prisma.payment.update({
			where: { external_id: yooKassaPaymentId },
			data: {
				status: PaymentStatus.CANCELED,
			},
		})

		return this.mapDbPaymentToServicePayment(payment)
	}

	mapDbPaymentsToServicePayments(dbPayments: Payment[]): PaymentServiceModel[] {
		return dbPayments.map(this.mapDbPaymentToServicePayment)
	}
	mapDbPaymentToServicePayment(dbPayment: Payment): PaymentServiceModel {
		return {
			id: dbPayment.id,
			userId: dbPayment.user_id,
			amount: dbPayment.amount,
			externalId: dbPayment.external_id,
			status: dbPayment.status,
			providerName: dbPayment.provider_name,
		}
	}
}
