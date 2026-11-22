import { getExamMedalUrl } from './aiDialogueMedal'
import { AI_DIALOGUE_CEFR_LEVELS } from '../aiDialogueLanguageLevel'

const medals = JSON.stringify(
	Object.fromEntries(
		AI_DIALOGUE_CEFR_LEVELS.map((level) => [
			level,
			`ai-dialogue-scenario-medals/localdev/passport-control/${level}.webp`,
		]),
	),
)

it.each(AI_DIALOGUE_CEFR_LEVELS)('returns a public %s URL without signing', (level) => {
	expect(getExamMedalUrl(medals, level)).toBe(
		`https://files.immersia.site/ai-dialogue-scenario-medals/localdev/passport-control/${level}.webp`,
	)
})

it('uses the original scenario’s own medal keys', () => {
	expect(getExamMedalUrl(JSON.stringify({ B1: 'ai-dialogue-scenario-medals/localdev/cinema/B1.webp' }), 'B1')).toBe(
		'https://files.immersia.site/ai-dialogue-scenario-medals/localdev/cinema/B1.webp',
	)
})

it('returns no medal for A0 or absent configuration', () => {
	expect(getExamMedalUrl(medals, 'A0')).toBeNull()
	expect(getExamMedalUrl(null, 'C1')).toBeNull()
	expect(getExamMedalUrl('{}', 'C1')).toBeNull()
})
