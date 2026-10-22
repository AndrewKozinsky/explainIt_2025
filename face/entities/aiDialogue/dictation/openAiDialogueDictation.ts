import { createDictationRecorder, type DictationRecorder } from './createDictationRecorder'

export type DictationCallbacks = {
	onPhase(phase: 'recording' | 'finishing'): void
	onText(committed: string, provisional: string): void
	onDone(text: string): void
	onError(message: string): void
}
export type DictationSession = { stop(): void; cancel(): void }

export type DictationEnvironment = {
	getUserMedia(): Promise<MediaStream>
	createRecorder(stream: MediaStream, signal: AbortSignal): DictationRecorder | Promise<DictationRecorder>
	createSocket(url: string): WebSocket
	origin(): string
}

const defaultEnvironment: DictationEnvironment = {
	getUserMedia: () => {
		if (!navigator.mediaDevices?.getUserMedia) {
			return Promise.reject(new Error('unsupported'))
		}
		return navigator.mediaDevices.getUserMedia({ audio: true })
	},
	createRecorder: createDictationRecorder,
	createSocket: (url) => new WebSocket(url),
	origin: () => window.location.origin,
}

/**
 * Одна запись MediaRecorder → бинарный WebSocket. Запись начинается только после ready.
 * dataavailable обрабатываются последовательно; stop отправляется после последнего Blob,
 * а микрофон освобождается до ожидания окончательной транскрипции. cancel всегда бесшумен.
 */
export function openAiDialogueDictation(
	dialogueId: number,
	callbacks: DictationCallbacks,
	environment: DictationEnvironment = defaultEnvironment,
): DictationSession {
	const session = new BrowserDictation(dialogueId, callbacks, environment)
	void session.open()

	return session
}

class BrowserDictation implements DictationSession {
	private stream?: MediaStream
	private recorder?: DictationRecorder
	private abortController = new AbortController()
	private socket?: WebSocket
	private closed = false
	private recording = false
	private stopping = false
	private stopSent = false
	private committed = ''
	private queue: Promise<void> = Promise.resolve()
	private queuedBytes = 0
	private queuedChunks = 0
	private timeout?: ReturnType<typeof setTimeout>

	constructor(
		private dialogueId: number,
		private callbacks: DictationCallbacks,
		private environment: DictationEnvironment,
	) {}

	async open() {
		this.armTimeout(30_000, 'Не удалось подключить микрофон. Попробуйте ещё раз.')
		try {
			const stream = await this.environment.getUserMedia()
			if (this.closed) return stopTracks(stream)
			this.stream = stream
			const recorder = await this.environment.createRecorder(stream, this.abortController.signal)
			if (this.closed) {
				recorder.dispose?.()
				return stopTracks(stream)
			}

			this.recorder = recorder
			this.recorder.ondataavailable = (event) => this.enqueue(event.data)
			this.recorder.onstop = () => this.recorderStopped()
			this.recorder.onerror = () => this.fail('Не удалось записать звук. Попробуйте ещё раз.')
			stream.getAudioTracks().forEach((track) => track.addEventListener('ended', this.microphoneEnded))
			const url = new URL(`/api/ai-dialogue/${this.dialogueId}/dictation`, this.environment.origin())
			url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
			this.socket = this.environment.createSocket(url.toString())
			this.socket.onopen = () => this.sendControl('start')
			this.socket.onmessage = (event) => this.receive(event.data)
			this.socket.onerror = () =>
				this.fail('Не удалось подключиться к распознаванию. Проверьте соединение и повторите попытку.')
			this.socket.onclose = () =>
				this.fail('Распознавание прервано. Распознанный текст сохранён; повторите диктовку.')
		} catch (error) {
			this.fail(microphoneError(error))
		}
	}

	stop() {
		if (this.closed || this.stopping) return
		if (!this.recording) return this.cancel()

		this.stopping = true
		this.callbacks.onPhase('finishing')
		this.armTimeout(60_000, 'Не удалось завершить распознавание. Повторите диктовку.')

		try {
			this.recorder!.stop()
		} catch {
			this.fail('Не удалось остановить запись.')
		}
	}

	cancel() {
		if (this.closed) return

		try {
			if (this.socket?.readyState === 1) this.socket.send(JSON.stringify({ type: 'cancel' }))
		} catch {
			/* Соединение уже закрывается. */
		}
		this.cleanup()
	}

	private microphoneEnded = () => {
		if (!this.stopping && !this.closed) this.fail('Микрофон отключён. Подключите его и повторите диктовку.')
	}

	private receive(data: unknown) {
		if (this.closed) return

		try {
			if (typeof data !== 'string') throw new Error('Invalid event')
			const event = JSON.parse(data)

			if (event.type === 'ready' && !this.recording && !this.stopping) {
				this.recording = true
				this.armTimeout(5 * 60_000, 'Достигнут лимит времени диктовки.')
				this.recorder!.start(200)
				this.callbacks.onPhase('recording')
			} else if (event.type === 'partial' && this.recording && typeof event.text === 'string') {
				this.callbacks.onText(this.committed, event.text)
			} else if (event.type === 'final' && this.recording && typeof event.text === 'string') {
				this.committed += event.text
				this.callbacks.onText(this.committed, '')
			} else if (event.type === 'done' && this.stopSent && typeof event.text === 'string') {
				this.cleanup()
				this.callbacks.onDone(event.text)
			} else if (event.type === 'error') {
				this.fail(dictationError(event.code))
			} else {
				throw new Error('Unexpected dictation event')
			}
		} catch {
			this.fail('Не удалось получить распознанный текст. Повторите диктовку.')
		}
	}

	private enqueue(blob: Blob) {
		if (this.closed || !blob.size) return
		this.queuedBytes += blob.size
		this.queuedChunks++
		if (this.queuedBytes > 1024 * 1024 || this.queuedChunks > 64)
			return this.fail('Не удаётся отправить звук. Проверьте соединение.')
		this.queue = this.queue
			.then(async () => {
				try {
					if (this.closed) return
					const bytes = new Uint8Array(await blob.arrayBuffer())
					// Один WebSocket frame не должен превышать серверный лимит 256 КиБ.
					this.sendAudio(bytes)
				} finally {
					this.queuedBytes -= blob.size
					this.queuedChunks--
				}
			})
			.catch(() => this.fail('Не удаётся отправить звук. Проверьте соединение.'))
	}

	private recorderStopped() {
		if (this.closed) return

		stopTracks(this.stream)
		if (!this.stopping) return this.fail('Запись прервана. Повторите диктовку.')
		void this.queue
			.then(() => {
				if (!this.closed) {
					this.stopSent = true
					this.sendControl('stop')
				}
			})
			.catch(() => this.fail('Не удалось завершить передачу звука.'))
	}

	private sendAudio(bytes: Uint8Array) {
		for (let offset = 0; offset < bytes.length && !this.closed; offset += 64 * 1024) {
			if (this.socket?.readyState !== 1 || this.socket.bufferedAmount > 512 * 1024)
				throw new Error('Audio backpressure')
			this.socket.send(bytes.slice(offset, offset + 64 * 1024))
		}
	}

	private sendControl(type: 'start' | 'stop') {
		if (this.closed) return
		try {
			if (this.socket?.readyState !== 1) throw new Error('Socket not open')
			this.socket.send(JSON.stringify(type === 'start' ? { type, ...this.recorder?.audioOptions } : { type }))
		} catch {
			this.fail('Соединение с распознаванием прервано.')
		}
	}

	private armTimeout(milliseconds: number, error: string) {
		clearTimeout(this.timeout)
		this.timeout = setTimeout(() => this.fail(error), milliseconds)
	}

	private fail(message: string) {
		if (this.closed) return
		this.cleanup()
		this.callbacks.onError(message)
	}

	private cleanup() {
		this.closed = true
		this.abortController.abort()
		clearTimeout(this.timeout)
		if (this.recorder) {
			this.recorder.ondataavailable = null
			this.recorder.onstop = null
			this.recorder.onerror = null
			try {
				if (this.recorder.state !== 'inactive') this.recorder.stop()
			} catch {
				/* Запись уже завершена. */
			}
			this.recorder.dispose?.()
		}
		this.stream?.getAudioTracks().forEach((track) => track.removeEventListener('ended', this.microphoneEnded))
		stopTracks(this.stream)
		if (this.socket) {
			this.socket.onopen = null
			this.socket.onmessage = null
			this.socket.onerror = () => undefined
			this.socket.onclose = null
			try {
				this.socket.close()
			} catch {
				/* Освобождение микрофона не зависит от состояния сокета. */
			}
		}
	}
}

function stopTracks(stream?: MediaStream) {
	stream?.getTracks().forEach((track) => track.stop())
}

function microphoneError(error: unknown): string {
	if (error instanceof Error && error.message === 'unsupported')
		return 'Этот браузер не поддерживает диктовку. Введите текст с клавиатуры.'
	const name = error instanceof Error ? error.name : ''
	if (name === 'NotAllowedError' || name === 'SecurityError')
		return 'Разрешите доступ к микрофону в настройках браузера и повторите попытку.'
	if (name === 'NotFoundError') return 'Микрофон не найден. Подключите его и повторите попытку.'
	return 'Не удалось включить микрофон. Проверьте его подключение и разрешения браузера.'
}

function dictationError(code: unknown): string {
	if (code === 'AI_DIALOGUE_DICTATION_TIMEOUT') return 'Распознавание остановлено по таймауту. Повторите диктовку.'
	if (code === 'AI_DIALOGUE_DICTATION_LIMIT_EXCEEDED') return 'Достигнут лимит диктовки. Продолжите новой записью.'
	return 'Сервис распознавания временно недоступен. Попробуйте ещё раз.'
}
