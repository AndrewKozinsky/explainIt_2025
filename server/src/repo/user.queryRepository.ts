import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import { getAvatarPreset } from 'features/user/avatarPresets'
import { getAvatarUrlExpiresAt } from 'features/user/userAvatarConfig'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { UserOutModel } from 'models/user/user.out.model'
import { User } from 'prisma/generated/client'

@Injectable()
export class UserQueryRepository {
	constructor(
		private prisma: PrismaService,
		private readonly storage: CloudflareS3Service,
	) {}

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

	async mapDbUserToOutUser(dbUser: User): Promise<UserOutModel> {
		const avatarKey = dbUser.avatar_s3_key ?? getAvatarPreset(dbUser.avatar_preset_id ?? '')?.s3Key
		if (!avatarKey) throw new Error('User avatar is not configured')

		const avatarUrlExpiresAt = getAvatarUrlExpiresAt()

		return {
			id: dbUser.id,
			email: dbUser.email,
			isUserConfirmed: dbUser.is_user_confirmed,
			balance: dbUser.balance ?? 0,
			gender: dbUser.gender,
			avatarPresetId: dbUser.avatar_preset_id,
			avatarUrl: await this.storage.getFileUrl(avatarKey),
			avatarUrlExpiresAt,
		}
	}
}
