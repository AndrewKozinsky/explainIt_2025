import { Injectable } from '@nestjs/common'
import { add } from 'date-fns'
import { User } from 'prisma/generated/client'
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
	async createUserByEmailAndPassword(dto: { email: string; password: string }) {
		const newUserParams = {
			email: dto.email,
			password: await this.makePasswordHash(dto.password),
			...this.newConfirmationCodeData(),
		}

		const user = await this.prisma.user.create({
			data: newUserParams,
		})

		return this.mapDbUserToServiceUser(user)
	}

	@CatchDbError()
	async createUserByEmail(email: string) {
		const newUserParams = {
			email,
			is_user_confirmed: true,
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

	@CatchDbError()
	async updateBalance(userId: number, amount: number) {
		// Если число отрицательное, то при записи в БД сделать положительным иначе не сработает правильным образом
		const balanceChangeObj = amount > 0 ? { increment: amount } : { decrement: -amount }

		await this.prisma.user.update({
			where: { id: userId },
			data: {
				balance: balanceChangeObj,
			},
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
