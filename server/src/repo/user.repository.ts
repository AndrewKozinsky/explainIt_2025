import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { add } from 'date-fns'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { HashAdapterService } from '../infrastructure/hashAdapter/hash-adapter.service'
import { UserServiceModel } from '../models/auth/auth.service.model'
import { createUniqString } from '../utils/stringUtils'

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
		})

		if (!user) return null

		return this.mapDbUserToServiceUser(user)
	}

	@CatchDbError()
	async createUser(dto: { email: string; password?: string; isUserConfirmed?: boolean }) {
		const newUserParams = {
			email: dto.email,
			password: dto.password ? await this.hashAdapter.hashString(dto.password) : null,
			email_confirmation_code: createUniqString(),
			email_confirmation_code_expiration_date: add(new Date(), {
				days: 3,
			}).toISOString(),
			is_user_confirmed: !!dto.isUserConfirmed,
		}

		const user = await this.prisma.user.create({
			data: newUserParams,
		})

		return this.mapDbUserToServiceUser(user)
	}

	@CatchDbError()
	async updateUser(userId: number, data: Partial<User>) {
		await this.prisma.user.update({
			where: { id: userId },
			data,
		})
	}

	@CatchDbError()
	async relativeUpdateUserBalance(userId: number, relativeBalanceValue: number) {
		const updateMethod = relativeBalanceValue > 0 ? 'increment' : 'decrement'

		const updatedUser = await this.prisma.user.update({
			where: { id: userId },
			data: {
				balance: {
					[updateMethod]: relativeBalanceValue,
				},
			},
		})

		return this.mapDbUserToServiceUser(updatedUser)
	}

	@CatchDbError()
	async makeEmailVerified(userId: number) {
		await this.updateUser(userId, {
			email_confirmation_code: null,
			is_email_confirmed: true,
			email_confirmation_code_expiration_date: null,
		})
	}

	mapDbUserToServiceUser(dbUser: User): UserServiceModel {
		return {
			id: dbUser.id,
			email: dbUser.email,
			password: dbUser.password,
			emailConfirmationCode: dbUser.email_confirmation_code,
			confirmationCodeExpirationDate: dbUser.email_confirmation_code_expiration_date,
			isEmailConfirmed: dbUser.is_email_confirmed,
			isUserConfirmed: dbUser.is_user_confirmed,
			balance: dbUser.balance,
		}
	}
}
