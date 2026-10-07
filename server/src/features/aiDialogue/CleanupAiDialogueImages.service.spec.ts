jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		warn() {}
	},
}))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))
jest.mock('@nestjs/schedule', () => ({ Interval: () => () => undefined }))

import { AiDialogueImageCleanupRepository } from 'repo/aiDialogue/aiDialogueImageCleanup.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { CleanupAiDialogueImages } from './CleanupAiDialogueImages.service'

const prefix = 'ai-dialogue-images/generated/ru/localtest/'
const filename = '00000000-0000-4000-8000-000000000001.png'
const key = `${prefix}job-10/${filename}`
const legacy = `ai-dialogue-images/generated/job-10/${filename}`
const old = new Date(Date.now() - 48 * 60 * 60_000)

function harness() {
	const repository = { isGeneratedImageInUse: jest.fn().mockResolvedValue(false) }
	const storage = { listFilesByPrefix: jest.fn().mockResolvedValue({ Contents: [] }), deleteFile: jest.fn() }
	const config = { get: () => ({ region: 'ru', mode: 'localtest' }) }
	const cleanup = new CleanupAiDialogueImages(
		repository as unknown as AiDialogueImageCleanupRepository,
		storage as unknown as CloudflareS3Service,
		config as unknown as MainConfigService,
	)

	return { cleanup, repository, storage }
}

describe('CleanupAiDialogueImages', () => {
	it('removes known originals once, including legacy keys obtained during dialogue deletion', async () => {
		const { cleanup, storage } = harness()
		await cleanup.cleanupDeletedDialogueImages([key, key, legacy])
		expect(storage.deleteFile.mock.calls).toEqual([
			[key, 10_000],
			[legacy, 10_000],
		])
	})
	it('never deletes shared, malformed, foreign-region or arbitrary files', async () => {
		const { cleanup, repository, storage } = harness()
		await cleanup.cleanupDeletedDialogueImages([
			'ai-dialogue-images/shared/user-avatar.jpg',
			'style.png',
			`${prefix}job-10/not-a-uuid.png`,
			key.replace('/ru/', '/intl/'),
		])
		expect(repository.isGeneratedImageInUse).not.toHaveBeenCalled()
		expect(storage.deleteFile).not.toHaveBeenCalled()
	})
	it('retains a bound file or an active generation', async () => {
		const { cleanup, repository, storage } = harness()
		repository.isGeneratedImageInUse.mockResolvedValue(true)
		await cleanup.cleanupDeletedDialogueImages([key])
		expect(storage.deleteFile).not.toHaveBeenCalled()
	})
	it('does not fail DELETE on DB or R2 errors and retries new keys during later scans', async () => {
		const { cleanup, repository, storage } = harness()
		repository.isGeneratedImageInUse.mockRejectedValueOnce(new Error('DB offline'))
		await expect(cleanup.cleanupDeletedDialogueImages([key])).resolves.toBeUndefined()
		expect(storage.deleteFile).not.toHaveBeenCalled()
		storage.deleteFile.mockRejectedValueOnce(new Error('R2 offline'))
		await expect(cleanup.cleanupDeletedDialogueImages([key])).resolves.toBeUndefined()
		storage.listFilesByPrefix.mockResolvedValue({ Contents: [{ Key: key, LastModified: old }] })
		await cleanup.cleanupOrphanedImages()
		expect(storage.deleteFile).toHaveBeenCalledTimes(2)
	})
	it('scans only its namespace and skips fresh, legacy and undated objects', async () => {
		const { cleanup, storage } = harness()
		storage.listFilesByPrefix.mockResolvedValue({
			Contents: [
				{ Key: key, LastModified: old },
				{ Key: key.replace('job-10', 'job-11'), LastModified: new Date() },
				{ Key: legacy, LastModified: old },
				{ Key: key.replace('/ru/', '/intl/'), LastModified: old },
				{ Key: key.replace('job-10', 'job-12') },
				{ Key: key.replace('job-10', 'job-13'), LastModified: new Date(NaN) },
			],
		})
		await cleanup.cleanupOrphanedImages()
		expect(storage.listFilesByPrefix).toHaveBeenCalledWith(prefix, undefined, 25)
		expect(storage.deleteFile.mock.calls).toEqual([[key, 10_000]])
	})
	it('advances through pages and starts another pass after the last page', async () => {
		const { cleanup, storage } = harness()
		storage.listFilesByPrefix.mockResolvedValueOnce({
			Contents: [],
			IsTruncated: true,
			NextContinuationToken: 'next',
		})
		await cleanup.cleanupOrphanedImages()
		await cleanup.cleanupOrphanedImages()
		await cleanup.cleanupOrphanedImages()
		expect(storage.listFilesByPrefix.mock.calls).toEqual([
			[prefix, undefined, 25],
			[prefix, 'next', 25],
			[prefix, undefined, 25],
		])
	})
	it('restarts after a listing failure', async () => {
		const { cleanup, storage } = harness()
		storage.listFilesByPrefix.mockResolvedValueOnce({ IsTruncated: true, NextContinuationToken: 'bad' })
		await cleanup.cleanupOrphanedImages()
		storage.listFilesByPrefix.mockRejectedValueOnce(new Error('invalid cursor'))
		await expect(cleanup.cleanupOrphanedImages()).resolves.toBeUndefined()
		await cleanup.cleanupOrphanedImages()
		expect(storage.listFilesByPrefix).toHaveBeenLastCalledWith(prefix, undefined, 25)
	})
	it('prevents overlapping scans and new deletion after shutdown', async () => {
		const { cleanup, storage } = harness()
		let resolve!: (page: unknown) => void
		storage.listFilesByPrefix.mockImplementationOnce(
			() =>
				new Promise((done) => {
					resolve = done
				}),
		)
		const scanning = cleanup.cleanupOrphanedImages()
		await cleanup.cleanupOrphanedImages()
		expect(storage.listFilesByPrefix).toHaveBeenCalledTimes(1)
		cleanup.onModuleDestroy()
		resolve({ Contents: [{ Key: key, LastModified: old }] })
		await scanning
		await cleanup.cleanupDeletedDialogueImages([key])
		expect(storage.deleteFile).not.toHaveBeenCalled()
	})
})
