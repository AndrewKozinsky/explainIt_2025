import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class UserSubscriptionRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getSubscriptionByPaymentId(paymentId: number) {
		return await this.prisma.userSubscription.findUnique({
			where: {
				payment_id: paymentId,
			},
		})
	}

	@CatchDbError()
	async createSubscription(dto: {
		userId: number
		tariffId: number
		pricePaid: number
		balance: number
		includedFileStorageMb: number
		startsAt: Date
		endsAt: Date
		paymentId: number
	}) {
		return await this.prisma.userSubscription.create({
			data: {
				user_id: dto.userId,
				tariff_id: dto.tariffId,
				price_paid: dto.pricePaid,
				balance: dto.balance,
				included_file_storage_mb: dto.includedFileStorageMb,
				starts_at: dto.startsAt,
				ends_at: dto.endsAt,
				payment_id: dto.paymentId,
			},
		})
	}
}
