import { Language, languages } from 'utils/languages'
import { buildSummaryPrompt } from './buildSummaryPrompt'

it.each(Object.keys(languages) as Language[])(
	'summarizes in the %s dialogue language using English instructions',
	(sourceLanguageCode) => {
		const prompt = buildSummaryPrompt({ sourceLanguageCode, mode: 'exam', summary: null, eventsToSummarize: [] })
		expect(prompt[0].content).toContain(
			`Write the summary in ${languages[sourceLanguageCode].nameEng}, the dialogue language`,
		)
		expect(prompt[0].content).toContain('without corrections')
		expect(prompt[0].content).not.toMatch(/[А-Яа-яЁё]/)
		expect(prompt[1].content).toBe('New events to summarize:\n\nSummary:')
	},
)
