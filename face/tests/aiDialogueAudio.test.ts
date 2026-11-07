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
import {
	type DialogueAudioAddress,
	type DialogueAudioFile,
	getDialogueAudioKey,
	SCENE_AUDIO_ACTION_INDEX,
} from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { getVoicedAudioAddresses } from '@/entities/aiDialogue/audio/getVoicedAudioAddresses'
import type { DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'

class FakeAudio {
	src = ''
	preload = ''
	currentTime = 0
	plays: { src: string; time: number }[] = []
	playError?: Error
	listeners = new Map<string, Set<() => void>>()

	play() {
		this.plays.push({ src: this.src, time: this.currentTime })
		return this.playError ? Promise.reject(this.playError) : Promise.resolve()
	}

	pause() {}

	addEventListener(eventName: string, listener: () => void) {
		if (!this.listeners.has(eventName)) this.listeners.set(eventName, new Set())
		this.listeners.get(eventName)!.add(listener)
	}

	removeEventListener(eventName: string, listener: () => void) {
		this.listeners.get(eventName)?.delete(listener)
	}

	emit(eventName: string) {
		for (const listener of this.listeners.get(eventName) ?? []) listener()
	}
}

class FakeClock {
	nextTimerId = 0
	timers = new Map<number, () => void>()
	clock: AudioClock = {
		set: (callback) => {
			const timerId = ++this.nextTimerId
			this.timers.set(timerId, callback)
			return timerId as unknown as ReturnType<typeof setTimeout>
		},
		clear: (timerId) => {
			this.timers.delete(timerId as unknown as number)
		},
	}

	runAll() {
		const callbacks = [...this.timers.values()]
		this.timers.clear()
		for (const callback of callbacks) callback()
	}
}

/** Ответ сервера, который тест завершает вручную, чтобы проверить порядок и ожидание. */
type PendingServerResponse = { address: DialogueAudioAddress; resolve: () => void; reject: () => void }

function createHarness() {
	const audio = new FakeAudio()
	const clock = new FakeClock()
	const serverResponses: PendingServerResponse[] = []

	function fetchAudio(address: DialogueAudioAddress) {
		return new Promise<DialogueAudioFile>(function (resolve, reject) {
			serverResponses.push({
				address,
				resolve: () => resolve({ url: `/audio-${getDialogueAudioKey(address)}.mp3`, mimeType: 'audio/mpeg' }),
				reject: () => reject(new Error('Audio generation failed')),
			})
		})
	}

	const player = new DialogueAudioPlayer(fetchAudio, () => audio as unknown as AudioElement, clock.clock)

	function respond(address: DialogueAudioAddress) {
		const response = serverResponses.find(
			(pendingResponse) => getDialogueAudioKey(pendingResponse.address) === getDialogueAudioKey(address),
		)
		assert.ok(response, `no request for ${getDialogueAudioKey(address)}`)
		serverResponses.splice(serverResponses.indexOf(response), 1)
		return response
	}

	return { audio, clock, player, serverResponses, respond }
}

function speech(messageId: number, actionIndex: number): DialogueAudioAddress {
	return { messageId, actionIndex }
}

function audioUrl(address: DialogueAudioAddress) {
	return `/audio-${getDialogueAudioKey(address)}.mp3`
}

async function flush() {
	for (let i = 0; i < 8; i += 1) await Promise.resolve()
}

test('voiced addresses include the scene and NPC speech but not non-verbal actions', function () {
	const scene: DialogueServerMessage = {
		id: 1,
		dialogueId: 1,
		createdAt: '',
		payload: { type: 'sceneUpdate', content: 'An airport hall.', translation: '' },
	}
	const npc: DialogueServerMessage = {
		id: 2,
		dialogueId: 1,
		createdAt: '',
		payload: {
			type: 'npcActions',
			npcId: 'officer',
			npcName: '',
			npcRole: '',
			emotion: 'neutral',
			actions: [
				{ type: 'action', content: 'Looks up.', translation: '' },
				{ type: 'speech', content: 'Passport, please.', translation: '' },
			],
		},
	}

	assert.deepEqual(getVoicedAudioAddresses(scene), [speech(1, SCENE_AUDIO_ACTION_INDEX)])
	assert.deepEqual(getVoicedAudioAddresses(npc), [speech(2, 1)])
})

test('manual click requests audio once and plays it when the server responds', async function () {
	const { player, audio, serverResponses, respond } = createHarness()

	player.toggle(speech(5, 0))
	player.toggle(speech(5, 0))
	player.toggle(speech(5, 0))
	assert.equal(serverResponses.length, 1)
	assert.equal(player.getState().playbackStatus, 'loading')

	respond(speech(5, 0)).resolve()
	await flush()

	assert.deepEqual(
		audio.plays.map((play) => play.src),
		[audioUrl(speech(5, 0))],
	)
	assert.equal(player.getState().playbackStatus, 'playing')
	player.dispose()
})

test('autoplay requests all speeches at once but plays them in text order', async function () {
	const { player, audio, serverResponses, respond } = createHarness()

	player.enqueueAutoplay([speech(5, 0), speech(5, 2)], true)
	assert.equal(serverResponses.length, 2)

	respond(speech(5, 2)).resolve()
	await flush()
	assert.equal(audio.plays.length, 0)

	respond(speech(5, 0)).resolve()
	await flush()
	audio.emit('ended')
	await flush()

	assert.deepEqual(
		audio.plays.map((play) => play.src),
		[audioUrl(speech(5, 0)), audioUrl(speech(5, 2))],
	)
	player.dispose()
})

test('a failed speech is skipped by autoplay and retried by the next click', async function () {
	const { player, audio, serverResponses, respond } = createHarness()

	player.enqueueAutoplay([speech(5, 0), speech(5, 1)], true)
	respond(speech(5, 0)).reject()
	respond(speech(5, 1)).resolve()
	await flush()

	assert.deepEqual(
		audio.plays.map((play) => play.src),
		[audioUrl(speech(5, 1))],
	)
	assert.equal(player.getState().requestStatuses.get(getDialogueAudioKey(speech(5, 0))), 'failed')

	player.toggle(speech(5, 0))
	assert.equal(serverResponses.length, 1)
	assert.equal(player.getState().requestStatuses.get(getDialogueAudioKey(speech(5, 0))), 'loading')
	player.dispose()
})

test('same-button stop resumes at saved time; selecting another file resets the first', async function () {
	const { player, audio, respond } = createHarness()

	player.toggle(speech(5, 0))
	respond(speech(5, 0)).resolve()
	await flush()
	audio.currentTime = 4

	player.toggle(speech(5, 0))
	assert.equal(player.getState().playbackStatus, 'paused')
	player.toggle(speech(5, 0))
	await flush()
	assert.equal(audio.plays.at(-1)?.time, 4)

	player.toggle(speech(5, 1))
	respond(speech(5, 1)).resolve()
	await flush()
	assert.deepEqual(audio.plays.at(-1), { src: audioUrl(speech(5, 1)), time: 0 })
	player.dispose()
})

test('a late server response does not start a file the user already left', async function () {
	const { player, audio, respond } = createHarness()

	player.toggle(speech(5, 0))
	player.toggle(speech(5, 1))
	respond(speech(5, 0)).resolve()
	await flush()
	assert.equal(audio.plays.length, 0)

	respond(speech(5, 1)).resolve()
	await flush()
	assert.deepEqual(
		audio.plays.map((play) => play.src),
		[audioUrl(speech(5, 1))],
	)
	player.dispose()
})

test('manual control drops the rest of the current reply, but the next reply autoplays', async function () {
	const { player, audio, respond } = createHarness()

	player.enqueueAutoplay([speech(5, 0)], true)
	player.toggle(speech(3, 0))
	player.enqueueAutoplay([speech(6, 0)], false)
	respond(speech(5, 0)).resolve()
	respond(speech(3, 0)).resolve()
	await flush()
	audio.emit('ended')
	await flush()
	assert.deepEqual(
		audio.plays.map((play) => play.src),
		[audioUrl(speech(3, 0))],
	)

	player.enqueueAutoplay([speech(7, 0)], true)
	respond(speech(7, 0)).resolve()
	await flush()
	assert.equal(audio.plays.at(-1)?.src, audioUrl(speech(7, 0)))
	player.dispose()
})

test('a new reply stops the previous playback and discards its pending speeches', async function () {
	const { player, audio, respond } = createHarness()

	player.enqueueAutoplay([speech(5, 0), speech(5, 1)], true)
	respond(speech(5, 0)).resolve()
	await flush()
	assert.equal(player.getState().playbackStatus, 'playing')

	player.enqueueAutoplay([speech(8, 0)], true)
	respond(speech(5, 1)).resolve()
	respond(speech(8, 0)).resolve()
	await flush()

	assert.deepEqual(
		audio.plays.map((play) => play.src),
		[audioUrl(speech(5, 0)), audioUrl(speech(8, 0))],
	)
	player.dispose()
})

test('browser-blocked sound waits for a gesture and then resumes the selected file', async function () {
	const { player, audio, respond } = createHarness()
	audio.playError = Object.assign(new Error('blocked'), { name: 'NotAllowedError' })

	player.enqueueAutoplay([speech(5, 0)], true)
	respond(speech(5, 0)).resolve()
	await flush()
	assert.equal(player.getState().isBlocked, true)

	audio.playError = undefined
	player.unlock()
	await flush()
	assert.equal(player.getState().playbackStatus, 'playing')
	assert.equal(audio.plays.at(-1)?.src, audioUrl(speech(5, 0)))
	player.dispose()
})

test('a broken file asks the server for a fresh link on the next click', async function () {
	const { player, audio, serverResponses, respond } = createHarness()

	player.toggle(speech(5, 0))
	respond(speech(5, 0)).resolve()
	await flush()
	audio.emit('error')
	assert.equal(player.getState().playbackStatus, 'error')

	player.toggle(speech(5, 0))
	assert.equal(serverResponses.length, 1)
	player.dispose()
})

test('playback that never starts reports an error instead of loading forever', async function () {
	const { player, audio, clock, respond } = createHarness()
	audio.play = () => new Promise<void>(() => undefined)

	player.toggle(speech(5, 0))
	respond(speech(5, 0)).resolve()
	await flush()
	clock.runAll()

	assert.equal(player.getState().playbackStatus, 'error')
	player.dispose()
})

test('SSE autoplays new saved messages only, not the replayed history', async function () {
	const originalEventSource = globalThis.EventSource
	class FakeEventSource {
		onmessage?: (event: { data: string }) => void
		onopen?: () => void
		onerror?: () => void

		constructor(public url: string) {}

		close() {}
	}
	globalThis.EventSource = FakeEventSource as unknown as typeof EventSource
	const autoplayCalls: { messageId: number; isNewReply: boolean }[] = []
	let disconnectCount = 0

	function npcMessage(id: number) {
		return {
			id,
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
		}
	}

	try {
		useAiDialogueStore.getState().clearStore()
		const stream = openAiDialogueStream(1, undefined, {
			newMessage(message, isNewReply) {
				autoplayCalls.push({ messageId: message.id, isNewReply })
				return true
			},
			disconnect() {
				disconnectCount += 1
			},
		}) as unknown as FakeEventSource

		function send(event: unknown) {
			stream.onmessage?.({ data: JSON.stringify(event) })
		}

		send({ type: 'message', message: npcMessage(1) })
		send({ type: 'turnStarted' })
		send({ type: 'chunk', chunk: 'npcActions|npc|||neutral\nspeech:\nHello.\n' })
		send({ type: 'message', message: npcMessage(2) })
		send({ type: 'message', message: npcMessage(3) })
		send({ type: 'turnDone' })

		assert.deepEqual(autoplayCalls, [
			{ messageId: 2, isNewReply: true },
			{ messageId: 3, isNewReply: false },
		])

		stream.onerror?.()
		assert.equal(disconnectCount, 1)
	} finally {
		globalThis.EventSource = originalEventSource
		useAiDialogueStore.getState().clearStore()
	}
})

test('a spoken protocol-looking word remains speech, not a new scene header', function () {
	const preview = parseAiDialoguePreview('npcActions|npc|||neutral\nspeech:\nsceneUpdate\nОбновление сцены\n')!
	assert.equal(preview.length, 1)
	assert.equal(preview[0].actions?.[0].content, 'sceneUpdate')
})
