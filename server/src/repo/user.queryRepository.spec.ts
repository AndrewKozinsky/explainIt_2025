jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { PrismaService } from 'db/prisma.service'
import { getAvatarUrlExpiresAt } from 'features/user/userAvatarConfig'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { User } from 'prisma/generated/client'
import { UserQueryRepository } from './user.queryRepository'

describe('user output mapping', () => {
	it.each([
		{ avatar_preset_id: 'male-1', avatar_s3_key: null, expected: 'user-avatars/shared/male-1.jpg' },
		{ avatar_preset_id: null, avatar_s3_key: 'custom-key', expected: 'custom-key' },
		{ avatar_preset_id: 'female-1', avatar_s3_key: 'custom-key', expected: 'user-avatars/shared/female-1.jpg' },
	])('signs the selected source without exposing private fields', async ({ expected, ...avatar }) => {
		const user = {
			id: 1,
			email: 'test@example.com',
			is_user_confirmed: true,
			balance: 100,
			gender: 'FEMALE',
			password: 'secret',
			...avatar,
		} as User

		const prisma = { user: { findUnique: jest.fn().mockResolvedValue(user) } }
		const storage = { getFileUrl: jest.fn(async (key: string) => `signed:${key}`) }

		const repository = new UserQueryRepository(
			prisma as unknown as PrismaService,
			storage as unknown as CloudflareS3Service,
		)

		const result = await repository.getUserById(1)

		expect(storage.getFileUrl).toHaveBeenCalledWith(expected)
		expect(result).toEqual({
			id: 1,
			email: 'test@example.com',
			isUserConfirmed: true,
			balance: 100,
			gender: 'FEMALE',
			avatarPresetId: avatar.avatar_preset_id,
			avatarUrl: `signed:${expected}`,
			uploadedAvatarUrl: avatar.avatar_s3_key ? `signed:${avatar.avatar_s3_key}` : null,
			avatarUrlExpiresAt: expect.any(String),
		})

		expect(Date.parse(result!.avatarUrlExpiresAt) - Date.now()).toBeGreaterThan(4 * 60 * 60_000)
	})

	it('announces the refresh an hour before the windowed signature ends, keeping it stable inside the window', () => {
		const windowStartExpiry = getAvatarUrlExpiresAt(Date.parse('2026-11-05T06:00:00.000Z'))
		const windowEndExpiry = getAvatarUrlExpiresAt(Date.parse('2026-11-05T11:59:59.000Z'))

		expect(windowStartExpiry).toBe('2026-11-05T17:00:00.000Z')
		expect(windowEndExpiry).toBe(windowStartExpiry)
	})
})
