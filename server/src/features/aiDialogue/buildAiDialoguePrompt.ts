import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { AiDialogueNpcRosterEntry, AiDialogueSummary } from 'types/aiDialogueSummary'
import { Language, languages } from 'utils/languages'
import { AiDialogueCefrLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'
import { LlmMessage } from 'infrastructure/llmProviderAdapter/LlmProvider.interface'
import { OPENAI_TTS_VOICES } from 'infrastructure/ttsProviderAdapter/TtsProvider.interface'
import { buildAiDialogueLanguageLevelRules } from './buildAiDialogueLanguageLevelRules'
import { deriveAiDialogueState } from './deriveAiDialogueState'
import { serializeAiDialogueEvent } from './serializeAiDialogueEvent'

type ScenarioForPrompt = {
	systemPrompt: string
}

/**
 * Собирает промпт для генерации следующего хода диалога.
 *
 * system-сообщение — контракт (system_prompt сценария + строгий построчный формат
 * ответа + реестр NPC). user-сообщение — контекст (текущая сцена, сжатая история,
 * свежие несжатые события) + просьба сгенерировать следующий ход.
 *
 * Язык диалога (source) и язык перевода/подсказок (target) приходят из диалога,
 * а не из сценария — сценарий языконейтрален.
 */
export function buildAiDialoguePrompt(input: {
	scenario: ScenarioForPrompt
	sourceLanguageCode: Language
	targetLanguageCode: Language | null
	maxCefrLevel?: AiDialogueCefrLevel | null
	summary: null | AiDialogueSummary
	recentEvents: AiDialogueEvent[]
}): LlmMessage[] {
	const { scenario, sourceLanguageCode, targetLanguageCode, maxCefrLevel = null, summary, recentEvents } = input

	const prevState = summary?.[summary.length - 1]?.state ?? null
	const state = deriveAiDialogueState(prevState, recentEvents)

	return [
		{
			role: 'system',
			content: buildSystemMessage(scenario, sourceLanguageCode, targetLanguageCode, state.roster, maxCefrLevel),
		},
		{ role: 'user', content: buildUserMessage(state.scene, state.activeNpcId, summary, recentEvents) },
	]
}

function buildSystemMessage(
	scenario: ScenarioForPrompt,
	sourceLanguageCode: Language,
	targetLanguageCode: Language | null,
	roster: AiDialogueNpcRosterEntry[],
	maxCefrLevel: AiDialogueCefrLevel | null,
): string {
	const rosterLines = roster.length
		? roster.map((n) => `- npcId: "${n.npcId}" — ${n.npcRole}, ${n.npcName}`).join('\n')
		: '(none yet)'

	const rules = [
		`- The dialogue language is: ${languages[sourceLanguageCode].nameEng}. Every content line (speech, action, scene update, help, world event) must be written in ${languages[sourceLanguageCode].nameEng}. Use the target language only for translation lines.`,
	]

	if (targetLanguageCode) {
		rules.push(
			`- For every participant-facing content line, add a translation line immediately after it — an accurate translation into ${languages[targetLanguageCode].nameEng}. Always include the translation line, even if the translation looks obvious; never skip it. Do not translate structural or visual metadata lines (headers, npcId/npcName/npcRole/emotion fields, appearance, voice, participants, visual, or action:/speech: labels).`,
		)
	}

	rules.push(
		'- The human participant belongs to the scene in the role established by the scenario. Do not correct grammar, spelling or vocabulary, offer improved wording, or turn the conversation into a lesson. Respond to the intended meaning; ask for clarification in character only when the meaning is unclear. These instructions take precedence over any correction instructions in the scenario or earlier history.',
		...buildAiDialogueLanguageLevelRules(maxCefrLevel),
		'- Use short, everyday conversational language. Prefer common words and straightforward sentences. Keep most NPC speech replies to 1–3 short sentences, unless the participant asks for a detailed explanation.',
		'- Express personality through reactions, opinions, and choices. Use humor occasionally; do not turn every reply into a joke. Avoid stacking idioms, wordplay, and cultural references in one reply.',
		'- Keep action descriptions brief and concrete, usually one short sentence.',
		'- Within each npcActions block, output speech followed by its associated action, then repeat speech/action pairs as needed. Either part of a pair may be omitted when unnecessary; do not invent speech or actions just to complete a pair.',
		'- In every visible content line (NPC actions and speech, scene descriptions, help and world events), refer to the human participant directly in the second person: "you" and "your" in English, or the natural equivalents in the dialogue language. Never call them "the learner", "the student", "the user" or similar out-of-scene labels. The participant belongs to the scene; do not mention language learning or practice in visible narration. These rules apply even if a scenario or earlier history uses those labels. Internal instructions and hidden visual metadata use "participant" for this person.',
		'- Keep NPC action descriptions in the third person for the NPC, while addressing the human participant as "you": "holds out his hand for your passport and looks at you"; "stamps your passport, writes a short note, and hands it back to you". Preserve this second-person viewpoint in translations too; in Russian use "вы", "вас", "вам", "ваш" and their appropriate grammatical forms instead of "ученик" or "пользователь".',
		'- Write exactly one field per line. Never put an empty line inside a block — an empty line only separates whole blocks. Content and translation are always a single line each.',
		'- After ALL dialogue blocks, output the wordMaps: footer described below. End after its final JSON line, without commentary or markdown.',
		'- npcId must be stable: if an NPC has appeared before, reuse its npcId from the registry below instead of inventing a new one.',
		'- The scenario is a setting, not a rigid script. Introduce whatever NPCs the scene naturally needs. Every new NPC gets a stable npcId. npcName and npcRole may be empty when they are unknown.',
		'- For a new NPC only, add appearance: followed by one English line describing stable visible traits: approximate age, face shape, eyes, nose, hair, build and distinctive clothing. Give each new NPC an individual appearance with distinguishable facial features; do not default every character to the same young dark-haired man. Never repeat or change appearance for a known npcId.',
		`- For a new NPC, BEFORE any action: or speech:, output voice: followed by one JSON line with exactly voice and instructions. Choose voice from ${OPENAI_TTS_VOICES.join(', ')}. Write instructions in English describing a distinctive stable vocal identity: timbre, perceived age, accent appropriate to the dialogue language, pace and habitual intonation. Keep natural speech, without language-teaching directions. Do not change the profile for a known npcId. Voice metadata is not visible narration and has no translation.`,
		'- emotion must be exactly one of: neutral, happy, sad, angry, surprised, confused, worried, embarrassed, thoughtful, skeptical, relieved, encouraging.',
		'- A scene is one continuous encounter between the participant and the main conversation partner. Begin the first encounter with exactly one sceneUpdate, before the first npcActions of that encounter.',
		"- Participant actions explicitly prescribed as the scenario's predefined opening may be narrated in the first sceneUpdate as established setup. This is the only exception to the rules against inventing participant actions. Its visual must show the final moment of that opening sequence with the resulting locations, door states and visibility, not an earlier moment or a montage. After this setup, leave all further participant actions, speech and decisions to the participant.",
		'- During an ongoing encounter with the same NPC, do not emit another sceneUpdate. Questions, gestures, document checks, typing, handing objects over, changes of emotion and other ordinary actions belong in npcActions. Background events belong in worldEvent.',
		'- When either the main NPC or the participant clearly ends the encounter, begin the next encounter with a different NPC in the same response. Output at most one brief closing npcActions block for the previous NPC if needed, then exactly one sceneUpdate establishing the next encounter, then npcActions from the next NPC with a clear question or request the participant can respond to. Never end the turn with only a farewell or wait for the participant to confirm departure.',
		'- Clear closure includes an NPC returning the passport and waving the participant through, saying goodbye with no remaining question or task, or turning to the next customer; it also includes the participant explicitly saying goodbye, stating they are leaving, or a "participant walked away" event. A polite "Thank you" alone during an unfinished encounter is not closure: continue when a question or task remains. If the previous encounter already ended in the history, move on now instead of repeating its farewell.',
		'- The farewell itself belongs in npcActions; sceneUpdate must establish the next encounter, not illustrate the farewell. Do not repeat "Next, please" or other closing exchanges across multiple blocks or turns. Do not use help to ask the participant to leave or confirm departure after clear closure.',
		"- Choose a plausible next NPC in the scenario setting. Describe the surroundings of the next encounter without inventing the participant's speech, actions, choices, purchases or consent. Introduce only one next encounter per response and stop after the next NPC gives the participant a clear opportunity to respond.",
		'- After the previous encounter ends, starting a conversation with another NPC begins a new scene. Returning to a previously met NPC after talking to another NPC also begins a new scene: emit a new sceneUpdate, but reuse the original npcId and appearance of the returning NPC.',
		'- A background character appearing or briefly interjecting does not start a new encounter while the participant is still talking to the main partner. Do not invent changes to the location or surroundings during that encounter.',
		'- Example: passport control is one encounter. Establish it once with sceneUpdate; opening or flipping through the passport, typing on the computer, stamping or returning the passport and saying goodbye are npcActions, not additional sceneUpdate events.',
		'- After every sceneUpdate translation, add participants: with comma-separated npcIds actually visible to the participant at that exact moment (empty when none), then visual: with a single self-contained English line describing that same moment. The participant is always present and is not listed. An NPC who is only heard, remote, off-screen or hidden behind an opaque barrier must not be listed, even if that NPC speaks later in this response.',
		"- In visual: preserve the participant's established location, which side of each barrier they occupy, whether doors are open or closed, and what is actually visible. Describe these constraints explicitly; the image generator receives visual and the listed NPC references, not the scenario, scene text or later actions. Do not reveal hidden identities or appearances, anticipate later events, open doors, move the participant or invent participant actions for a more convenient composition. Physical continuity and visibility take precedence over showing NPCs, faces or mutual eye contact.",
		'- In visual: identify a visible NPC addressing the participant by npcId, especially when several NPCs are visible. Only for a face-to-face conversation with an unobstructed line of sight, describe the participant facing and looking at that NPC, and the speaking NPC facing the participant. Otherwise describe attention toward the actual source of sound, object or activity without inventing eye contact. This is visual staging only: do not invent participant speech, decisions or additional actions.',
		"- Example: a knock at the participant's closed apartment door has an empty participants: line and visual:The participant is inside their apartment facing the closed, opaque front door, viewed from inside the apartment. The visitor is outside behind the door and entirely out of view; no visitor, face, silhouette or view of the hallway is visible. Keep the door closed until an established action opens it. A knock alone can be a worldEvent; do not invent a visible NPC just to fill the scene.",
		'- A "participant walked away" event ends the current encounter even if its task was unfinished. The previous NPC may briefly acknowledge the departure if needed, but must not continue the old request or ask the participant to come back before the transition. Introduce the next NPC in this same response.',
		"- Create a help event only when the participant may be unsure what action to take next. If the NPC has asked a direct question or clearly requested something, that is enough: do not create help and do not repeat the NPC's question or request in it.",
		'- Use help for non-obvious actions that the NPC did not directly request. For example, if someone knocks on a door, suggest that the participant open the door. The hint must explain only the necessary next action and must not duplicate npcActions.',
		"- If it is the participant's turn and you do not need to say or do anything, output nothing (an empty response).",
	)

	return [
		'## Opening encounter and scenario setting',
		scenario.systemPrompt,
		'## Scope of scenario roles',
		'Any instruction above to stay in one character or never leave a particular role applies only while playing that NPC in the opening encounter. You play all NPCs needed as the scene continues. The encounter-transition rules below take precedence over any scenario instruction that would keep the participant with the same NPC after clear closure.',
		'',
		'## Response format',
		'Reply with flat line-based text, without explanations or markdown.',
		'A turn consists of one or more blocks separated by exactly one blank line. A block starts with a header line, followed by one field per line.',
		'',
		'New encounter only (not an action within the current encounter):',
		'sceneUpdate',
		'<new scene description>',
		'<translation>',
		'participants:<comma-separated npcIds, or empty>',
		'visual:<English visual description of the current moment>',
		'',
		'NPC actions/speech (header — 5 fields separated by |):',
		'npcActions|<npcId>|<npcName>|<npcRole>|<emotion>',
		'appearance:',
		'<English appearance; include these two lines only when npcId is new>',
		'voice:',
		'<JSON voice profile; include these two lines only when npcId is new>',
		'action:',
		'<action description>',
		'<translation>',
		'speech:',
		'<speech>',
		'<translation>',
		'',
		'Help:',
		'help',
		'<hint>',
		'<translation>',
		'',
		'World event:',
		'worldEvent',
		'<event description>',
		'<translation>',
		'',
		'Example (a dentist NPC replies to a patient; each speech/action is a label + content + translation triple):',
		'npcActions|dentist_1|Dr. Lee|dentist|encouraging',
		'speech:',
		'Hello! How can I help you today?',
		'Здравствуйте! Чем я могу вам помочь?',
		'action:',
		'gestures toward the chair',
		'жестом показывает на кресло',
		'',
		'Rules:',
		...rules,
		'',
		...wordMapRules(),
		'## NPC registry',
		rosterLines,
	].join('\n')
}

function buildUserMessage(
	scene: string,
	activeNpcId: string | null,
	summary: null | AiDialogueSummary,
	recentEvents: AiDialogueEvent[],
): string {
	const lines: string[] = []

	if (scene) {
		lines.push('Current scene:', scene, '')
	}
	if (activeNpcId) {
		lines.push('Most recent conversation partner npcId:', activeNpcId, '')
	} else if (!scene) {
		lines.push('No encounter has started yet. Begin the first encounter with sceneUpdate.', '')
	}

	const summaryHistory = (summary ?? [])
		.map((block) => block.history)
		.filter(Boolean)
		.join('\n')
	if (summaryHistory) {
		lines.push('What happened earlier (condensed):', summaryHistory, '')
	}

	if (recentEvents.length) {
		lines.push('Recent events (in chronological order):')
		for (const event of recentEvents) {
			lines.push(serializeAiDialogueEvent(event))
		}
		lines.push('')
	}

	lines.push(
		"Generate the next turn in the specified format. If the encounter is ongoing, continue with npcActions; use worldEvent for background events. If either participant clearly ends it now, or it already ended in the history, begin the next encounter in this same response: optional brief closing npcActions, then sceneUpdate, then the next NPC's npcActions with a clear question or request. Do not wait for a separate departure action or another farewell.",
	)

	return lines.join('\n')
}

function wordMapRules(): string[] {
	return [
		'## Dictionary word maps (generate LAST, in this same response)',
		'After all dialogue text and translations, add one blank line, then wordMaps: on its own line.',
		'For EACH source-language content line in sceneUpdate, help, worldEvent and every NPC action/speech, output one compact JSON object on its own line: {"content":"exact source content line","selections":[{"clicked":{"text":"Do","occurrence":0},"words":[{"text":"Do","occurrence":0},{"text":"you","occurrence":0},{"text":"have","occurrence":0}]}]}. Escape JSON strings correctly. No markdown fences.',
		'Analyze every sentence in each content line. A click selects the minimal original words needed for a dictionary lookup, never a translation, explanation or rewritten lemma. Include ONLY multiword expressions; independent words need no entry. Empty selections are valid.',
		'Each text reference identifies a whole original word, with exact spelling/case; occurrence is its zero-based occurrence among identical words in that content line. Contractions such as "don’t" are one word. For languages without spaces, use ordinary word boundaries. Never calculate character offsets or token numbers.',
		'Choose independently for each clicked word. Overlaps are allowed, but sharing an expression does not force identical click behavior. Include the clicked word in words. List expression words in their source order; keep them within one sentence.',
		'For "Do you have anything to declare?": Do and have each select Do, you, have; you and anything have no entry; to and declare each select to, declare.',
		'For "She put the beautifully wrapped birthday present that she had bought for her sister the day before away in the closet.": put and away each select ONLY put, away. Omit every intervening word. In "looks up at you", looks and up select looks, up. In "Ich rufe dich an", rufe and an select rufe, an; dich has no entry. Apply these principles to the participant’s actual language.',
		'Do not map translation lines, English visual metadata, NPC headers or participant-authored history. The content field must exactly match its source content line.',
		'',
	]
}
