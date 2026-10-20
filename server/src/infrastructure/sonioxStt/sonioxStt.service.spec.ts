jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))
jest.mock('ws', () => {
	const { EventEmitter } = jest.requireActual('events')
	const constructor = jest.fn(() => {
		const socket = new EventEmitter()
		socket.readyState = 0
		socket.send = jest.fn((_data, _options, callback) => callback())
		socket.terminate = jest.fn(() => {
			socket.readyState = 3
		})
		return socket
	})
	Object.assign(constructor, { OPEN: 1 })
	return { WebSocket: constructor }
})

import { EventEmitter } from 'events'
import { WebSocket } from 'ws'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { SonioxSttService } from './sonioxStt.service'
import { SonioxSttEvent, SonioxSttOptions, SonioxSttSession } from './sonioxStt.types'

type FakeSocket = EventEmitter & { readyState: number; send: jest.Mock; terminate: jest.Mock }
const sockets: FakeSocket[] = []
const sessions: SonioxSttSession[] = []
const config = (apiKey: string | null = 'test-key') =>
	({ get: () => ({ soniox: { apiKey } }) }) as unknown as MainConfigService
const service = () => new SonioxSttService(config())

function latestSocket(): FakeSocket {
	const socket = jest.mocked(WebSocket).mock.results.at(-1)!.value as FakeSocket
	sockets.push(socket)
	return socket
}

async function open(options: SonioxSttOptions = {}) {
	const opening = service().openStream(options)
	const socket = latestSocket()
	socket.readyState = 1
	socket.emit('open')
	const session = await opening
	sessions.push(session)
	return { socket, session }
}
function message(socket: FakeSocket, value: unknown) {
	socket.emit('message', Buffer.from(JSON.stringify(value)), false)
}
async function flush() {
	for (let i = 0; i < 15; i++) await Promise.resolve()
}

describe('SonioxSttService', () => {
	beforeEach(() => {
		jest.useFakeTimers()
		jest.mocked(WebSocket).mockClear()
	})
	afterEach(() => {
		for (const session of sessions.splice(0)) session.abort()
		for (const socket of sockets.splice(0)) socket.emit('error', new Error('late error'))
		expect(jest.getTimerCount()).toBe(0)
		jest.useRealTimers()
	})

	it('authenticates in headers and configures raw audio before exposing the session', async () => {
		const { socket } = await open({
			audioFormat: 'pcm_s16le',
			sampleRate: 16000,
			numChannels: 1,
			languageHints: ['ru'],
			languageHintsStrict: true,
			clientReferenceId: 'dictation-1',
		})
		expect(WebSocket).toHaveBeenCalledWith(
			'wss://stt-rt.soniox.com/transcribe-websocket',
			expect.objectContaining({ headers: { Authorization: 'Bearer test-key' }, handshakeTimeout: 10000 }),
		)
		const [data, options] = socket.send.mock.calls[0]
		expect(options.binary).toBe(false)
		expect(JSON.parse(data)).toEqual({
			model: 'stt-rt-v5',
			audio_format: 'pcm_s16le',
			sample_rate: 16000,
			num_channels: 1,
			language_hints: ['ru'],
			language_hints_strict: true,
			client_reference_id: 'dictation-1',
			enable_endpoint_detection: false,
		})
	})

	it.each([
		{ audioFormat: 'pcm_s16le' },
		{ audioFormat: 'auto', sampleRate: 16000 },
		{ languageHints: ['ru', 'ru'] },
		{ languageHintsStrict: true },
		{ connectTimeoutMs: 0 },
		{ audioFormat: 'garbage' },
	])('rejects invalid options before connecting: %j', async (options) => {
		await expect(service().openStream(options as SonioxSttOptions)).rejects.toMatchObject({ code: 'invalid_input' })
		expect(WebSocket).not.toHaveBeenCalled()
	})

	it('does not read credentials when aborted before opening', async () => {
		const controller = new AbortController()
		controller.abort()
		const get = jest.fn()
		await expect(
			new SonioxSttService({ get } as unknown as MainConfigService).openStream({
				abortSignal: controller.signal,
			}),
		).rejects.toMatchObject({ code: 'aborted' })
		expect(get).not.toHaveBeenCalled()
		expect(WebSocket).not.toHaveBeenCalled()
	})

	it('rejects missing keys and hides configuration errors without connecting', async () => {
		await expect(new SonioxSttService(config(null)).openStream()).rejects.toMatchObject({ code: 'configuration' })
		const get = () => {
			throw new Error('secret')
		}
		await expect(new SonioxSttService({ get } as unknown as MainConfigService).openStream()).rejects.toMatchObject({
			code: 'configuration',
			message: 'Invalid Soniox STT configuration',
		})
		expect(WebSocket).not.toHaveBeenCalled()
	})

	it('replaces provisional text and appends final fragments with original spaces', async () => {
		const { session, socket } = await open()
		const iterator = session.events[Symbol.asyncIterator]()
		message(socket, { tokens: [{ text: 'При', is_final: false }] })
		expect((await iterator.next()).value).toEqual({ type: 'partial', text: 'При' })
		message(socket, { tokens: [{ text: 'Привет', is_final: false }] })
		expect((await iterator.next()).value).toEqual({ type: 'partial', text: 'Привет' })
		message(socket, {
			tokens: [
				{ text: 'Привет', is_final: true },
				{ text: ' мир', is_final: false },
			],
		})
		expect((await iterator.next()).value).toEqual({ type: 'final', text: 'Привет' })
		expect((await iterator.next()).value).toEqual({ type: 'partial', text: ' мир' })
		message(socket, {
			tokens: [
				{ text: ' мир!', is_final: true },
				{ text: '<fin>', is_final: true },
			],
		})
		expect((await iterator.next()).value).toEqual({ type: 'final', text: ' мир!' })
		const finishing = session.finish()
		await flush()
		message(socket, { tokens: [], finished: true })
		await finishing
		expect(await iterator.next()).toEqual({ done: true, value: undefined })
	})

	it('clears withdrawn hypotheses and coalesces consecutive partial updates', async () => {
		const { session, socket } = await open()
		const iterator = session.events[Symbol.asyncIterator]()
		message(socket, { tokens: [{ text: 'a', is_final: false }] })
		message(socket, { tokens: [{ text: 'ab', is_final: false }] })
		expect((await iterator.next()).value).toEqual({ type: 'partial', text: 'ab' })
		message(socket, { tokens: [] })
		expect((await iterator.next()).value).toEqual({ type: 'partial', text: '' })
	})

	it('drains ordered audio before sending the empty TEXT frame and receiving final words', async () => {
		const { session, socket } = await open()
		const callbacks: (() => void)[] = []
		socket.send.mockImplementation((_data, _options, callback) => callbacks.push(callback))
		const bytes = new Uint8Array([1, 2])
		const first = session.sendAudio(bytes)
		bytes[0] = 9
		const second = session.sendAudio(new Uint8Array([3]))
		const finish = session.finish()
		expect(session.finish()).toBe(finish)
		await expect(session.sendAudio(new Uint8Array([4]))).rejects.toMatchObject({ code: 'session_closed' })
		await flush()
		expect(socket.send.mock.calls).toHaveLength(2)
		expect(socket.send.mock.calls[1].slice(0, 2)).toEqual([Buffer.from([1, 2]), { binary: true }])
		callbacks.shift()!()
		await first
		await flush()
		expect(socket.send.mock.calls[2].slice(0, 2)).toEqual([Buffer.from([3]), { binary: true }])
		callbacks.shift()!()
		await second
		await flush()
		expect(socket.send.mock.calls[3].slice(0, 2)).toEqual(['', { binary: false }])
		callbacks.shift()!()
		const events: SonioxSttEvent[] = []
		const reading = (async () => {
			for await (const event of session.events) events.push(event)
		})()
		message(socket, { tokens: [{ text: 'last words', is_final: true }], finished: true })
		await finish
		await reading
		expect(events).toEqual([{ type: 'final', text: 'last words' }])
		expect(socket.terminate).toHaveBeenCalledTimes(1)
	})

	it('keeps pauses alive without ending dictation', async () => {
		const { session, socket } = await open()
		await jest.advanceTimersByTimeAsync(10000)
		expect(socket.send.mock.calls[1].slice(0, 2)).toEqual(['{"type":"keepalive"}', { binary: false }])
		await session.sendAudio(new Uint8Array([1]))
		expect(socket.terminate).not.toHaveBeenCalled()
	})

	it.each(['abort', 'signal'])('rejects consumers and pending sends on %s', async (mode) => {
		const controller = new AbortController()
		const { session, socket } = await open({ abortSignal: controller.signal })
		socket.send.mockImplementation(() => {})
		const sending = session.sendAudio(new Uint8Array([1]))
		const reading = session.events[Symbol.asyncIterator]().next()
		await flush()
		const sentCheck = expect(sending).rejects.toMatchObject({ code: 'aborted' })
		const readCheck = expect(reading).rejects.toMatchObject({ code: 'aborted' })
		if (mode === 'abort') session.abort()
		else controller.abort()
		session.abort()
		await sentCheck
		await readCheck
		await expect(session.finish()).rejects.toMatchObject({ code: 'aborted' })
		expect(socket.terminate).toHaveBeenCalledTimes(1)
	})

	it.each(['error', 'close', 'provider', 'malformed', 'binary', 'premature-finish'])(
		'surfaces %s failures without leaking secrets or reconnecting',
		async (mode) => {
			const { session, socket } = await open()
			if (mode === 'error') socket.emit('error', new Error('secret key'))
			if (mode === 'close') socket.emit('close', 1000)
			if (mode === 'provider') message(socket, { error_code: 401, error_message: 'secret key' })
			if (mode === 'malformed') socket.emit('message', Buffer.from('secret key'), false)
			if (mode === 'binary') socket.emit('message', Buffer.from('secret key'), true)
			if (mode === 'premature-finish') message(socket, { finished: true, tokens: [] })
			await expect(session.finish()).rejects.not.toThrow('secret')
			await expect(session.events[Symbol.asyncIterator]().next()).rejects.toHaveProperty('name', 'SonioxSttError')
			expect(WebSocket).toHaveBeenCalledTimes(1)
		},
	)

	it('times out a stalled connection', async () => {
		const opening = service().openStream({ connectTimeoutMs: 50 })
		const socket = latestSocket()
		const check = expect(opening).rejects.toMatchObject({ code: 'timeout' })
		await jest.advanceTimersByTimeAsync(50)
		await check
		expect(socket.terminate).toHaveBeenCalledTimes(1)
	})

	it('handles connection errors before returning a session', async () => {
		const opening = service().openStream()
		const socket = latestSocket()
		socket.emit('error', new Error('secret'))
		await expect(opening).rejects.toMatchObject({ code: 'connection_failed' })
	})

	it('times out missing finalization', async () => {
		const { session } = await open({ finishTimeoutMs: 50 })
		const check = expect(session.finish()).rejects.toMatchObject({ code: 'timeout' })
		await jest.advanceTimersByTimeAsync(50)
		await check
	})

	it('times out a stalled audio send', async () => {
		const { session, socket } = await open()
		socket.send.mockImplementation(() => {})
		const check = expect(session.sendAudio(new Uint8Array([1]))).rejects.toMatchObject({ code: 'timeout' })
		await jest.advanceTimersByTimeAsync(15000)
		await check
	})

	it.each(['callback', 'throw'])('normalizes %s send errors', async (mode) => {
		const { session, socket } = await open()
		socket.send.mockImplementation((_data, _options, callback) => {
			if (mode === 'throw') throw new Error('secret')
			callback(new Error('secret'))
		})
		await expect(session.sendAudio(new Uint8Array([1]))).rejects.toMatchObject({ code: 'connection_failed' })
	})

	it('bounds pending audio and rejects empty chunks', async () => {
		const { session, socket } = await open()
		await expect(session.sendAudio(new Uint8Array())).rejects.toMatchObject({ code: 'invalid_input' })
		socket.send.mockImplementation(() => {})
		const sending = session.sendAudio(new Uint8Array(1024 * 1024))
		await expect(session.sendAudio(new Uint8Array([1]))).rejects.toMatchObject({ code: 'buffer_overflow' })
		session.abort()
		await expect(sending).rejects.toMatchObject({ code: 'aborted' })
	})

	it('bounds events when nobody consumes confirmed text', async () => {
		const { session, socket } = await open()
		for (let i = 0; i < 257; i++) message(socket, { tokens: [{ text: 'word', is_final: true }] })
		await expect(session.finish()).rejects.toMatchObject({ code: 'buffer_overflow' })
	})

	it('aborts on early iterator exit and rejects additional consumers', async () => {
		const { session, socket } = await open()
		message(socket, { tokens: [{ text: 'word', is_final: false }] })
		for await (const _event of session.events) break
		await expect(session.finish()).rejects.toMatchObject({ code: 'aborted' })
		expect(() => session.events[Symbol.asyncIterator]()).toThrow('Only one')
	})
})
