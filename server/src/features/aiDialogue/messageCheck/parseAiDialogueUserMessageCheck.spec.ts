import { parseAiDialogueUserMessageCheck } from './parseAiDialogueUserMessageCheck'

const good = 'speech\nok\naction\nok\nend'
const critical = ['critical', 'Неверный предлог', 'I am **on** home.', 'Используйте **at home**.']
const suggestion = ['suggestion', 'Запятая после **Hey**.', 'Hey, girls!']

describe('draft check protocol', () => {
	it('accepts an explicit all-correct response, including CRLF', () => {
		expect(parseAiDialogueUserMessageCheck(` ${good.replace(/\n/g, '\r\n')}\n`)).toEqual({
			speech: { critical: [], suggestions: [] },
			action: { critical: [], suggestions: [] },
		})
	})

	it('separates multiple issues by field and preserves Markdown', () => {
		const result = parseAiDialogueUserMessageCheck(
			['speech', ...critical, ...suggestion, ...critical, 'action', ...suggestion, 'end'].join('\n'),
		)

		expect(result?.speech.critical).toHaveLength(2)
		expect(result?.speech.critical[0]).toEqual({
			title: critical[1],
			sentenceMarkdown: critical[2],
			explanationMarkdown: critical[3],
		})
		expect(result?.speech.suggestions).toEqual([{ explanationMarkdown: suggestion[1], example: suggestion[2] }])
		expect(result?.action.suggestions).toHaveLength(1)
	})

	it('can quote protocol keywords as fixed-position record values', () => {
		expect(
			parseAiDialogueUserMessageCheck('speech\nsuggestion\nUse this word.\naction\naction\nok\nend'),
		).toMatchObject({ speech: { suggestions: [{ example: 'action' }] } })
	})

	it.each([
		'',
		'speech\nok',
		'speech\nok\naction\nok',
		'speech\naction\nok\nend',
		'action\nok\nspeech\nok\nend',
		`${good}\nextra`,
		`\`\`\`\n${good}\n\`\`\``,
		'speech\nok\nsuggestion\nA\nB\naction\nok\nend',
		'speech\nunknown\naction\nok\nend',
		'speech\ncritical\nTitle\nSentence\naction\nok\nend',
		'speech\ncritical\nTitle\nSentence\n\naction\nok\nend',
		'speech\nok\naction\nend',
	])('rejects malformed, ambiguous or incomplete output: %j', (text) => {
		expect(parseAiDialogueUserMessageCheck(text)).toBeNull()
	})

	it('rejects truncated output at every line boundary', () => {
		const lines = ['speech', ...critical, ...suggestion, 'action', ...critical, 'end']
		for (let count = 0; count < lines.length; count++) {
			expect(parseAiDialogueUserMessageCheck(lines.slice(0, count).join('\n'))).toBeNull()
		}
	})

	it('limits result size and number of issues rather than dropping errors', () => {
		expect(parseAiDialogueUserMessageCheck('x'.repeat(64_001))).toBeNull()
		expect(
			parseAiDialogueUserMessageCheck(
				['speech', ...Array(13).fill(suggestion).flat(), 'action', 'ok', 'end'].join('\n'),
			),
		).toBeNull()
	})
})
