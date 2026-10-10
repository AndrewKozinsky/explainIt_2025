jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Global: () => (target: unknown) => target,
	Module: (metadata: unknown) => (target: object) => Object.assign(target, { metadata }),
}))
jest.mock('@nestjs/config', () => ({ ConfigModule: { forRoot: () => ({}) }, ConfigService: class {} }))
import { ImageGenerationAdapterService } from './ImageGenerationAdapter.service'
import { ImageGenerationProviderModule } from './imageGenerationProvider.module'

describe('ImageGenerationProviderModule', () => {
	it('registers both providers using existing config without requesting images', async () => {
		const config = { get: jest.fn(() => ({ openAI: { apiKey: 'test-key' }, blackForestLabs: { apiKey: null } })) }
		const metadata = (
			ImageGenerationProviderModule as unknown as {
				metadata: {
					providers: { provide: unknown; useFactory: (config: unknown) => ImageGenerationAdapterService }[]
					exports: unknown[]
				}
			}
		).metadata
		expect(metadata.providers[0].provide).toBe(ImageGenerationAdapterService)
		expect(metadata.exports).toContain(ImageGenerationAdapterService)
		const adapter = metadata.providers[0].useFactory(config)
		expect(adapter.isConfigured('gpt-image-2.5-sunburst-2026-09-08')).toBe(true)
		expect(adapter.isConfigured('flux-3-image')).toBe(false)
		expect(config.get).toHaveBeenCalled()
	})
})
