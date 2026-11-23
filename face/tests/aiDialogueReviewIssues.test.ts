import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getReviewIssues } from '@/widgets/aiDialogue/aiDialogueMessages/ui/AiDialogueMessageReview/getReviewIssues'

const issue = (sentenceMarkdown: string) => ({
	title: 'Grammar',
	sentenceMarkdown,
	explanationMarkdown: 'Use a preposition.',
})

test('highlights the specified occurrence of a repeated sentence and preserves source line breaks', () => {
	const original = 'I stay\none week. I stay\none week.'
	const [result] = getReviewIssues(
		original,
		'I stay\none week. I stay for one week.',
		[
			{
				...issue('I **stay one week**.'),
				correction: { kind: 'error', occurrence: 2, replacement: 'stay for one week' },
			},
		],
		'en',
	)
	assert.equal(result.replacement, 'stay for one week')
	assert.deepEqual(result.highlight, { sentenceStart: 17, sentenceEnd: 33, fragmentStart: 19, fragmentEnd: 32 })
	assert.equal(original.slice(result.highlight!.fragmentStart, result.highlight!.fragmentEnd), 'stay\none week')
})

test('recovers a replacement from a saved review when the surrounding text matches', () => {
	const [result] = getReviewIssues(
		'I come for holiday. I stay one week in New York.',
		'I’m here on holiday. I’m staying for one week in New York.',
		[issue('**I stay one week** in New York.')],
		'en',
	)
	assert.equal(result.fragment, 'I stay one week')
	assert.equal(result.replacement, 'I’m staying for one week')
	assert.equal(result.explanation, 'Use a preposition.')
})

test('keeps broader context for a short translation and omits the redundant explanation', () => {
	const original = 'Hi! There is a очередь.'
	const [result] = getReviewIssues(
		original,
		'Hi! There is a line.',
		[{ ...issue('**очередь**'), correction: { kind: 'language', occurrence: 1, replacement: 'line' } }],
		'en',
	)
	assert.equal(result.explanation, null)
	assert.equal(result.replacement, 'line')
	assert.equal(original.slice(result.highlight!.sentenceStart, result.highlight!.sentenceEnd), 'There is a очередь.')
})

test('matches a complete quoted sentence ahead of the same wording inside another sentence', () => {
	const original = 'She says I stay one week. I stay one week.'
	const [result] = getReviewIssues(
		original,
		'She says I stay one week. I stay for one week.',
		[
			{
				...issue('I **stay one week**.'),
				correction: { kind: 'error', occurrence: 1, replacement: 'stay for one week' },
			},
		],
		'en',
	)
	assert.equal(result.highlight?.sentenceStart, original.lastIndexOf('I stay one week.'))
})

test('does not pick an arbitrary highlight for ambiguous saved excerpts', () => {
	const [result] = getReviewIssues('A error. A error.', 'An error. A error.', [issue('**A** error.')], 'en')
	assert.equal(result.highlight, null)
	assert.equal(result.replacement, null)
	assert.equal(result.explanation, 'Use a preposition.')
})
