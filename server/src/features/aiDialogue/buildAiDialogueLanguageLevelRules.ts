import { CefrSimplificationLevel } from 'utils/proficiencyLevel'

const levelGuidance: Record<CefrSimplificationLevel, string> = {
	A1: 'Use very common, concrete words and basic familiar phrases. Use very short, simple sentences, usually with one idea per sentence. Prefer basic grammatical patterns appropriate to the dialogue language. Avoid idioms, figurative language and complex clauses.',
	A2: 'Use frequent vocabulary for familiar everyday situations. Use short sentences and simple grammatical patterns. Connect ideas with basic connectors such as equivalents of and, but and because. Avoid uncommon expressions, idioms and complex subordinate clauses.',
	B1: 'Use common vocabulary and straightforward connected language for everyday situations. Simple explanations, reasons and familiar subordinate clauses are appropriate. Avoid rare vocabulary, dense syntax, opaque idioms and elaborate figurative language.',
	B2: 'Use varied but broadly familiar vocabulary and clear, moderately complex sentences. Natural discussion and explanations are appropriate. Avoid highly specialized wording when a common alternative exists, rare idioms, dense literary language and unnecessarily intricate syntax.',
}

/** Инструкции только для нового видимого текста; технический контракт и сохранённая история не меняются. */
export function buildAiDialogueLanguageLevelRules(maxCefrLevel: CefrSimplificationLevel | null): string[] {
	if (maxCefrLevel === null) {
		return [
			'- There is no CEFR complexity limit for this turn. Do not retain any previous CEFR adaptation setting from the scenario or earlier history. NPCs speak naturally for their role and situation.',
		]
	}

	return [
		`- The current maximum language complexity is CEFR ${maxCefrLevel}. Treat this as a ceiling, not a target: simpler language is welcome. Apply it to ALL new participant-facing content in the dialogue language: NPC speech, action descriptions, sceneUpdate, help and worldEvent.`,
		`- CEFR ${maxCefrLevel} guidance: ${levelGuidance[maxCefrLevel]}`,
		'- This current complexity setting takes precedence over conflicting language-level or style instructions in the scenario and earlier history, including condensed history. Earlier complex wording is context, not a style to imitate. Apply the setting immediately to the new text without rewriting earlier events.',
		'- Simplify wording and sentence structure while preserving the situation, meaning and each NPC’s personality and role. Do not make the scenario childish or turn it into a language lesson. Use an essential scenario-specific term only when needed, with a brief explanation in simple dialogue-language words.',
		'- Keep translations accurate and natural in the target language; do not impose the source-language CEFR limit on translations. Do not adapt hidden English appearance, voice or visual metadata, identifiers, structural labels or dictionary word-map data. Preserve established NPC names and identifiers; use simple role descriptions when introducing NPCs.',
	]
}
