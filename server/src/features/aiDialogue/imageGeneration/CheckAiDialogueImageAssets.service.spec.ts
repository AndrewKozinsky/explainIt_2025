jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import sharp from 'sharp'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import {
	AI_DIALOGUE_STYLE_AVATAR_REFERENCE_S3_KEY,
	AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY,
	AI_DIALOGUE_USER_AVATAR_S3_KEY,
} from '../aiDialogueVisualConfig'
import { CheckAiDialogueImageAssets } from './CheckAiDialogueImageAssets.service'

describe('read-only dialogue image assets check', () => {
	const keys = { userAvatar: 'user.jpg', avatarStyle: 'avatar.png', sceneStyle: 'scene.webp' }
	let image: Buffer
	beforeAll(async () => {
		image = await sharp({ create: { width: 512, height: 256, channels: 3, background: 'green' } })
			.png()
			.toBuffer()
	})
	function harness() {
		const storage = { readFile: jest.fn().mockResolvedValue(image), uploadFile: jest.fn(), deleteFile: jest.fn() }
		return { storage, check: new CheckAiDialogueImageAssets(storage as unknown as CloudflareS3Service) }
	}

	it('reports decoded metadata for all resources without writing or deleting', async () => {
		const { storage, check } = harness()
		const report = await check.checkSharedImageAssets(keys)
		expect(report.ready).toBe(true)
		expect(report.assets).toEqual(
			Object.entries(keys).map(([asset, key]) => ({
				asset,
				key,
				status: 'ready',
				width: 512,
				height: 256,
				mime: 'image/png',
			})),
		)
		expect(storage.readFile.mock.calls).toEqual([['user.jpg'], ['avatar.png'], ['scene.webp']])
		expect(storage.uploadFile).not.toHaveBeenCalled()
		expect(storage.deleteFile).not.toHaveBeenCalled()
	})
	it('uses the configured avatar and style keys', async () => {
		const { storage, check } = harness()
		const report = await check.checkSharedImageAssets()
		expect(storage.readFile).toHaveBeenCalledWith(AI_DIALOGUE_USER_AVATAR_S3_KEY)
		expect(report.ready).toBe(true)
		expect(storage.readFile.mock.calls).toEqual([
			[AI_DIALOGUE_USER_AVATAR_S3_KEY],
			[AI_DIALOGUE_STYLE_AVATAR_REFERENCE_S3_KEY],
			[AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY],
		])
		await expect(
			check.checkSharedImageAssets({ ...keys, avatarStyle: null, sceneStyle: null }),
		).resolves.toMatchObject({
			ready: false,
			assets: [
				expect.objectContaining({ status: 'ready' }),
				{ asset: 'avatarStyle', key: null, status: 'unconfigured' },
				{ asset: 'sceneStyle', key: null, status: 'unconfigured' },
			],
		})
	})
	it('continues after inaccessible objects and does not expose SDK error details', async () => {
		const { storage, check } = harness()
		storage.readFile.mockRejectedValueOnce(new Error('secret access key and signed URL'))
		const report = await check.checkSharedImageAssets(keys)
		expect(report.ready).toBe(false)
		expect(report.assets[0]).toEqual({ asset: 'userAvatar', key: 'user.jpg', status: 'unavailable' })
		expect(report.assets[2].status).toBe('ready')
		expect(JSON.stringify(report)).not.toContain('secret')
	})
	it('rejects non-images but checks subsequent resources', async () => {
		const { storage, check } = harness()
		storage.readFile.mockResolvedValueOnce(Buffer.from('not an image'))
		const report = await check.checkSharedImageAssets(keys)
		expect(report.assets[0].status).toBe('invalid')
		expect(report.assets[1].status).toBe('ready')
		expect(report.ready).toBe(false)
	})
	it('rejects references too small for the worker', async () => {
		const { storage, check } = harness()
		storage.readFile.mockResolvedValue(
			await sharp({ create: { width: 120, height: 120, channels: 3, background: 'red' } })
				.png()
				.toBuffer(),
		)
		const report = await check.checkSharedImageAssets(keys)
		expect(report.assets.every((asset) => asset.status === 'invalid')).toBe(true)
	})
	it('skips empty keys without an R2 request', async () => {
		const { storage, check } = harness()
		const report = await check.checkSharedImageAssets({ userAvatar: '', avatarStyle: null, sceneStyle: ' ' })
		expect(report.ready).toBe(false)
		expect(storage.readFile).not.toHaveBeenCalled()
		expect(report.assets.every((asset) => asset.status === 'unconfigured')).toBe(true)
	})
})
