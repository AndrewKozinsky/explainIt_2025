import { Injectable } from '@nestjs/common'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { AiDialogueSummary, parseAiDialogueSummary } from 'types/aiDialogueSummary'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { buildSummaryPrompt } from './buildSummaryPrompt'
import { deriveAiDialogueState, sameAiDialogueState } from './deriveAiDialogueState'

// Сколько несжатых сообщений нужно накопить, чтобы запустить компакцию.
const SUMMARIZE_WHEN_UNCOMPRESSED_GT = 20
// Сколько последних сообщений оставлять несжатыми (свежий контекст для промпта).
const KEEP_UNCOMPRESSED = 5

/**
 * Компактирует историю ролевого диалога в append-only сводку (AiDialogue.summary).
 *
 * Работает в фоне после завершения хода: не блокирует клиента и не занимает
 * registry генерации. Сводка — массив блоков { state, history }: при изменении
 * состояния (сцена / активный NPC / реестр NPC) добавляется новый блок, иначе
 * новый текст дописывается в history последнего блока.
 */
@Injectable()
export class SummarizeAiDialogue {
	private inFlight = new Set<number>()

	constructor(
		private llmAdapter: LlmAdapterService,
		private aiDialogueRepository: AiDialogueRepository,
		private aiDialogueQueryRepository: AiDialogueQueryRepository,
	) {}

	async summarizeIfNeeded(dialogueId: number): Promise<void> {
		if (this.inFlight.has(dialogueId)) return

		const dialogue = await this.aiDialogueRepository.getDialogueById(dialogueId)
		if (!dialogue) return

		const messages = await this.aiDialogueQueryRepository.getMessagesByDialogueId(dialogueId)
		const uncompressed = messages.filter((message) => message.id > dialogue.summary_up_to)

		if (uncompressed.length <= SUMMARIZE_WHEN_UNCOMPRESSED_GT) return

		const toSummarize = uncompressed.slice(0, uncompressed.length - KEEP_UNCOMPRESSED)
		if (toSummarize.length === 0) return

		this.inFlight.add(dialogueId)
		try {
			const summary = parseAiDialogueSummary(dialogue.summary)
			const events = toSummarize.map((message) => message.payload)

			const prompt = buildSummaryPrompt({ summary, eventsToSummarize: events })
			const output = await this.llmAdapter.generate({ messages: prompt })
			const history = output.content.trim()
			if (!history) return

			const newSummary = this.appendHistory(summary, events, history)
			const newSummaryUpTo = toSummarize[toSummarize.length - 1].id

			await this.aiDialogueRepository.updateSummary(dialogueId, {
				summary: JSON.stringify(newSummary),
				summaryUpTo: newSummaryUpTo,
			})
		} catch (error) {
			console.log('AiDialogue: summary generation failed', { dialogueId, error })
		} finally {
			this.inFlight.delete(dialogueId)
		}
	}

	// Дописывает сжатый текст в append-only сводку. Новый блок — только если
	// изменилось состояние; иначе текст добавляется в history последнего блока.
	private appendHistory(
		summary: null | AiDialogueSummary,
		events: AiDialogueEvent[],
		history: string,
	): AiDialogueSummary {
		const prevState = summary?.[summary.length - 1]?.state ?? null
		const newState = deriveAiDialogueState(prevState, events)

		if (prevState && sameAiDialogueState(prevState, newState)) {
			const blocks = [...(summary ?? [])]
			const last = blocks[blocks.length - 1]

			blocks[blocks.length - 1] = {
				state: last.state,
				history: [last.history, history].filter(Boolean).join('\n'),
			}

			return blocks
		}

		return [...(summary ?? []), { state: newState, history }]
	}
}
