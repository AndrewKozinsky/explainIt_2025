import { EventEmitter } from 'node:events'
import { PassThrough, Readable } from 'node:stream'
jest.mock('@nestjs/common', () => ({ Logger: { error: jest.fn(), debug: jest.fn() } }))
jest.mock('youtube-dl-exec', () => ({ exec: jest.fn() }))
import { downloadAudio } from './downloadAudio'
const youtubedl = require('youtube-dl-exec') as { exec: jest.Mock }

function processMock() {
	const events = new EventEmitter()
	const stdout = new PassThrough()
	const stderr = new PassThrough()
	let finish!: () => void
	let fail!: (error: Error) => void
	const promise = new Promise<void>((resolve, reject) => {
		finish = resolve
		fail = reject
	})
	const child = Object.assign(promise, { stdout, stderr, once: events.once.bind(events), kill: jest.fn() })
	youtubedl.exec.mockReturnValue(child)
	return { events, stdout, stderr, finish, fail, child }
}
async function consume(stream: Readable) {
	const chunks: Buffer[] = []
	for await (const chunk of stream) chunks.push(Buffer.from(chunk))
	return Buffer.concat(chunks).toString()
}

describe('YouTube download process lifecycle', () => {
	it('waits for process success, preserving audio bytes', async () => {
		const mock = processMock()
		const pending = downloadAudio('video')
		mock.events.emit('spawn')
		const output = await pending
		let done = false
		const result = consume(output).then((value) => {
			done = true
			return value
		})
		mock.stdout.end('audio bytes')
		await new Promise((resolve) => setImmediate(resolve))
		expect(done).toBe(false)
		mock.finish()
		await expect(result).resolves.toBe('audio bytes')
	})
	it.each(['', 'partial bytes'])('a failed child rejects the stream even after stdout ended (%s)', async (bytes) => {
		const mock = processMock()
		const pending = downloadAudio('video')
		mock.events.emit('spawn')
		const output = await pending
		const result = expect(consume(output)).rejects.toMatchObject({ statusCode: 500 })
		mock.stdout.end(bytes)
		mock.fail(new Error('Video unavailable'))
		await result
		await new Promise((resolve) => setImmediate(resolve))
	})
	it('handles both the spawn error event and the rejecting child Promise', async () => {
		const mock = processMock()
		const result = expect(downloadAudio('video')).rejects.toMatchObject({ statusCode: 500 })
		mock.events.emit('error', new Error('ENOENT'))
		mock.fail(new Error('ENOENT'))
		await result
		await new Promise((resolve) => setImmediate(resolve))
	})
	it('consumer cancellation stops the child and handles its later rejection', async () => {
		const mock = processMock()
		const pending = downloadAudio('video')
		mock.events.emit('spawn')
		const output = await pending
		output.destroy()
		await new Promise((resolve) => setImmediate(resolve))
		expect(mock.child.kill).toHaveBeenCalledWith('SIGTERM')
		mock.fail(new Error('Terminated'))
		await new Promise((resolve) => setImmediate(resolve))
	})
})
