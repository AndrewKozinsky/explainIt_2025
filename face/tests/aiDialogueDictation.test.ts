import assert from 'node:assert/strict'
import { afterEach, mock, test } from 'node:test'
import { type DictationSession, openAiDialogueDictation } from '@/entities/aiDialogue/dictation/openAiDialogueDictation'

const sessions: DictationSession[] = []
afterEach(() => {
	sessions.splice(0).forEach((session) => session.cancel())
})
async function flush() {
	for (let i = 0; i < 30; i++) await Promise.resolve()
}
function deferred<T>() {
	let resolve!: (value: T) => void
	const promise = new Promise<T>((done) => {
		resolve = done
	})
	return { promise, resolve }
}
function harness() {
	const track = Object.assign(new EventTarget(), { stop: mock.fn() })
	const stream = { getAudioTracks: () => [track], getTracks: () => [track] }

	const recorder = {
		state: 'inactive',
		ondataavailable: null as ((event: { data: Blob }) => void) | null,
		onstop: null as (() => void) | null,
		onerror: null as (() => void) | null,
		start: mock.fn(() => {
			recorder.state = 'recording'
		}),
		stop: mock.fn(() => {
			recorder.state = 'inactive'
		}),
	}

	const socket = {
		readyState: 0,
		bufferedAmount: 0,
		onopen: null as (() => void) | null,
		onclose: null as (() => void) | null,
		onerror: null as (() => void) | null,
		onmessage: null as ((event: { data: string }) => void) | null,
		send: mock.fn((_value: unknown) => undefined),
		close: mock.fn(() => {
			socket.readyState = 3
		}),
	}
	const callbacks = { onPhase: mock.fn(), onText: mock.fn(), onDone: mock.fn(), onError: mock.fn() }
	const environment = {
		getUserMedia: mock.fn(async () => stream as unknown as MediaStream),
		createRecorder: mock.fn(() => recorder as unknown as MediaRecorder),
		createSocket: mock.fn((_url: string) => socket as unknown as WebSocket),
		origin: () => 'https://example.com',
	}
	const session = openAiDialogueDictation(12, callbacks, environment)
	sessions.push(session)
	const message = (event: unknown) => socket.onmessage?.({ data: JSON.stringify(event) })
	const controls = () =>
		socket.send.mock.calls
			.map((call) => call.arguments[0])
			.filter((data) => typeof data === 'string')
			.map((data) => JSON.parse(data as string))
	async function ready() {
		await flush()
		socket.readyState = 1
		socket.onopen?.()
		message({ type: 'ready' })
		await flush()
	}
	return { stream, track, recorder, socket, callbacks, environment, session, message, controls, ready }
}

test('microphone recording waits for server ready and uses the current-site secure WebSocket', async () => {
	const h = harness()
	await flush()
	assert.equal(
		h.environment.createSocket.mock.calls[0].arguments[0],
		'wss://example.com/api/ai-dialogue/12/dictation',
	)
	h.socket.readyState = 1
	h.socket.onopen?.()
	assert.deepEqual(h.controls(), [{ type: 'start' }])
	assert.equal(h.recorder.start.mock.callCount(), 0)
	h.message({ type: 'ready' })
	assert.equal(h.recorder.start.mock.callCount(), 1)
	assert.deepEqual(h.callbacks.onPhase.mock.calls[0].arguments, ['recording'])
})

test('audio Blob conversions preserve order and stop follows the final dataavailable chunk', async () => {
	const h = harness()
	await h.ready()
	const first = deferred<ArrayBuffer>()
	h.recorder.ondataavailable?.({ data: { size: 5, arrayBuffer: () => first.promise } as Blob })
	h.session.stop()
	h.recorder.ondataavailable?.({ data: new Blob(['tail']) })
	h.recorder.onstop?.()
	await flush()
	assert.deepEqual(h.controls(), [{ type: 'start' }])
	assert.ok(h.track.stop.mock.callCount() > 0)
	first.resolve(new TextEncoder().encode('first').buffer)
	await flush()
	const sent = h.socket.send.mock.calls.map((call) => call.arguments[0])
	assert.equal(new TextDecoder().decode(sent[1] as Uint8Array), 'first')
	assert.equal(new TextDecoder().decode(sent[2] as Uint8Array), 'tail')
	assert.deepEqual(JSON.parse(sent[3] as string), { type: 'stop' })
	h.message({ type: 'final', text: 'Hello очередь.' })
	h.message({ type: 'done', text: 'Hello очередь.' })
	assert.deepEqual(h.callbacks.onDone.mock.calls[0].arguments, ['Hello очередь.'])
})

test('partial tails are replacements; finals preserve whitespace and done does not replay text updates', async () => {
	const h = harness()
	await h.ready()
	h.message({ type: 'partial', text: 'Hel' })
	h.message({ type: 'partial', text: 'Hello' })
	h.message({ type: 'final', text: 'Hello ' })
	h.message({ type: 'partial', text: '' })
	h.message({ type: 'final', text: 'очередь.' })
	assert.deepEqual(
		h.callbacks.onText.mock.calls.map((call) => call.arguments),
		[
			['', 'Hel'],
			['', 'Hello'],
			['Hello ', ''],
			['Hello ', ''],
			['Hello очередь.', ''],
		],
	)
	h.session.stop()
	h.recorder.onstop?.()
	await flush()
	h.message({ type: 'done', text: 'Hello очередь.' })
	assert.equal(h.callbacks.onText.mock.callCount(), 5)
	assert.equal(h.callbacks.onDone.mock.callCount(), 1)
	assert.ok(h.track.stop.mock.callCount() > 0)
})

test('a late microphone permission result is released after cancellation without opening a socket', async () => {
	const permission = deferred<MediaStream>()
	const track = { stop: mock.fn() }
	const stream = { getTracks: () => [track] } as unknown as MediaStream
	const createSocket = mock.fn((_url: string): WebSocket => {
		throw new Error('Should not connect')
	})
	const session = openAiDialogueDictation(
		1,
		{ onPhase() {}, onText() {}, onDone() {}, onError() {} },
		{
			getUserMedia: () => permission.promise,
			createSocket,
			createRecorder: mock.fn(),
			origin: () => 'http://localhost',
		},
	)
	session.cancel()
	permission.resolve(stream)
	await flush()
	assert.equal(track.stop.mock.callCount(), 1)
	assert.equal(createSocket.mock.callCount(), 0)
})

test('permission denial is reported once and never starts a recorder', async () => {
	const onError = mock.fn()
	const session = openAiDialogueDictation(
		1,
		{ onPhase() {}, onText() {}, onDone() {}, onError },
		{
			getUserMedia: async () => {
				throw new DOMException('Denied', 'NotAllowedError')
			},
			createSocket: mock.fn(),
			createRecorder: mock.fn(),
			origin: () => 'http://localhost',
		},
	)
	sessions.push(session)
	await flush()
	assert.equal(onError.mock.callCount(), 1)
	assert.match(onError.mock.calls[0].arguments[0], /Разрешите доступ/)
})

test('network errors release tracks/recorder and suppress later events', async () => {
	const h = harness()
	await h.ready()
	const oldMessage = h.socket.onmessage!
	h.socket.onerror?.()
	oldMessage({ data: JSON.stringify({ type: 'done', text: 'stale' }) })
	assert.ok(h.track.stop.mock.callCount() > 0)
	assert.equal(h.recorder.stop.mock.callCount(), 1)
	assert.equal(h.callbacks.onError.mock.callCount(), 1)
	assert.equal(h.callbacks.onDone.mock.callCount(), 0)
})

test('cancellation sends cancel and releases the microphone without reporting a failure', async () => {
	const h = harness()
	await h.ready()
	h.session.cancel()
	assert.deepEqual(h.controls().at(-1), { type: 'cancel' })
	assert.ok(h.track.stop.mock.callCount() > 0)
	assert.equal(h.callbacks.onError.mock.callCount(), 0)
})

test('microphone disconnection ends capture and returns a readable error', async () => {
	const h = harness()
	await h.ready()
	h.track.dispatchEvent(new Event('ended'))
	assert.match(h.callbacks.onError.mock.calls[0].arguments[0], /Микрофон отключён/)
	assert.equal(h.socket.close.mock.callCount(), 1)
})

test('transport overload aborts instead of buffering arbitrary audio', async () => {
	const h = harness()
	await h.ready()
	h.socket.bufferedAmount = 1024 * 1024
	h.recorder.ondataavailable?.({ data: new Blob(['audio']) })
	await flush()
	assert.equal(h.callbacks.onError.mock.callCount(), 1)
	assert.ok(h.track.stop.mock.callCount() > 0)
	assert.equal(h.socket.close.mock.callCount(), 1)
})

test('provider errors never expose raw internal codes and done before stop is rejected', async () => {
	const h = harness()
	await h.ready()
	h.message({ type: 'error', code: 'secret detail' })
	assert.doesNotMatch(h.callbacks.onError.mock.calls[0].arguments[0], /secret/)
	const other = harness()
	await other.ready()
	other.message({ type: 'done', text: 'bad' })
	assert.equal(other.callbacks.onDone.mock.callCount(), 0)
	assert.equal(other.callbacks.onError.mock.callCount(), 1)
})
