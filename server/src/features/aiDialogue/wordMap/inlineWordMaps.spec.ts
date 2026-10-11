import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { buildAiDialoguePrompt } from '../buildAiDialoguePrompt'
import { parseAiDialogueEvents } from '../parseAiDialogueEvents'
import { attachInlineWordMaps } from './inlineWordMaps'

function ref(text: string, occurrence = 0) {
	return { text, occurrence }
}
function selection(clicked: string, words: string[]) {
	return { clicked: ref(clicked), words: words.map((text) => ref(text)) }
}
function footer(content: string, selections: unknown[]) {
	return JSON.stringify({ content, selections })
}
function wordMap(event: AiDialogueEvent) {
	if (event.type === 'userActions' || event.type === 'userAvoidsNPC') throw new Error('Expected a server text event')
	if (!event.wordMap) throw new Error('Expected a word map')
	return event.wordMap
}
function parse(content: string, selections: unknown[]) {
	const turn = parseAiDialogueEvents(`help\n${content}\nПеревод\n\nwordMaps:\n${footer(content, selections)}`, 'en')
	return wordMap(turn.events[0]).blocks.content
}

describe('inline dictionary word maps', () => {
	it('requests sparse maps at the end of the primary model response', () => {
		const prompt = buildAiDialoguePrompt({
			scenario: { systemPrompt: 'Customs' },
			sourceLanguageCode: 'en',
			targetLanguageCode: 'ru',
			summary: null,
			recentEvents: [],
		})
		expect(prompt[0].content).toContain('generate LAST, in this same response')
		expect(prompt[0].content).toContain('Include ONLY multiword expressions')
	})
	it('resolves overlapping constructions independently; standalone words have no entry', () => {
		const map = parse('Do you have anything to declare?', [
			selection('Do', ['Do', 'you', 'have']),
			selection('have', ['Do', 'you', 'have']),
			selection('to', ['to', 'declare']),
			selection('declare', ['to', 'declare']),
		])
		expect(map.selections.map((item) => item.phrase)).toEqual([
			'Do you have',
			'Do you have',
			'to declare',
			'to declare',
		])
		expect(map.selections.some((item) => item.wordId === 1)).toBe(false)
	})
	it('joins discontinuous particles without intervening words', () => {
		const text =
			'She put the beautifully wrapped birthday present that she had bought for her sister the day before away in the closet.'
		const map = parse(text, [selection('put', ['put', 'away']), selection('away', ['put', 'away'])])
		expect(map.selections).toEqual([
			{ wordId: 1, wordIds: [1, 17], phrase: 'put away' },
			{ wordId: 17, wordIds: [1, 17], phrase: 'put away' },
		])
	})
	it('identifies repeated occurrences and preserves UTF-16 offsets', () => {
		const map = parse('🙂 You look at her, then look up!', [
			{ clicked: ref('look', 1), words: [ref('look', 1), ref('up')] },
		])
		expect(map.selections).toEqual([{ wordId: 5, wordIds: [5, 6], phrase: 'look up' }])
		expect(map.words[0].start).toBe(3)
	})
	it('handles German separable verbs and contractions', () => {
		const event: AiDialogueEvent = { type: 'help', content: 'Ich rufe dich an.', translation: '' }
		const result = attachInlineWordMaps([event], footer(event.content, [selection('rufe', ['rufe', 'an'])]), 'de')
		expect(wordMap(result[0]).blocks.content.selections[0].phrase).toBe('rufe an')
		expect(parse('Don’t give up.', [selection('give', ['give', 'up'])]).words[0].text).toBe('Don’t')
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
		const result = attachInlineWordMaps(events, footer('Look up.', [selection('Look', ['Look', 'up'])]), 'en')
		for (const event of result.slice(0, 4)) expect(wordMap(event).status).toBe('ready')
		expect(wordMap(result[3]).blocks['action:1'].selections[0].phrase).toBe('Look up')
		expect(result[4]).toBe(events[4])
		expect(result[5]).toBe(events[5])
	})
	it('keeps valid selections and messages when neighboring metadata is malformed', () => {
		const content = 'Look up and sit down.'
		const selections = [
			selection('Look', ['Look', 'up']),
			selection('sit', ['sit', 'missing']),
			selection('down', ['down', 'sit']),
			selection('and', ['sit', 'down']),
			selection('Look', ['Look', 'up']),
			{ clicked: ref('up', -1), words: [ref('Look'), ref('up')] },
		]
		const parsed = parseAiDialogueEvents(
			`help\n${content}\nПеревод\nwordMaps:\n{broken\n${footer(content, selections)}`,
			'en',
		)
		expect(wordMap(parsed.events[0]).blocks.content.selections).toHaveLength(1)
		expect(parsed.events[0]).toMatchObject({ content, translation: 'Перевод' })
	})
	it('provides fallback maps for missing metadata, multiple sentences and untranslated text', () => {
		const parsed = parseAiDialogueEvents('help\nHello. How are you?\nwordMaps:\n{broken', 'en')
		expect(parsed.events[0]).toMatchObject({ translation: '', wordMap: { status: 'ready' } })
		expect(wordMap(parsed.events[0]).blocks.content.selections).toEqual([])
		expect(wordMap(parseAiDialogueEvents('help\nHello\nПривет', 'en').events[0]).status).toBe('ready')
	})
})
