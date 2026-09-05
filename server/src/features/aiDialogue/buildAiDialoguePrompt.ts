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
 * system-сообщение — контракт (system_prompt сценария + строгий формат ответа
 * `{ events: [...] }` + реестр NPC). user-сообщение — контекст (текущая сцена,
 * сжатая история, свежие несжатые события) + просьба сгенерировать следующий ход.
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
		: '(пока никого)'

	const rules = [`- Пользователь изучает язык: ${languages[sourceLanguageCode].nameEng}. Реплики NPC должны быть на этом языке.`]
	if (targetLanguageCode) {
		rules.push(
			`- Для каждого текстового поля (newScene, help, content и content внутри actions) добавь поле "translation" — точный перевод на ${languages[targetLanguageCode].nameEng}. Поля npcId, npcName, npcRole, emotion, type не переводи.`,
		)
	}
	rules.push(
		'- npcId должен быть стабильным: если NPC уже появлялся, переиспользуй его npcId из реестра ниже, не выдумывай новые.',
		'- Если сейчас ход пользователя и тебе не нужно ничего говорить или делать — верни {"events":[]}.',
	)

	return [
		scenario.systemPrompt,
		'',
		'## Формат ответа',
		'Отвечай строго одним JSON-объектом, без пояснений и без markdown: {"events": [...]}.',
		'Каждый элемент массива events — одно событие с полем "type" и соответствующими полями:',
		'- {"type":"sceneUpdate","newScene":"описание новой сцены","translation":"перевод"}',
		'- {"type":"npcActions","npcId":"...","npcName":"...","npcRole":"...","emotion":"...","actions":[{"type":"action","content":"...","translation":"..."},{"type":"speech","content":"...","translation":"..."}]}',
		'- {"type":"help","help":"подсказка пользователю","translation":"перевод"}',
		'- {"type":"worldEvent","content":"описание события","translation":"перевод"}',
		'',
		'Правила:',
		...rules,
		'',
		'## Реестр NPC',
		rosterLines,
	].join('\n')
}

function buildUserMessage(scene: string, summary: null | AiDialogueSummary, recentEvents: AiDialogueEvent[]): string {
	const lines: string[] = []

	if (scene) {
		lines.push('Текущая сцена:', scene, '')
	}

	const summaryHistory = (summary ?? [])
		.map((block) => block.history)
		.filter(Boolean)
		.join('\n')
	if (summaryHistory) {
		lines.push('Что произошло ранее (сжато):', summaryHistory, '')
	}

	if (recentEvents.length) {
		lines.push('Недавние события (в хронологическом порядке):')
		for (const event of recentEvents) {
			lines.push(serializeAiDialogueEvent(event))
		}
		lines.push('')
	}

	lines.push('Сгенерируй следующий ход (ответ NPC, смену сцены или событие) в указанном JSON-формате.')

	return lines.join('\n')
}
