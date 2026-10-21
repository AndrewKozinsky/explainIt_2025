import { RawData, WebSocket } from 'ws'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { SonioxSttService } from 'infrastructure/sonioxStt/sonioxStt.service'
import { SonioxSttSession } from 'infrastructure/sonioxStt/sonioxStt.types'
import { SonioxSttError } from 'infrastructure/sonioxStt/SonioxSttError'
import { AiDialogueDictationServerEvent, DICTATION_LIMITS, parseDictationControl } from './aiDialogueDictationProtocol'

const errors = errorMessage.aiDialogue
type SessionState = 'waitingStart' | 'starting' | 'streaming' | 'finishing' | 'closed'

/**
 * Одна диктовка в одном WebSocket. Принимает упорядоченный поток аудио и возвращает
 * partial/final. stop дожидается отправки аудио, finish Soniox и чтения всех финальных
 * событий; cancel/разрыв соединения немедленно отменяют провайдера. Ничего не сохраняет.
 */
export class AiDialogueDictationSession {
	private state: SessionState = 'waitingStart'
	private provider?: SonioxSttSession
	private abortController = new AbortController()
	private sending: Promise<void> = Promise.resolve()
	private receiving: Promise<void> = Promise.resolve()
	private pendingBytes = 0
	private pendingFrames = 0
	private totalBytes = 0
	private committed = ''
	private deadline: ReturnType<typeof setTimeout>
	private idle: ReturnType<typeof setTimeout>
	private closing?: ReturnType<typeof setTimeout>

	constructor(
		private socket: WebSocket,
		private soniox: SonioxSttService,
		private languageHints: string[],
	) {
		this.deadline = setTimeout(() => this.fail(errors.dictationLimitExceeded.code), DICTATION_LIMITS.durationMs)
		this.idle = setTimeout(() => this.fail(errors.dictationTimeout.code), DICTATION_LIMITS.startTimeoutMs)
		socket.on('message', (data, binary) => this.onMessage(data, binary))
		socket.on('close', () => this.dispose())
		socket.on('error', () => this.dispose())
	}

	/** Вызывается также при остановке приложения; завершение диктовки не подтверждается. */
	dispose() {
		this.state = 'closed'

		clearTimeout(this.deadline)
		clearTimeout(this.idle)
		clearTimeout(this.closing)

		this.abortController.abort()
		this.provider?.abort()
	}

	private onMessage(data: RawData, binary: boolean) {
		if (this.state === 'closed') return

		const bytes = Array.isArray(data) ? Buffer.concat(data) : Buffer.isBuffer(data) ? data : Buffer.from(data)
		if (binary) return this.acceptAudio(bytes)
		const control = bytes.length <= 1024 ? parseDictationControl(bytes.toString('utf8')) : null
		if (!control) return this.fail(errors.dictationInvalidInput.code)

		if (control.type === 'cancel') {
			this.complete({ type: 'cancelled' })
		} else if (control.type === 'start' && this.state === 'waitingStart') {
			void this.start(control)
		} else if (control.type === 'stop' && this.state === 'streaming') {
			this.state = 'finishing'
			clearTimeout(this.idle)
			void this.finish()
		} else {
			this.fail(errors.dictationInvalidInput.code)
		}
	}

	private async start(control: Extract<NonNullable<ReturnType<typeof parseDictationControl>>, { type: 'start' }>) {
		this.state = 'starting'

		try {
			const { type: _type, ...audio } = control
			const provider = await this.soniox.openStream({
				...audio,
				languageHints: [...new Set(this.languageHints)],
				languageHintsStrict: true,
				abortSignal: this.abortController.signal,
			})

			if (this.state !== 'starting') return provider.abort()
			this.provider = provider
			this.state = 'streaming'
			this.refreshIdle()
			this.send({ type: 'ready' })
			this.receiving = this.receive().catch((error) => this.fail(providerErrorCode(error)))
		} catch (error) {
			this.fail(providerErrorCode(error))
		}
	}

	private acceptAudio(bytes: Buffer) {
		if (this.state !== 'streaming') return this.fail(errors.dictationInvalidInput.code)
		if (!bytes.length) return
		this.totalBytes += bytes.length

		if (
			bytes.length > DICTATION_LIMITS.frameBytes ||
			this.totalBytes > DICTATION_LIMITS.totalBytes ||
			this.pendingBytes + bytes.length > DICTATION_LIMITS.pendingBytes ||
			this.pendingFrames >= DICTATION_LIMITS.pendingFrames
		)
			return this.fail(errors.dictationLimitExceeded.code)

		this.refreshIdle()
		this.pendingBytes += bytes.length
		this.pendingFrames++
		this.sending = this.sending
			.then(async () => {
				try {
					if (this.state !== 'closed') await this.provider!.sendAudio(bytes)
				} finally {
					this.pendingBytes -= bytes.length
					this.pendingFrames--
				}
			})
			.catch((error) => this.fail(providerErrorCode(error)))
	}

	private async receive() {
		for await (const event of this.provider!.events) {
			if (this.state === 'closed') return

			if (this.committed.length + event.text.length > DICTATION_LIMITS.textCharacters) {
				return this.fail(errors.dictationLimitExceeded.code)
			}

			if (event.type === 'final') this.committed += event.text
			this.send(event)
		}
		if (this.state === 'streaming') this.fail(errors.dictationProviderFailed.code)
	}

	private async finish() {
		try {
			await this.sending
			if (this.state !== 'finishing') return

			await this.provider!.finish()
			await this.receiving

			if (this.state === 'finishing') this.complete({ type: 'done', text: this.committed })
		} catch (error) {
			this.fail(providerErrorCode(error))
		}
	}

	private refreshIdle() {
		clearTimeout(this.idle)
		this.idle = setTimeout(() => this.fail(errors.dictationTimeout.code), DICTATION_LIMITS.idleTimeoutMs)
	}

	private send(event: AiDialogueDictationServerEvent) {
		if (this.socket.readyState !== WebSocket.OPEN) return this.dispose()
		const message = JSON.stringify(event)

		if (this.socket.bufferedAmount + Buffer.byteLength(message) > DICTATION_LIMITS.outputBytes) {
			return this.fail(errors.dictationLimitExceeded.code)
		}

		this.socket.send(message, (error) => {
			if (error) {
				this.dispose()
				this.socket.terminate()
			}
		})
	}

	private fail(code: string) {
		if (this.state === 'closed') return
		this.complete({ type: 'error', code }, 1008)
	}

	private complete(event: AiDialogueDictationServerEvent, closeCode = 1000) {
		this.dispose()
		if (this.socket.readyState !== WebSocket.OPEN) return

		try {
			const message = JSON.stringify(event)
			if (this.socket.bufferedAmount + Buffer.byteLength(message) <= DICTATION_LIMITS.outputBytes) {
				this.socket.send(message, () => undefined)
			} else {
				closeCode = 1008
			}

			this.socket.close(closeCode)
		} catch {
			this.socket.terminate()
		} finally {
			this.closing = setTimeout(() => this.socket.terminate(), 1000)
			this.closing.unref?.()
		}
	}
}

function providerErrorCode(error: unknown): string {
	if (error instanceof SonioxSttError && error.code === 'timeout') return errors.dictationTimeout.code
	if (error instanceof SonioxSttError && error.code === 'buffer_overflow') return errors.dictationLimitExceeded.code

	return errors.dictationProviderFailed.code
}
