import { Injectable } from '@nestjs/common'
import { User } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { UserOutModel } from '../models/user/user.out.model'

@Injectable()
export class UserQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getUserById(id: number) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				UserSubscription: {
					where: {
						ends_at: {
							gt: new Date(),
						},
					},
					orderBy: {
						ends_at: 'desc',
					},
					take: 1,
					include: {
						tariff: true,
					},
				},
			},
		})

		if (!user) {
			return null
		}

		return this.mapDbUserToOutUser(user)
	}

	@CatchDbError()
	async getUserByEmail(email: string) {
		try {
			const user = await this.prisma.user.findUnique({
				where: { email },
				include: {
					UserSubscription: {
						where: {
							ends_at: {
								gt: new Date(),
							},
						},
						orderBy: {
							ends_at: 'desc',
						},
						take: 1,
						include: {
							tariff: true,
						},
					},
				},
			})

			if (!user) return null

			return this.mapDbUserToOutUser(user)
		} catch (err: unknown) {
			console.log(err)
		}
	}

	mapDbUserToOutUser(dbUser: User): UserOutModel {
		const currentSubscription = (dbUser as any).UserSubscription?.[0]
		const now = new Date()
		const isSubscriptionActive = Boolean(currentSubscription?.ends_at && currentSubscription.ends_at > now)

		return {
			id: dbUser.id,
			email: dbUser.email,
			isUserConfirmed: dbUser.is_user_confirmed,
			currentSubscription: isSubscriptionActive
				? {
						tariffId: currentSubscription.tariff_id,
						tariffCode: currentSubscription.tariff.code,
						tariffName: currentSubscription.tariff.name,
						isPublicMediaIncluded: currentSubscription.tariff.is_public_media_included,
						isPrivateMediaIncluded: currentSubscription.tariff.is_private_media_included,
						pricePaid: currentSubscription.price_paid,
						balance: currentSubscription.balance,
						includedFileStorageMb: currentSubscription.included_file_storage_mb,
						startsAt: currentSubscription.starts_at.toISOString(),
						endsAt: currentSubscription.ends_at.toISOString(),
					}
				: null,
		}
	}
}
