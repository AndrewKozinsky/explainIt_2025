jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('./ChatGptLlmProvider.service', () => ({ ChatGptLlmProvider: class {} }))
jest.mock('./DeepSeekLlmProvider.service', () => ({ DeepSeekLlmProvider: class {} }))
jest.mock('./GeminiLlmProvider.service', () => ({ GeminiLlmProvider: class {} }))
jest.mock('./MimoLlmProvider.service', () => ({ MimoLlmProvider: class {} }))
jest.mock('./ZaiLlmProvider.service', () => ({ ZaiLlmProvider: class {} }))

import { DeepSeekModels } from 'types/AIModels'
import { LlmAdapterService } from './LlmAdapter.service'
import { LlmProvider } from './LlmProvider.interface'

function createAdapter() {
	const deepSeek = { generate: jest.fn().mockResolvedValue({ content: '', inputTokens: 0, outputTokens: 0 }) }
	const unusedProvider = {} as LlmProvider
	const adapter = new LlmAdapterService(
		unusedProvider as never,
		unusedProvider as never,
		deepSeek as never,
		unusedProvider as never,
		unusedProvider as never,
	)

	return { adapter, deepSeek }
}

describe('LlmAdapterService.generate reasoning effort', () => {
	const messages = [{ role: 'user' as const, content: 'Hello' }]

	it('uses low reasoning when the caller does not set it', async () => {
		const { adapter, deepSeek } = createAdapter()

		await adapter.generate({ model: DeepSeekModels.Flash, messages })

		expect(deepSeek.generate).toHaveBeenCalledWith(expect.objectContaining({ reasoningEffort: 'low' }))
	})

	it.each(['none', 'medium', 'high'] as const)('keeps the explicit %s level', async (reasoningEffort) => {
		const { adapter, deepSeek } = createAdapter()

		await adapter.generate({ model: DeepSeekModels.Flash, messages, reasoningEffort })

		expect(deepSeek.generate).toHaveBeenCalledWith(expect.objectContaining({ reasoningEffort }))
	})
})
