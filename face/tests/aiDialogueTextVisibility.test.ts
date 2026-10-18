import assert from 'node:assert/strict'
import { afterEach, beforeEach, test } from 'node:test'
import { openAiDialogueStream } from '@/_pages/aiDialogue/AiDialoguePage/fn/openAiDialogueStream'
import { useAiDialogueStore } from '@/_pages/aiDialogue/aiDialogueStore'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import {
	messageTextVisibilityKey,
	previewTextVisibilityKey,
	useDialogueTextVisibilityStore,
} from '@/widgets/aiDialogueMessages/model/textVisibilityStore'
import type { AiDialogueStreamEvent, DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import type { AiDialoguePreviewEvent } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
const originalEventSource = globalThis.EventSource
let storage: Map<string, string>

class FakeEventSource {
	onmessage?: (event: { data: string }) => void
	onerror?: () => void
	emit(event: AiDialogueStreamEvent) {
		this.onmessage?.({ data: JSON.stringify(event) })
	}
}

beforeEach(() => {
	storage = new Map()
	Object.defineProperty(globalThis, 'window', {
		configurable: true,
		value: {
			localStorage: {
				getItem: (key: string) => storage.get(key) ?? null,
				setItem: (key: string, value: string) => storage.set(key, value),
			},
		},
	})
	globalThis.EventSource = FakeEventSource as unknown as typeof EventSource
	useAiDialogueStore.getState().clearStore()
	useDialogueTextVisibilityStore.getState().initializeDialogue()
})

afterEach(() => {
	if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow)
	else Reflect.deleteProperty(globalThis, 'window')
	globalThis.EventSource = originalEventSource
	useAiDialogueStore.getState().clearStore()
})

function scene(id: number, content = `Scene ${id}`): DialogueServerMessage {
	return { id, dialogueId: 1, createdAt: '', payload: { type: 'sceneUpdate', content, translation: '' } }
}

function isVisible(key: string, actionIndex = -1) {
	const value = useDialogueTextVisibilityStore.getState().visibility.get(key)
	assert.ok(value, `Missing visibility for ${key}`)
	return value.blocks[actionIndex] ?? value.initialVisible
}

function previewKey(eventIndex = 0) {
	return previewTextVisibilityKey(useDialogueTextVisibilityStore.getState().previewGeneration, eventIndex)
}

test('the preference only affects new messages; manual visibility remains independent', () => {
	const ui = useDialogueTextVisibilityStore.getState()
	const messages = useAiDialogueStore.getState()
	messages.upsertMessage(scene(1))
	messages.upsertMessage(scene(2))
	ui.setShowTextForNewMessages(false)
	messages.upsertMessage(scene(3))
	messages.upsertMessage(scene(4))
	assert.deepEqual(
		[1, 2, 3, 4].map((id) => isVisible(messageTextVisibilityKey(id))),
		[true, true, false, false],
	)
	ui.toggleBlock(messageTextVisibilityKey(1), -1)
	ui.toggleBlock(messageTextVisibilityKey(3), -1)
	ui.setShowTextForNewMessages(true)
	assert.deepEqual(
		[1, 2, 3, 4].map((id) => isVisible(messageTextVisibilityKey(id))),
		[false, true, true, false],
	)
	messages.upsertMessage(scene(1))
	assert.equal(isVisible(messageTextVisibilityKey(1)), false)
})

test('NPC speech blocks inherit the message snapshot, including speech added after changing the preference', () => {
	const ui = useDialogueTextVisibilityStore.getState()
	ui.beginPreview()
	const event: AiDialoguePreviewEvent = {
		type: 'npcActions',
		npcId: 'npc',
		audioEventIndex: 4,
		actions: [{ type: 'speech', content: 'Hello' }],
	}
	useAiDialogueStore.getState().setPreview([event])
	ui.toggleBlock(previewKey(4), 0)
	ui.setShowTextForNewMessages(false)
	useAiDialogueStore
		.getState()
		.setPreview([{ ...event, actions: [...event.actions!, { type: 'speech', content: 'Welcome' }] }])
	assert.equal(isVisible(previewKey(4), 0), false)
	assert.equal(isVisible(previewKey(4), 1), true)
	ui.toggleBlock(previewKey(4), 1)
	assert.equal(isVisible(previewKey(4), 1), false)
})

test('stream finalization preserves all preview snapshots and manual choices after the preview list is cleared', () => {
	const stream = openAiDialogueStream(1) as unknown as FakeEventSource
	const ui = useDialogueTextVisibilityStore.getState()
	stream.emit({ type: 'turnStarted' })
	stream.emit({
		type: 'chunk',
		chunk: 'sceneUpdate\nRoom\nКомната\n\nnpcActions|npc|Alex|Guide|neutral\nspeech:\nHello\nПривет\n\n',
	})
	ui.toggleBlock(previewKey(0), -1)
	ui.setShowTextForNewMessages(false)
	stream.emit({ type: 'message', message: scene(10, 'Room') })
	assert.equal(useAiDialogueStore.getState().preview.length, 0)
	assert.equal(isVisible(messageTextVisibilityKey(10)), false)
	stream.emit({
		type: 'message',
		message: {
			id: 11,
			dialogueId: 1,
			createdAt: '',
			payload: {
				type: 'npcActions',
				npcId: 'npc',
				npcName: 'Alex',
				npcRole: 'Guide',
				emotion: 'neutral',
				actions: [{ type: 'speech', content: 'Hello', translation: 'Привет' }],
			},
		},
	})
	assert.equal(isVisible(messageTextVisibilityKey(11), 0), true)
	stream.emit({ type: 'turnDone' })
	assert.equal(isVisible(messageTextVisibilityKey(10)), false)
	assert.equal(isVisible(messageTextVisibilityKey(11), 0), true)
	assert.equal(useDialogueTextVisibilityStore.getState().previewEntries.size, 0)
})

test('identical messages receive their own snapshots and finalization consumes matches in order', () => {
	const ui = useDialogueTextVisibilityStore.getState()
	ui.beginPreview()
	const event: AiDialoguePreviewEvent = { type: 'sceneUpdate', content: 'Room', audioEventIndex: 0 }
	ui.registerPreview([event])
	ui.setShowTextForNewMessages(false)
	ui.registerPreview([event, { ...event, audioEventIndex: 1 }])
	ui.registerMessage(scene(1, 'Room'))
	ui.registerMessage(scene(2, 'Room'))
	assert.equal(isVisible(messageTextVisibilityKey(1)), true)
	assert.equal(isVisible(messageTextVisibilityKey(2)), false)
})

test('final NPC messages retain per-speech choices even when the server removes an empty action', () => {
	const ui = useDialogueTextVisibilityStore.getState()
	ui.beginPreview()
	ui.registerPreview([
		{
			type: 'npcActions',
			npcId: 'npc',
			actions: [
				{ type: 'action', content: '' },
				{ type: 'speech', content: 'Hello' },
				{ type: 'speech', content: 'Welcome' },
			],
		},
	])
	ui.toggleBlock(previewKey(), 1)
	ui.setShowTextForNewMessages(false)
	ui.registerMessage({
		id: 1,
		dialogueId: 1,
		createdAt: '',
		payload: {
			type: 'npcActions',
			npcId: 'npc',
			npcName: 'Alex',
			npcRole: '',
			emotion: 'neutral',
			actions: [
				{ type: 'speech', content: 'Hello', translation: '' },
				{ type: 'speech', content: 'Welcome', translation: '' },
			],
		},
	})
	assert.equal(isVisible(messageTextVisibilityKey(1), 0), false)
	assert.equal(isVisible(messageTextVisibilityKey(1), 1), true)
	ui.toggleBlock(messageTextVisibilityKey(1), 1)
	assert.equal(isVisible(messageTextVisibilityKey(1), 0), false)
	assert.equal(isVisible(messageTextVisibilityKey(1), 1), false)
})

test('retrying a generation discards the failed preview but retains saved message choices', () => {
	const stream = openAiDialogueStream(1) as unknown as FakeEventSource
	const ui = useDialogueTextVisibilityStore.getState()
	ui.registerMessage(scene(1))
	ui.toggleBlock(messageTextVisibilityKey(1), -1)
	stream.emit({ type: 'turnStarted' })
	stream.emit({ type: 'chunk', chunk: 'sceneUpdate\nRoom\nКомната\n' })
	const oldKey = previewKey()
	ui.setShowTextForNewMessages(false)
	stream.emit({ type: 'turnReset' })
	stream.emit({ type: 'chunk', chunk: 'sceneUpdate\nRoom\nКомната\n' })
	assert.notEqual(previewKey(), oldKey)
	assert.equal(useDialogueTextVisibilityStore.getState().visibility.has(oldKey), false)
	assert.equal(isVisible(previewKey()), false)
	assert.equal(isVisible(messageTextVisibilityKey(1)), false)
})

test('disconnect and replay preserve preview choices and subsequent replay preserves manual saved choices', () => {
	const stream = openAiDialogueStream(1) as unknown as FakeEventSource
	const ui = useDialogueTextVisibilityStore.getState()
	stream.emit({ type: 'chunk', chunk: 'sceneUpdate\nRoom\nКомната\n' })
	ui.toggleBlock(previewKey(), -1)
	stream.onerror?.()
	stream.emit({ type: 'message', message: scene(1, 'Room') })
	assert.equal(isVisible(messageTextVisibilityKey(1)), false)
	ui.toggleBlock(messageTextVisibilityKey(1), -1)
	ui.setShowTextForNewMessages(false)
	stream.emit({ type: 'message', message: scene(1, 'Room') })
	assert.equal(isVisible(messageTextVisibilityKey(1)), true)
})

test('a new visit restores only the preference and applies it to loaded history', () => {
	const ui = useDialogueTextVisibilityStore.getState()
	ui.registerMessage(scene(1))
	ui.setShowTextForNewMessages(false)
	assert.equal(localStorageManager.aiDialogueSettings.getShowText(), false)
	ui.initializeDialogue()
	assert.equal(useDialogueTextVisibilityStore.getState().visibility.size, 0)
	assert.equal(useDialogueTextVisibilityStore.getState().showTextForNewMessages, false)
	ui.registerMessage(scene(1))
	assert.equal(isVisible(messageTextVisibilityKey(1)), false)
	assert.equal(storage.size, 1)
})

test('unavailable localStorage does not prevent toggling the preference or reading its default', () => {
	Object.defineProperty(globalThis, 'window', {
		configurable: true,
		value: {
			get localStorage() {
				throw new Error('Storage denied')
			},
		},
	})
	const ui = useDialogueTextVisibilityStore.getState()
	assert.doesNotThrow(() => ui.setShowTextForNewMessages(false))
	assert.equal(useDialogueTextVisibilityStore.getState().showTextForNewMessages, false)
	assert.equal(localStorageManager.aiDialogueSettings.getShowText(), true)
})
