import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { openAiDialogueStream } from '@/_pages/aiDialogue/AiDialoguePage/fn/openAiDialogueStream'
import { parseAiDialoguePreview } from '@/_pages/aiDialogue/AiDialoguePage/fn/parseAiDialoguePreview'
import { useAiDialogueStore } from '@/_pages/aiDialogue/aiDialogueStore'
import type { AiDialogueWordMapBlock } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'
import {
	resolveDialogueWordSelection,
	dictionaryPhraseForClick,
	splitDialogueText,
} from '@/widgets/aiDialogueMessages/ui/SegmentedText/fn/wordSelection'

const originalEventSource = globalThis.EventSource
afterEach(function () {
	globalThis.EventSource = originalEventSource
	useAiDialogueStore.getState().clearStore()
})

function block(content: string, expressions: Record<number, number[]>): AiDialogueWordMapBlock {
	const words = Array.from(new Intl.Segmenter('en', { granularity: 'word' }).segment(content))
		.filter((item) => item.isWordLike)
		.map((item, id) => ({ id, text: item.segment, start: item.index, end: item.index + item.segment.length }))

	const selections = words.map(function (word) {
		const wordIds = expressions[word.id] ?? [word.id]

		return { wordId: word.id, wordIds, phrase: wordIds.map((id) => words[id].text).join(' ') }
	})

	return { content, words, selections }
}

test('Do and have select the construction but you still selects only you regardless of earlier clicks', function () {
	const map = block('Do you have anything to declare?', { 0: [0, 1, 2], 2: [0, 1, 2], 4: [4, 5], 5: [4, 5] })
	assert.equal(resolveDialogueWordSelection(map.content, map.words[0].start, map)?.phrase, 'Do you have')
	assert.equal(resolveDialogueWordSelection(map.content, map.words[1].start, map)?.phrase, 'you')
	assert.equal(resolveDialogueWordSelection(map.content, map.words[2].start, map)?.phrase, 'Do you have')
	assert.equal(resolveDialogueWordSelection(map.content, map.words[4].start, map)?.phrase, 'to declare')
})

test('only put and away are selected; long intervening text is preserved outside the selection', function () {
	const map = block(
		'She put the beautifully wrapped birthday present that she had bought for her sister the day before away in the closet.',
		{ 1: [1, 17], 17: [1, 17] },
	)
	const selection = resolveDialogueWordSelection(map.content, map.words[1].start, map)!
	assert.equal(selection.phrase, 'put away')
	const segments = splitDialogueText(map.content, map)
	assert.equal(segments.map((item) => item.text).join(''), map.content)
	assert.deepEqual(
		segments
			.filter((item) => item.wordId !== undefined && selection.wordIds.includes(item.wordId))
			.map((item) => item.text),
		['put', 'away'],
	)
})

test('repeated words resolve by their exact offset and server tokens preserve emoji and punctuation', function () {
	const map = block('🙂 You look at her, then look up!', { 5: [5, 6], 6: [5, 6] })
	assert.equal(resolveDialogueWordSelection(map.content, map.words[1].start, map)?.phrase, 'look')
	assert.equal(resolveDialogueWordSelection(map.content, map.words[5].start, map)?.phrase, 'look up')
	assert.equal(
		splitDialogueText(map.content, map)
			.map((item) => item.text)
			.join(''),
		map.content,
	)
	assert.equal(resolveDialogueWordSelection('changed text', 0, map), undefined)
	assert.equal(resolveDialogueWordSelection(map.content, null, map), undefined)
})

test('a click immediately uses the word when its map is absent, mismatched or has no expression', function () {
	const text = 'Do you have anything to declare?'
	const segments = splitDialogueText(text)
	const clicked = segments.find((item) => item.text === 'Do')!
	assert.equal(dictionaryPhraseForClick(text, clicked), 'Do')
	const map = block(text, { 0: [0, 1, 2] })
	assert.equal(dictionaryPhraseForClick(text, clicked, map), 'Do you have')
	assert.equal(dictionaryPhraseForClick('different text', clicked, map), 'Do')
	assert.equal(dictionaryPhraseForClick(text, clicked, { ...map, selections: [] }), 'Do')
})

test('the footer stays invisible for every streamed prefix and does not change dialogue preview', function () {
	const body =
		'npcActions|officer|Officer|officer|neutral\nspeech:\nDo you have anything to declare?\nЕсть что задекларировать?\n\n'
	const footer = 'wordMaps:\n' + JSON.stringify({ content: 'Do you have anything to declare?', selections: [] })
	const preview = parseAiDialoguePreview(body)
	for (let i = 0; i <= footer.length; i++)
		assert.deepEqual(parseAiDialoguePreview(body + footer.slice(0, i)), preview)
})

test('message SSE carries the ready map and replay preserves it', function () {
	class FakeEventSource {
		onmessage?: (event: { data: string }) => void
	}
	globalThis.EventSource = FakeEventSource as unknown as typeof EventSource
	const stream = openAiDialogueStream(3) as unknown as FakeEventSource
	const message = {
		id: 7,
		dialogueId: 3,
		createdAt: '',
		payload: {
			type: 'help' as const,
			content: 'Looks up.',
			translation: '',
			wordMap: { status: 'ready' as const, blocks: { content: block('Looks up.', { 0: [0, 1] }) } },
		},
	}
	stream.onmessage?.({ data: JSON.stringify({ type: 'message', message }) })
	const saved = useAiDialogueStore.getState().messages.get(7)?.payload
	assert.equal(saved?.type, 'help')
	assert.deepEqual(saved?.type === 'help' ? saved.wordMap : undefined, message.payload.wordMap)
	stream.onmessage?.({ data: JSON.stringify({ type: 'message', message }) })
	assert.equal(useAiDialogueStore.getState().messages.size, 1)
})
