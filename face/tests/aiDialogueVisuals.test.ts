import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { openAiDialogueStream } from '@/_pages/aiDialogue/AiDialoguePage/fn/openAiDialogueStream'
import { parseAiDialoguePreview } from '@/_pages/aiDialogue/AiDialoguePage/fn/parseAiDialoguePreview'
import {
	getVisualsRefreshInterval,
	hasPendingDialogueVisuals,
} from '@/_pages/aiDialogue/AiDialoguePage/fn/visualsRefreshPolicy'
import { useAiDialogueStore } from '@/_pages/aiDialogue/aiDialogueStore'
import type { AiDialogueVisualsModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import { getEmotionCell } from '@/widgets/aiDialogueMessages/ui/visuals/fn/getEmotionCell'
import { loadDialogueImage } from '@/widgets/aiDialogueMessages/ui/visuals/fn/useDialogueImage'

const now = Date.parse('2026-10-10T10:00:00Z')
function snapshot(): AiDialogueVisualsModel {
	return {
		dialogueId: 1,
		userAvatarUrl: '/avatar',
		urlsExpireAt: new Date(now + 300_000).toISOString(),
		characters: [],
		scenes: [],
	}
}

const originalEventSource = globalThis.EventSource
const originalImage = globalThis.Image
afterEach(function () {
	globalThis.EventSource = originalEventSource
	globalThis.Image = originalImage
	useAiDialogueStore.getState().clearStore()
})

test('all twelve emotion cells use row-major order, unknown values use neutral', function () {
	const emotions = [
		'neutral',
		'happy',
		'sad',
		'angry',
		'surprised',
		'confused',
		'worried',
		'embarrassed',
		'thoughtful',
		'skeptical',
		'relieved',
		'encouraging',
	]
	emotions.forEach(function (emotion, index) {
		assert.deepEqual(getEmotionCell(emotion), { column: index % 4, row: Math.floor(index / 4) })
	})
	assert.deepEqual(getEmotionCell('unknown'), { column: 0, row: 0 })
	assert.deepEqual(getEmotionCell(), { column: 0, row: 0 })
})

test('unfinished jobs keep polling with backoff, generating never times out locally', function () {
	const visuals = snapshot()
	for (const generationStatus of ['queued', 'waitingDependencies', 'generating'] as const) {
		visuals.scenes = [{ messageId: 1, generationStatus, image: null }]
		assert.equal(hasPendingDialogueVisuals(visuals), true)
		assert.equal(getVisualsRefreshInterval(visuals, now, now), 15_000)
		assert.equal(getVisualsRefreshInterval(visuals, now - 120_000, now), 30_000)
		assert.equal(getVisualsRefreshInterval(visuals, now - 86_400_000, now), 60_000)
	}
	visuals.characters = [{ id: 1, npcId: 'npc', generationStatus: 'generating', emotionSheet: null }]
	visuals.scenes = []
	assert.equal(hasPendingDialogueVisuals(visuals), true)
})

test('ready, failed and absent assets only schedule URL renewal; errors still recover', function () {
	const visuals = snapshot()
	visuals.scenes = [
		{ messageId: 1, generationStatus: 'failed', image: null },
		{ messageId: 2, generationStatus: null, image: null },
	]
	assert.equal(hasPendingDialogueVisuals(visuals), false)
	assert.equal(getVisualsRefreshInterval(visuals, now, now), 240_000)
	assert.equal(getVisualsRefreshInterval(visuals, now, now + 300_000), 60_000)
	assert.equal(getVisualsRefreshInterval(visuals, now, now, true), 60_000)
	assert.equal(getVisualsRefreshInterval(undefined, now, now), 60_000)
})

test('technical SSE refreshes visuals without altering messages, preview or text generation', function () {
	class FakeEventSource {
		onmessage?: (event: { data: string }) => void
		onopen?: () => void
		onerror?: () => void
		constructor(public url: string) {}
	}
	globalThis.EventSource = FakeEventSource as unknown as typeof EventSource
	let refreshes = 0
	const stream = openAiDialogueStream(1, function () {
		refreshes += 1
	}) as unknown as FakeEventSource
	const store = useAiDialogueStore.getState()
	store.setGenerating(true)
	store.setPreview([{ type: 'help', content: 'Keep reading' }])
	stream.onopen?.()
	stream.onmessage?.({ data: JSON.stringify({ type: 'visualsChanged', dialogueId: 1 }) })
	stream.onmessage?.({ data: JSON.stringify({ type: 'visualsChanged', dialogueId: 2 }) })
	assert.equal(refreshes, 2)
	assert.equal(useAiDialogueStore.getState().isGenerating, true)
	assert.deepEqual(useAiDialogueStore.getState().preview, [{ type: 'help', content: 'Keep reading' }])
	assert.equal(useAiDialogueStore.getState().messages.size, 0)
	stream.onmessage?.({ data: JSON.stringify({ type: 'turnDone' }) })
	assert.equal(useAiDialogueStore.getState().isGenerating, false)
	assert.equal(refreshes, 2)
})

test('new NPCs and scenes request snapshots, replay deduplicates, reconnect requests recovery', function () {
	class FakeEventSource {
		onmessage?: (event: { data: string }) => void
		onopen?: () => void
		onerror?: () => void
	}
	globalThis.EventSource = FakeEventSource as unknown as typeof EventSource
	let refreshes = 0
	const stream = openAiDialogueStream(1, function () {
		refreshes += 1
	}) as unknown as FakeEventSource
	const message = {
		id: 3,
		dialogueId: 1,
		createdAt: '',
		payload: { type: 'sceneUpdate', content: 'Office', translation: 'Кабинет' },
	}
	const data = JSON.stringify({ type: 'message', message })
	stream.onmessage?.({ data })
	stream.onmessage?.({ data })
	assert.equal(useAiDialogueStore.getState().messages.size, 1)
	stream.onerror?.()
	stream.onopen?.()
	assert.equal(refreshes, 3)
})

test('streamed visual metadata, including partial lines, never overwrites the scene text', function () {
	const text = 'sceneUpdate\nYou enter an office.\nВы входите в кабинет.\n'
	const metadata = 'participants:dentist_1\nvisual:The learner stands by the door.\n'
	for (let length = 0; length <= metadata.length; length += 1) {
		const preview = parseAiDialoguePreview(text + metadata.slice(0, length))
		assert.equal(preview?.[0]?.content, 'You enter an office.')
		assert.equal(preview?.[0]?.translation, 'Вы входите в кабинет.')
	}
	const npc = parseAiDialoguePreview(
		'npcActions|dentist_1|Alex|Dentist|happy\nappearance:\nAn adult with dark hair\nspeech:\nHello\nЗдравствуйте\n',
	)
	assert.equal(npc?.[0]?.actions?.[0]?.content, 'Hello')
})

test('concurrent sprite loads share one request, failed downloads can retry', async function () {
	const images: FakeImage[] = []
	class FakeImage {
		onload?: () => void
		onerror?: () => void
		src = ''
		constructor() {
			images.push(this)
		}
	}
	globalThis.Image = FakeImage as unknown as typeof Image
	const first = loadDialogueImage('/sprite')
	const second = loadDialogueImage('/sprite')
	assert.equal(first, second)
	assert.equal(images.length, 1)
	images[0].onload?.()
	await first
	const failed = loadDialogueImage('/missing')
	images[1].onerror?.()
	await assert.rejects(failed, /Image unavailable/)
	const retry = loadDialogueImage('/missing')
	assert.equal(images.length, 3)
	images[2].onload?.()
	await retry
})
