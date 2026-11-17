jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target, Logger: class {} }))
jest.mock('infrastructure/cloudflareS3/cloudflareS3.service', () => ({ CloudflareS3Service: class {} }))
jest.mock('infrastructure/mainConfig/mainConfig.service', () => ({ MainConfigService: class {} }))

import { CleanupAiDialogueAudio } from './CleanupAiDialogueAudio.service'

describe('CleanupAiDialogueAudio', () => {
	it.each(['servermaster', 'generated'])('deletes current and legacy audio keys only for %s', async (mode) => {
		const storage = { deleteFile: jest.fn().mockResolvedValue(undefined) }
		const config = { get: () => ({ region: 'intl', mode }) }
		const cleanup = new CleanupAiDialogueAudio(storage as never, config as never)
		const current = `ai-dialogue-audio/${mode}/12/current.mp3`
		const legacy = `ai-dialogue-audio/generated/intl/${mode}/12/legacy.mp3`

		await cleanup.deleteFiles([
			current,
			legacy,
			current,
			'ai-dialogue-audio/localdev/12/other.mp3',
			'ai-dialogue-audio/generated/intl/localdev/12/other.mp3',
			`ai-dialogue-audio/generated/ru/${mode}/12/other.mp3`,
			'ai-dialogue-images/generated/intl/localdev/job-12/scene.webp',
		])

		expect(storage.deleteFile.mock.calls).toEqual([
			[current, 10_000],
			[legacy, 10_000],
		])
	})
})
