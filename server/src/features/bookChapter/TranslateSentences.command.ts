import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import OpenAI from 'openai'
import { z } from 'zod'
import { TokenUsageBalanceChargeCommand } from 'features/payment/TokenUsageBalanceCharge.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { OpenAIModels, OpenAIService } from 'infrastructure/openAI/openAI.service'

type TranslateSentencesInput = {
	bookAuthor: null | string
	bookName: null | string
	sentences: string[]
}

export class TranslateSentencesCommand implements ICommand {
	constructor(
		public userId: number,
		public translateSentencesInput: TranslateSentencesInput,
	) {}
}

// Принимает данные для анализа фразы и через OpenAI получает перевод и анализ фразы.
// Снимает с пользователя баланс за перевод.
// Возвращает перевод и анализ фразы.
@CommandHandler(TranslateSentencesCommand)
export class TranslateSentencesHandler implements ICommandHandler<TranslateSentencesCommand> {
	constructor(
		private openAIService: OpenAIService,
		private commandBus: CommandBus,
	) {}

	async execute(command: TranslateSentencesCommand) {
		const { userId, translateSentencesInput } = command

		// Получить перевод предложений через OpenAI.
		const translates = await this.getAnalysis(userId, translateSentencesInput)
		if (!translates) {
			throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
		}

		return translates
	}

	/**
	 * Запрашивает перевод предложений через OpenAI.
	 * @param userId — user id who make a request to OpenAI
	 * @param translateSentencesInput — данные для анализа предложений.
	 */
	async getAnalysis(userId: number, translateSentencesInput: TranslateSentencesInput) {
		// Подготовка данных для передачи в OpenAI.
		const messages = this.getAnalysisTask(translateSentencesInput)

		// Запрос на анализ текстов
		const aiResult = await this.openAIService.generateText({
			model: OpenAIModels.Nano,
			messages,
			reasoningEffort: 'low',
			responseFormat: {
				type: 'json_object',
			},
		})

		// Снять с баланса пользователя плату за использованные токены.
		await this.commandBus.execute(
			new TokenUsageBalanceChargeCommand({
				userId,
				aiModelName: OpenAIModels.Nano,
				inputTokens: aiResult.inputTokens,
				outputTokens: aiResult.outputTokens,
			}),
		)

		// Convert fetched data into expected format
		return this.getAnalysisParsedData(aiResult.message)
	}

	/**
	 * Формирует задачу для передачи в OpenAI.
	 * @param translateSentencesInput — данные для анализа предложения и фразы.
	 */
	getAnalysisTask(
		translateSentencesInput: TranslateSentencesInput,
	): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
		const firstTaskSentenceMapper = {
			bookName_bookAuthor: 'Есть глава книги "{BookName}" автора {BookAuthor}.',
			bookName_: 'Есть глава книги "{BookName}".',
			_bookAuthor: 'Книга автора {BookAuthor}.',
			_: 'Есть глава книги.',
		}

		const firstTaskSentence =
			firstTaskSentenceMapper[
				`${translateSentencesInput.bookName ? 'bookName' : ''}_${translateSentencesInput.bookAuthor ? 'bookAuthor' : ''}`
			]

		const sentences = translateSentencesInput.sentences.join('\n')

		const taskText =
			firstTaskSentence +
			' Есть предложения этой главы. Каждое предложение начинается с новой строки. Сформируй JSON-объект со свойством "translates" где в значении массив строк. Каждая строка — это перевод отдельного предложения. Он должен быть как можно более близким к оригинальному тексту, но в рамках русского языка.'

		return [
			{
				role: 'system',
				content: taskText,
			},
			{
				role: 'user',
				content: sentences,
			},
		]
	}

	/*
	 * Разбирает и проверяет ответ от OpenAI. Возвращает объект с подготовленными полями.
	 * @param aiResultMessage — ответ от OpenAI

	 */
	getAnalysisParsedData(aiResultMessage: null | string) {
		// Схема для проверки сообщения через zod
		const VerificationSchema = z
			.object({
				translates: z.array(z.string()),
			})
			.strict()

		// В result.message ожидается строка JSON — преобразуем её в объект
		let parsedMessage: unknown
		try {
			parsedMessage = JSON.parse(aiResultMessage as string)
		} catch (e) {
			return null
		}

		const validation = VerificationSchema.safeParse(parsedMessage)
		if (!validation.success) return null

		return validation.data as z.infer<typeof VerificationSchema>
	}
}
