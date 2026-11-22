import type { AiDialogueMode } from './aiDialogueLanguageLevel'
import { Language, languages } from 'utils/languages'
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
	sourceLanguageCode: Language
	summary: null | AiDialogueSummary
	mode: AiDialogueMode
	eventsToSummarize: AiDialogueEvent[]
}): LlmMessage[] {
	const { summary, eventsToSummarize } = input

	const system = [
		'You compress the history of a role-play conversation.',
		'Summarize these events in a few concise sentences so the conversation can continue without losing key facts.',
		'Preserve NPC names and roles, the situation, important dialogue, agreements and facts supplied by the participant.',
		...(input.mode === 'exam'
			? [
					'For exam continuity, preserve a few verbatim examples of participant wording without corrections, evidence of comprehension, and the actual complexity of recent NPC speech. Do not assign a score or draw conclusions from a single mistake, short answer or request to repeat.',
				]
			: []),
		`Write the summary in ${languages[input.sourceLanguageCode].nameEng}, the dialogue language. Return only the summary text, without markdown or explanations. Preserve verbatim participant examples in their original language.`,
	].join('\n')

	const lines: string[] = []

	const previousHistory = (summary ?? [])
		.map((block) => block.history)
		.filter(Boolean)
		.join('\n')

	if (previousHistory) {
		lines.push('Existing summary of earlier events:', previousHistory, '')
	}

	lines.push('New events to summarize:')

	for (const event of eventsToSummarize) {
		lines.push(serializeAiDialogueEvent(event))
	}

	lines.push('', 'Summary:')

	return [
		{ role: 'system', content: system },
		{ role: 'user', content: lines.join('\n') },
	]
}
