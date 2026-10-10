jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import sharp from 'sharp'
import { ImageGenerationAssetsRepository } from 'repo/aiDialogue/imageGenerationAssets.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { ImageGenerationJob } from 'prisma/generated/client'
import { AI_DIALOGUE_EMOTION_LAYOUT_VERSION } from '../aiDialogueVisualConfig'
import { parseImageGenerationSnapshot } from './buildImageGenerationPrompt'
import { R2ImageGenerationAssets } from './R2ImageGenerationAssets.service'

const common = {
	model: 'gpt-image-2.5-sunburst-2026-09-08',
	stylePrompt: 'Style',
	size: { width: 960, height: 720 },
	quality: 'low',
	format: 'png',
	resultS3Key: 'ai-dialogue-images/generated/ru/localtest/job-10/11111111-1111-4111-8111-111111111111.png',
	styleAvatarReferenceS3Key: null,
	styleSceneReferenceS3Key: null,
}

const emotion = { ...common, appearance: 'NPC', aspectRatio: '4:3', layoutVersion: AI_DIALOGUE_EMOTION_LAYOUT_VERSION }
const scene = {
	...common,
	size: { width: 1152, height: 576 },
	visualDescription: 'Scene',
	aspectRatio: '2:1',
	dialogueId: 1,
	participantNpcIds: ['npc'],
	participantCharacterIds: [2],
	userAvatarS3Key: 'user.jpg',
	styleSceneReferenceS3Key: 'style.png',
}

function harness() {
	const job = {
		id: 10,
		type: 'emotionSheet',
		status: 'generating',
		character_id: 2,
		message_id: null,
		input: JSON.stringify(emotion),
	} as ImageGenerationJob

	const repository = {
		findJob: jest.fn().mockResolvedValue(job),
		findImage: jest.fn().mockResolvedValue({ id: 20 }),
		findSceneMessage: jest.fn().mockResolvedValue({ type: 'sceneUpdate', dialogue_id: 1 }),
		findCharacters: jest.fn().mockResolvedValue([
			{
				id: 2,
				npc_id: 'npc',
				AiDialogueImage: [{ s3_key: 'npc.png', layout_version: AI_DIALOGUE_EMOTION_LAYOUT_VERSION }],
				ImageGenerationJob: [],
			},
		]),
		saveImageAndMarkJobReady: jest.fn().mockResolvedValue(true),
	}
	const storage = { readFile: jest.fn(), uploadFile: jest.fn(), deleteFile: jest.fn() }
	const service = new R2ImageGenerationAssets(
		repository as unknown as ImageGenerationAssetsRepository,
		storage as unknown as CloudflareS3Service,
		{ get: () => ({ region: 'ru', mode: 'localtest' }) } as unknown as MainConfigService,
	)
	return { job, repository, storage, service }
}

describe('R2ImageGenerationAssets', () => {
	let sprite: Buffer
	let portrait: Buffer
	beforeAll(async () => {
		sprite = await sharp({ create: { width: 960, height: 720, channels: 3, background: 'red' } })
			.png()
			.toBuffer()
		portrait = await sharp({ create: { width: 256, height: 256, channels: 3, background: 'blue' } })
			.jpeg()
			.toBuffer()
	})
	it('prepares user, neutral NPC, style in snapshot order', async () => {
		const { service, storage, job } = harness()
		job.message_id = 3
		storage.readFile.mockImplementation(async (key) => (key === 'npc.png' ? sprite : portrait))
		const references = await service.prepareReferences(
			job,
			parseImageGenerationSnapshot('scene', JSON.stringify(scene)),
		)
		expect(storage.readFile.mock.calls).toEqual([['user.jpg'], ['npc.png'], ['style.png']])
		expect(references).toHaveLength(3)
		expect(references![0]).toBe(`data:image/jpeg;base64,${portrait.toString('base64')}`)
		expect(references![1]).toMatch(/^data:image\/png;base64,/)
	})
	it('waits for an unfinished NPC without reading R2', async () => {
		const { service, repository, storage, job } = harness()
		job.message_id = 3
		repository.findCharacters.mockResolvedValue([
			{ id: 2, npc_id: 'npc', AiDialogueImage: [], ImageGenerationJob: [{ status: 'queued' }] },
		])
		await expect(
			service.prepareReferences(job, parseImageGenerationSnapshot('scene', JSON.stringify(scene))),
		).resolves.toBeNull()
		expect(storage.readFile).not.toHaveBeenCalled()
	})
	it('rejects missing or failed dependencies and foreign scene owners', async () => {
		const { service, repository, job } = harness()
		job.message_id = 3
		const snapshot = parseImageGenerationSnapshot('scene', JSON.stringify(scene))
		repository.findCharacters.mockResolvedValue([])
		await expect(service.prepareReferences(job, snapshot)).rejects.toThrow('NPC')
		repository.findCharacters.mockResolvedValue([
			{ id: 2, npc_id: 'npc', AiDialogueImage: [], ImageGenerationJob: [{ status: 'failed' }] },
		])
		await expect(service.prepareReferences(job, snapshot)).rejects.toThrow('unavailable')
		repository.findSceneMessage.mockResolvedValue({ type: 'sceneUpdate', dialogue_id: 99 })
		await expect(service.prepareReferences(job, snapshot)).rejects.toThrow('owner')
	})
	it('uploads the untouched original then commits metadata and ready', async () => {
		const { service, storage, repository, job } = harness()
		await service.publish(job, { bytes: sprite, contentType: 'image/png' })
		const key = storage.uploadFile.mock.calls[0][0]
		expect(key).toMatch(/^ai-dialogue-images\/generated\/ru\/localtest\/job-10\/[a-f0-9-]+\.png$/)
		expect(key).toBe(common.resultS3Key)
		expect(storage.uploadFile).toHaveBeenCalledWith(key, sprite, 'image/png', 60_000)
		expect(repository.saveImageAndMarkJobReady).toHaveBeenCalledWith(
			job,
			expect.objectContaining({
				s3Key: key,
				width: 960,
				height: 720,
				layoutVersion: AI_DIALOGUE_EMOTION_LAYOUT_VERSION,
			}),
		)
		expect(storage.deleteFile).not.toHaveBeenCalled()
	})
	it('publishes a scene with no sprite layout', async () => {
		const { service, repository, job } = harness()
		job.type = 'scene'
		job.character_id = null
		job.message_id = 3
		job.input = JSON.stringify(scene)
		const bytes = await sharp({ create: { width: 1152, height: 576, channels: 3, background: 'green' } })
			.png()
			.toBuffer()
		await service.publish(job, { bytes, contentType: null })
		expect(repository.saveImageAndMarkJobReady).toHaveBeenCalledWith(
			job,
			expect.objectContaining({ mime: 'image/png', width: 1152, height: 576, layoutVersion: null }),
		)
	})
	it('loads only the optional style for an emotion sheet', async () => {
		const { service, storage, job } = harness()
		await expect(
			service.prepareReferences(job, parseImageGenerationSnapshot('emotionSheet', job.input)),
		).resolves.toEqual([])
		storage.readFile.mockResolvedValue(portrait)
		const snapshot = parseImageGenerationSnapshot(
			'emotionSheet',
			JSON.stringify({ ...emotion, styleAvatarReferenceS3Key: 'avatar-style.jpg' }),
		)
		await expect(service.prepareReferences(job, snapshot)).resolves.toHaveLength(1)
		expect(storage.readFile).toHaveBeenCalledWith('avatar-style.jpg')
	})
	it('rejects too many references before reading R2', async () => {
		const { service, storage, job } = harness()
		job.message_id = 3
		const snapshot = parseImageGenerationSnapshot(
			'scene',
			JSON.stringify({
				...scene,
				participantNpcIds: Array(15).fill('npc'),
				participantCharacterIds: Array(15).fill(2),
			}),
		)
		await expect(service.prepareReferences(job, snapshot)).rejects.toThrow('Too many')
		expect(storage.readFile).not.toHaveBeenCalled()
	})
	it('rejects changed NPC identity instead of using another character', async () => {
		const { service, repository, job } = harness()
		job.message_id = 3
		repository.findCharacters.mockResolvedValue([
			{ id: 2, npc_id: 'another', AiDialogueImage: [], ImageGenerationJob: [] },
		])
		await expect(
			service.prepareReferences(job, parseImageGenerationSnapshot('scene', JSON.stringify(scene))),
		).rejects.toThrow('NPC')
	})
	it('cleans up after deletion immediately following the commit', async () => {
		const { service, storage, repository, job } = harness()
		repository.findImage.mockResolvedValue(null)
		repository.findJob.mockResolvedValueOnce(job).mockResolvedValue(null)
		await service.publish(job, { bytes: sprite, contentType: null })
		expect(storage.deleteFile).toHaveBeenCalledWith(common.resultS3Key, 10_000)
	})
	it('does not commit ready when R2 upload fails', async () => {
		const { service, storage, repository, job } = harness()
		storage.uploadFile.mockRejectedValue(new Error('R2 unavailable'))
		await expect(service.publish(job, { bytes: sprite, contentType: null })).rejects.toThrow('R2 unavailable')
		expect(repository.saveImageAndMarkJobReady).not.toHaveBeenCalled()
	})
	it.each([null, { status: 'ready' }, { status: 'failed' }])(
		'skips removed or completed jobs: %s',
		async (current) => {
			const { service, repository, storage, job } = harness()
			repository.findJob.mockResolvedValue(current)
			await service.publish(job, { bytes: sprite, contentType: null })
			expect(storage.uploadFile).not.toHaveBeenCalled()
		},
	)
	it('rejects malformed output before uploading', async () => {
		const { service, storage, job } = harness()
		await expect(service.publish(job, { bytes: portrait, contentType: 'image/jpeg' })).rejects.toThrow('ratio')
		expect(storage.uploadFile).not.toHaveBeenCalled()
	})
	it('retains the shared reserved key when another publisher commits it', async () => {
		const { service, storage, repository, job } = harness()
		repository.saveImageAndMarkJobReady.mockResolvedValue(false)
		await service.publish(job, { bytes: sprite, contentType: null })
		expect(storage.deleteFile).not.toHaveBeenCalled()
	})
	it('retains the recoverable original after a rolled-back DB publication', async () => {
		const { service, storage, repository, job } = harness()
		repository.saveImageAndMarkJobReady.mockRejectedValue(new Error('rollback'))
		repository.findImage.mockResolvedValue(null)
		await expect(service.publish(job, { bytes: sprite, contentType: null })).rejects.toThrow('rollback')
		expect(storage.deleteFile).not.toHaveBeenCalled()
	})
	it('retains a committed file after a lost transaction acknowledgement', async () => {
		const { service, storage, repository, job } = harness()
		repository.saveImageAndMarkJobReady.mockRejectedValue(new Error('connection lost'))
		await service.publish(job, { bytes: sprite, contentType: null })
		expect(storage.deleteFile).not.toHaveBeenCalled()
	})

	it('does not delete a possibly committed file while DB is unavailable', async () => {
		const { service, storage, repository, job } = harness()
		repository.saveImageAndMarkJobReady.mockRejectedValue(new Error('connection lost'))
		repository.findImage.mockRejectedValue(new Error('DB unavailable'))
		await expect(service.publish(job, { bytes: sprite, contentType: null })).rejects.toThrow('DB unavailable')
		expect(storage.deleteFile).not.toHaveBeenCalled()
	})

	it('recovers the exact uploaded original without PUT or image generation', async () => {
		const { service, storage, job, repository } = harness()
		storage.readFile.mockResolvedValue(sprite)
		await expect(service.publishStoredResult(job)).resolves.toBe(true)
		expect(storage.readFile).toHaveBeenCalledWith(common.resultS3Key)
		expect(storage.uploadFile).not.toHaveBeenCalled()
		expect(repository.saveImageAndMarkJobReady).toHaveBeenCalled()
	})
	it('distinguishes an absent object from permission and network failures', async () => {
		const { service, storage, job } = harness()
		storage.readFile.mockRejectedValue({ $metadata: { httpStatusCode: 404 } })
		await expect(service.publishStoredResult(job)).resolves.toBe(false)
		storage.readFile.mockRejectedValue({ $metadata: { httpStatusCode: 403 } })
		await expect(service.publishStoredResult(job)).rejects.toMatchObject({ $metadata: { httpStatusCode: 403 } })
		storage.readFile.mockRejectedValue(new Error('network timeout'))
		await expect(service.publishStoredResult(job)).rejects.toThrow('network timeout')
	})
	it.each([
		'ai-dialogue-images/shared/user-avatar.jpg',
		common.resultS3Key.replace('job-10', 'job-11'),
		common.resultS3Key.replace('/ru/', '/en/'),
	])('does not recover a foreign or shared key %s', async (key) => {
		const { service, storage, job } = harness()
		job.input = JSON.stringify({ ...emotion, resultS3Key: key })
		await expect(service.publishStoredResult(job)).rejects.toThrow('Invalid reserved')
		expect(storage.readFile).not.toHaveBeenCalled()
	})
	it('rejects changed pixel dimensions or format before uploading instead of resizing', async () => {
		const { service, storage, job } = harness()
		job.input = JSON.stringify({ ...emotion, size: { width: 1024, height: 768 } })
		await expect(service.publish(job, { bytes: sprite, contentType: null })).rejects.toThrow('pixel size')
		job.input = JSON.stringify({
			...emotion,
			format: 'webp',
			resultS3Key: common.resultS3Key.replace('.png', '.webp'),
		})
		await expect(service.publish(job, { bytes: sprite, contentType: null })).rejects.toThrow('output format')
		expect(storage.uploadFile).not.toHaveBeenCalled()
	})
	it('creates a unique output key before sending without touching storage', () => {
		const { service, storage, job } = harness()
		const snapshot = parseImageGenerationSnapshot(job.type, job.input)
		const first = service.createResultKey(job, snapshot)
		expect(first).not.toBe(service.createResultKey(job, snapshot))
		expect(first).toMatch(/^ai-dialogue-images\/generated\/ru\/localtest\/job-10\/[a-f0-9-]+\.png$/)
		expect(storage.uploadFile).not.toHaveBeenCalled()
	})
})
