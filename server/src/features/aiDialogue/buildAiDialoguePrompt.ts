import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { AiDialogueNpcRosterEntry, AiDialogueSummary } from 'types/aiDialogueSummary'
import { Language, languages } from 'utils/languages'
import { LlmMessage } from 'infrastructure/llmProviderAdapter/LlmProvider.interface'
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
	summary: null | AiDialogueSummary
	recentEvents: AiDialogueEvent[]
}): LlmMessage[] {
	const { scenario, sourceLanguageCode, targetLanguageCode, summary, recentEvents } = input

	const prevState = summary?.[summary.length - 1]?.state ?? null
	const state = deriveAiDialogueState(prevState, recentEvents)

	return [
		{
			role: 'system',
			content: buildSystemMessage(scenario, sourceLanguageCode, targetLanguageCode, state.roster),
		},
		{ role: 'user', content: buildUserMessage(state.scene, summary, recentEvents) },
	]
}

function buildSystemMessage(
	scenario: ScenarioForPrompt,
	sourceLanguageCode: Language,
	targetLanguageCode: Language | null,
	roster: AiDialogueNpcRosterEntry[],
): string {
	const rosterLines = roster.length
		? roster.map((n) => `- npcId: "${n.npcId}" — ${n.npcRole}, ${n.npcName}`).join('\n')
		: '(none yet)'

	const rules = [
		`- The learner is studying: ${languages[sourceLanguageCode].nameEng}. Every content line (speech, action, scene update, help, world event) must be written in ${languages[sourceLanguageCode].nameEng}. Use the target language only for translation lines.`,
	]
	if (targetLanguageCode) {
		rules.push(
			`- For every content line, add a translation line immediately after it — an accurate translation into ${languages[targetLanguageCode].nameEng}. Always include the translation line, even if the translation looks obvious; never skip it. Do not translate structural lines (headers, npcId/npcName/npcRole/emotion fields, or action:/speech: labels).`,
		)
	}

	rules.push(
		'- Write exactly one field per line. Never put an empty line inside a block — an empty line only separates whole blocks. Content and translation are always a single line each.',
		'- End the response cleanly: after the last translation line, output nothing else (no commentary, no markdown, no trailing blank text).',
		'- npcId must be stable: if an NPC has appeared before, reuse its npcId from the registry below instead of inventing a new one.',
		"- Create a help event only when the learner may be unsure what action to take next. If the NPC has asked a direct question or clearly requested something, that is enough: do not create help and do not repeat the NPC's question or request in it.",
		'- Use help for non-obvious actions that the NPC did not directly request. For example, if someone knocks on a door, suggest that the learner open the door. The hint must explain only the necessary next action and must not duplicate npcActions.',
		"- If it is the learner's turn and you do not need to say or do anything, output nothing (an empty response).",
	)

	return [
		scenario.systemPrompt,
		'',
		'## Response format',
		'Reply with flat line-based text, without explanations or markdown.',
		'A turn consists of one or more blocks separated by exactly one blank line. A block starts with a header line, followed by one field per line.',
		'',
		'Scene update:',
		'sceneUpdate',
		'<new scene description>',
		'<translation>',
		'',
		'NPC actions/speech (header — 5 fields separated by |):',
		'npcActions|<npcId>|<npcName>|<npcRole>|<emotion>',
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
		'npcActions|dentist_1|Dr. Lee|dentist|friendly',
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
		'## NPC registry',
		rosterLines,
	].join('\n')
}

function buildUserMessage(scene: string, summary: null | AiDialogueSummary, recentEvents: AiDialogueEvent[]): string {
	const lines: string[] = []

	if (scene) {
		lines.push('Current scene:', scene, '')
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

	lines.push('Generate the next turn (NPC response, scene update, or event) in the specified format.')

	return lines.join('\n')
}
