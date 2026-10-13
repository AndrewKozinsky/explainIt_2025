import assert from 'node:assert/strict'
import { test } from 'node:test'
import { openAiDialogueStream } from '@/_pages/aiDialogue/AiDialoguePage/fn/openAiDialogueStream'
import { parseAiDialoguePreview } from '@/_pages/aiDialogue/AiDialoguePage/fn/parseAiDialoguePreview'
import { useAiDialogueStore } from '@/_pages/aiDialogue/aiDialogueStore'
import {
	type AudioClock,
	type AudioElement,
	DialogueAudioPlayer,
} from '@/entities/aiDialogue/audio/DialogueAudioPlayer'
import type { DialogueAudioItem, DialogueAudioTarget } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { getCompletedAudioTargets } from '@/entities/aiDialogue/audio/getCompletedAudioTargets'

class FakeAudio {
	src = ''
	preload = ''
	currentTime = 0
	duration = 20
	plays: { src: string; time: number }[] = []
	error?: Error
	listeners = new Map<string, Set<() => void>>()

	play() {
		this.plays.push({ src: this.src, time: this.currentTime })
		return this.error ? Promise.reject(this.error) : Promise.resolve()
	}

	pause() {}

	load() {}

	addEventListener(type: string, listener: () => void) {
		if (!this.listeners.has(type)) this.listeners.set(type, new Set())
		this.listeners.get(type)!.add(listener)
	}

	removeEventListener(type: string, listener: () => void) {
		this.listeners.get(type)?.delete(listener)
	}

	emit(type: string) {
		for (const listener of this.listeners.get(type) ?? []) listener()
	}
}
class FakeClock {
	now = 0
	nextId = 0
	timers = new Map<number, { at: number; callback: () => void }>()
	clock: AudioClock = {
		set: (callback, delay) => {
			const id = ++this.nextId
			this.timers.set(id, { at: this.now + delay, callback })
			return id as unknown as ReturnType<typeof setTimeout>
		},

		clear: (id) => {
			this.timers.delete(id as unknown as number)
		},
	}
	tick(ms: number) {
		const end = this.now + ms
		while (true) {
			const timer = [...this.timers].sort((a, b) => a[1].at - b[1].at)[0]
			if (!timer || timer[1].at > end) break
			this.now = timer[1].at
			this.timers.delete(timer[0])
			timer[1].callback()
		}
		this.now = end
	}
}

function item(id: number, actionIndex = id - 1, attemptId = 'attempt', turnId = 'turn'): DialogueAudioItem {
	return {
		id,
		actionIndex,
		eventIndex: 0,
		attemptId,
		turnId,
		attemptStatus: 'active',
		npcId: 'npc',
		messageId: null,
		status: 'ready',
		url: `/audio-${id}.mp3`,
		mimeType: 'audio/mpeg',
		urlsExpireAt: '2099-01-01T00:00:00Z',
	}
}

function harness() {
	const audio = new FakeAudio()
	const clock = new FakeClock()
	const player = new DialogueAudioPlayer(() => audio as unknown as AudioElement, clock.clock)
	player.startAttempt('attempt', 'turn')
	return { audio, clock, player }
}

function targets(...indices: number[]): DialogueAudioTarget[] {
	return indices.map((actionIndex) => ({ eventIndex: 0, actionIndex, npcId: 'npc' }))
}

async function flush() {
	for (let i = 0; i < 8; i += 1) await Promise.resolve()
}

test('source establishes order before translation; actions and voice metadata do not create audio', function () {
	const raw =
		'sceneUpdate\r\nYou enter.\r\nВы входите.\r\n\r\nnpcActions|npc|||neutral\r\nvoice:\r\n{"voice":"ash","instructions":"calm"}\r\naction:\r\nwaves\r\nмашет\r\nspeech:\r\nHello.\r\n'
	assert.deepEqual(getCompletedAudioTargets(raw), [
		{ eventIndex: 0, actionIndex: -1, npcId: null },
		{ eventIndex: 1, actionIndex: 1, npcId: 'npc' },
	])
	assert.equal(getCompletedAudioTargets(raw.slice(0, -2)).length, 1)
})
test('second ready audio cannot overtake first; late skipped audio does not return', async function () {
	const { player, audio, clock } = harness()
	player.registerTargets('attempt', targets(0, 1))
	player.mergeItem(item(2))
	clock.tick(9999)
	assert.equal(audio.plays.length, 0)
	clock.tick(1)
	await flush()
	assert.equal(audio.plays[0].src, '/audio-2.mp3')
	player.mergeItem(item(1))
	audio.emit('ended')
	await flush()
	assert.equal(audio.plays.length, 1)
})
test('every unavailable speech gets its own ten seconds', function () {
	const { player, audio, clock } = harness()
	player.registerTargets('attempt', targets(0, 1, 2))
	player.mergeItem(item(3))
	clock.tick(10_000)
	assert.equal(audio.plays.length, 0)
	clock.tick(9999)
	assert.equal(audio.plays.length, 0)
	clock.tick(1)
	assert.equal(audio.plays[0].src, '/audio-3.mp3')
})
test('same-button stop resumes at saved time; selecting another file resets the first', async function () {
	const { player, audio } = harness()
	player.mergeItem(item(1))
	player.mergeItem(item(2))
	player.toggle(1)
	await flush()
	audio.currentTime = 4.5
	player.toggle(1)
	assert.equal(player.getState().playbackStatus, 'paused')
	assert.equal(audio.currentTime, 4.5)
	player.toggle(1)
	await flush()
	assert.equal(audio.plays.at(-1)?.time, 4.5)
	player.toggle(2)
	await flush()
	assert.equal(audio.plays.at(-1)?.time, 0)
	player.toggle(1)
	await flush()
	assert.equal(audio.plays.at(-1)?.time, 0)
})
test('manual control suppresses current response including future speeches, but not next turn', async function () {
	const { player, audio } = harness()
	player.mergeItem(item(1))
	player.mergeItem(item(2))
	player.registerTargets('attempt', targets(0, 1))
	await flush()
	player.toggle(1)
	player.registerTargets('attempt', targets(0, 1, 2))
	player.mergeItem(item(3))
	audio.emit('ended')
	await flush()
	assert.equal(audio.plays.length, 1)
	player.startAttempt('next', 'next-turn')
	player.mergeItem(item(4, 0, 'next', 'next-turn'))
	player.registerTargets('next', targets(0))
	await flush()
	assert.equal(audio.plays.at(-1)?.src, '/audio-4.mp3')
})
test('new response stops old playback and discards its pending speeches', async function () {
	const { player, audio } = harness()
	player.mergeItem(item(1))
	player.registerTargets('attempt', targets(0, 1))
	await flush()
	player.startAttempt('next', 'next-turn')
	player.mergeItem(item(3, 0, 'next', 'next-turn'))
	player.registerTargets('next', targets(0))
	await flush()
	player.mergeItem(item(2))
	audio.emit('ended')
	await flush()
	assert.deepEqual(
		audio.plays.map((play) => play.src),
		['/audio-1.mp3', '/audio-3.mp3'],
	)
})
test('confirmation and duplicate SSE/REST updates do not restart audio or lose its time', async function () {
	const { player, audio } = harness()
	player.mergeItem(item(1))
	player.registerTargets('attempt', targets(0))
	await flush()
	audio.currentTime = 3
	player.mergeItem({ ...item(1), messageId: 99, attemptStatus: 'confirmed' })
	player.mergeItem(item(1))
	assert.equal(player.findItem({ messageId: 99, actionIndex: 0 })?.id, 1)
	assert.equal(audio.currentTime, 3)
	assert.equal(audio.plays.length, 1)
	audio.emit('ended')
	player.registerTargets('attempt', targets(0))
	player.mergeItem(item(1))
	assert.equal(audio.plays.length, 1)
})
test('cancelled attempt rejects late ready notification and stops its file', async function () {
	const { player, audio } = harness()
	player.mergeItem(item(1))
	player.registerTargets('attempt', targets(0))
	await flush()
	player.cancelAttempt('attempt')
	player.mergeItem(item(1))
	player.toggle(1)
	assert.equal(player.getState().playbackStatus, 'idle')
	assert.equal(player.getState().items.get(1)?.status, 'cancelled')
	assert.equal(audio.plays.length, 1)
})
test('autoplay rejection holds queue until a gesture instead of consuming all items', async function () {
	const { player, audio, clock } = harness()
	audio.error = Object.assign(new Error('blocked'), { name: 'NotAllowedError' })
	player.mergeItem(item(1))
	player.mergeItem(item(2))
	player.registerTargets('attempt', targets(0, 1))
	await flush()
	assert.equal(player.getState().blocked, true)
	clock.tick(60_000)
	assert.equal(audio.plays.length, 1)
	audio.error = undefined
	player.unlock()
	await flush()
	assert.equal(audio.plays.at(-1)?.src, '/audio-1.mp3')
	audio.emit('ended')
	await flush()
	assert.equal(audio.plays.at(-1)?.src, '/audio-2.mp3')
})
test('stalled playback releases queue', async function () {
	const { player, audio, clock } = harness()
	player.mergeItem(item(1))
	player.mergeItem(item(2))
	player.registerTargets('attempt', targets(0, 1))
	await flush()
	clock.tick(10_000)
	await flush()
	assert.equal(audio.plays.at(-1)?.src, '/audio-2.mp3')
})
test('history is manual only; disposal removes timers and media listeners', async function () {
	const { player, audio, clock } = harness()
	player.mergeSnapshot({
		dialogueId: 1,
		attempts: [{ id: 'old', turnId: 'old-turn', status: 'confirmed' }],
		items: [{ ...item(1, 0, 'old', 'old-turn'), attemptStatus: 'confirmed', messageId: 8 }],
	})
	assert.equal(audio.plays.length, 0)
	player.toggle(1)
	await flush()
	assert.equal(audio.plays.length, 1)
	player.dispose()
	assert.equal(clock.timers.size, 0)
	assert.equal(
		[...audio.listeners.values()].reduce((n, set) => n + set.size, 0),
		0,
	)
})

test('manual selection before first source target suppresses that response without interrupting the chosen file', async function () {
	const { player, audio } = harness()
	player.mergeItem(item(1, 0, 'old', 'old-turn'))
	player.toggle(1)
	await flush()
	player.mergeItem(item(2, 0))
	player.registerTargets('attempt', targets(0))
	await flush()
	assert.equal(player.getState().selectedId, 1)
	assert.equal(player.getState().playbackStatus, 'playing')
	assert.equal(audio.plays.length, 1)
})
test('refreshing an expired URL cannot start the old selection after the user chose another', async function () {
	const { player, audio } = harness()
	let resolve!: () => void
	player.setRefresh(
		() =>
			new Promise<void>((done) => {
				resolve = done
			}),
	)
	player.mergeItem({ ...item(1), urlsExpireAt: '2000-01-01T00:00:00Z' })
	player.mergeItem(item(2))
	player.toggle(1)
	player.toggle(2)
	await flush()
	resolve()
	await flush()
	assert.equal(player.getState().selectedId, 2)
	assert.equal(audio.plays.length, 1)
})
test('an authoritative job cancellation cannot be undone by an older ready snapshot', function () {
	const { player, audio } = harness()
	player.mergeItem({ ...item(1), status: 'cancelled', url: null })
	player.mergeItem(item(1))
	player.toggle(1)
	assert.equal(audio.plays.length, 0)
})

test('download error remains attached to the skipped file after the next file begins', async function () {
	const { player, audio, clock } = harness()
	player.mergeItem(item(1))
	player.mergeItem(item(2))
	player.registerTargets('attempt', targets(0, 1))
	await flush()
	clock.tick(10_000)
	await flush()
	assert.equal(player.getState().selectedId, 2)
	assert.equal(player.getState().loadErrors.has(1), true)
	audio.emit('ended')
})

test('SSE plays ready preview immediately and turnDone/confirmation do not restart it', async function () {
	const original = globalThis.EventSource
	class FakeEventSource {
		onmessage?: (event: { data: string }) => void
		onopen?: () => void
		onerror?: () => void

		constructor(public url: string) {}

		close() {}
	}
	globalThis.EventSource = FakeEventSource as unknown as typeof EventSource
	const { player, audio } = harness()
	try {
		const stream = openAiDialogueStream(1, undefined, {
			event(event) {
				if (event.type === 'audioAttemptStarted') player.startAttempt(event.attemptId, event.turnId)
				if (event.type === 'audioReady') player.mergeItem(event.audio)
				if (event.type === 'audioAttemptCancelled') player.cancelAttempt(event.attemptId)
			},
			targets(attemptId, targets) {
				player.registerTargets(attemptId, targets)
			},
			refresh() {},
			disconnect() {
				player.disconnect()
			},
		}) as unknown as FakeEventSource
		function send(event: unknown) {
			stream.onmessage?.({ data: JSON.stringify(event) })
		}
		send({ type: 'turnStarted' })
		send({ type: 'audioAttemptStarted', dialogueId: 1, attemptId: 'attempt', turnId: 'turn' })
		send({ type: 'chunk', chunk: 'npcActions|npc|||neutral\nspeech:\nHello.\n' })
		send({ type: 'audioReady', dialogueId: 1, audio: item(1) })
		await flush()
		assert.equal(audio.plays.length, 1)
		audio.currentTime = 2
		send({
			type: 'message',
			message: {
				id: 99,
				dialogueId: 1,
				createdAt: '',
				payload: {
					type: 'npcActions',
					npcId: 'npc',
					npcName: '',
					npcRole: '',
					emotion: 'neutral',
					actions: [{ type: 'speech', content: 'Hello.', translation: '' }],
				},
			},
		})
		send({ type: 'turnDone' })
		player.mergeItem({ ...item(1), messageId: 99, attemptStatus: 'confirmed' })
		assert.equal(audio.currentTime, 2)
		assert.equal(audio.plays.length, 1)
		stream.onerror?.()
		assert.equal(player.getState().playbackStatus, 'idle')
	} finally {
		player.dispose()
		globalThis.EventSource = original
		useAiDialogueStore.getState().clearStore()
	}
})

test('enabling browser-blocked sound also resumes a manually selected file', async function () {
	const { player, audio } = harness()
	audio.error = Object.assign(new Error('blocked'), { name: 'NotAllowedError' })
	player.mergeItem(item(1))
	player.toggle(1)
	await flush()
	assert.equal(player.getState().blocked, true)
	audio.error = undefined
	player.unlock()
	await flush()
	assert.equal(player.getState().playbackStatus, 'playing')
	player.dispose()
})

test('preview audio identity retains raw block positions after a malformed preceding block', function () {
	const raw =
		'unknown\nignored\n\nnpcActions|npc|||neutral\nspeech:\nHello.\nЗдравствуйте.\n\nnpcActions|npc|||neutral\nspeech:\nGoodbye.\nДо свидания.\n'
	const preview = parseAiDialoguePreview(raw)!
	assert.deepEqual(
		preview.map((event) => event.audioEventIndex),
		[1, 2],
	)
	assert.deepEqual(
		getCompletedAudioTargets(raw).map((target) => target.eventIndex),
		[1, 2],
	)
})
test('a spoken protocol-looking word remains speech, not a new scene header', function () {
	const preview = parseAiDialoguePreview('npcActions|npc|||neutral\nspeech:\nsceneUpdate\nОбновление сцены\n')!
	assert.equal(preview.length, 1)
	assert.equal(preview[0].actions?.[0].content, 'sceneUpdate')
})
