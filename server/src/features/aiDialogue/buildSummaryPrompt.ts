import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { AiDialogueSummary } from 'types/aiDialogueSummary'
import { LlmMessage } from 'infrastructure/llmProviderAdapter/LlmProvider.interface'
import { serializeAiDialogueEvent } from './serializeAiDialogueEvent'

/**
 * Собирает промпт для сжатия части истории диалога в компактную сводку.
 *
 * system-сообщение — инструкция «сожми в краткую сводку». user-сообщение — уже
 * имеющаяся сводка (для преемственности) + новые события, которые нужно сжать.
 * LLM отвечает обычным текстом (history), состояние выводит сервер детерминированно.
 */
export function buildSummaryPrompt(input: {
	summary: null | AiDialogueSummary
	eventsToSummarize: AiDialogueEvent[]
}): LlmMessage[] {
	const { summary, eventsToSummarize } = input

	const system = [
		'Ты — компонент сжатия истории ролевого диалога для изучения иностранных языков.',
		'Сожми перечисленные события в краткую сводку из нескольких предложений, которая позволит позже продолжить диалог без потери ключевых фактов.',
		'Сохраняй: имена и роли NPC, суть сцены, важные реплики, договорённости и факты, сообщённые пользователем.',
		'Пиши по-русски. Отвечай только текстом сводки, без markdown и пояснений.',
	].join('\n')

	const lines: string[] = []

	const previousHistory = (summary ?? [])
		.map((block) => block.history)
		.filter(Boolean)
		.join('\n')

	if (previousHistory) {
		lines.push('Уже есть сводка предыдущих событий:', previousHistory, '')
	}

	lines.push('Новые события, которые нужно сжать:')
	for (const event of eventsToSummarize) {
		lines.push(serializeAiDialogueEvent(event))
	}
	lines.push('', 'Сводка:')

	return [
		{ role: 'system', content: system },
		{ role: 'user', content: lines.join('\n') },
	]
}
