import { audioTargetKey } from './dialogueAudioTypes'
import type {
	DialogueAudioAddress,
	DialogueAudioItem,
	DialogueAudioSnapshot,
	DialogueAudioTarget,
} from './dialogueAudioTypes'

export type AudioElement = Pick<
	HTMLAudioElement,
	| 'src'
	| 'preload'
	| 'currentTime'
	| 'duration'
	| 'play'
	| 'pause'
	| 'load'
	| 'addEventListener'
	| 'removeEventListener'
>

type Timer = ReturnType<typeof setTimeout>
export type AudioClock = { set: (callback: () => void, delay: number) => Timer; clear: (timer: Timer) => void }

const browserClock: AudioClock = {
	set: (callback, delay) => setTimeout(callback, delay),
	clear: (timer) => clearTimeout(timer),
}

export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'
export type DialogueAudioState = {
	items: ReadonlyMap<number, DialogueAudioItem>
	attemptId?: string
	selectedId?: number
	playbackStatus: PlaybackStatus
	blocked: boolean
	loadErrors: ReadonlySet<number>
	cancelledAttempts: ReadonlySet<string>
}

/** One media element survives preview replacement, REST refreshes and manual/automatic handoffs. */
export class DialogueAudioPlayer {
	private state: DialogueAudioState = {
		items: new Map(),
		playbackStatus: 'idle',
		blocked: false,
		cancelledAttempts: new Set(),
		loadErrors: new Set(),
	}
	private listeners = new Set<() => void>()
	private element?: AudioElement
	private queue: string[] = []
	private consumed = new Set<string>()
	private turns = new Map<string, string>()
	private suppressedTurns = new Set<string>()
	private autoAttempt?: string
	private mode: 'auto' | 'manual' = 'auto'
	private waiting?: Timer
	private waitingKey?: string
	private watchdog?: Timer
	private operation = 0
	private lastTime = 0
	private refresh?: () => Promise<void>
	private recoveries = new Set<number>()
	private detach?: () => void

	constructor(
		private readonly createAudio: () => AudioElement,
		private readonly clock: AudioClock = browserClock,
		readonly dialogueId?: number,
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

	setRefresh(refresh: () => Promise<void>) {
		this.refresh = refresh
	}

	startAttempt(attemptId: string, turnId: string) {
		this.turns.set(attemptId, turnId)
		this.update({ attemptId })
	}

	registerTargets(attemptId: string, targets: DialogueAudioTarget[]) {
		if (this.state.cancelledAttempts.has(attemptId) || !this.turns.has(attemptId)) return
		const turn = this.turns.get(attemptId)!
		if (targets.length && this.autoAttempt !== attemptId) {
			this.clearQueue()
			if (!this.suppressedTurns.has(turn)) this.stop(false)
			this.autoAttempt = attemptId
		}
		for (const target of targets) {
			const key = audioTargetKey(attemptId, target)
			if (!this.consumed.has(key) && !this.queue.includes(key) && !this.suppressedTurns.has(turn))
				this.queue.push(key)
		}
		this.pump()
	}

	mergeItem(item: DialogueAudioItem) {
		const items = new Map(this.state.items)
		const previous = items.get(item.id)
		// A late preview notification cannot undo a confirmed binding or cancellation from REST.
		const merged = { ...item, messageId: item.messageId ?? previous?.messageId ?? null }
		if (previous?.status === 'cancelled') {
			merged.status = 'cancelled'
			merged.url = null
		}
		if (previous?.status === 'ready' && ['queued', 'generating'].includes(merged.status))
			Object.assign(merged, { status: previous.status, url: previous.url, urlsExpireAt: previous.urlsExpireAt })
		if (previous?.attemptStatus === 'confirmed' && merged.attemptStatus === 'active')
			merged.attemptStatus = 'confirmed'
		if (this.state.cancelledAttempts.has(item.attemptId)) {
			merged.status = 'cancelled'
			merged.url = null
		}

		items.set(item.id, merged)
		this.update({ items })
		if (item.attemptStatus === 'cancelled') this.cancelAttempt(item.attemptId)
		else if (merged.status === 'cancelled' && this.state.selectedId === item.id) this.stop(false)
		this.pump()
	}

	mergeSnapshot(snapshot: DialogueAudioSnapshot) {
		for (const attempt of snapshot.attempts) {
			if (attempt.status === 'cancelled') this.cancelAttempt(attempt.id)
		}
		for (const item of snapshot.items) this.mergeItem(item)
	}

	findItem(address: DialogueAudioAddress) {
		return [...this.state.items.values()].find(function (item) {
			if (item.actionIndex !== address.actionIndex) return false
			if (address.messageId !== undefined) return item.messageId === address.messageId
			return item.attemptId === address.attemptId && item.eventIndex === address.eventIndex
		})
	}

	cancelAttempt(attemptId: string) {
		const cancelledAttempts = new Set(this.state.cancelledAttempts).add(attemptId)
		const items = new Map(this.state.items)
		for (const [id, item] of items)
			if (item.attemptId === attemptId) items.set(id, { ...item, status: 'cancelled', url: null })
		this.update({ cancelledAttempts, items })

		if (this.autoAttempt === attemptId) this.clearQueue()
		if (this.state.selectedId !== undefined && items.get(this.state.selectedId)?.attemptId === attemptId)
			this.stop(false)
	}

	/** A manual click suppresses only the current response; later turns can autoplay normally. */
	toggle(id: number) {
		const item = this.state.items.get(id)
		if (!item || item.status !== 'ready' || !item.url || this.state.cancelledAttempts.has(item.attemptId)) return
		if (this.state.attemptId) this.suppressedTurns.add(this.turns.get(this.state.attemptId) ?? this.state.attemptId)
		if (this.autoAttempt) this.suppressedTurns.add(this.turns.get(this.autoAttempt) ?? this.autoAttempt)
		this.suppressedTurns.add(item.turnId)
		this.clearQueue()
		this.mode = 'manual'
		this.update({ blocked: false })
		if (this.state.selectedId === id && ['playing', 'loading'].includes(this.state.playbackStatus)) {
			this.stop(true)
			return
		}
		const resume = this.state.selectedId === id && this.state.playbackStatus === 'paused'
		const expired = item.urlsExpireAt && Date.parse(item.urlsExpireAt) <= Date.now()
		const retry = this.state.loadErrors.has(id)
		if ((expired || retry) && this.refresh) this.refreshAndPlay(id, resume)
		else this.play(item, 'manual', resume)
	}

	unlock() {
		const item = this.state.selectedId === undefined ? undefined : this.state.items.get(this.state.selectedId)
		this.update({ blocked: false })
		if (this.mode === 'manual' && item?.status === 'ready' && item.url) this.play(item, 'manual', true)
		else this.pump()
	}

	/** Drop transient automatic playback on a broken connection, retaining items for manual listening. */
	disconnect() {
		this.clearQueue()
		this.stop(false)
	}

	dispose() {
		this.disconnect()
		this.detach?.()
		this.detach = undefined
		this.element = undefined
		this.refresh = undefined
	}

	private update(patch: Partial<DialogueAudioState>) {
		this.state = { ...this.state, ...patch }
		for (const listener of this.listeners) listener()
	}

	private itemForKey(key: string) {
		return [...this.state.items.values()].find((item) => audioTargetKey(item.attemptId, item) === key)
	}

	private pump() {
		if (this.state.blocked || ['playing', 'loading'].includes(this.state.playbackStatus)) return
		while (this.queue.length) {
			const key = this.queue[0]
			const item = this.itemForKey(key)
			if (this.consumed.has(key) || (item && ['failed', 'outcomeUnknown', 'cancelled'].includes(item.status))) {
				this.consumeHead()
				continue
			}
			if (item?.status === 'ready' && item.url) {
				this.clearWait()
				this.play(item, 'auto', false)
				return
			}
			if (this.waitingKey !== key) {
				this.clearWait()
				this.waitingKey = key
				this.waiting = this.clock.set(() => {
					this.consumeHead()
					this.pump()
				}, 10_000)
			}
			return
		}
	}

	private consumeHead() {
		this.clearWait()
		const key = this.queue.shift()
		if (key) this.consumed.add(key)
	}

	private clearWait() {
		if (this.waiting !== undefined) this.clock.clear(this.waiting)
		this.waiting = undefined
		this.waitingKey = undefined
	}

	private clearQueue() {
		for (const key of this.queue) this.consumed.add(key)
		this.queue = []
		this.clearWait()
	}

	private clearWatchdog() {
		if (this.watchdog !== undefined) this.clock.clear(this.watchdog)
		this.watchdog = undefined
	}

	private stop(keepPosition: boolean) {
		this.operation += 1
		this.clearWatchdog()
		this.element?.pause()
		if (this.element && !keepPosition) this.element.currentTime = 0
		this.update({ playbackStatus: keepPosition ? 'paused' : 'idle' })
	}

	private armWatchdog(token: number) {
		this.clearWatchdog()
		this.watchdog = this.clock.set(() => {
			if (token === this.operation) this.fail()
		}, 10_000)
	}

	private play(item: DialogueAudioItem, mode: 'auto' | 'manual', resume: boolean) {
		this.stop(resume)
		this.mode = mode
		const element = this.element ?? (this.element = this.createAudio())
		const token = ++this.operation
		if (!resume) {
			element.src = item.url!
			element.currentTime = 0
		}
		element.preload = 'auto'
		this.lastTime = element.currentTime
		const loadErrors = new Set(this.state.loadErrors)
		loadErrors.delete(item.id)
		this.update({ selectedId: item.id, playbackStatus: 'loading', loadErrors })
		// Replace per-play listeners, so delayed media events from a previous selection do not retain closures.
		this.attachListeners(element, token)
		this.armWatchdog(token)
		void element
			.play()
			.then(() => {
				if (token !== this.operation) return
				this.update({ playbackStatus: 'playing' })
				this.armWatchdog(token)
			})
			.catch((error: unknown) => {
				if (token !== this.operation) return
				if ((error as { name?: string })?.name === 'NotAllowedError') {
					this.stop(true)
					this.update({ blocked: true })
				} else this.fail()
			})
	}

	private refreshAndPlay(id: number, resume: boolean) {
		this.stop(resume)
		const token = this.operation
		this.update({ selectedId: id, playbackStatus: 'loading' })
		this.armWatchdog(token)
		void this.refresh?.()
			.then(() => {
				if (token !== this.operation) return
				const item = this.state.items.get(id)
				if (item?.status === 'ready' && item.url) this.play(item, 'manual', resume)
				else this.fail()
			})
			.catch(() => {
				if (token === this.operation) this.fail()
			})
	}

	private attachListeners(element: AudioElement, token: number) {
		this.detach?.()
		const ended = () => {
			if (token !== this.operation) return
			this.stop(false)
			if (this.mode === 'auto') {
				this.consumeHead()
				this.pump()
			}
		}
		const error = () => {
			if (token === this.operation) this.fail()
		}
		const progress = () => {
			if (token !== this.operation || this.state.playbackStatus === 'paused') return
			if (element.currentTime > this.lastTime) {
				this.lastTime = element.currentTime
				this.armWatchdog(token)
			}
		}
		element.addEventListener('ended', ended)
		element.addEventListener('error', error)
		element.addEventListener('timeupdate', progress)
		this.detach = () => {
			element.removeEventListener('ended', ended)
			element.removeEventListener('error', error)
			element.removeEventListener('timeupdate', progress)
		}
	}
	private fail() {
		const id = this.state.selectedId
		this.stop(false)
		const loadErrors = new Set(this.state.loadErrors)
		if (id !== undefined) loadErrors.add(id)
		this.update({ playbackStatus: 'error', loadErrors })

		if (id !== undefined && !this.recoveries.has(id)) {
			this.recoveries.add(id)
			void this.refresh?.().catch(() => undefined)
		}
		if (this.mode === 'auto') {
			this.consumeHead()
			this.pump()
		}
	}
}
