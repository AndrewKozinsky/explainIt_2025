jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	applyDecorators:
		(...decorators: PropertyDecorator[]) =>
		(target: object, key: string | symbol) => {
			decorators.forEach((decorator) => decorator(target, key))
		},
}))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('@nestjs/schedule', () => ({ Interval: () => () => undefined }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))
jest.mock('@nestjs/swagger', () => ({
	ApiProperty: () => () => undefined,
	ApiPropertyOptional: () => () => undefined,
	ApiSchema: () => () => undefined,
}))

import 'reflect-metadata'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import sharp from 'sharp'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { UpdateUserProfileDto } from 'routes/user/dto/updateUserProfile.dto'
import type { PrismaService } from 'db/prisma.service'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import type { HashAdapterService } from 'infrastructure/hashAdapter/hash-adapter.service'
import { ImageProcessingService } from 'infrastructure/imageProcessing/imageProcessing.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { UserOutModel } from 'models/user/user.out.model'
import { GENERATE_SCENE_IMAGE } from 'models/user/userPreferences'
import { User } from 'prisma/generated/client'
import { CleanupUserAvatars } from './CleanupUserAvatars.service'
import { DeleteUserAvatarCommand, DeleteUserAvatarHandler } from './DeleteUserAvatar.command'
import { GetAvatarPresetsHandler } from './GetAvatarPresets.command'
import { UpdateUserProfileCommand, UpdateUserProfileHandler } from './UpdateUserProfile.command'
import { UploadUserAvatarCommand, UploadUserAvatarHandler } from './UploadUserAvatar.command'
import { USER_AVATAR_MAX_UPLOAD_BYTES } from './userAvatarConfig'

function harness() {
	const user = { id: 1, gender: 'MALE', avatar_preset_id: 'male-1', avatar_s3_key: null } as User
	const repository = {
		updateProfile: jest.fn(async (_id: number, data: object) => ({
			user: { ...user, ...data } as User,
			previousAvatarKey: user.avatar_s3_key,
		})),
	}
	const queryRepository = { mapDbUserToOutUser: jest.fn(async (dbUser: User) => dbUser as unknown as UserOutModel) }
	const storage = { uploadFile: jest.fn(), getFileUrl: jest.fn(async (key: string) => `signed:${key}`) }
	const cleanup = { cleanupReplacedPhoto: jest.fn() }
	const config = { get: () => ({ region: 'ru', mode: 'localtest' }) }
	const images = new ImageProcessingService()

	return {
		user,
		repository,
		queryRepository,
		storage,
		cleanup,
		images,
		update: new UpdateUserProfileHandler(
			repository as unknown as UserRepository,
			queryRepository as unknown as UserQueryRepository,
		),
		upload: new UploadUserAvatarHandler(
			repository as unknown as UserRepository,
			queryRepository as unknown as UserQueryRepository,
			storage as unknown as CloudflareS3Service,
			images,
			cleanup as unknown as CleanupUserAvatars,
			config as unknown as MainConfigService,
		),
		deleteAvatar: new DeleteUserAvatarHandler(
			repository as unknown as UserRepository,
			queryRepository as unknown as UserQueryRepository,
			cleanup as unknown as CleanupUserAvatars,
		),
	}
}

async function photo(width: number, height: number) {
	return sharp({ create: { width, height, channels: 3, background: '#ad3535' } })
		.jpeg()
		.toBuffer()
}

describe('user profile changes', () => {
	it('accepts false as a preferences-only update', async () => {
		const h = harness()
		const preferences = { [GENERATE_SCENE_IMAGE]: false }
		const input = plainToInstance(UpdateUserProfileDto, { preferences })
		expect(validateSync(input, { whitelist: true, forbidNonWhitelisted: true })).toEqual([])
		await h.update.execute(new UpdateUserProfileCommand(1, input))
		expect(h.repository.updateProfile).toHaveBeenCalledWith(1, { preferences })
	})

	it.each([
		[null],
		[[]],
		[{ [GENERATE_SCENE_IMAGE]: null }],
		[{ [GENERATE_SCENE_IMAGE]: 'false' }],
		[{ unknown: true }],
	])('rejects invalid preferences %j', (preferences) => {
		const input = plainToInstance(UpdateUserProfileDto, { preferences })
		expect(validateSync(input, { whitelist: true, forbidNonWhitelisted: true })).toHaveLength(1)
	})

	it('merges a preference patch with the profile read under the row lock', async () => {
		const tx = {
			$queryRaw: jest.fn().mockResolvedValue([{ id: 1 }]),
			user: {
				findUniqueOrThrow: jest
					.fn()
					.mockResolvedValue({ preferences: { other: true, [GENERATE_SCENE_IMAGE]: true } }),
				update: jest.fn(),
			},
		}
		const prisma = { $transaction: (operation: (transaction: typeof tx) => unknown) => operation(tx) }
		const repository = new UserRepository(prisma as unknown as PrismaService, {} as HashAdapterService)

		await repository.updateProfile(1, { preferences: { [GENERATE_SCENE_IMAGE]: false } })

		expect(tx.$queryRaw).toHaveBeenCalledTimes(1)
		expect(tx.user.update).toHaveBeenCalledWith({
			where: { id: 1 },
			data: { preferences: { other: true, [GENERATE_SCENE_IMAGE]: false } },
		})
	})

	it.each([
		['MALE', 'female-2', 'FEMALE'],
		['FEMALE', 'male-2', 'MALE'],
	] as const)('sets the gender of %s to match the selected %s preset', async (gender, presetId, presetGender) => {
		const h = harness()
		h.user.avatar_s3_key = 'old-photo'
		await h.update.execute(new UpdateUserProfileCommand(1, { gender, avatarPresetId: presetId }))
		expect(h.repository.updateProfile).toHaveBeenCalledWith(1, {
			gender: presetGender,
			avatar_preset_id: presetId,
		})
		expect(h.cleanup.cleanupReplacedPhoto).not.toHaveBeenCalled()
	})

	it('changes only gender without replacing or cleaning the current photo', async () => {
		const h = harness()
		h.user.avatar_s3_key = 'own-photo'
		h.user.avatar_preset_id = null
		const updated = await h.update.execute(new UpdateUserProfileCommand(1, { gender: 'FEMALE' }))
		expect(h.repository.updateProfile).toHaveBeenCalledWith(1, { gender: 'FEMALE' })
		expect(updated).toMatchObject({ avatar_preset_id: null, avatar_s3_key: 'own-photo', gender: 'FEMALE' })
		expect(h.cleanup.cleanupReplacedPhoto).not.toHaveBeenCalled()
	})

	it.each([
		['FEMALE', 'male-2', 'female-1'],
		['MALE', 'female-2', 'male-1'],
		['FEMALE', 'female-2', undefined],
		['FEMALE', null, undefined],
		['MALE', null, undefined],
	] as const)(
		'updates the locked portrait on a gender change to %s (previous preset: %s)',
		async (gender, presetId, nextPresetId) => {
			const previous = {
				gender: gender === 'FEMALE' ? 'MALE' : 'FEMALE',
				avatar_preset_id: presetId,
				avatar_s3_key: 'own-photo',
			}
			const tx = {
				$queryRaw: jest.fn().mockResolvedValue([{ id: 1 }]),
				user: {
					findUniqueOrThrow: jest.fn().mockResolvedValue(previous),
					update: jest.fn(({ data }) => ({ ...previous, ...data })),
				},
			}
			const prisma = { $transaction: (operation: (transaction: typeof tx) => unknown) => operation(tx) }
			const repository = new UserRepository(prisma as unknown as PrismaService, {} as HashAdapterService)

			const updated = await repository.updateProfile(1, { gender })

			expect(tx.user.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: nextPresetId ? { gender, avatar_preset_id: nextPresetId } : { gender },
			})
			expect(updated?.user).toMatchObject({
				gender,
				avatar_preset_id: nextPresetId ?? presetId,
				avatar_s3_key: 'own-photo',
			})
		},
	)

	it.each([{}, { gender: null }, { avatarPresetId: 3 }, { gender: 'OTHER' }, { avatarPresetId: 'unknown' }])(
		'rejects invalid or empty input %j before touching the database',
		async (input) => {
			const h = harness()
			await expect(h.update.execute(new UpdateUserProfileCommand(1, input as never))).rejects.toThrow()
			expect(h.repository.updateProfile).not.toHaveBeenCalled()
		},
	)

	it('does not clean old photos after a failed update or missing user', async () => {
		const h = harness()
		h.repository.updateProfile.mockRejectedValueOnce(new Error('DB unavailable'))
		await expect(h.update.execute(new UpdateUserProfileCommand(1, { avatarPresetId: 'male-2' }))).rejects.toThrow()
		h.repository.updateProfile.mockResolvedValueOnce(null as never)
		await expect(h.update.execute(new UpdateUserProfileCommand(1, { avatarPresetId: 'male-2' }))).rejects.toThrow()
		expect(h.cleanup.cleanupReplacedPhoto).not.toHaveBeenCalled()
	})

	it.each(['localtest', 'localdev', 'localcheckserver', 'serverdevelop', 'servermaster', 'preview-2'])(
		'returns the four shared presets for %s',
		async (mode) => {
			const h = harness()
			const config = { get: () => ({ mode }) } as unknown as MainConfigService
			const handler = new GetAvatarPresetsHandler(h.storage as unknown as CloudflareS3Service, config)
			const presets = await handler.execute()
			expect(presets.map((preset) => [preset.id, preset.gender])).toEqual([
				['male-1', 'MALE'],
				['male-2', 'MALE'],
				['female-1', 'FEMALE'],
				['female-2', 'FEMALE'],
			])
			expect(presets[0]).toEqual({
				id: 'male-1',
				gender: 'MALE',
				avatarUrl: `signed:user-avatars-shared/${mode}/male-1.jpg`,
			})
		},
	)
})

describe('avatar photo processing and upload', () => {
	it.each([
		[1200, 1800, 512, 768],
		[1800, 1200, 768, 512],
		[200, 300, 200, 300],
	])(
		'preserves proportions for %ix%i without enlarging small photos',
		async (width, height, resultWidth, resultHeight) => {
			const h = harness()
			await h.upload.execute(new UploadUserAvatarCommand(1, { buffer: await photo(width, height) }))
			const [key, data, mime, timeout] = h.storage.uploadFile.mock.calls[0] as unknown as [
				string,
				Buffer,
				string,
				number,
			]
			const metadata = await sharp(data).metadata()
			expect([metadata.width, metadata.height]).toEqual([resultWidth, resultHeight])
			expect(metadata.format).toBe('webp')
			expect([mime, timeout]).toEqual(['image/webp', 60_000])
			expect(key).toMatch(/^user-avatars\/uploads\/ru\/localtest\/1\/[0-9a-f-]+\.webp$/)
			expect(h.repository.updateProfile).toHaveBeenCalledWith(1, { avatar_s3_key: key })
		},
	)

	it.each(['female-2', null])('preserves the active selection %s when saving a photo', async (presetId) => {
		const h = harness()
		h.user.avatar_preset_id = presetId
		const result = await h.upload.execute(new UploadUserAvatarCommand(1, { buffer: await photo(600, 800) }))
		expect(result).toMatchObject({ avatar_preset_id: presetId, avatar_s3_key: expect.any(String) })
	})

	it('orients EXIF photos before resizing and strips EXIF metadata', async () => {
		const h = harness()
		const buffer = await sharp(await photo(1800, 1200))
			.withMetadata({ orientation: 6 })
			.jpeg()
			.toBuffer()
		await h.upload.execute(new UploadUserAvatarCommand(1, { buffer }))
		const data = h.storage.uploadFile.mock.calls[0][1]
		const metadata = await sharp(data).metadata()
		expect([metadata.width, metadata.height]).toEqual([512, 768])
		expect(metadata.exif).toBeUndefined()
		expect(metadata.orientation).toBeUndefined()
	})

	it('keeps content at both edges instead of cropping to a square', async () => {
		const h = harness()
		const svg = Buffer.from(
			'<svg width="1200" height="600"><rect width="1200" height="600" fill="white"/><rect width="100" height="600" fill="red"/><rect x="1100" width="100" height="600" fill="blue"/></svg>',
		)
		const buffer = await sharp(svg).png().toBuffer()
		await h.upload.execute(new UploadUserAvatarCommand(1, { buffer }))
		const { data, info } = await sharp(h.storage.uploadFile.mock.calls[0][1])
			.raw()
			.toBuffer({ resolveWithObject: true })
		const left = (Math.floor(info.height / 2) * info.width + 10) * info.channels
		const right = (Math.floor(info.height / 2) * info.width + info.width - 10) * info.channels
		expect(data[left]).toBeGreaterThan(200)
		expect(data[left + 2]).toBeLessThan(50)
		expect(data[right + 2]).toBeGreaterThan(200)
		expect(data[right]).toBeLessThan(50)
	})

	it.each([undefined, Buffer.alloc(0), Buffer.from('not an image'), Buffer.alloc(USER_AVATAR_MAX_UPLOAD_BYTES + 1)])(
		'rejects missing, invalid and oversized uploads',
		async (buffer) => {
			const h = harness()
			await expect(
				h.upload.execute(new UploadUserAvatarCommand(1, buffer ? { buffer } : undefined)),
			).rejects.toThrow('USER_INVALID_AVATAR_PHOTO')
			expect(h.storage.uploadFile).not.toHaveBeenCalled()
			expect(h.repository.updateProfile).not.toHaveBeenCalled()
		},
	)

	it('rejects SVG, animation, oversized pixel counts and corrupt compressed data', async () => {
		const h = harness()
		const svg = Buffer.from('<svg width="100" height="100"><rect width="100" height="100"/></svg>')
		await expect(h.upload.execute(new UploadUserAvatarCommand(1, { buffer: svg }))).rejects.toThrow(
			'USER_INVALID_AVATAR_PHOTO',
		)
		const jpeg = await photo(1200, 800)
		await expect(
			h.upload.execute(new UploadUserAvatarCommand(1, { buffer: jpeg.subarray(0, 200) })),
		).rejects.toThrow('USER_INVALID_AVATAR_PHOTO')
		jest.spyOn(h.images, 'inspect').mockResolvedValueOnce({ format: 'webp', pages: 2 } as never)
		await expect(h.upload.execute(new UploadUserAvatarCommand(1, { buffer: jpeg }))).rejects.toThrow(
			'USER_INVALID_AVATAR_PHOTO',
		)
		jest.spyOn(h.images, 'inspect').mockRejectedValueOnce(new Error('pixel limit exceeded'))
		await expect(h.upload.execute(new UploadUserAvatarCommand(1, { buffer: jpeg }))).rejects.toThrow(
			'USER_INVALID_AVATAR_PHOTO',
		)
		expect(h.storage.uploadFile).not.toHaveBeenCalled()
	})

	it('does not update the profile if R2 fails', async () => {
		const h = harness()
		h.storage.uploadFile.mockRejectedValueOnce(new Error('R2 unavailable'))
		await expect(
			h.upload.execute(new UploadUserAvatarCommand(1, { buffer: await photo(600, 800) })),
		).rejects.toThrow('R2 unavailable')
		expect(h.repository.updateProfile).not.toHaveBeenCalled()
		expect(h.cleanup.cleanupReplacedPhoto).not.toHaveBeenCalled()
	})

	it('retains the new object on uncertain DB commit and cleans the previous object only after success', async () => {
		const h = harness()
		h.user.gender = 'FEMALE'
		h.user.avatar_s3_key = 'previous-photo'
		h.repository.updateProfile.mockRejectedValueOnce(new Error('lost commit confirmation'))
		const buffer = await photo(600, 800)
		await expect(h.upload.execute(new UploadUserAvatarCommand(1, { buffer }))).rejects.toThrow()
		expect(h.cleanup.cleanupReplacedPhoto).not.toHaveBeenCalled()
		const result = await h.upload.execute(new UploadUserAvatarCommand(1, { buffer }))
		expect(result.gender).toBe('FEMALE')
		expect(h.cleanup.cleanupReplacedPhoto).toHaveBeenCalledWith('previous-photo')
	})
})

describe('deleting a user photo', () => {
	it.each([
		['MALE', null, 'male-1'],
		['FEMALE', null, 'female-1'],
		['FEMALE', 'female-2', undefined],
	])('uses the locked profile to select a preset for %s and previous selection %s', async (gender, preset, next) => {
		const previous = { gender, avatar_preset_id: preset, avatar_s3_key: 'old-photo' }
		const tx = {
			$queryRaw: jest.fn().mockResolvedValue([{ id: 1 }]),
			user: { findUniqueOrThrow: jest.fn().mockResolvedValue(previous), update: jest.fn() },
		}
		const prisma = { $transaction: (operation: (transaction: typeof tx) => unknown) => operation(tx) }
		const repository = new UserRepository(prisma as unknown as PrismaService, {} as HashAdapterService)
		const result = await repository.updateProfile(1, { avatar_s3_key: null })
		expect(tx.$queryRaw).toHaveBeenCalledTimes(1)
		expect(tx.user.update).toHaveBeenCalledWith({
			where: { id: 1 },
			data: next ? { avatar_s3_key: null, avatar_preset_id: next } : { avatar_s3_key: null },
		})
		expect(result?.previousAvatarKey).toBe('old-photo')
	})

	it('cleans the removed object only after the profile update succeeds', async () => {
		const h = harness()
		h.user.avatar_s3_key = 'old-photo'
		h.repository.updateProfile.mockRejectedValueOnce(new Error('lost commit confirmation'))
		await expect(h.deleteAvatar.execute(new DeleteUserAvatarCommand(1))).rejects.toThrow()
		expect(h.cleanup.cleanupReplacedPhoto).not.toHaveBeenCalled()

		await h.deleteAvatar.execute(new DeleteUserAvatarCommand(1))
		expect(h.cleanup.cleanupReplacedPhoto).toHaveBeenCalledWith('old-photo')
	})
})
