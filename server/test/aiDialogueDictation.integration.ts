import assert = require('node:assert/strict')
import { once } from 'node:events'
import { createServer } from 'node:http'
import express = require('express')
import session = require('express-session')
import { WebSocket } from 'ws'
import { SonioxSttEvent, SonioxSttSession } from '../src/infrastructure/sonioxStt/sonioxStt.types'
import { AiDialogueDictationWebSocket } from '../src/routes/aiDialogue/aiDialogueDictationWebSocket.service'

/** Реальные HTTP upgrade, ws и подписанная session-cookie; БД и платный Soniox подменены. */
async function main() {
	const app = express()
	const middleware = session({ secret: 'dictation-integration-only', resave: false, saveUninitialized: false })
	app.use(middleware)

	app.post('/login', (req, res) => {
		req.session.userId = 7
		res.sendStatus(204)
	})

	const server = createServer(app)
	const inputs: Buffer[] = []

	let openings = 0
	let aborted = 0
	let options: Record<string, unknown> = {}

	const soniox = {
		async openStream(input: Record<string, unknown>): Promise<SonioxSttSession> {
			openings++
			options = input
			const events = new ProviderEvents()
			return {
				events,
				async sendAudio(bytes) {
					inputs.push(Buffer.from(bytes))
					events.push({ type: 'partial', text: 'Hello очередь' })
				},
				async finish() {
					events.push({ type: 'final', text: 'Hello очередь.' })
					events.end()
				},
				abort() {
					aborted++
					events.end()
				},
			}
		},
	}

	const dialogues = {
		async getDialogueById(id: number) {
			return id === 1 ? { user_id: 7, source_language_code: 'en', target_language_code: 'ru' } : { user_id: 8 }
		},
	}

	const users = {
		async getUserById(id: number) {
			return id === 7 ? { id } : null
		},
	}
	const config = { get: () => ({ site: { domainRootWithProtocol: 'http://localhost' } }) }
	const route = new AiDialogueDictationWebSocket(dialogues as never, users as never, soniox as never, config as never)
	route.attach(server, middleware)
	const clients: WebSocket[] = []

	try {
		server.listen(0, '127.0.0.1')
		await once(server, 'listening')
		const address = server.address() as { port: number }
		const httpUrl = `http://127.0.0.1:${address.port}`
		const wsUrl = `ws://127.0.0.1:${address.port}/api/ai-dialogue/1/dictation`
		const login = await fetch(`${httpUrl}/login`, { method: 'POST' })
		const cookie = login.headers.get('set-cookie')!.split(';')[0]

		function connect(url = wsUrl, origin = 'http://localhost', signedCookie = cookie) {
			const client = new WebSocket(url, { origin, headers: { Cookie: signedCookie } })
			client.on('error', () => undefined)
			clients.push(client)
			return client
		}

		async function rejected(status: number, url?: string, origin?: string, signedCookie?: string) {
			const client = connect(url, origin, signedCookie)
			const [, response] = await once(client, 'unexpected-response')
			assert.equal(response.statusCode, status)
			response.resume()
			client.terminate()
		}

		await rejected(401, wsUrl, 'http://localhost', '')
		await rejected(401, wsUrl, 'http://localhost', `${cookie}tampered`)
		await rejected(403, wsUrl, 'https://untrusted.example')
		await rejected(403, wsUrl.replace('/1/', '/2/'))

		assert.equal(openings, 0)

		const client = connect()
		const output: Array<{ type: string; text?: string }> = []
		client.on('message', (data) => output.push(JSON.parse(data.toString())))
		await once(client, 'open')
		await rejected(409)
		const ready = once(client, 'message')
		client.send(JSON.stringify({ type: 'start', audioFormat: 'auto' }))
		await ready

		assert.equal(output[0].type, 'ready')
		assert.deepEqual(options.languageHints, ['en', 'ru'])
		assert.equal(options.languageHintsStrict, true)
		client.send(Buffer.from('container-header'))
		client.send(Buffer.from('last-audio-chunk'))
		client.send(JSON.stringify({ type: 'stop' }))
		await once(client, 'close')
		assert.equal(Buffer.concat(inputs).toString(), 'container-headerlast-audio-chunk')
		assert.ok(output.some((event) => event.type === 'partial'))
		assert.deepEqual(output.at(-1), { type: 'done', text: 'Hello очередь.' })
		assert.equal(output.at(-2)?.type, 'final')

		const next = connect()
		await once(next, 'open')
		const nextReady = once(next, 'message')
		next.send(JSON.stringify({ type: 'start' }))
		await nextReady
		const beforeDisconnect = aborted
		next.terminate()
		await once(next, 'close')
		await new Promise((resolve) => setTimeout(resolve, 20))
		assert.ok(aborted > beforeDisconnect)
		console.log('PASS: signed cookies, origin, ownership, concurrency, audio ordering, finalization and disconnect')
	} finally {
		clients.forEach((client) => client.terminate())
		route.onModuleDestroy()
		server.closeAllConnections()
		await new Promise<void>((resolve) => server.close(() => resolve()))
	}
}

class ProviderEvents implements AsyncIterable<SonioxSttEvent> {
	private queue: SonioxSttEvent[] = []
	private ended = false
	private wake?: () => void
	push(event: SonioxSttEvent) {
		this.queue.push(event)
		this.wake?.()
	}
	end() {
		this.ended = true
		this.wake?.()
	}
	async *[Symbol.asyncIterator]() {
		while (true) {
			const event = this.queue.shift()
			if (event) {
				yield event
				continue
			}
			if (this.ended) return
			await new Promise<void>((resolve) => {
				this.wake = resolve
			})
		}
	}
}

const deadline = setTimeout(() => {
	console.error('Dictation integration timeout')
	process.exit(1)
}, 20_000)
main()
	.catch((error) => {
		console.error(error)
		process.exitCode = 1
	})
	.finally(() => clearTimeout(deadline))
