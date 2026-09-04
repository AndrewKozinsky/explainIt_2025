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
					title: scenario.title,
					description: scenario.description,
					systemPrompt: scenario.system_prompt,
					languageCode: scenario.language_code,
				},
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

	// Стримит ответ LLM, накапливая текст, и в конце разбирает его в события.
	// Сырые чанки отдаёт клиенту для превью (partial-json); авторитетный разбор —
	// в parseAiDialogueEvents по завершении стрима.
	private async streamAndParse(
		dialogueId: number,
		prompt: LlmMessage[],
		abortSignal: AbortSignal,
	): Promise<AiDialogueEvent[]> {
		let accumulated = ''

		const stream = this.llmAdapter.stream({
			messages: prompt,
			responseFormat: 'json_object',
			abortSignal,
		})

		for await (const chunk of stream) {
			accumulated += chunk
			this.sseHub.emit(dialogueId, { data: { type: 'chunk', chunk } })
		}

		return parseAiDialogueEvents(accumulated)
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
