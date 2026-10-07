jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { Readable } from 'node:stream'
import { GetObjectCommand } from '@aws-sdk/client-s3'
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
})
