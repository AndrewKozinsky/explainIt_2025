import { type DialogueAudioAddress, type DialogueAudioFile, getDialogueAudioKey } from './dialogueAudioTypes'

export type AudioElement = Pick<
	HTMLAudioElement,
	'src' | 'preload' | 'currentTime' | 'play' | 'pause' | 'addEventListener' | 'removeEventListener'
>

type Timer = ReturnType<typeof setTimeout>
export type AudioClock = { set: (callback: () => void, delay: number) => Timer; clear: (timer: Timer) => void }

const browserClock: AudioClock = {
	set: (callback, delay) => setTimeout(callback, delay),
	clear: (timer) => clearTimeout(timer),
}

/** Сколько ждать начала воспроизведения загруженной ссылки, прежде чем показать ошибку. */
const PLAYBACK_START_TIMEOUT_MS = 15_000

/** Запрашивает у сервера озвучку. Сервер синтезирует её при первом запросе и ждёт результата. */
export type FetchDialogueAudio = (address: DialogueAudioAddress) => Promise<DialogueAudioFile>

export type AudioRequestStatus = 'loading' | 'ready' | 'failed'
export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'
type PlaybackMode = 'auto' | 'manual'

export type DialogueAudioState = {
	/** Статус запроса файла по ключу getDialogueAudioKey. Нет записи — озвучку ещё не запрашивали. */
	requestStatuses: ReadonlyMap<string, AudioRequestStatus>
	/** Ключ выбранной (играющей, загружаемой или поставленной на паузу) озвучки. */
	selectedKey?: string
	playbackStatus: PlaybackStatus
	/** Браузер запретил воспроизведение без действия пользователя. */
	isBlocked: boolean
}

/**
 * Единственный проигрыватель озвучки на странице диалога.
 *
 * Ручное нажатие запрашивает озвучку и играет её, как только сервер отдаст файл.
 * Автоозвучка получает реплики нового ответа, сразу запрашивает их файлы и играет по порядку текста.
 * Ручное нажатие снимает оставшуюся автоозвучку текущего ответа; следующий ответ озвучивается снова.
 */
export class DialogueAudioPlayer {
	private state: DialogueAudioState = {
		requestStatuses: new Map(),
		playbackStatus: 'idle',
		isBlocked: false,
	}
	private listeners = new Set<() => void>()
	private element?: AudioElement
	private files = new Map<string, DialogueAudioFile>()
	private pendingRequests = new Map<string, Promise<DialogueAudioFile | null>>()
	private autoplayQueue: DialogueAudioAddress[] = []
	private isAutoplaySuppressed = false
	private playbackMode: PlaybackMode = 'manual'
	/** Растёт при каждом новом выборе: устаревшие ответы сервера и события медиа игнорируются. */
	private operation = 0
	private startTimer?: Timer
	private detachListeners?: () => void

	constructor(
		private readonly fetchAudio: FetchDialogueAudio,
		private readonly createAudio: () => AudioElement,
		private readonly clock: AudioClock = browserClock,
	) {}

	getState() {
		return this.state
	}

	subscribe(listener: () => void) {
		this.listeners.add(listener)
		return () => {
			this.listeners.delete(listener)
		}
	}

	/**
	 * Ставит в автоозвучку тексты нового ответа. Первый текст нового ответа снимает очередь
	 * предыдущего и останавливает его текущий файл.
	 */
	enqueueAutoplay(addresses: DialogueAudioAddress[], isNewReply: boolean) {
		if (isNewReply) {
			this.clearAutoplayQueue()
			this.isAutoplaySuppressed = false
			this.stop(false)
		}
		if (this.isAutoplaySuppressed || addresses.length === 0) return

		this.autoplayQueue.push(...addresses)
		// Файлы запрашиваются сразу, чтобы следующая реплика была готова к концу предыдущей.
		for (const address of addresses) void this.requestAudio(address)
		this.playNextAutoplay()
	}

	/** Ручное нажатие: остановить выбранную озвучку, продолжить её с паузы или начать другую. */
	toggle(address: DialogueAudioAddress) {
		const key = getDialogueAudioKey(address)
		const isSelected = this.state.selectedKey === key

		this.clearAutoplayQueue()
		this.isAutoplaySuppressed = true
		this.update({ isBlocked: false })

		if (isSelected && ['playing', 'loading'].includes(this.state.playbackStatus)) {
			this.stop(true)
			return
		}

		const shouldResume = isSelected && this.state.playbackStatus === 'paused'
		void this.select(address, 'manual', shouldResume)
	}

	/** Действие пользователя разрешило звук: продолжить выбранную озвучку. */
	unlock() {
		const key = this.state.selectedKey
		const file = key === undefined ? undefined : this.files.get(key)
		this.update({ isBlocked: false })

		if (key !== undefined && file) this.playFile(key, file, this.playbackMode, true)
		else this.playNextAutoplay()
	}

	/** Разрыв SSE: снять автоозвучку и остановить звук. Уже полученные файлы остаются для ручного запуска. */
	disconnect() {
		this.clearAutoplayQueue()
		this.stop(false)
	}

	dispose() {
		this.disconnect()
		this.detachListeners?.()
		this.detachListeners = undefined
		this.element = undefined
	}

	private update(patch: Partial<DialogueAudioState>) {
		this.state = { ...this.state, ...patch }
		for (const listener of this.listeners) listener()
	}

	private setRequestStatus(key: string, status: AudioRequestStatus) {
		this.update({ requestStatuses: new Map(this.state.requestStatuses).set(key, status) })
	}

	/** Один запрос на озвучку: повторные вызовы ждут уже начатый запрос или сразу получают файл. */
	private requestAudio(address: DialogueAudioAddress): Promise<DialogueAudioFile | null> {
		const key = getDialogueAudioKey(address)
		const file = this.files.get(key)
		if (file) return Promise.resolve(file)

		const pendingRequest = this.pendingRequests.get(key)
		if (pendingRequest) return pendingRequest

		this.setRequestStatus(key, 'loading')
		const request = this.fetchAudio(address)
			.then((receivedFile) => {
				this.files.set(key, receivedFile)
				this.setRequestStatus(key, 'ready')
				return receivedFile
			})
			.catch(() => {
				// Следующий запрос этой озвучки снова обратится к серверу.
				this.setRequestStatus(key, 'failed')
				return null
			})
			.finally(() => {
				this.pendingRequests.delete(key)
			})

		this.pendingRequests.set(key, request)
		return request
	}

	/** Выбирает озвучку: ждёт её файл и играет, если пользователь за это время не выбрал другую. */
	private async select(address: DialogueAudioAddress, mode: PlaybackMode, shouldResume: boolean) {
		const key = getDialogueAudioKey(address)
		this.stop(shouldResume)
		this.playbackMode = mode
		const operation = this.operation
		this.update({ selectedKey: key, playbackStatus: 'loading' })

		const file = await this.requestAudio(address)
		if (operation !== this.operation) return

		if (file) {
			this.playFile(key, file, mode, shouldResume)
			return
		}

		this.update({ playbackStatus: 'error' })
		if (mode === 'auto') this.playNextAutoplay()
	}

	private playNextAutoplay() {
		if (this.state.isBlocked || ['playing', 'loading'].includes(this.state.playbackStatus)) return

		const nextAddress = this.autoplayQueue.shift()
		if (nextAddress) void this.select(nextAddress, 'auto', false)
	}

	private clearAutoplayQueue() {
		this.autoplayQueue = []
	}

	private playFile(key: string, file: DialogueAudioFile, mode: PlaybackMode, shouldResume: boolean) {
		this.stop(shouldResume)
		this.playbackMode = mode
		const operation = this.operation
		const element = this.element ?? (this.element = this.createAudio())

		if (!shouldResume || element.src !== file.url) {
			element.src = file.url
			element.currentTime = 0
		}
		element.preload = 'auto'
		this.update({ selectedKey: key, playbackStatus: 'loading' })
		this.attachListeners(element, key, operation)
		this.startTimer = this.clock.set(() => {
			if (operation === this.operation) this.failPlayback(key)
		}, PLAYBACK_START_TIMEOUT_MS)

		element
			.play()
			.then(() => {
				if (operation !== this.operation) return
				this.clearStartTimer()
				this.update({ playbackStatus: 'playing' })
			})
			.catch((error: unknown) => {
				if (operation !== this.operation) return
				if ((error as { name?: string })?.name === 'NotAllowedError') {
					this.stop(true)
					this.update({ isBlocked: true })
				} else this.failPlayback(key)
			})
	}

	private attachListeners(element: AudioElement, key: string, operation: number) {
		this.detachListeners?.()

		const handleEnded = () => {
			if (operation !== this.operation) return
			this.stop(false)
			if (this.playbackMode === 'auto') this.playNextAutoplay()
		}
		const handleError = () => {
			if (operation === this.operation) this.failPlayback(key)
		}

		element.addEventListener('ended', handleEnded)
		element.addEventListener('error', handleError)
		this.detachListeners = () => {
			element.removeEventListener('ended', handleEnded)
			element.removeEventListener('error', handleError)
		}
	}

	/** Файл не проигрался (например, истекла ссылка): следующее нажатие запросит ссылку заново. */
	private failPlayback(key: string) {
		this.stop(false)
		this.files.delete(key)
		this.setRequestStatus(key, 'failed')
		this.update({ playbackStatus: 'error' })
		if (this.playbackMode === 'auto') this.playNextAutoplay()
	}

	private clearStartTimer() {
		if (this.startTimer !== undefined) this.clock.clear(this.startTimer)
		this.startTimer = undefined
	}

	private stop(shouldKeepPosition: boolean) {
		this.operation += 1
		this.clearStartTimer()
		this.element?.pause()
		if (this.element && !shouldKeepPosition) this.element.currentTime = 0
		this.update({ playbackStatus: shouldKeepPosition ? 'paused' : 'idle' })
	}
}
