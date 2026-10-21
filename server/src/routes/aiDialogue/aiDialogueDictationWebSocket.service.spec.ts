jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('repo/aiDialogue/aiDialogue.repository', () => ({ AiDialogueRepository: class {} }))
jest.mock('repo/user.repository', () => ({ UserRepository: class {} }))
jest.mock('infrastructure/mainConfig/mainConfig.service', () => ({ MainConfigService: class {} }))
jest.mock('infrastructure/sonioxStt/sonioxStt.service', () => ({ SonioxSttService: class {} }))
jest.mock('features/aiDialogue/dictation/AiDialogueDictationSession', () => ({
	AiDialogueDictationSession: jest.fn(() => ({ dispose: jest.fn() })),
}))
jest.mock('ws', () => ({ WebSocketServer: jest.fn() }))

import { EventEmitter } from 'events'
import { IncomingMessage, Server } from 'http'
import { Socket } from 'net'
import { WebSocketServer } from 'ws'
import { DICTATION_LIMITS } from 'features/aiDialogue/dictation/aiDialogueDictationProtocol'
import { AiDialogueDictationSession } from 'features/aiDialogue/dictation/AiDialogueDictationSession'
import { AiDialogueDictationWebSocket } from './aiDialogueDictationWebSocket.service'

async function flush() {
	for (let i = 0; i < 30; i++) await Promise.resolve()
}

function harness() {
	const client = Object.assign(new EventEmitter(), { terminate: jest.fn() })
	const wss = {
		handleUpgrade: jest.fn((_req, _socket, _head, done) => done(client)),
		close: jest.fn(),
	}
	jest.mocked(WebSocketServer).mockImplementation(() => wss as never)

	const dialogues = {
		getDialogueById: jest
			.fn()
			.mockResolvedValue({ user_id: 7, source_language_code: 'en', target_language_code: 'ru' }),
	}

	const users = { getUserById: jest.fn().mockResolvedValue({ id: 7 }) }
	const soniox = { openStream: jest.fn() }
	const config = { get: () => ({ site: { domainRootWithProtocol: 'https://example.com' } }) }
	const service = new AiDialogueDictationWebSocket(
		dialogues as never,
		users as never,
		soniox as never,
		config as never,
	)

	const server = new EventEmitter()
	const middleware = jest.fn((req, _res, next) => {
		req.session = { userId: 7 }
		next()
	})
	service.attach(server as Server, middleware)

	function upgrade(origin: string | undefined = 'https://example.com', url = '/api/ai-dialogue/1/dictation') {
		const req = new IncomingMessage(new Socket())
		req.url = url
		req.headers.origin = origin
		const socket = Object.assign(new EventEmitter(), {
			destroyed: false,
			pause: jest.fn(),
			resume: jest.fn(),
			end: jest.fn(),
			destroy: jest.fn(() => {
				socket.destroyed = true
				socket.emit('close')
			}),
		})
		server.emit('upgrade', req, socket, Buffer.alloc(0))
		return socket
	}

	return { service, users, dialogues, wss, soniox, middleware, client, server, upgrade }
}

describe('dictation WebSocket handshake', () => {
	let h: ReturnType<typeof harness>
	beforeEach(() => {
		jest.useFakeTimers()
		jest.clearAllMocks()
		h = harness()
	})
	afterEach(() => {
		h.service.onModuleDestroy()
		jest.useRealTimers()
	})

	it('authorizes session and ownership before upgrading and passes dialogue languages to the session', async () => {
		const socket = h.upgrade()
		await flush()
		expect(h.middleware).toHaveBeenCalledTimes(1)
		expect(h.users.getUserById).toHaveBeenCalledWith(7)
		expect(h.dialogues.getDialogueById).toHaveBeenCalledWith(1)
		expect(h.wss.handleUpgrade).toHaveBeenCalledTimes(1)
		expect(AiDialogueDictationSession).toHaveBeenCalledWith(h.client, h.soniox, ['en', 'ru'])
		expect(socket.resume).toHaveBeenCalled()
		expect(h.soniox.openStream).not.toHaveBeenCalled()
	})

	it.each(['https://evil.example', 'null', 'http://example.com', undefined])('rejects origin %s', async (origin) => {
		const socket = h.upgrade(origin === undefined ? '' : origin)
		await flush()
		expect(socket.end).toHaveBeenCalledWith(expect.stringContaining('403'))
		expect(h.middleware).not.toHaveBeenCalled()
		expect(h.wss.handleUpgrade).not.toHaveBeenCalled()
	})

	it('rejects missing sessions before dialogue lookup', async () => {
		h.middleware.mockImplementation((req, _res, next) => {
			req.session = {}
			next()
		})
		const socket = h.upgrade()
		await flush()
		expect(socket.end).toHaveBeenCalledWith(expect.stringContaining('401'))
		expect(h.dialogues.getDialogueById).not.toHaveBeenCalled()
	})

	it('rejects a deleted session user', async () => {
		h.users.getUserById.mockResolvedValue(null)
		const socket = h.upgrade()
		await flush()
		expect(socket.end).toHaveBeenCalledWith(expect.stringContaining('401'))
		expect(h.dialogues.getDialogueById).not.toHaveBeenCalled()
	})

	it.each([null, { user_id: 8 }])('rejects missing or foreign dialogue %j', async (dialogue) => {
		h.dialogues.getDialogueById.mockResolvedValue(dialogue as never)
		const socket = h.upgrade()
		await flush()
		expect(socket.end).toHaveBeenCalledWith(expect.stringContaining(dialogue ? '403' : '404'))
		expect(h.wss.handleUpgrade).not.toHaveBeenCalled()
	})

	it('rejects a parallel connection and releases the user slot after close', async () => {
		h.upgrade()
		await flush()
		const second = h.upgrade()
		await flush()
		expect(second.end).toHaveBeenCalledWith(expect.stringContaining('409'))
		h.client.emit('close')
		h.upgrade()
		await flush()
		expect(h.wss.handleUpgrade).toHaveBeenCalledTimes(2)
	})

	it('does not upgrade if the browser disconnects during session lookup', async () => {
		let next!: () => void
		h.middleware.mockImplementation((req, _res, done) => {
			req.session = { userId: 7 }
			next = done
		})
		const socket = h.upgrade()
		socket.destroy()
		next()
		await flush()
		expect(h.wss.handleUpgrade).not.toHaveBeenCalled()
		expect(jest.getTimerCount()).toBe(0)
	})

	it('bounds authentication time and releases pending sockets on timeout', async () => {
		h.middleware.mockImplementation(() => undefined)
		const socket = h.upgrade()
		jest.advanceTimersByTime(DICTATION_LIMITS.handshakeTimeoutMs)
		expect(socket.destroy).toHaveBeenCalled()
		expect(jest.getTimerCount()).toBe(0)
	})

	it('removes the upgrade listener and cancels sessions on application shutdown', async () => {
		h.upgrade()
		await flush()
		h.service.onModuleDestroy()
		expect(h.server.listenerCount('upgrade')).toBe(0)
		expect(h.client.terminate).toHaveBeenCalled()
		const session = jest.mocked(AiDialogueDictationSession).mock.results[0].value
		expect(session.dispose).toHaveBeenCalled()
	})
})
