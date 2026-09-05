import { Injectable } from '@nestjs/common'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueMessageRepository } from 'repo/aiDialogue/aiDialogueMessage.repository'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { parseAiDialogueSummary } from 'types/aiDialogueSummary'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage, serializeErrorMessage } from 'infrastructure/exceptions/errorMessage'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { LlmMessage } from 'infrastructure/llmProviderAdapter/LlmProvider.interface'
import { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { ActiveAiDialogueGenerationRegistry } from './ActiveAiDialogueGenerationRegistry.service'
import { AiDialogueSseHub } from './AiDialogueSseHub.service'
import { buildAiDialoguePrompt } from './buildAiDialoguePrompt'
import { parseAiDialogueEvents } from './parseAiDialogueEvents'
import { SummarizeAiDialogue } from './SummarizeAiDialogue.service'

// Сколько попыток разобрать ответ LLM до того, как отдать ошибку хода (turnError).
const MAX_PARSE_ATTEMPTS = 2

/**
 * Генерирует один «ход» ролевого диалога (ответ NPC / смену сцены / событие мира).
 *
 * Запускается fire-and-forget: из POST-запроса (после действия пользователя) и из
 * @Sse-эндпоинта (после replay, если диалог «ждёт хода»). Результат сохраняется в БД
 * и рассылается всем подписчикам SSE-шины (AiDialogueSseHub).
 *
 * Для одного диалога одновременно идёт не более одной генерации (registry).
 */
@Injectable()
export class GenerateAiDialogueTurn {
	constructor(
		private llmAdapter: LlmAdapterService,
		private aiDialogueRepository: AiDialogueRepository,
		private aiDialogueScenarioRepository: AiDialogueScenarioRepository,
		private aiDialogueMessageRepository: AiDialogueMessageRepository,
		private aiDialogueQueryRepository: AiDialogueQueryRepository,
		private activeGenerationRegistry: ActiveAiDialogueGenerationRegistry,
		private sseHub: AiDialogueSseHub,
		private summarizeAiDialogue: SummarizeAiDialogue,
	) {}

	// Проверяет, «ждёт ли диалог хода» (нет сообщений или последнее — событие
	// пользователя), и при необходимости запускает генерацию. Идемпотентен.
	async triggerIfNeeded(dialogueId: number): Promise<void> {
		if (this.activeGenerationRegistry.hasActiveForDialogue(dialogueId)) return

		const messages = await this.aiDialogueQueryRepository.getMessagesByDialogueId(dialogueId)
		if (!this.shouldGenerateTurn(messages)) return

		await this.generate(dialogueId)
	}

	// Генерирует и сохраняет один ход. Наружу не бросает исключение — ошибки
	// рассылаются подписчикам как turnError.
	async generate(dialogueId: number): Promise<void> {
		if (this.activeGenerationRegistry.hasActiveForDialogue(dialogueId)) return

		const abortController = this.activeGenerationRegistry.register(dialogueId)

		try {
			const dialogue = await this.aiDialogueRepository.getDialogueById(dialogueId)
			if (!dialogue) return

			const scenario = await this.aiDialogueScenarioRepository.getScenarioById(dialogue.scenario_id)
			if (!scenario) return

			const messages = await this.aiDialogueQueryRepository.getMessagesByDialogueId(dialogueId)

			const summary = parseAiDialogueSummary(dialogue.summary)
			const recentEvents = messages
				.filter((message) => message.id > dialogue.summary_up_to)
				.map((message) => message.payload)

			const prompt = buildAiDialoguePrompt({
				scenario: {
					systemPrompt: scenario.system_prompt,
				},
				sourceLanguageCode: dialogue.source_language_code,
				targetLanguageCode: dialogue.target_language_code,
				summary,
				recentEvents,
			})

			const events = await this.streamAndParse(dialogueId, prompt, abortController.signal)

			for (const event of events) {
				const created = await this.aiDialogueMessageRepository.createMessage({ dialogueId, event })
				const messageOut = await this.aiDialogueQueryRepository.getMessageById(created.id)
				if (messageOut) {
					this.sseHub.emit(dialogueId, { data: { type: 'message', message: messageOut } })
				}
			}
		} catch (error) {
			console.log('AiDialogue: turn generation failed', { dialogueId, error })
			this.sseHub.emit(dialogueId, { data: { type: 'turnError', error: this.extractErrorMessage(error) } })
		} finally {
			this.activeGenerationRegistry.unregister(dialogueId)
			this.sseHub.emit(dialogueId, { data: { type: 'turnDone' } })
		}

		// После завершения хода (turnDone уже разослан) — фоновая компакция истории,
		// чтобы не задерживать клиента и не занимать registry генерации.
		this.summarizeAiDialogue.summarizeIfNeeded(dialogueId).catch((error) => {
			console.log('AiDialogue: failed to summarize after turn', { dialogueId, error })
		})
	}

	// Стримит ответ LLM и разбирает его в события. При провале парсинга повторяет
	// запрос (до MAX_PARSE_ATTEMPTS попыток) с корректирующей подсказкой: быстрая
	// модель часто нарушает построчный формат, поэтому повтор — страховка. Между
	// попытками клиенту шлётся turnReset, чтобы он выбросил превью неудачной попытки
	// (сырые чанки — только превью, в БД ничего не сохраняется до успешного парсинга).
	private async streamAndParse(
		dialogueId: number,
		prompt: LlmMessage[],
		abortSignal: AbortSignal,
	): Promise<AiDialogueEvent[]> {
		let lastError: unknown = null

		for (let attempt = 0; attempt < MAX_PARSE_ATTEMPTS; attempt += 1) {
			const messages = attempt === 0 ? prompt : appendRetryHint(prompt)
			const accumulated = await this.streamAndAccumulate(dialogueId, messages, abortSignal)

			try {
				return parseAiDialogueEvents(accumulated)
			} catch (error) {
				lastError = error
				console.log('AiDialogue: cannot parse LLM response', { dialogueId, attempt, response: accumulated })

				if (attempt < MAX_PARSE_ATTEMPTS - 1) {
					this.sseHub.emit(dialogueId, { data: { type: 'turnReset' } })
				}
			}
		}

		throw lastError
	}

	// Стримит один вызов LLM, накапливая текст и рассылая сырые чанки для превью.
	private async streamAndAccumulate(
		dialogueId: number,
		messages: LlmMessage[],
		abortSignal: AbortSignal,
	): Promise<string> {
		let accumulated = ''

		const stream = this.llmAdapter.stream({
			messages,
			responseFormat: 'text',
			abortSignal,
		})

		for await (const chunk of stream) {
			accumulated += chunk
			this.sseHub.emit(dialogueId, { data: { type: 'chunk', chunk } })
		}

		return accumulated
	}

	private shouldGenerateTurn(messages: AiDialogueMessageOutModel[]): boolean {
		if (messages.length === 0) return true
		const lastType = messages[messages.length - 1].payload.type
		return lastType === 'userActions' || lastType === 'userAvoidsNPC'
	}

	private extractErrorMessage(error: unknown): string {
		if (error instanceof CustomError) return error.message
		if (error instanceof Error) return error.message
		return serializeErrorMessage(errorMessage.unknownError)
	}
}

// Добавляет к промпту корректирующую подсказку для повторной попытки после провала
// парсинга: модель видит, что прошлый ответ был не в формате, и получает напоминание.
function appendRetryHint(prompt: LlmMessage[]): LlmMessage[] {
	return [
		...prompt,
		{
			role: 'user',
			content:
				'Your previous answer was not in the required line-based format and could not be parsed. Reply again in the exact format: one field per line, no blank lines inside a block, and always include the translation line immediately after every content line.',
		},
	]
}
