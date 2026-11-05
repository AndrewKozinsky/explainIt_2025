jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { Readable } from 'node:stream'
import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { CloudflareS3Service } from './cloudflareS3.service'

describe('bounded R2 reads', () => {
	function harness() {
		const config = {
			get: () => ({
				cloudflareR2: {
					s3: { accountId: 'test', accessKeyId: 'test', secretAccessKey: 'test', bucketName: 'images' },
				},
			}),
		}
		const service = new CloudflareS3Service(config as unknown as MainConfigService)
		const send = jest.spyOn(service.s3, 'send').mockResolvedValue({} as never)
		return { service, send }
	}

	it('lists only a bounded prefix page using the opaque cursor', async () => {
		const { service, send } = harness()
		await service.listFilesByPrefix('generated/ru/test/', 'cursor', 25)
		expect(send.mock.calls[0][0]).toBeInstanceOf(ListObjectsV2Command)
		expect((send.mock.calls[0][0] as ListObjectsV2Command).input).toEqual({
			Bucket: 'images',
			Prefix: 'generated/ru/test/',
			ContinuationToken: 'cursor',
			MaxKeys: 25,
		})
		expect(send.mock.calls[0][1]).toMatchObject({ abortSignal: expect.any(AbortSignal) })
	})

	it('bounds cleanup deletion without changing the object key', async () => {
		const { service, send } = harness()
		await service.deleteFile('generated/image.png', 10_000)
		expect(send.mock.calls[0][0]).toBeInstanceOf(DeleteObjectCommand)
		expect((send.mock.calls[0][0] as DeleteObjectCommand).input).toEqual({
			Bucket: 'images',
			Key: 'generated/image.png',
		})
		expect(send.mock.calls[0][1]).toMatchObject({ abortSignal: expect.any(AbortSignal) })
	})

	it('reads private objects as bounded bytes without a signed URL', async () => {
		const { service, send } = harness()
		send.mockResolvedValue({ Body: Readable.from([Buffer.from('original'), Buffer.from(' bytes')]) } as never)
		await expect(service.readFile('private.png')).resolves.toEqual(Buffer.from('original bytes'))
		const command = send.mock.calls[0][0] as GetObjectCommand

		expect(command.input).toEqual({ Bucket: 'images', Key: 'private.png' })
		expect(send.mock.calls[0][1]).toMatchObject({ abortSignal: expect.any(AbortSignal) })
	})

	it('closes an oversized declared stream before buffering it', async () => {
		const { service, send } = harness()
		const stream = Readable.from([Buffer.from('bytes')])
		send.mockResolvedValue({ Body: stream, ContentLength: 33 * 1024 * 1024 } as never)

		await expect(service.readFile('large.png')).rejects.toThrow('large')
		expect(stream.destroyed).toBe(true)
	})

	it('enforces the byte limit even without ContentLength', async () => {
		const { service, send } = harness()
		send.mockResolvedValue({ Body: Readable.from([Buffer.alloc(33 * 1024 * 1024)]) } as never)

		await expect(service.readFile('large.png')).rejects.toThrow('large')
	})

	describe('cacheable signed URLs', () => {
		const windowSeconds = 6 * 60 * 60

		afterEach(() => jest.useRealTimers())

		async function signAt(isoTime: string, key = 'shared/realism.preview.webp') {
			jest.useFakeTimers({ now: new Date(isoTime) })
			return harness().service.getCacheableFileUrl(key, windowSeconds)
		}

		it('returns the same URL for every request inside one window', async () => {
			const windowStart = await signAt('2026-11-05T06:00:00.000Z')
			const windowEnd = await signAt('2026-11-05T11:59:59.000Z')

			expect(windowEnd.url).toBe(windowStart.url)
			expect(windowEnd.expiresAt.toISOString()).toBe('2026-11-05T18:00:00.000Z')
		})

		it('changes the URL in the next window so a replaced file becomes visible', async () => {
			const currentWindow = await signAt('2026-11-05T11:59:59.000Z')
			const nextWindow = await signAt('2026-11-05T12:00:00.000Z')

			expect(nextWindow.url).not.toBe(currentWindow.url)
		})

		it('keeps the URL valid for at least one window and asks the browser to cache it as long', async () => {
			const signed = await signAt('2026-11-05T11:59:59.000Z')
			const signedUrl = new URL(signed.url)

			expect(signedUrl.searchParams.get('X-Amz-Date')).toBe('20261105T060000Z')
			expect(signedUrl.searchParams.get('X-Amz-Expires')).toBe(String(windowSeconds * 2))
			expect(signedUrl.searchParams.get('response-cache-control')).toBe(`private, max-age=${windowSeconds * 2}`)
		})
	})
})
