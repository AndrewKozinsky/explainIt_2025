jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		warn() {}
	},
}))
jest.mock('@nestjs/schedule', () => ({ Interval: () => () => undefined }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { UserProfileRepository } from 'repo/userProfile.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { CleanupUserAvatars } from './CleanupUserAvatars.service'

const prefix = 'user-avatars/uploads/ru/localtest/'
const key = `${prefix}1/00000000-0000-4000-8000-000000000001.webp`

function harness() {
	const repository = { isAvatarInUse: jest.fn().mockResolvedValue(false) }
	const storage = { listFilesByPrefix: jest.fn(), deleteFile: jest.fn() }
	const config = { get: () => ({ region: 'ru', mode: 'localtest' }) }

	const cleanup = new CleanupUserAvatars(
		repository as unknown as UserProfileRepository,
		storage as unknown as CloudflareS3Service,
		config as unknown as MainConfigService,
	)

	return { repository, storage, cleanup }
}

describe('user avatar cleanup', () => {
	it.each([
		'user-avatars/shared/male-1.jpg',
		key.replace('/ru/', '/intl/'),
		`${prefix}../shared.webp`,
		`${prefix}invalid.webp`,
	])('never deletes shared or foreign objects: %s', async (foreignKey) => {
		const h = harness()
		await h.cleanup.cleanupReplacedPhoto(foreignKey)

		expect(h.repository.isAvatarInUse).not.toHaveBeenCalled()
		expect(h.storage.deleteFile).not.toHaveBeenCalled()
	})

	it('checks the current DB reference before deleting a replaced photo', async () => {
		const h = harness()
		h.repository.isAvatarInUse.mockResolvedValueOnce(true)
		await h.cleanup.cleanupReplacedPhoto(key)
		expect(h.storage.deleteFile).not.toHaveBeenCalled()
		await h.cleanup.cleanupReplacedPhoto(key)
		expect(h.storage.deleteFile).toHaveBeenCalledWith(key, 10_000)
	})

	it('retains objects on DB failure and does not fail an already saved profile on R2 failure', async () => {
		const h = harness()
		h.repository.isAvatarInUse.mockRejectedValueOnce(new Error('DB unavailable'))
		await h.cleanup.cleanupReplacedPhoto(key)
		expect(h.storage.deleteFile).not.toHaveBeenCalled()
		h.storage.deleteFile.mockRejectedValueOnce(new Error('R2 unavailable'))
		await expect(h.cleanup.cleanupReplacedPhoto(key)).resolves.toBeUndefined()
	})

	it('scans only old objects, retains fresh uploads and advances the bounded cursor', async () => {
		const h = harness()
		const fresh = key.replace('000000000001', '000000000002')
		h.storage.listFilesByPrefix
			.mockResolvedValueOnce({
				Contents: [
					{ Key: key, LastModified: new Date(Date.now() - 25 * 60 * 60_000) },
					{ Key: fresh, LastModified: new Date() },
					{ Key: key },
				],
				IsTruncated: true,
				NextContinuationToken: 'next',
			})
			.mockResolvedValueOnce({ Contents: [], IsTruncated: false })
		await h.cleanup.cleanupOrphanedPhotos()
		expect(h.storage.deleteFile).toHaveBeenCalledTimes(1)
		expect(h.storage.deleteFile).toHaveBeenCalledWith(key, 10_000)
		await h.cleanup.cleanupOrphanedPhotos()
		expect(h.storage.listFilesByPrefix).toHaveBeenLastCalledWith(prefix, 'next', 25)
	})

	it('resets the cursor on listing failure and stops after shutdown', async () => {
		const h = harness()
		h.storage.listFilesByPrefix.mockRejectedValueOnce(new Error('R2 unavailable'))
		await h.cleanup.cleanupOrphanedPhotos()
		h.storage.listFilesByPrefix.mockResolvedValueOnce({ Contents: [] })
		await h.cleanup.cleanupOrphanedPhotos()
		expect(h.storage.listFilesByPrefix).toHaveBeenLastCalledWith(prefix, undefined, 25)
		h.cleanup.onModuleDestroy()
		await h.cleanup.cleanupOrphanedPhotos()
		await h.cleanup.cleanupReplacedPhoto(key)
		expect(h.storage.listFilesByPrefix).toHaveBeenCalledTimes(2)
		expect(h.storage.deleteFile).not.toHaveBeenCalled()
	})
})
