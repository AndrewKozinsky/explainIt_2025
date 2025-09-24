import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import OpenAI from 'openai'
import { BookChapterPhraseQueryRepository } from 'src/repo/bookChapterPhrase.queryRepository'
import { BookChapterPhraseRepository } from 'src/repo/bookChapterPhrase.repository'
import { BookChapterPhraseExampleRepository } from 'src/repo/bookChapterPhraseExample.repository'
import { z } from 'zod'
import { TokenUsageBalanceChargeCommand } from 'features/payment/TokenUsageBalanceCharge.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { OpenAIModels, OpenAIService } from 'infrastructure/openAI/openAI.service'

type AnalyseSentenceAndPhraseInput = {
	bookChapterId: number
	bookAuthor: null | string
	bookName: null | string
	context: string
	sentence: string
	phrase: string
}

export class AnalyseSentenceAndPhraseCommand implements ICommand {
	constructor(
		public userId: number,
		public analyseSentenceAndPhraseInput: AnalyseSentenceAndPhraseInput,
	) {}
}

// Принимает данные для анализа предложения и фразы и через OpenAI получает перевод предложения и перевод и анализ фразы.
// Снимает с пользователя баланс за переводы.
// Возвращает перевод предложения и перевод и анализ фразы.
@CommandHandler(AnalyseSentenceAndPhraseCommand)
export class AnalyseSentenceAndPhraseHandler implements ICommandHandler<AnalyseSentenceAndPhraseCommand> {
	constructor(
		private openAIService: OpenAIService,
		private commandBus: CommandBus,
		private bookChapterPhraseRepository: BookChapterPhraseRepository,
		private bookChapterPhraseQueryRepository: BookChapterPhraseQueryRepository,
		private bookChapterPhraseExampleRepository: BookChapterPhraseExampleRepository,
	) {}

	async execute(command: AnalyseSentenceAndPhraseCommand) {
		const { userId, analyseSentenceAndPhraseInput } = command

		// Получить перевод предложения и перевод и анализ фразы через OpenAI.
		const analysis = await this.getAnalysis(userId, analyseSentenceAndPhraseInput)
		if (!analysis) {
			throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
		}

		// Записать в БД перевод фразы
		const createPhraseRes = await this.bookChapterPhraseRepository.createBookChapterPhrase({
			bookChapterId: analyseSentenceAndPhraseInput.bookChapterId,
			sentence: analyseSentenceAndPhraseInput.sentence,
			phrase: analyseSentenceAndPhraseInput.phrase,
			phraseTranslation: analysis.phraseTranslate,
			phraseAnalysis: analysis.phraseAnalysis,
		})

		// Save phrase examples
		for (let i = 0; i < analysis.phraseExamples.length; i++) {
			const phraseExample = analysis.phraseExamples[i]

			await this.bookChapterPhraseExampleRepository.createPhraseExample({
				bookChapterPhraseId: createPhraseRes.id,
				sentence: phraseExample.sentence,
				translate: phraseExample.translation,
			})
		}

		const phraseOutRes = await this.bookChapterPhraseQueryRepository.getPhraseById(createPhraseRes.id)
		if (!phraseOutRes) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return {
			sentenceTranslation: analysis.sentenceTranslate,
			phrase: phraseOutRes,
		}
	}

	/**
	 * Запрашивает перевод предложения и перевод и анализ фразы через OpenAI.
	 * @param userId — user id who make a request to OpenAI
	 * @param analyseSentenceAndPhraseInput — данные для анализа предложения и фразы.
	 */
	async getAnalysis(userId: number, analyseSentenceAndPhraseInput: AnalyseSentenceAndPhraseInput) {
		// Подготовка данных для передачи в OpenAI.
		const messages = this.getAnalysisTask(analyseSentenceAndPhraseInput)

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
	 * @param analyseSentenceAndPhraseInput — данные для анализа предложения и фразы.
	 */
	getAnalysisTask(
		analyseSentenceAndPhraseInput: AnalyseSentenceAndPhraseInput,
	): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
		const firstTaskSentenceMapper = {
			bookName_bookAuthor: 'Предложение {Sentence} в контексте {Context} из книги {BookName} автора {BookAuthor}',
			bookName_: 'Предложение {Sentence} в контексте {Context} из книги {BookName}',
			_bookAuthor: 'Предложение {Sentence} в контексте {Context} из книги автора {BookAuthor}',
			_: 'Предложение {Sentence} в контексте {Context}',
		}

		const firstTaskSentence =
			firstTaskSentenceMapper[
				`${analyseSentenceAndPhraseInput.bookName ? 'bookName' : ''}_${analyseSentenceAndPhraseInput.bookAuthor ? 'bookAuthor' : ''}`
			]

		return [
			{
				role: 'system',
				content: `${firstTaskSentence}. Сформируй JSON:
{"sentenceTranslate": "...", "phraseTranslate": "...", "phraseAnalysis": "...", "phraseExamples": "..."}
- sentenceTranslate: перевод предложения {Sentence} на русский.
- phraseTranslate: ёмкий перевод фразы {Phrase} на русский.
- phraseAnalysis: объяснение фразы в контексте этого предложения.
- examples: Массив из трёх примеров использования фразы в других предложениях с переводом. Например:
[{"sentence": "...", "translation": "..."},{"sentence": "...","translation": "..."},...]`,
			},
			{
				role: 'user',
				content: JSON.stringify(
					{
						BookAuthor: analyseSentenceAndPhraseInput.bookAuthor,
						BookName: analyseSentenceAndPhraseInput.sentence,
						Sentence: analyseSentenceAndPhraseInput.sentence,
						Phrase: analyseSentenceAndPhraseInput.phrase,
						Context: analyseSentenceAndPhraseInput.context,
					},
					(key, value) => {
						return value ? value : undefined
					},
				),
			},
		]
	}

	/**
	 * Разбирает и проверяет ответ от OpenAI. Возвращает объект с подготовленными полями.
	 * @param aiResultMessage — ответ от OpenAI
	 */
	getAnalysisParsedData(aiResultMessage: null | string) {
		// В aiResult.message должна находится строка в формате JSON.
		// После преобразования должен быть объект с ожидаемыми полями. Проверю.

		// Схема для проверки сообщения через zod
		const AnalysisMessageSchema = z
			.object({
				sentenceTranslate: z.string(),
				phraseTranslate: z.string(),
				phraseAnalysis: z.string(),
				phraseExamples: z.array(
					z.object({
						sentence: z.string(),
						translation: z.string(),
					}),
				),
			})
			.strict()

		// В result.message ожидается строка JSON — преобразуем её в объект
		let parsedMessage: unknown
		try {
			parsedMessage = JSON.parse(aiResultMessage as string)
		} catch (e) {
			return null
		}

		const validation = AnalysisMessageSchema.safeParse(parsedMessage)
		if (!validation.success) return null

		return validation.data as z.infer<typeof AnalysisMessageSchema>
	}
}
