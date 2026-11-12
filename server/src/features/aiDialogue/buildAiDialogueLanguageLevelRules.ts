import { AI_DIALOGUE_CEFR_LEVELS, AiDialogueCefrLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'

type LevelProfile = {
	/** Чем уровень отличается от соседних: словарь, грамматика, длина предложений и реплик. */
	guidance: string
	/** Одна и та же реплика соседа о сломанном лифте на этом уровне — показывает модели величину шага между уровнями. */
	speechExample: string
	/** То же для описания действия NPC. */
	actionExample: string
}

const levelProfiles: Record<AiDialogueCefrLevel, LevelProfile> = {
	A1: {
		guidance:
			'Deliberately, noticeably simple language, as if speaking to someone who knows only a few hundred words. Vocabulary: only the most basic everyday words (people, food, places, numbers, time, common objects, basic verbs and adjectives); if a thing has no basic word, describe it with basic words. Grammar: present tense almost everywhere, the simplest forms of the dialogue language, no subordinate clauses, no passive voice, no conditionals, no idioms, no phrasal or figurative expressions. Sentences: 3–7 words, one idea per sentence; repeat a noun instead of building a longer sentence. NPC speech: 1–2 such sentences plus, when needed, one short direct question. Action and scene descriptions are equally simple: one plain physical action per sentence.',
		speechExample: 'The lift does not work today. Please use the stairs. Sorry!',
		actionExample: 'points at the stairs',
	},
	A2: {
		guidance:
			'Simple everyday language, clearly richer than A1 but still easy. Vocabulary: frequent words for daily life, travel, shopping, work and feelings; no idioms and no rare words. Grammar: present, simple past and simple future; basic modal verbs; sentences joined with equivalents of and, but, because, so, when. No conditionals beyond the simplest real one, no passive voice, no long chains of clauses. Sentences: up to about 10 words. NPC speech: 1–3 short sentences. Action and scene descriptions use plain verbs and concrete nouns, without descriptive detail that needs rare words.',
		speechExample: 'The lift is broken again, so you have to use the stairs. A man is coming tomorrow to fix it.',
		actionExample: 'shows you the door to the stairs and shakes his head',
	},
	B1: {
		guidance:
			'Ordinary connected speech of an everyday conversation, clearly richer than A2. Vocabulary: the common core of the language, including frequent phrasal verbs and fixed everyday expressions; no rare, literary or specialized words and no opaque idioms. Grammar: all common tenses, conditionals, relative and other familiar subordinate clauses, reported speech; natural contractions. Sentences: up to about 15 words, ideas linked into short explanations and reasons. NPC speech: 1–3 sentences. Action and scene descriptions may add one concrete detail, in common words.',
		speechExample:
			"I'm afraid the lift has broken down again. Someone is coming to repair it tomorrow, so you'll have to take the stairs until then.",
		actionExample: 'holds the door to the stairs open for you and sighs',
	},
	B2: {
		guidance:
			'Fluent, natural-sounding speech with real variety, clearly richer than B1 and close to how people actually talk. Vocabulary: wide and precise, with common idioms, colloquial expressions, phrasal verbs and shades of meaning; avoid only rare, archaic, heavily regional or narrowly specialized wording. Grammar: the full range, including complex sentences, hypothetical and passive constructions, emphasis and ellipsis typical of speech. Sentences may be long when that sounds natural. NPC speech: 1–4 sentences. Action and scene descriptions are vivid and specific, as in good fiction, but not ornate.',
		speechExample:
			"The lift's out of order again, would you believe it — third time this month. They've promised to send someone round tomorrow, but I wouldn't count on it.",
		actionExample: 'props the stairwell door open with his foot and rolls his eyes',
	},
}

const unrestrictedSpeechExample =
	"Lift's packed in again — third time this month, can you believe it? They swear blind someone's coming tomorrow, but I'll believe it when I see it. Stairs it is, I'm afraid."
const unrestrictedActionExample =
	'wedges the stairwell door open with his foot and jerks his head towards the stairs with a weary look'

/** Примеры написаны по-английски и на постороннюю тему: без этой оговорки модель переносит в сцену их слова и язык. */
const exampleUsageNote =
	'These examples are in English and about an unrelated situation only to show the degree of complexity. Never reuse their wording, phrases or content, and write every content line, including action descriptions, in the dialogue language.'

function buildLevelLadder(currentLevel: AiDialogueCefrLevel): string {
	const steps = AI_DIALOGUE_CEFR_LEVELS.map((level) => {
		const profile = levelProfiles[level]
		const marker = level === currentLevel ? ' ← write at this level' : ''
		return `${level}${marker}: speech "${profile.speechExample}" / action "${profile.actionExample}"`
	})

	return `- Calibration ladder — the same line of a neighbour about a broken lift at each level: ${steps.join(' | ')}. ${exampleUsageNote}`
}

/**
 * Правила сложности языка для нового видимого текста; технический контракт и сохранённая история не меняются.
 * Уровень — целевой, а не только верхняя граница: соседние уровни должны заметно отличаться друг от друга.
 * Без ограничения (null) речь не адаптируется вовсе: общие требования к простоте в промпте отсутствуют.
 */
export function buildAiDialogueLanguageLevelRules(maxCefrLevel: AiDialogueCefrLevel | null): string[] {
	if (maxCefrLevel === null) {
		return [
			'- There is no CEFR complexity limit for this turn. Do not retain any previous CEFR adaptation setting from the scenario or earlier history, including condensed history; earlier simplified wording is context, not a style to imitate.',
			'- Write authentic, unadapted language exactly as native speakers use it in this situation. NPCs speak the way such a person really would for their age, background, profession and mood: contractions, colloquial and idiomatic expressions, phrasal verbs, fillers, ellipsis, interrupted or incomplete sentences, slang or professional jargon where it fits. Never simplify vocabulary or grammar, slow down or explain words for the participant’s sake.',
			'- Scene descriptions, action descriptions and world events use the natural, specific prose of contemporary fiction, with precise verbs and concrete detail. Help hints use plain natural language.',
			'- Keep the rhythm of a real conversation: most NPC replies are 1–4 sentences, longer only when the situation or the participant calls for it.',
			`- Illustration of the expected register, a neighbour about a broken lift: speech "${unrestrictedSpeechExample}" / action "${unrestrictedActionExample}". ${exampleUsageNote}`,
		]
	}

	return [
		`- The language level of this dialogue is CEFR ${maxCefrLevel}. Write AT this level: never above it, and not noticeably below it either — each level must read clearly different from its neighbours. Apply it to ALL new participant-facing content in the dialogue language: NPC speech, action descriptions, sceneUpdate, help and worldEvent.`,
		`- CEFR ${maxCefrLevel} profile: ${levelProfiles[maxCefrLevel].guidance}`,
		buildLevelLadder(maxCefrLevel),
		'- Before writing each content line, check it against the profile: every word, every grammatical form and the sentence length. If a word or construction belongs to a higher level, replace it with one from this level or split the sentence. Action descriptions and scene descriptions are checked as strictly as speech; do not let them drift into richer narrative prose.',
		'- This current level setting takes precedence over conflicting language-level or style instructions in the scenario and earlier history, including condensed history. Earlier wording at another level is context, not a style to imitate. Apply the setting immediately to the new text without rewriting earlier events.',
		'- Change only the language, not the story: preserve the situation, meaning and each NPC’s personality and role. The content stays adult and realistic; do not make the scenario childish or turn it into a language lesson. Use an essential scenario-specific term only when needed, with a brief explanation in simple dialogue-language words.',
		'- Keep translations accurate and natural in the target language; do not impose the source-language CEFR limit on translations. Do not adapt hidden English appearance, voice or visual metadata, identifiers, structural labels or dictionary word-map data. Preserve established NPC names and identifiers; use simple role descriptions when introducing NPCs.',
	]
}
