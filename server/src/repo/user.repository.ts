import { Injectable } from '@nestjs/common'
import { add } from 'date-fns'
import { Prisma, User } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { CustomGraphQLError } from '../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../infrastructure/exceptions/errorCode'
import { errorMessage } from '../infrastructure/exceptions/errorMessage'
import { HashAdapterService } from '../infrastructure/hashAdapter/hash-adapter.service'
import { CurrentSubscriptionServiceModel, UserServiceModel } from '../models/auth/auth.service.model'
import { createUniqString } from '../utils/stringUtils'

const userWithCurrentSubscriptionInclude = {
	UserSubscription: {
		where: {
			ends_at: {
				gt: new Date(),
			},
		},
		orderBy: {
			ends_at: 'desc' as const,
		},
		take: 1,
		include: {
			tariff: true,
		},
	},
} satisfies Prisma.UserInclude

type DbUserWithCurrentSubscription = Prisma.UserGetPayload<{
	include: typeof userWithCurrentSubscriptionInclude
}>

@Injectable()
export class UserRepository {
	constructor(
		private prisma: PrismaService,
		private hashAdapter: HashAdapterService,
	) {}

	@CatchDbError()
	async getUserById(id: number) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: userWithCurrentSubscriptionInclude,
		})

		if (!user) {
			return null
		}

		return this.mapDbUserToServiceUser(user)
	}

	@CatchDbError()
	async getUserByEmail(email: string) {
		try {
			const user = await this.prisma.user.findUnique({
				where: { email },
				include: userWithCurrentSubscriptionInclude,
			})

			if (!user) return null

			return this.mapDbUserToServiceUser(user)
		} catch (err: unknown) {
			console.log(err)
		}
	}

	@CatchDbError()
	async getUserByEmailAndPassword(email: string, password: string) {
		const user = await this.prisma.user.findUnique({
			where: { email },
			include: userWithCurrentSubscriptionInclude,
		})
		if (!user || !user.password) return null

		const isPasswordMath = this.hashAdapter.compare(password, user.password)
		if (!isPasswordMath) return null

		return this.mapDbUserToServiceUser(user)
	}

	@CatchDbError()
	async getUserByConfirmationCode(confirmationCode: string) {
		const user = await this.prisma.user.findFirst({
			where: { email_confirmation_code: confirmationCode },
			include: userWithCurrentSubscriptionInclude,
		})

		if (!user) return null

		return this.mapDbUserToServiceUser(user)
	}

	@CatchDbError()
	async createUserByEmailAndPassword(dto: { email: string; password: string }): Promise<UserServiceModel> {
		const newUserParams = {
			email: dto.email,
			password: await this.makePasswordHash(dto.password),
			...this.newConfirmationCodeData(),
		}

		const user = await this.prisma.user.create({
			data: newUserParams,
		})

		const createdUser = await this.getUserById(user.id)
		if (!createdUser) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return createdUser
	}

	@CatchDbError()
	async createUserByEmail(email: string): Promise<UserServiceModel> {
		const newUserParams = {
			email,
			is_user_confirmed: true,
		}

		const user = await this.prisma.user.create({
			data: newUserParams,
		})

		const createdUser = await this.getUserById(user.id)
		if (!createdUser) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return createdUser
	}

	@CatchDbError()
	async updateUser(userId: number, data: Partial<User>) {
		await this.prisma.user.update({
			where: { id: userId },
			data,
		})
	}

	@CatchDbError()
	async setPassword(userId: number, password: string) {
		await this.prisma.user.update({
			where: { id: userId },
			data: {
				password: await this.makePasswordHash(password),
			},
		})
	}

	@CatchDbError()
	async setNewEmailVerifiedCode(userId: number) {
		const newConfirmationCodeData = this.newConfirmationCodeData()

		await this.updateUser(userId, newConfirmationCodeData)

		return newConfirmationCodeData.email_confirmation_code
	}

	@CatchDbError()
	async makeEmailVerified(userId: number) {
		await this.updateUser(userId, {
			email_confirmation_code: null,
			is_email_confirmed: true,
			email_confirmation_code_expiration_date: null,
		})
	}

	newConfirmationCodeData() {
		return {
			email_confirmation_code: createUniqString(),
			email_confirmation_code_expiration_date: add(new Date(), {
				days: 3,
			}).toISOString(),
			is_email_confirmed: false,
		}
	}

	async makePasswordHash(password: string) {
		return await this.hashAdapter.hashString(password)
	}

	mapDbUserToServiceUser(dbUser: DbUserWithCurrentSubscription): UserServiceModel {
		return {
			id: dbUser.id,
			email: dbUser.email,
			password: dbUser.password,
			emailConfirmationCode: dbUser.email_confirmation_code,
			confirmationCodeExpirationDate: dbUser.email_confirmation_code_expiration_date,
			isEmailConfirmed: dbUser.is_email_confirmed,
			isUserConfirmed: dbUser.is_user_confirmed,
			currentSubscription: this.mapCurrentSubscription(dbUser),
		}
	}

	private mapCurrentSubscription(dbUser: DbUserWithCurrentSubscription): null | CurrentSubscriptionServiceModel {
		const currentSubscription = dbUser.UserSubscription?.[0]
		const now = new Date()
		const isSubscriptionActive = Boolean(currentSubscription?.ends_at && currentSubscription.ends_at > now)
		if (!isSubscriptionActive) {
			return null
		}

		return {
			tariffId: currentSubscription.tariff_id,
			tariffCode: currentSubscription.tariff.code,
			tariffName: currentSubscription.tariff.name,
			pricePaid: currentSubscription.price_paid,
			balance: currentSubscription.balance,
			includedBalance: currentSubscription.tariff.included_balance,
			includedFileStorageMb: currentSubscription.included_file_storage_mb,
			startsAt: currentSubscription.starts_at.toISOString(),
			endsAt: currentSubscription.ends_at.toISOString(),
		}
	}
}
