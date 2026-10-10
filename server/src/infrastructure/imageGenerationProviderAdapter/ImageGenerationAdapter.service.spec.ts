import { ImageGenerationAdapterService } from './ImageGenerationAdapter.service'
import { ImageGenerationError } from './ImageGenerationError'
import {
	ImageGenerationInput,
	ImageGenerationOperation,
	ImageGenerationProvider,
} from './ImageGenerationProvider.interface'

const input: ImageGenerationInput = { model: 'test-sync', prompt: 'Landscape', size: { width: 1024, height: 1024 } }
const receipt: ImageGenerationOperation = { provider: 'sync', model: input.model, version: 1, data: { id: 'external' } }

function harness() {
	const ready = { status: 'ready' as const, images: [{ bytes: Buffer.from('original'), contentType: 'image/png' }] }
	const provider = {
		name: 'sync',
		models: ['test-sync'],
		isConfigured: jest.fn(() => true),
		validateInput: jest.fn(),
		generate: jest.fn(async () => ready),
	}
	const other = { ...provider, name: 'other', models: ['other-model'], generate: jest.fn() }

	return { provider, other, ready, adapter: new ImageGenerationAdapterService([provider, other]) }
}

describe('ImageGenerationAdapterService', () => {
	it('routes by exact model and accepts a synchronous result without a polling URL', async () => {
		const { provider, other, ready, adapter } = harness()
		await expect(adapter.generate({ ...input, quality: 'high', format: 'png' })).resolves.toEqual(ready)
		expect(provider.generate).toHaveBeenCalledWith({ ...input, quality: 'high', format: 'png' })
		expect(other.generate).not.toHaveBeenCalled()
	})

	it('does not silently select a default or another model', async () => {
		const { provider, adapter } = harness()
		await expect(adapter.generate({ ...input, model: 'unknown' })).rejects.toMatchObject({
			code: 'unsupported_model',
			outcome: 'not_sent',
		})
		expect(provider.generate).not.toHaveBeenCalled()
	})

	it('does not fabricate recovery for a provider without it', async () => {
		const { adapter, provider } = harness()
		await expect(adapter.resume(receipt)).rejects.toMatchObject({ code: 'recovery_unsupported' })
		expect(provider.generate).not.toHaveBeenCalled()
	})

	it('rejects provider/model mismatch instead of redirecting the operation', async () => {
		const { adapter, other } = harness()
		await expect(adapter.resume({ ...receipt, provider: 'other' })).rejects.toMatchObject({
			code: 'invalid_operation',
		})
		expect(other.generate).not.toHaveBeenCalled()
	})

	it('passes the unchanged operation and AbortSignal to recovery', async () => {
		const { provider, ready } = harness()
		const resume = jest.fn(async () => ready)
		const adapter = new ImageGenerationAdapterService([{ ...provider, resume }])
		const signal = new AbortController().signal
		await expect(adapter.resume(receipt, signal)).resolves.toEqual(ready)
		expect(resume).toHaveBeenCalledWith(receipt, signal)
		expect(provider.generate).not.toHaveBeenCalled()
	})

	it('returns provider-specific JSON data without requiring a URL', async () => {
		const { provider } = harness()
		const adapter = new ImageGenerationAdapterService([
			{ ...provider, generate: async () => ({ status: 'pending', operation: receipt }) },
		])
		const result = await adapter.generate(input)
		expect(JSON.parse(JSON.stringify(result))).toEqual({ status: 'pending', operation: receipt })
	})

	it('checks configuration without sending a request', async () => {
		const { provider, adapter } = harness()
		provider.isConfigured.mockReturnValue(false)
		expect(adapter.isConfigured(input.model)).toBe(false)
		await expect(adapter.generate(input)).rejects.toMatchObject({ code: 'configuration', outcome: 'not_sent' })
		expect(provider.generate).not.toHaveBeenCalled()
	})

	it('blocks an already aborted request before submission', async () => {
		const { provider, adapter } = harness()
		await expect(adapter.generate({ ...input, abortSignal: AbortSignal.abort() })).rejects.toMatchObject({
			code: 'aborted',
			outcome: 'not_sent',
		})
		expect(provider.generate).not.toHaveBeenCalled()
	})

	it('redacts unknown provider exceptions, makes the outcome uncertain and never falls back', async () => {
		const { provider, other, adapter } = harness()
		provider.generate.mockRejectedValue(new Error('secret SDK config'))
		await expect(adapter.generate(input)).rejects.toMatchObject({
			code: 'request_failed',
			outcome: 'unknown',
			message: 'Image provider request failed',
		})
		expect(provider.generate).toHaveBeenCalledTimes(1)
		expect(other.generate).not.toHaveBeenCalled()
	})

	it('normalizes unknown validation errors without leaking the input', () => {
		const { provider, adapter } = harness()
		provider.validateInput.mockImplementation(() => {
			throw new Error('secret prompt')
		})
		expect(() => adapter.validateInput(input)).toThrow('Invalid image generation parameters')
		expect(provider.generate).not.toHaveBeenCalled()
	})

	it('preserves typed errors and their uncertain outcome', async () => {
		const { provider, adapter } = harness()
		const error = new ImageGenerationError('aborted', 'Aborted after submission', 'unknown')
		provider.generate.mockRejectedValue(error)
		await expect(adapter.generate(input)).rejects.toBe(error)
	})

	it('redacts recovery errors while preserving permission to continue only the existing operation', async () => {
		const { provider } = harness()
		const resumable: ImageGenerationProvider = {
			...provider,
			resume: jest.fn().mockRejectedValue(new Error('signed URL')),
		}
		await expect(new ImageGenerationAdapterService([resumable]).resume(receipt)).rejects.toMatchObject({
			outcome: 'existing_operation',
			message: 'Image provider request failed',
		})
	})
})
