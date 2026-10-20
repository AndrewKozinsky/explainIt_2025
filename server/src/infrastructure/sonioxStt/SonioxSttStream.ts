import { RawData, WebSocket } from 'ws'
import { z } from 'zod'
import { SonioxSttConfig, SonioxSttEvent, SonioxSttSession } from './sonioxStt.types'
import { SonioxSttError } from './SonioxSttError'

const responseSchema = z
	.object({
		tokens: z.array(z.object({ text: z.string(), is_final: z.boolean() })).optional(),
		finished: z.boolean().optional(),
		error_code: z.number().optional(),
	})
	.refine((response) => response.tokens !== undefined || response.finished || response.error_code !== undefined)

function deferred<T>() {
	let resolve!: (value: T | PromiseLike<T>) => void
	let reject!: (reason: unknown) => void

	const promise = new Promise<T>((res, rej) => {
		resolve = res
		reject = rej
	})

	// A stream can fail before the caller starts reading events or calls finish().
	void promise.catch(() => {})
	return { promise, resolve, reject }
}

/** One provider connection per dictation; no retries or automatic reconnection. */
export class SonioxSttStream implements SonioxSttSession {
	private state: 'connecting' | 'active' | 'finishing' | 'closed' = 'connecting'
	private failure?: SonioxSttError
	private readonly opened = deferred<void>()
	readonly ready = this.opened.promise
	private readonly ended = deferred<void>()
	private readonly queue: SonioxSttEvent[] = []
	private wake?: () => void
	private consumerStarted = false
	readonly events: AsyncIterable<SonioxSttEvent> = {
		[Symbol.asyncIterator]: () => {
			if (this.consumerStarted)
				throw new SonioxSttError('invalid_input', 'Only one STT event consumer is allowed')
			this.consumerStarted = true
			return this.readEvents()
		},
	}
	private partialText = ''
	private sendTail = Promise.resolve()
	private queuedAudioBytes = 0
	private readonly pendingSends = new Set<(error: SonioxSttError) => void>()
	private connectTimer: ReturnType<typeof setTimeout>
	private keepaliveTimer?: ReturnType<typeof setInterval>
	private finishTimer?: ReturnType<typeof setTimeout>

	constructor(
		private readonly socket: WebSocket,
		private readonly options: SonioxSttConfig,
	) {
		this.connectTimer = setTimeout(
			() => this.fail(new SonioxSttError('timeout', 'Soniox STT connection timed out')),
			options.connectTimeoutMs,
		)

		socket.on('open', this.onOpen)
		socket.on('message', this.onMessage)
		socket.on('error', this.onError)
		socket.on('close', this.onClose)
		options.abortSignal?.addEventListener('abort', this.abort, { once: true })

		if (options.abortSignal?.aborted) this.abort()
	}

	sendAudio(chunk: Uint8Array): Promise<void> {
		if (this.failure) return Promise.reject(this.failure)
		if (this.state !== 'active')
			return Promise.reject(new SonioxSttError('session_closed', 'Soniox STT session is not accepting audio'))
		if (!(chunk instanceof Uint8Array) || chunk.byteLength === 0) {
			return Promise.reject(new SonioxSttError('invalid_input', 'Audio chunk must contain bytes'))
		}

		if (this.queuedAudioBytes + chunk.byteLength > 1024 * 1024) {
			return Promise.reject(new SonioxSttError('buffer_overflow', 'Too much pending STT audio; await sendAudio'))
		}

		const bytes = Buffer.from(chunk)
		this.queuedAudioBytes += bytes.length
		const task = this.sendTail
			.then(() => this.sendFrame(bytes))
			.finally(() => {
				this.queuedAudioBytes -= bytes.length
			})
		this.sendTail = task
		void task.catch(() => {})

		return task
	}

	finish(): Promise<void> {
		if (this.state === 'active') {
			this.state = 'finishing'
			clearInterval(this.keepaliveTimer)

			this.finishTimer = setTimeout(
				() => this.fail(new SonioxSttError('timeout', 'Soniox STT finalization timed out')),
				this.options.finishTimeoutMs,
			)
			// An empty TEXT frame is the provider's end-of-audio signal, after all accepted binary frames.
			void this.sendTail.then(() => this.sendFrame('')).catch(() => {})
		}
		return this.ended.promise
	}

	readonly abort = (): void => {
		this.fail(new SonioxSttError('aborted', 'Soniox STT session aborted'))
	}

	private async *readEvents(): AsyncGenerator<SonioxSttEvent> {
		try {
			while (true) {
				if (this.failure) throw this.failure
				const event = this.queue.shift()
				if (event) {
					yield event
					continue
				}

				if (this.state === 'closed') return

				await new Promise<void>((resolve) => {
					this.wake = resolve
				})
			}
		} finally {
			if (this.state !== 'closed') this.abort()
		}
	}

	private emit(event: SonioxSttEvent): void {
		// A slow UI only needs the most recent consecutive partial update.
		if (event.type === 'partial' && this.queue.at(-1)?.type === 'partial') this.queue.pop()

		if (this.queue.length >= 256) {
			this.fail(new SonioxSttError('buffer_overflow', 'Soniox STT events are not being consumed'))
			return
		}

		this.queue.push(event)
		this.wake?.()
		this.wake = undefined
	}

	private readonly onOpen = (): void => {
		void this.configure()
	}

	private async configure(): Promise<void> {
		try {
			const options = this.options
			await this.sendFrame(
				JSON.stringify({
					model: options.model,
					audio_format: options.audioFormat,
					sample_rate: options.sampleRate,
					num_channels: options.numChannels,
					language_hints: options.languageHints,
					language_hints_strict: options.languageHintsStrict,
					client_reference_id: options.clientReferenceId,
					enable_endpoint_detection: false,
				}),
			)

			if (this.state === 'closed') return

			clearTimeout(this.connectTimer)
			this.state = 'active'
			this.keepaliveTimer = setInterval(() => {
				if (this.state === 'active' && this.queuedAudioBytes === 0) {
					void this.sendFrame('{"type":"keepalive"}').catch(() => {})
				}
			}, 10_000)

			this.opened.resolve()
		} catch {
			this.fail(new SonioxSttError('connection_failed', 'Cannot initialize Soniox STT'))
		}
	}

	private readonly onMessage = (data: RawData, isBinary: boolean): void => {
		if (this.state === 'closed') return
		try {
			if (isBinary) throw new Error()

			const response = responseSchema.parse(JSON.parse(data.toString()))

			if (response.error_code !== undefined) {
				this.fail(new SonioxSttError('request_failed', 'Soniox STT request failed'))
				return
			}

			if (response.tokens) {
				let final = ''
				let partial = ''

				for (const token of response.tokens) {
					if (token.text === '<end>' || token.text === '<fin>') continue
					if (token.is_final) final += token.text
					else partial += token.text
				}

				if (final) {
					this.emit({ type: 'final', text: final })
					this.partialText = ''
				}

				if (partial !== this.partialText) this.emit({ type: 'partial', text: partial })

				this.partialText = partial
			}

			if (this.failure) return

			if (response.finished) {
				if (this.state !== 'finishing') {
					this.fail(new SonioxSttError('request_failed', 'Soniox STT stream ended unexpectedly'))
					return
				}

				this.cleanup()
				this.ended.resolve()
			}
		} catch {
			this.fail(new SonioxSttError('invalid_response', 'Invalid Soniox STT response'))
		}
	}

	private readonly onError = (): void => {
		this.fail(
			new SonioxSttError(
				this.state === 'connecting' ? 'connection_failed' : 'request_failed',
				'Soniox STT connection failed',
			),
		)
	}

	private readonly onClose = (): void => {
		this.fail(new SonioxSttError('connection_failed', 'Soniox STT connection closed before completion'))
	}

	private async sendFrame(data: string | Buffer): Promise<void> {
		if (this.failure) throw this.failure
		if (this.socket.readyState !== WebSocket.OPEN) {
			const error = new SonioxSttError('connection_failed', 'Soniox STT connection is not open')
			this.fail(error)
			throw error
		}

		const sent = deferred<void>()
		this.pendingSends.add(sent.reject)
		const timer = setTimeout(() => this.fail(new SonioxSttError('timeout', 'Soniox STT send timed out')), 15_000)

		try {
			this.socket.send(data, { binary: typeof data !== 'string' }, (error) => {
				if (error) {
					this.fail(new SonioxSttError('connection_failed', 'Cannot send Soniox STT data'))
				} else sent.resolve()
			})

			await sent.promise
		} catch (error) {
			if (error instanceof SonioxSttError) throw error
			const normalized = new SonioxSttError('connection_failed', 'Cannot send Soniox STT data')
			this.fail(normalized)
			throw normalized
		} finally {
			clearTimeout(timer)
			this.pendingSends.delete(sent.reject)
		}
	}

	private fail(error: SonioxSttError): void {
		if (this.state === 'closed') return

		this.failure = error
		this.queue.length = 0
		this.cleanup()
		this.opened.reject(error)
		this.ended.reject(error)
	}

	private cleanup(): void {
		this.state = 'closed'

		for (const reject of this.pendingSends)
			reject(this.failure ?? new SonioxSttError('session_closed', 'Soniox STT session has ended'))

		this.pendingSends.clear()

		clearTimeout(this.connectTimer)
		clearInterval(this.keepaliveTimer)
		clearTimeout(this.finishTimer)

		this.options.abortSignal?.removeEventListener('abort', this.abort)

		this.socket.off('open', this.onOpen)
		this.socket.off('message', this.onMessage)
		this.socket.off('close', this.onClose)
		// Keep the guarded error listener: terminating a connecting socket can emit a late error.
		this.socket.terminate()
		this.wake?.()
		this.wake = undefined
	}
}
