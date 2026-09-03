import { LlmMessage } from 'infrastructure/llmProviderAdapter/LlmProvider.interface'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { AiDialogueNpcRosterEntry, AiDialogueSummary } from 'types/aiDialogueSummary'

type ScenarioForPrompt = {
	title: string
	description: string
	systemPrompt: string
	languageCode: string
}

/**
 * Собирает промпт для генерации следующего хода диалога.
 *
 * system-сообщение — контракт (system_prompt сценария + строгий формат ответа
 * `{ events: [...] }` + реестр NPC). user-сообщение — контекст (текущая сцена,
 * сжатая история, свежие несжатые события) + просьба сгенерировать следующий ход.
 */
export function buildAiDialoguePrompt(input: {
	scenario: ScenarioForPrompt
	summary: null | AiDialogueSummary
	recentEvents: AiDialogueEvent[]
}): LlmMessage[] {
	const { scenario, summary, recentEvents } = input

	const roster = deriveRoster(summary, recentEvents)
	const scene = deriveCurrentScene(summary, recentEvents)

	return [
		{ role: 'system', content: buildSystemMessage(scenario, roster) },
		{ role: 'user', content: buildUserMessage(scene, summary, recentEvents) },
	]
}

function buildSystemMessage(scenario: ScenarioForPrompt, roster: AiDialogueNpcRosterEntry[]): string {
	const rosterLines = roster.length
		? roster.map((n) => `- npcId: "${n.npcId}" — ${n.npcRole}, ${n.npcName}`).join('\n')
		: '(пока никого)'

	return [
		scenario.systemPrompt,
		'',
		'## Формат ответа',
		'Отвечай строго одним JSON-объектом, без пояснений и без markdown: {"events": [...]}.',
		'Каждый элемент массива events — одно событие с полем "type" и соответствующими полями:',
		'- {"type":"sceneUpdate","newScene":"описание новой сцены"}',
		'- {"type":"npcActions","npcId":"...","npcName":"...","npcRole":"...","emotion":"...","actions":[{"type":"action","content":"..."},{"type":"speech","content":"..."}]}',
		'- {"type":"help","help":"подсказка пользователю"}',
		'- {"type":"worldEvent","content":"описание события"}',
		'',
		'Правила:',
		`- Пользователь изучает язык: ${scenario.languageCode}. Реплики NPC должны быть на этом языке.`,
		'- npcId должен быть стабильным: если NPC уже появлялся, переиспользуй его npcId из реестра ниже, не выдумывай новые.',
		'- Если сейчас ход пользователя и тебе не нужно ничего говорить или делать — верни {"events":[]}.',
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

	const summaryHistory = (summary ?? []).map((block) => block.history).filter(Boolean).join('\n')
	if (summaryHistory) {
		lines.push('Что произошло ранее (сжато):', summaryHistory, '')
	}

	if (recentEvents.length) {
		lines.push('Недавние события (в хронологическом порядке):')
		for (const event of recentEvents) {
			lines.push(serializeEventForPrompt(event))
		}
		lines.push('')
	}

	lines.push('Сгенерируй следующий ход (ответ NPC, смену сцены или событие) в указанном JSON-формате.')

	return lines.join('\n')
}

function deriveRoster(
	summary: null | AiDialogueSummary,
	recentEvents: AiDialogueEvent[],
): AiDialogueNpcRosterEntry[] {
	const map = new Map<string, AiDialogueNpcRosterEntry>()

	const summaryRoster = summary?.[summary.length - 1]?.state?.roster ?? []
	for (const entry of summaryRoster) {
		map.set(entry.npcId, entry)
	}

	for (const event of recentEvents) {
		if (event.type === 'npcActions') {
			map.set(event.npcId, { npcId: event.npcId, npcName: event.npcName, npcRole: event.npcRole })
		}
	}

	return [...map.values()]
}

function deriveCurrentScene(summary: null | AiDialogueSummary, recentEvents: AiDialogueEvent[]): string {
	let scene = summary?.[summary.length - 1]?.state?.scene ?? ''

	for (const event of recentEvents) {
		if (event.type === 'sceneUpdate') {
			scene = event.newScene
		}
	}

	return scene
}

function serializeEventForPrompt(event: AiDialogueEvent): string {
	switch (event.type) {
		case 'sceneUpdate':
			return `[сцена] ${event.newScene}`
		case 'help':
			return `[подсказка] ${event.help}`
		case 'npcActions': {
			const acts = event.actions.map(serializeAction).join('; ')
			return `[${event.npcName} (${event.npcRole}), ${event.emotion}] ${acts}`
		}
		case 'userActions': {
			const acts = event.actions.map(serializeAction).join('; ')
			return `[пользователь] ${acts}`
		}
		case 'userAvoidsNPC':
			return '[пользователь ушёл от разговора]'
		case 'worldEvent':
			return `[событие] ${event.content}`
	}
}

function serializeAction(action: { type: 'action' | 'speech'; content: string }): string {
	return action.type === 'speech' ? `«${action.content}»` : `*${action.content}*`
}
