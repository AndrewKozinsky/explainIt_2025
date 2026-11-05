jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('infrastructure/cloudflareS3/cloudflareS3.service', () => ({ CloudflareS3Service: class {} }))
jest.mock('infrastructure/mainConfig/mainConfig.service', () => ({ MainConfigService: class {} }))

import { aiDialogueIllustrationStyleCatalog } from './catalog'
import {
	GetAiDialogueIllustrationStylesHandler,
	illustrationStylePreviewUrlWindowSeconds,
} from './GetAiDialogueIllustrationStyles.command'

const previewUrlsExpireAt = new Date('2026-11-05T18:00:00.000Z')

function harness(mode = 'localdev') {
	const storage = {
		getCacheableFileUrl: jest.fn(async (key: string) => ({
			url: `https://signed.example/${key}`,
			expiresAt: previewUrlsExpireAt,
		})),
	}
	const handler = new GetAiDialogueIllustrationStylesHandler(storage as never, { get: () => ({ mode }) } as never)

	return { storage, handler }
}

describe('Get AI dialogue illustration styles', () => {
	it.each(['localdev', 'servermaster'])(
		'returns ordered light previews and client translation keys for %s without internal fields',
		async (mode) => {
			const { handler, storage } = harness(mode)
			const result = await handler.execute()

			expect(result.defaultStyleId).toBe(aiDialogueIllustrationStyleCatalog.defaultStyleId)
			expect(result.styles.map((style) => style.id)).toEqual(
				aiDialogueIllustrationStyleCatalog.styles.map((style) => style.id),
			)

			for (const [index, style] of result.styles.entries()) {
				expect(Object.keys(style).sort()).toEqual(['id', 'previewUrl', 'titleKey'])
				expect(style.titleKey).toBe(aiDialogueIllustrationStyleCatalog.styles[index].titleKey)
				expect(style.previewUrl).toContain(`/styles/${mode}/`)
			}

			expect(storage.getCacheableFileUrl.mock.calls).toEqual(
				aiDialogueIllustrationStyleCatalog.styles.map((style) => [
					`ai-dialogue-images/shared/styles/${mode}/${style.file.replace(/\.webp$/, '.preview.webp')}`,
					illustrationStylePreviewUrlWindowSeconds,
				]),
			)

			expect(result.urlsExpireAt).toBe('2026-11-05T17:00:00.000Z')
		},
	)

	it('propagates signing failure instead of returning a partial catalog', async () => {
		const { handler, storage } = harness()
		storage.getCacheableFileUrl.mockRejectedValue(new Error('storage unavailable'))

		await expect(handler.execute()).rejects.toThrow('storage unavailable')
	})

	it('rejects an invalid MODE before signing any URL', async () => {
		const { handler, storage } = harness('unknown')

		await expect(handler.execute()).rejects.toMatchObject({ statusCode: 500 })
		expect(storage.getCacheableFileUrl).not.toHaveBeenCalled()
	})
})
