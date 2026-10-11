jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Global: () => (target: unknown) => target,
	Module: (metadata: unknown) => (target: object) => Object.assign(target, { metadata }),
}))
jest.mock('@nestjs/config', () => ({ ConfigModule: { forRoot: () => ({}) }, ConfigService: class {} }))
import { TtsAdapterService } from './TtsAdapter.service'
import { TtsProviderModule } from './ttsProvider.module'

describe('TtsProviderModule', () => {
	it('exports the facade without reading credentials or creating clients', async () => {
		const config = {
			get: jest.fn(() => {
				throw new Error('Config must remain lazy')
			}),
		}

		const metadata = (
			TtsProviderModule as unknown as {
				metadata: {
					providers: { provide: unknown; useFactory: (config: unknown) => TtsAdapterService }[]
					exports: unknown[]
				}
			}
		).metadata

		expect(metadata.exports).toContain(TtsAdapterService)
		expect(metadata.providers[0].provide).toBe(TtsAdapterService)
		expect(metadata.providers[0].useFactory(config)).toBeInstanceOf(TtsAdapterService)
		expect(config.get).not.toHaveBeenCalled()
	})
})
