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
		: '(пока никого)'

	const rules = [`- Пользователь изучает язык: ${languages[sourceLanguageCode].nameEng}. Реплики NPC должны быть на этом языке.`]
	if (targetLanguageCode) {
		rules.push(
			`- Для каждого content добавь строку перевода сразу после него — точный перевод на ${languages[targetLanguageCode].nameEng}. Служебные строки (заголовки, поля npcId/npcName/npcRole/emotion, метки action:/speech:) не переводи.`,
		)
	}
	rules.push(
		'- npcId должен быть стабильным: если NPC уже появлялся, переиспользуй его npcId из реестра ниже, не выдумывай новые.',
		'- Если сейчас ход пользователя и тебе не нужно ничего говорить или делать — ничего не выводи (пустой ответ).',
	)

	return [
		scenario.systemPrompt,
		'',
		'## Формат ответа',
		'Отвечай плоским построчным текстом, без пояснений и без markdown.',
		'Ход — один или несколько блоков, разделённых ровно одной пустой строкой. Блок начинается строкой-заголовком, далее поля по одной строке.',
		'',
		'Смена сцены:',
		'sceneUpdate',
		'<описание новой сцены>',
		'<перевод>',
		'',
		'Действия/реплики NPC (заголовок — 5 полей через |):',
		'npcActions|<npcId>|<npcName>|<npcRole>|<emotion>',
		'action:',
		'<описание действия>',
		'<перевод>',
		'speech:',
		'<реплика>',
		'<перевод>',
		'',
		'Подсказка:',
		'help',
		'<подсказка>',
		'<перевод>',
		'',
		'Событие мира:',
		'worldEvent',
		'<описание события>',
		'<перевод>',
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

	lines.push('Сгенерируй следующий ход (ответ NPC, смену сцены или событие) в указанном формате.')

	return lines.join('\n')
}
