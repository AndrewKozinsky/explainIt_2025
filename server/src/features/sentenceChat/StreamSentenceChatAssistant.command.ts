import { Inject, Injectable, MessageEvent } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Observable, Subscriber } from 'rxjs'
import { Logger } from 'winston'
import { SentenceChatMessageRepository } from 'repo/sentenceChatMessage.repository'
import { SentenceChatThreadRepository } from 'repo/sentenceChatThread.repository'
import { UserRepository } from 'repo/user.repository'
import { GoogleGeminiModels } from 'types/googleGeminiModels'
import { GeminiTokenUsageBalanceChargeCommand } from 'features/payment/GeminiTokenUsageBalanceCharge.command'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage, serializeErrorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { GoogleGeminiService } from 'infrastructure/googleGemini/googleGemini.service'
import { SentenceChatMessage, SentenceChatThread } from 'prisma/generated/client'
import { SentenceChatMessageStatus } from 'prisma/generated/enums'
import { ActiveSentenceChatGenerationRegistry } from './ActiveSentenceChatGenerationRegistry.service'
import { buildSentenceChatContents, buildSentenceChatSystemInstruction } from './buildSentenceChatPrompt'
import { SentenceChatContextBuilder } from './SentenceChatContextBuilder.service'

// Сколько предложений до и после выделенного отдавать в контекст.
const SENTENCES_BEFORE = 4
const SENTENCES_AFTER = 0
// Сколько последних сообщений треда брать для поддержания контекста диалога (включая только что добавленный user).
const HISTORY_LIMIT = 8

export type StreamSentenceChatAssistantInput = {
	userId: number
	threadId: number
}

type TokenUsage = { inputTokens: number; outputTokens: number }
type FinalStatus = Extract<SentenceChatMessageStatus, 'completed' | 'canceled' | 'failed'>

type PromptPayload = {
	systemInstruction: string
	contents: ReturnType<typeof buildSentenceChatContents>
}

/**
 * Основной процесс генерации ответа ИИ в чате по выделенному предложению.
 *
 * Запускается как SSE-endpoint. Сам создаёт пустую streaming-заготовку ответа ассистента
 * в треде, стримит чанки клиенту, по завершении / отмене / ошибке фиксирует итог в БД
 * и списывает баланс пользователя.
 *
 * Предусловия для запуска:
 *  - тред существует и принадлежит пользователю;
 *  - у пользователя нет другой активной генерации;
 *  - последнее сообщение треда — это вопрос пользователя (`role=user`).
 */
@Injectable()
export class StreamSentenceChatAssistantCommand {
	constructor(
		private googleGeminiService: GoogleGeminiService,
		private sentenceChatThreadRepository: SentenceChatThreadRepository,
		private sentenceChatMessageRepository: SentenceChatMessageRepository,
		private sentenceChatContextBuilder: SentenceChatContextBuilder,
		private activeGenerationRegistry: ActiveSentenceChatGenerationRegistry,
		private commandBus: CommandBus,
		private userRepository: UserRepository,
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
	) {}

	execute(input: StreamSentenceChatAssistantInput): Observable<MessageEvent> {
		return new Observable<MessageEvent>((subscriber) => {
			// Состояние одной конкретной подписки (один клиент ↔ один стрим).
			const state = {
				aborted: false,
				finished: false,
				abortController: null as null | AbortController,
				assistantMessageId: null as null | number,
				accumulatedContent: '',
				usage: null as null | TokenUsage,
			}

			this.runStream(input, subscriber, state).catch((error) => {
				this.logger.error('Sentence chat generation: unexpected error outside of run()', { error })
			})

			// Вызывается, когда клиент отсоединяется (или subscriber.complete/error был вызван изнутри).
			return () => {
				if (!state.finished) {
					state.aborted = true
					state.abortController?.abort()
				}
			}
		})
	}

	// ---------- orchestration ----------

	private async runStream(
		input: StreamSentenceChatAssistantInput,
		subscriber: Subscriber<MessageEvent>,
		state: {
			aborted: boolean
			finished: boolean
			abortController: null | AbortController
			assistantMessageId: null | number
			accumulatedContent: string
			usage: null | TokenUsage
		},
	) {
		try {
			const thread = await this.loadAndAuthorizeThread(input.threadId, input.userId)
			await this.assertNoActiveGenerationForUser(input.userId)
			await this.assertLastMessageIsUserQuestion(thread.id)

			// Если у пользователя нет средств — создаём assistant-сообщение со status='failed'
			// и error_message, не вызывая Gemini и не списывая токены. Клиент покажет
			// это сообщение в треде как карточку ошибки (тот же путь, что и для реальных сбоев LLM).
			if (await this.isUserBalanceInsufficient(input.userId)) {
				const placeholder = await this.createStreamingPlaceholder(thread.id)
				state.assistantMessageId = placeholder.id

				await this.finalize(input, subscriber, state, {
					status: 'failed',
					errorText: serializeErrorMessage(errorMessage.sentenceChat.insufficientBalance),
				})

				return
			}

			// Сборка промпта ДО создания placeholder-а: если здесь упадёт ошибка,
			// в БД не остаётся зависшая streaming-заготовка.
			const prompt = await this.buildPromptPayload(thread)

			const assistantMessage = await this.createStreamingPlaceholder(thread.id)
			state.assistantMessageId = assistantMessage.id

			state.abortController = this.activeGenerationRegistry.register(input.userId, assistantMessage.id)

			await this.streamChunksToSubscriber(subscriber, state, prompt)

			await this.finalize(input, subscriber, state, {
				status: state.aborted ? 'canceled' : 'completed',
			})
		} catch (error) {
			await this.handleRunError(input, subscriber, state, error)
		}
	}

	private async handleRunError(
		input: StreamSentenceChatAssistantInput,
		subscriber: Subscriber<MessageEvent>,
		state: {
			aborted: boolean
			finished: boolean
			assistantMessageId: null | number
			accumulatedContent: string
			usage: null | TokenUsage
			abortController: null | AbortController
		},
		error: unknown,
	) {
		if (this.isAbortError(error, state.aborted)) {
			await this.finalize(input, subscriber, state, { status: 'canceled' })
			return
		}

		const errorText = this.extractErrorMessage(error)
		this.logger.error('Sentence chat generation failed', { error })

		await this.finalize(input, subscriber, state, { status: 'failed', errorText })

		if (error instanceof CustomError) {
			subscriber.error(error)
		}
	}

	// ---------- preconditions ----------

	private async loadAndAuthorizeThread(threadId: number, userId: number): Promise<SentenceChatThread> {
		const thread = await this.sentenceChatThreadRepository.getThreadById(threadId)
		if (!thread) {
			throw new CustomError(errorMessage.sentenceChat.threadNotFound, ErrorStatusCode.NotFound_404)
		}

		if (thread.user_id !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		return thread
	}

	private async assertNoActiveGenerationForUser(userId: number): Promise<void> {
		if (this.activeGenerationRegistry.hasActiveForUser(userId)) {
			throw new CustomError(errorMessage.sentenceChat.generationAlreadyActive, ErrorStatusCode.BadRequest_400)
		}

		const hasActiveInDb = await this.sentenceChatMessageRepository.hasActiveStreamingMessageForUser(userId)
		if (hasActiveInDb) {
			throw new CustomError(errorMessage.sentenceChat.generationAlreadyActive, ErrorStatusCode.BadRequest_400)
		}
	}

	private async isUserBalanceInsufficient(userId: number): Promise<boolean> {
		const user = await this.userRepository.getUserById(userId)
		return !user || user.balance <= 0
	}

	private async assertLastMessageIsUserQuestion(threadId: number): Promise<void> {
		const lastMessage = await this.sentenceChatMessageRepository.getLastMessageInThread(threadId)
		if (!lastMessage || lastMessage.role !== 'user') {
			throw new CustomError(
				errorMessage.sentenceChat.lastMessageIsNotUserQuestion,
				ErrorStatusCode.BadRequest_400,
			)
		}
	}

	// ---------- prompt building ----------

	private async buildPromptPayload(thread: SentenceChatThread): Promise<PromptPayload> {
		const context = await this.sentenceChatContextBuilder.buildForSentence(
			thread.sentence_id,
			SENTENCES_BEFORE,
			SENTENCES_AFTER,
		)
		if (!context) {
			throw new CustomError(errorMessage.sentence.notFound, ErrorStatusCode.NotFound_404)
		}

		const historyMessages = await this.sentenceChatMessageRepository.getLastMessagesByThreadId(
			thread.id,
			HISTORY_LIMIT,
		)

		// Последний элемент — только что заданный вопрос; остальное — предыдущий диалог.
		const newQuestion = historyMessages[historyMessages.length - 1]
		const history = historyMessages.slice(0, -1)

		const systemInstruction = buildSentenceChatSystemInstruction({
			source: context.source,
			neighbors: context.neighbors,
		})

		const contents = buildSentenceChatContents({
			history: history.map((m) => ({ role: m.role, content: m.content })),
			newUserQuestion: newQuestion.content,
		})

		return { systemInstruction, contents }
	}

	// ---------- streaming ----------

	private async createStreamingPlaceholder(threadId: number): Promise<SentenceChatMessage> {
		const message = await this.sentenceChatMessageRepository.createMessage({
			threadId,
			role: 'assistant',
			content: '',
			status: 'streaming',
		})

		await this.sentenceChatThreadRepository.touchThread(threadId)

		return message
	}

	private async streamChunksToSubscriber(
		subscriber: Subscriber<MessageEvent>,
		state: {
			aborted: boolean
			accumulatedContent: string
			usage: null | TokenUsage
			abortController: null | AbortController
		},
		prompt: PromptPayload,
	): Promise<void> {
		const stream = this.googleGeminiService.generateTextStreamChunks({
			contents: prompt.contents,
			model: GoogleGeminiModels.Flash,
			systemInstruction: prompt.systemInstruction,
			abortSignal: state.abortController?.signal,
			onUsage: (u) => {
				if (u) state.usage = u
			},
		})

		for await (const chunk of stream) {
			if (state.aborted) break
			state.accumulatedContent += chunk
			subscriber.next({ data: { type: 'chunk', chunk } })
		}
	}

	// ---------- finalize ----------

	private async finalize(
		input: StreamSentenceChatAssistantInput,
		subscriber: Subscriber<MessageEvent>,
		state: {
			finished: boolean
			assistantMessageId: null | number
			accumulatedContent: string
			usage: null | TokenUsage
		},
		opts: { status: FinalStatus; errorText?: string },
	): Promise<void> {
		if (state.finished) return
		state.finished = true

		await this.persistFinalAssistantMessage(state.assistantMessageId, {
			content: state.accumulatedContent,
			status: opts.status,
			errorText: opts.errorText,
		})

		await this.chargeTokenUsage(input.userId, state.usage)

		if (state.assistantMessageId !== null) {
			this.activeGenerationRegistry.unregister(state.assistantMessageId)
		}

		this.emitDoneEvent(subscriber, {
			status: opts.status,
			content: state.accumulatedContent,
			errorText: opts.errorText,
		})
		subscriber.complete()
	}

	private async persistFinalAssistantMessage(
		assistantMessageId: null | number,
		opts: { content: string; status: FinalStatus; errorText?: string },
	): Promise<void> {
		if (assistantMessageId === null) return

		try {
			await this.sentenceChatMessageRepository.updateMessage(assistantMessageId, {
				content: opts.content,
				status: opts.status,
				errorMessage: opts.errorText ?? null,
			})
		} catch (error) {
			this.logger.error('Failed to persist final assistant message', { error })
		}
	}

	private async chargeTokenUsage(userId: number, usage: null | TokenUsage): Promise<void> {
		if (!usage || (usage.inputTokens <= 0 && usage.outputTokens <= 0)) return

		try {
			await this.commandBus.execute(
				new GeminiTokenUsageBalanceChargeCommand({
					userId,
					inputTokens: usage.inputTokens,
					outputTokens: usage.outputTokens,
				}),
			)
		} catch (error) {
			this.logger.error('Failed to charge user after sentence chat generation', { error })
		}
	}

	private emitDoneEvent(
		subscriber: Subscriber<MessageEvent>,
		opts: { status: FinalStatus; content: string; errorText?: string },
	): void {
		try {
			subscriber.next({
				data: {
					type: 'done',
					status: opts.status,
					content: opts.content,
					errorMessage: opts.errorText ?? null,
				},
			})
		} catch {
			// subscriber может быть уже закрыт
		}
	}

	// ---------- error classification ----------

	private isAbortError(error: unknown, aborted: boolean): boolean {
		if (aborted) return true
		return error instanceof Error && (error.name === 'AbortError' || error.message === 'AbortError')
	}

	private extractErrorMessage(error: unknown): string {
		if (error instanceof CustomError) return error.message
		if (error instanceof Error) return error.message

		return serializeErrorMessage(errorMessage.unknownError)
	}
}
