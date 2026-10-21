jest.mock('infrastructure/sonioxStt/sonioxStt.service', () => ({ SonioxSttService: class {} }))

import { EventEmitter } from 'events'
import { WebSocket } from 'ws'
import { SonioxSttEvent } from 'infrastructure/sonioxStt/sonioxStt.types'
import { SonioxSttError } from 'infrastructure/sonioxStt/SonioxSttError'
import { DICTATION_LIMITS, parseDictationControl } from './aiDialogueDictationProtocol'
import { AiDialogueDictationSession } from './AiDialogueDictationSession'

function deferred<T>() {
	let resolve!: (value: T) => void
	let reject!: (error: unknown) => void
	const promise = new Promise<T>((yes, no) => {
		resolve = yes
		reject = no
	})

	return { promise, resolve, reject }
}

class Events {
	private queue: SonioxSttEvent[] = []
	private signal = deferred<void>()
	private ended = false

	push(event: SonioxSttEvent) {
		this.queue.push(event)
		this.signal.resolve()
	}

	end() {
		this.ended = true
		this.signal.resolve()
	}

	async *[Symbol.asyncIterator]() {
		while (true) {
			const event = this.queue.shift()
			if (event) {
				yield event
				continue
			}
			if (this.ended) return

			await this.signal.promise
			this.signal = deferred<void>()
		}
	}
}

async function flush() {
	for (let i = 0; i < 40; i++) await Promise.resolve()
}

function harness(languages = ['en', 'ru']) {
	const events = new Events()
	const provider = {
		events,
		sendAudio: jest.fn().mockResolvedValue(undefined),
		finish: jest.fn(async () => {
			events.end()
		}),
		abort: jest.fn(() => events.end()),
	}
	const soniox = { openStream: jest.fn().mockResolvedValue(provider) }
	const socket = Object.assign(new EventEmitter(), {
		readyState: WebSocket.OPEN as number,
		bufferedAmount: 0,
		send: jest.fn((_text: string, callback?: (error?: Error) => void) => callback?.()),
		close: jest.fn(() => {
			socket.readyState = WebSocket.CLOSING
		}),
		terminate: jest.fn(() => {
			socket.readyState = WebSocket.CLOSED
			socket.emit('close')
		}),
	})
	const session = new AiDialogueDictationSession(socket as never, soniox as never, languages)
	const control = (value: unknown) => socket.emit('message', Buffer.from(JSON.stringify(value)), false)
	const audio = (value: Buffer) => socket.emit('message', value, true)
	const output = () => socket.send.mock.calls.map(([text]) => JSON.parse(text))
	async function start() {
		control({ type: 'start' })
		await flush()
	}
	return { socket, soniox, provider, events, session, control, audio, output, start }
}

describe('dictation audio protocol', () => {
	it.each([
		{ type: 'start' },
		{ type: 'start', audioFormat: 'auto' },
		{ type: 'start', audioFormat: 'pcm_s16le', sampleRate: 16000, numChannels: 1 },
		{ type: 'stop' },
		{ type: 'cancel' },
	])('accepts %j', (value) => {
		expect(parseDictationControl(JSON.stringify(value))).not.toBeNull()
	})

	it.each([
		{ type: 'start', languageHints: ['fr'] },
		{ type: 'start', model: 'other' },
		{ type: 'start', audioFormat: 'pcm_s16le' },
		{ type: 'start', sampleRate: 16000 },
		{ type: 'start', audioFormat: 'pcm_s16le', sampleRate: 5000, numChannels: 1 },
		{ type: 'stop', extra: true },
		{ type: 'unknown' },
		null,
	])('rejects %j', (value) => {
		expect(parseDictationControl(JSON.stringify(value))).toBeNull()
	})
})

describe('AiDialogueDictationSession', () => {
	let h: ReturnType<typeof harness>
	beforeEach(() => {
		jest.useFakeTimers()
		h = harness()
	})
	afterEach(async () => {
		h.session.dispose()
		await flush()
		expect(jest.getTimerCount()).toBe(0)
		jest.useRealTimers()
	})

	it('uses both dialogue languages in strict mode and signals ready only after provider connection', async () => {
		const opening = deferred<typeof h.provider>()
		h.soniox.openStream.mockReturnValue(opening.promise)
		h.control({ type: 'start' })
		expect(h.output()).toEqual([])
		expect(h.soniox.openStream).toHaveBeenCalledWith(
			expect.objectContaining({
				languageHints: ['en', 'ru'],
				languageHintsStrict: true,
				audioFormat: 'auto',
				abortSignal: expect.any(AbortSignal),
			}),
		)
		opening.resolve(h.provider)
		await flush()
		expect(h.output()).toEqual([{ type: 'ready' }])
	})

	it('deduplicates equal dialogue languages', async () => {
		h.session.dispose()
		h = harness(['en', 'en'])
		await h.start()
		expect(h.soniox.openStream.mock.calls[0][0]).toMatchObject({ languageHints: ['en'] })
	})

	it('forwards partial replacements, empty partials and mixed-language finals without inserting spaces', async () => {
		await h.start()
		const updates: SonioxSttEvent[] = [
			{ type: 'partial', text: 'Hel' },
			{ type: 'partial', text: 'Hello' },
			{ type: 'partial', text: '' },
			{ type: 'final', text: 'Hello ' },
			{ type: 'final', text: 'очередь.' },
		]
		updates.forEach((event) => h.events.push(event))
		await flush()
		h.control({ type: 'stop' })
		await flush()
		expect(h.output()).toEqual([{ type: 'ready' }, ...updates, { type: 'done', text: 'Hello очередь.' }])
	})

	it('drains audio in order before finish and waits for final events even when finish resolves first', async () => {
		await h.start()
		const sending = deferred<void>()
		h.provider.sendAudio.mockReturnValueOnce(sending.promise)
		h.provider.finish.mockImplementation(async () => undefined)
		h.audio(Buffer.from('header'))
		h.audio(Buffer.from('tail'))
		h.control({ type: 'stop' })
		await flush()
		expect(h.provider.sendAudio).toHaveBeenCalledTimes(1)
		expect(h.provider.finish).not.toHaveBeenCalled()
		sending.resolve()
		await flush()
		expect(h.provider.sendAudio.mock.calls.map(([bytes]) => bytes.toString())).toEqual(['header', 'tail'])
		expect(h.provider.finish).toHaveBeenCalledTimes(1)
		expect(h.output().some((event) => event.type === 'done')).toBe(false)
		h.events.push({ type: 'final', text: 'Final text.' })
		h.events.end()
		await flush()
		expect(h.output().at(-1)).toEqual({ type: 'done', text: 'Final text.' })
	})

	it('cancels connection setup and aborts a provider returned after cancellation', async () => {
		const opening = deferred<typeof h.provider>()
		h.soniox.openStream.mockReturnValue(opening.promise)
		h.control({ type: 'start' })
		h.control({ type: 'cancel' })
		expect(h.soniox.openStream.mock.calls[0][0].abortSignal.aborted).toBe(true)
		opening.resolve(h.provider)
		await flush()
		expect(h.provider.abort).toHaveBeenCalled()
		expect(h.output()).toEqual([{ type: 'cancelled' }])
	})

	it('aborts immediately on disconnect without finish or done', async () => {
		await h.start()
		h.socket.emit('close')
		await flush()
		expect(h.provider.abort).toHaveBeenCalled()
		expect(h.provider.finish).not.toHaveBeenCalled()
		expect(h.output()).toEqual([{ type: 'ready' }])
	})

	it.each(['beforeStart', 'duplicateStart', 'audioAfterStop'])('rejects invalid ordering: %s', async (state) => {
		if (state !== 'beforeStart') await h.start()
		if (state === 'duplicateStart') h.control({ type: 'start' })
		else {
			if (state === 'audioAfterStop') h.control({ type: 'stop' })
			h.audio(Buffer.from('audio'))
		}
		await flush()
		expect(h.output().at(-1)).toEqual({ type: 'error', code: 'AI_DIALOGUE_DICTATION_INVALID_INPUT' })
		expect(h.output().some((event) => event.type === 'done')).toBe(false)
	})

	it('limits the pending audio queue and does not send queued audio after abort', async () => {
		await h.start()
		const sending = deferred<void>()
		h.provider.sendAudio.mockReturnValue(sending.promise)
		for (let i = 0; i < 5; i++) h.audio(Buffer.alloc(DICTATION_LIMITS.frameBytes))
		await flush()
		sending.resolve()
		await flush()
		expect(h.output().at(-1).code).toBe('AI_DIALOGUE_DICTATION_LIMIT_EXCEEDED')
		expect(h.provider.sendAudio).not.toHaveBeenCalled()
	})

	it('closes when waiting for start or audio too long', async () => {
		jest.advanceTimersByTime(DICTATION_LIMITS.startTimeoutMs)
		expect(h.output().at(-1).code).toBe('AI_DIALOGUE_DICTATION_TIMEOUT')
		h.session.dispose()
		h = harness()
		await h.start()
		jest.advanceTimersByTime(DICTATION_LIMITS.idleTimeoutMs)
		expect(h.output().at(-1).code).toBe('AI_DIALOGUE_DICTATION_TIMEOUT')
	})

	it('reports provider failure without leaking provider messages or reporting success', async () => {
		await h.start()
		h.provider.finish.mockRejectedValue(new SonioxSttError('request_failed', 'provider secret'))
		h.control({ type: 'stop' })
		await flush()
		expect(h.output().at(-1)).toEqual({ type: 'error', code: 'AI_DIALOGUE_DICTATION_PROVIDER_FAILED' })
		expect(JSON.stringify(h.output())).not.toContain('secret')
	})

	it('stops an unexpectedly completed provider stream', async () => {
		await h.start()
		h.events.end()
		await flush()
		expect(h.output().at(-1).code).toBe('AI_DIALOGUE_DICTATION_PROVIDER_FAILED')
	})

	it('aborts a slow reader when its outgoing buffer is full, without a false done event', async () => {
		await h.start()
		h.socket.bufferedAmount = DICTATION_LIMITS.outputBytes
		h.events.push({ type: 'final', text: 'Hello.' })
		await flush()
		expect(h.provider.abort).toHaveBeenCalled()
		expect(h.socket.close).toHaveBeenCalledWith(1008)
		expect(h.output()).toEqual([{ type: 'ready' }])
	})
})
