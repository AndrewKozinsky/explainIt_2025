import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import type { UserGender } from 'prisma/generated/client'

export type UserProfileUpdate = {
	gender?: UserGender
	avatar_preset_id?: string | null
	avatar_s3_key?: string | null
}

@Injectable()
export class UserProfileRepository {
	constructor(private readonly prisma: PrismaService) {}

	/** Lock the row so concurrent replacements return the actual previous photo after commit. */
	updateProfile(userId: number, data: UserProfileUpdate) {
		return this.prisma.$transaction(async (tx) => {
			const rows = await tx.$queryRaw<Array<{ id: number }>>`
				SELECT id FROM "User" WHERE id = ${userId} FOR UPDATE
			`
			if (!rows.length) return null

			const previous = await tx.user.findUniqueOrThrow({ where: { id: userId } })
			const user = await tx.user.update({ where: { id: userId }, data })

			return { user, previousAvatarKey: previous.avatar_s3_key }
		})
	}

	async isAvatarInUse(key: string): Promise<boolean> {
		return Boolean(await this.prisma.user.findFirst({ where: { avatar_s3_key: key }, select: { id: true } }))
	}
}
