import { Injectable } from '@nestjs/common'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueTurnRepository } from 'repo/aiDialogue/aiDialogueTurn.repository'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { UserRepository } from 'repo/user.repository'
import { ParsedAiDialogueTurn } from 'types/aiDialogueMessage'
import { parseAiDialogueSummary } from 'types/aiDialogueSummary'
import { Language } from 'utils/languages'
import { UserBalanceService } from 'features/billing/UserBalance.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage, serializeErrorMessage } from 'infrastructure/exceptions/errorMessage'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { LlmMessage } from 'infrastructure/llmProviderAdapter/LlmProvider.interface'
import { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { ActiveAiDialogueGenerationRegistry } from './ActiveAiDialogueGenerationRegistry.service'
import { AI_DIALOGUE_MODEL } from './aiDialogueModelConfig'
import { AiDialogueSseHub } from './AiDialogueSseHub.service'
import { buildAiDialoguePrompt } from './buildAiDialoguePrompt'
import { parseAiDialogueEvents } from './parseAiDialogueEvents'
import { SummarizeAiDialogue } from './SummarizeAiDialogue.service'
import type { AiDialogueMode } from './aiDialogueLanguageLevel'

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
		private aiDialogueTurnRepository: AiDialogueTurnRepository,
		private aiDialogueQueryRepository: AiDialogueQueryRepository,
		private activeGenerationRegistry: ActiveAiDialogueGenerationRegistry,
		private sseHub: AiDialogueSseHub,
		private summarizeAiDialogue: SummarizeAiDialogue,
		private userRepository: UserRepository,
		private userBalanceService: UserBalanceService,
	) {}

	isGenerating(dialogueId: number): boolean {
		return this.activeGenerationRegistry.hasActiveForDialogue(dialogueId)
	}

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

		this.activeGenerationRegistry.register(dialogueId)

		try {
			// Ход начался: сигналим клиенту, чтобы он сразу показал
			// существующий индикатор ожидания на всё время фоновой генерации.
			this.sseHub.publishDialogueEvent(dialogueId, { data: { type: 'turnStarted' } })

			// Настройки фиксируются этим чтением на весь ход, включая повторные попытки парсинга.
			const dialogue = await this.aiDialogueRepository.getDialogueById(dialogueId)
			if (!dialogue) return

			const scenario = await this.aiDialogueScenarioRepository.getScenarioById(dialogue.scenario_id)
			if (!scenario) return

			const user = await this.userRepository.getUserById(dialogue.user_id)
			if (!user) return

			// Баланс исчерпан: клиент получает turnError с кодом BALANCE_EXHAUSTED.
			await this.userBalanceService.ensurePositiveBalanceOrThrow(user.id, 'aiDialogue')

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
				participantGender: user.gender,
				cefrLevel: dialogue.cefr_level,
				mode: dialogue.mode,
				userScenarioAmendment: dialogue.user_scenario_amendment,
				summary,
				recentEvents,
			})

			const turn = await this.generateAndParse({
				dialogueId,
				userId: user.id,
				prompt,
				language: dialogue.source_language_code,
				mode: dialogue.mode,
			})

			const messageIds = await this.aiDialogueTurnRepository.saveGeneratedTurn({ dialogueId, turn })

			for (const messageId of messageIds) {
				const messageOut = await this.aiDialogueQueryRepository.getMessageById(messageId)
				if (messageOut) {
					this.sseHub.publishDialogueEvent(dialogueId, { data: { type: 'message', message: messageOut } })
				}
			}
		} catch (error) {
			console.log('AiDialogue: turn generation failed', { dialogueId, error })

			this.sseHub.publishDialogueEvent(dialogueId, {
				data: { type: 'turnError', error: this.extractErrorMessage(error) },
			})
		} finally {
			this.activeGenerationRegistry.unregister(dialogueId)
			this.sseHub.publishDialogueEvent(dialogueId, { data: { type: 'turnDone' } })
		}

		// После завершения хода (turnDone уже разослан) — фоновая компакция истории,
		// чтобы не задерживать клиента и не занимать registry генерации.
		this.summarizeAiDialogue.summarizeIfNeeded(dialogueId).catch((error) => {
			console.log('AiDialogue: failed to summarize after turn', { dialogueId, error })
		})
	}

	// Получает полный ответ LLM и разбирает его в события. При провале парсинга повторяет
	// запрос (до MAX_PARSE_ATTEMPTS попыток) с корректирующей подсказкой: быстрая
	// модель часто нарушает построчный формат, поэтому повтор — страховка.
	// В БД и SSE попадают только успешно разобранные сообщения.
	private async generateAndParse(input: {
		dialogueId: number
		userId: number
		prompt: LlmMessage[]
		language: Language
		mode: AiDialogueMode
	}): Promise<ParsedAiDialogueTurn> {
		const { dialogueId, userId, prompt, language } = input

		let lastError: unknown = null

		for (let attempt = 0; attempt < MAX_PARSE_ATTEMPTS; attempt += 1) {
			const messages = attempt === 0 ? prompt : appendRetryHint(prompt, input.mode)
			const output = await this.llmAdapter.generate({
				model: AI_DIALOGUE_MODEL,
				messages,
				responseFormat: 'text',
			})

			// Каждая попытка оплачивается, даже если её ответ не удалось разобрать.
			await this.userBalanceService.chargeLlm({
				userId,
				feature: 'aiDialogue',
				model: output.model,
				usage: output,
			})

			try {
				return parseAiDialogueEvents(output.content, language, input.mode)
			} catch (error) {
				lastError = error
				console.log('AiDialogue: cannot parse LLM response', { dialogueId, attempt, response: output.content })
			}
		}

		throw lastError
	}

	private shouldGenerateTurn(messages: AiDialogueMessageOutModel[]): boolean {
		if (messages.length === 0) return true
		const lastType = messages[messages.length - 1].payload.type
		return (
			lastType === 'userActions' ||
			lastType === 'userAvoidsNPC' ||
			(lastType === 'sceneUpdate' && !messages.some((message) => message.payload.type === 'npcActions'))
		)
	}

	private extractErrorMessage(error: unknown): string {
		if (error instanceof CustomError) return error.message
		if (error instanceof Error) return error.message

		return serializeErrorMessage(errorMessage.unknownError)
	}
}

// Добавляет к промпту корректирующую подсказку для повторной попытки после провала
// парсинга: модель видит, что прошлый ответ был не в формате, и получает напоминание.
function appendRetryHint(prompt: LlmMessage[], mode: AiDialogueMode): LlmMessage[] {
	return [
		...prompt,
		{
			role: 'user',
			content:
				mode === 'exam'
					? 'Your previous answer could not be parsed. Reply in the exam line-based format: one field per line, blank lines only between blocks. No translations, word maps, hints or template placeholders. Keep voice and visual metadata for new NPCs and scenes.'
					: 'Your previous answer was not in the required line-based format and could not be parsed. Reply again in the exact format: one field per line, no blank lines inside a block, and always include the translation line immediately after every content line. Replace every placeholder in angle brackets with real text; never output placeholders such as <translation>. After all dialogue blocks, append the wordMaps: footer in the specified JSON-lines format.',
		},
	]
}
