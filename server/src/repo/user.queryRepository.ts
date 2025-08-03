import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
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
			})

			if (!user) return null

			return this.mapDbUserToOutUser(user)
		} catch (err: unknown) {
			console.log(err)
		}
	}

	mapDbUserToOutUser(dbUser: User): UserOutModel {
		return {
			id: dbUser.id,
			email: dbUser.email,
			isUserConfirmed: dbUser.is_user_confirmed,
		}
	}
}
