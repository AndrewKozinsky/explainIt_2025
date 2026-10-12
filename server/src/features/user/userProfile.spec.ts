jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('@nestjs/schedule', () => ({ Interval: () => () => undefined }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import sharp from 'sharp'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { ImageProcessingService } from 'infrastructure/imageProcessing/imageProcessing.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { UserOutModel } from 'models/user/user.out.model'
import { User } from 'prisma/generated/client'
import { CleanupUserAvatars } from './CleanupUserAvatars.service'
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
	}
}

async function photo(width: number, height: number) {
	return sharp({ create: { width, height, channels: 3, background: '#ad3535' } })
		.jpeg()
		.toBuffer()
}

describe('user profile changes', () => {
	it('sets gender from the preset even if a different gender is supplied', async () => {
		const h = harness()
		h.user.avatar_s3_key = 'old-photo'
		await h.update.execute(new UpdateUserProfileCommand(1, { gender: 'MALE', avatarPresetId: 'female-2' }))
		expect(h.repository.updateProfile).toHaveBeenCalledWith(1, {
			gender: 'FEMALE',
			avatar_preset_id: 'female-2',
		})
		expect(h.cleanup.cleanupReplacedPhoto).not.toHaveBeenCalled()
	})

	it('changes only gender without replacing or cleaning the current photo', async () => {
		const h = harness()
		await h.update.execute(new UpdateUserProfileCommand(1, { gender: 'FEMALE' }))
		expect(h.repository.updateProfile).toHaveBeenCalledWith(1, { gender: 'FEMALE' })
		expect(h.cleanup.cleanupReplacedPhoto).not.toHaveBeenCalled()
	})

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

	it('returns the four shared presets with gender and refresh times, without R2 keys', async () => {
		const h = harness()
		const handler = new GetAvatarPresetsHandler(h.storage as unknown as CloudflareS3Service)
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
			avatarUrl: 'signed:user-avatars/shared/male-1.jpg',
			avatarUrlExpiresAt: expect.any(String),
		})
	})
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
			expect(h.repository.updateProfile).toHaveBeenCalledWith(1, { avatar_preset_id: null, avatar_s3_key: key })
		},
	)

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
