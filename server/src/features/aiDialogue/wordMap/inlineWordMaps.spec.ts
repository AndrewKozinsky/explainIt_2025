import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { buildAiDialoguePrompt } from '../buildAiDialoguePrompt'
import { parseAiDialogueEvents } from '../parseAiDialogueEvents'
import { attachInlineWordMaps } from './inlineWordMaps'

function footer(content: string, groups: unknown[]) {
	return JSON.stringify({ content, groups })
}
function wordMap(event: AiDialogueEvent) {
	if (event.type === 'userActions' || event.type === 'userAvoidsNPC') throw new Error('Expected a server text event')
	if (!event.wordMap) throw new Error('Expected a word map')
	return event.wordMap
}
function parse(content: string, groups: unknown[]) {
	const turn = parseAiDialogueEvents(`help\n${content}\nПеревод\n\nwordMaps:\n${footer(content, groups)}`, 'en')
	return wordMap(turn.events[0]).blocks.content
}

describe('inline dictionary word maps', () => {
	it('requests word groups at the end of the primary model response', () => {
		const prompt = buildAiDialoguePrompt({
			scenario: { systemPrompt: 'Customs' },
			sourceLanguageCode: 'en',
			targetLanguageCode: 'ru',
			participantGender: 'MALE',
			summary: null,
			recentEvents: [],
		})

		expect(prompt[0].content).toContain('generate LAST, in this same response')
		expect(prompt[0].content).toContain('"groups":[["Do","you","have"],["to","declare"]]')
	})
	it('gives every word of a group the same phrase; words outside groups have no entry', () => {
		const map = parse('Do you have anything to declare?', [
			['Do', 'you', 'have'],
			['to', 'declare'],
		])
		expect(map.selections).toEqual([
			{ wordId: 0, wordIds: [0, 1, 2], phrase: 'Do you have' },
			{ wordId: 1, wordIds: [0, 1, 2], phrase: 'Do you have' },
			{ wordId: 2, wordIds: [0, 1, 2], phrase: 'Do you have' },
			{ wordId: 4, wordIds: [4, 5], phrase: 'to declare' },
			{ wordId: 5, wordIds: [4, 5], phrase: 'to declare' },
		])
	})
	it('joins discontinuous particles without intervening words', () => {
		const text =
			'She put the beautifully wrapped birthday present that she had bought for her sister the day before away in the closet.'
		const map = parse(text, [['put', 'away']])
		expect(map.selections).toEqual([
			{ wordId: 1, wordIds: [1, 17], phrase: 'put away' },
			{ wordId: 17, wordIds: [1, 17], phrase: 'put away' },
		])
	})
	it('identifies repeated occurrences and preserves UTF-16 offsets', () => {
		const map = parse('🙂 You look at her, then look up!', [[['look', 1], 'up']])
		expect(map.selections).toEqual([
			{ wordId: 5, wordIds: [5, 6], phrase: 'look up' },
			{ wordId: 6, wordIds: [5, 6], phrase: 'look up' },
		])
		expect(map.words[0].start).toBe(3)
	})
	it('treats a word without an occurrence number as its first occurrence', () => {
		const map = parse('Either wipe it or or buy it.', [['Either', 'or']])
		expect(map.selections.map((selection) => selection.wordIds)).toEqual([
			[0, 3],
			[0, 3],
		])
	})
	it('accepts one entry per sentence and counts occurrences inside that sentence', () => {
		const content = 'Two pans is plenty — I look at it. Then I look at it again and shoot it down. Fair?'
		const turn = parseAiDialogueEvents(
			[
				'help',
				content,
				'Перевод',
				'',
				'wordMaps:',
				footer('Two pans is plenty — I look at it.', [['look', 'at']]),
				footer('Then I look at it again and shoot it down.', [
					['look', 'at'],
					['shoot', 'down'],
				]),
				footer('Fair?', []),
			].join('\n'),
			'en',
		)
		const phrases = wordMap(turn.events[0]).blocks.content.selections.map((selection) => [
			selection.wordIds,
			selection.phrase,
		])

		expect(phrases).toEqual([
			[[5, 6], 'look at'],
			[[5, 6], 'look at'],
			[[10, 11], 'look at'],
			[[10, 11], 'look at'],
			[[15, 17], 'shoot down'],
			[[15, 17], 'shoot down'],
		])
	})
	it('applies a repeated sentence to each place and ignores text that cuts a word', () => {
		const repeated = parse('Come in. Sit down. Come in.', [])
		expect(repeated.selections).toEqual([])

		const turn = parseAiDialogueEvents(
			`help\nCome in. Sit down. Come in.\nПеревод\n\nwordMaps:\n${footer('Come in.', [['Come', 'in']])}\n${footer('it down', [['it', 'down']])}`,
			'en',
		)
		expect(wordMap(turn.events[0]).blocks.content.selections.map((selection) => selection.wordIds)).toEqual([
			[0, 1],
			[0, 1],
			[4, 5],
			[4, 5],
		])
	})
	it('handles German separable verbs and contractions', () => {
		const event: AiDialogueEvent = { type: 'help', content: 'Ich rufe dich an.', translation: '' }
		const result = attachInlineWordMaps([event], footer(event.content, [['rufe', 'an']]), 'de')
		expect(wordMap(result[0]).blocks.content.selections[0].phrase).toBe('rufe an')
		expect(parse('Don’t give up.', [['give', 'up']]).words[0].text).toBe('Don’t')
	})
	it('maps all server text blocks but leaves user messages untouched', () => {
		const events: AiDialogueEvent[] = [
			{ type: 'sceneUpdate', content: 'Look up.', translation: '' },
			{ type: 'help', content: 'Look up.', translation: '' },
			{ type: 'worldEvent', content: 'Look up.', translation: '' },
			{
				type: 'npcActions',
				npcId: 'a',
				npcName: '',
				npcRole: '',
				emotion: 'neutral',
				actions: [
					{ type: 'action', content: 'Look up.', translation: '' },
					{ type: 'speech', content: 'Look up.', translation: '' },
				],
			},
			{ type: 'userActions', actions: [{ type: 'speech', content: 'Look up.' }] },
			{ type: 'userAvoidsNPC' },
		]
		const result = attachInlineWordMaps(events, footer('Look up.', [['Look', 'up']]), 'en')
		for (const event of result.slice(0, 4)) expect(wordMap(event).status).toBe('ready')
		expect(wordMap(result[3]).blocks['action:1'].selections[0].phrase).toBe('Look up')
		expect(result[4]).toBe(events[4])
		expect(result[5]).toBe(events[5])
	})
	it('keeps valid groups and messages when neighboring metadata is malformed', () => {
		const content = 'Look up and sit down.'
		const groups = [
			['Look', 'up'],
			['sit', 'missing'],
			['down', 'sit'],
			['up', 'and'],
			['sit'],
			[['sit', -1], 'down'],
			[['sit', 1], 'down'],
			'sit down',
		]
		const parsed = parseAiDialogueEvents(
			`help\n${content}\nПеревод\nwordMaps:\n{broken\n${footer(content, groups)}`,
			'en',
		)
		expect(wordMap(parsed.events[0]).blocks.content.selections).toEqual([
			{ wordId: 0, wordIds: [0, 1], phrase: 'Look up' },
			{ wordId: 1, wordIds: [0, 1], phrase: 'Look up' },
		])
		expect(parsed.events[0]).toMatchObject({ content, translation: 'Перевод' })
	})
	it('provides fallback maps for missing metadata, multiple sentences and untranslated text', () => {
		const parsed = parseAiDialogueEvents('help\nHello. How are you?\nwordMaps:\n{broken', 'en')
		expect(parsed.events[0]).toMatchObject({ translation: '', wordMap: { status: 'ready' } })
		expect(wordMap(parsed.events[0]).blocks.content.selections).toEqual([])
		expect(wordMap(parseAiDialogueEvents('help\nHello\nПривет', 'en').events[0]).status).toBe('ready')
	})
})
