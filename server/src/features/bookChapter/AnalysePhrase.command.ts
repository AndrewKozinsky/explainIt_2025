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

type AnalysePhraseInput = {
	bookChapterId: number
	bookAuthor: null | string
	bookName: null | string
	context: string
	sentenceId: number
	sentence: string
	phrase: string
	phraseWordsIdx: number[]
}

export class AnalysePhraseCommand implements ICommand {
	constructor(
		public userId: number,
		public analysePhraseInput: AnalysePhraseInput,
	) {}
}

// Принимает данные для анализа фразы и через OpenAI получает перевод и анализ фразы.
// Снимает с пользователя баланс за перевод.
// Возвращает перевод и анализ фразы.
@CommandHandler(AnalysePhraseCommand)
export class AnalysePhraseHandler implements ICommandHandler<AnalysePhraseCommand> {
	constructor(
		private openAIService: OpenAIService,
		private commandBus: CommandBus,
		private bookChapterPhraseRepository: BookChapterPhraseRepository,
		private bookChapterPhraseQueryRepository: BookChapterPhraseQueryRepository,
		private bookChapterPhraseExampleRepository: BookChapterPhraseExampleRepository,
	) {}

	async execute(command: AnalysePhraseCommand) {
		const { userId, analysePhraseInput } = command

		// Получить перевод предложения и перевод и анализ фразы через OpenAI.
		const analysis = await this.getAnalysis(userId, analysePhraseInput)
		if (!analysis) {
			throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
		}

		// Записать в БД перевод фразы
		const createPhraseRes = await this.bookChapterPhraseRepository.createBookChapterPhrase({
			bookChapterId: analysePhraseInput.bookChapterId,
			sentenceId: analysePhraseInput.sentenceId,
			sentence: analysePhraseInput.sentence,
			transcription: analysis.transcription,
			phrase: analysePhraseInput.phrase,
			phraseWordsIdx: analysePhraseInput.phraseWordsIdx,
			phraseTranslation: analysis.translate,
			phraseAnalysis: analysis.analysis,
		})

		// Save phrase examples
		for (let i = 0; i < analysis.examples.length; i++) {
			const phraseExample = analysis.examples[i]

			await this.bookChapterPhraseExampleRepository.createPhraseExample({
				bookChapterPhraseId: createPhraseRes.id,
				sentence: phraseExample.sentence,
				translation: phraseExample.translation,
			})
		}

		const phraseOutRes = await this.bookChapterPhraseQueryRepository.getPhraseById(createPhraseRes.id)
		if (!phraseOutRes) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return phraseOutRes
	}

	/**
	 * Запрашивает перевод предложения и перевод и анализ фразы через OpenAI.
	 * @param userId — user id who make a request to OpenAI
	 * @param analysePhraseInput — данные для анализа предложения и фразы.
	 */
	async getAnalysis(userId: number, analysePhraseInput: AnalysePhraseInput) {
		// Подготовка данных для передачи в OpenAI.
		const messages = this.getAnalysisTask(analysePhraseInput)

		// Запрос на анализ текстов
		const aiResult = await this.openAIService.generateText({
			model: OpenAIModels.Mini,
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
				aiModelName: OpenAIModels.Mini,
				inputTokens: aiResult.inputTokens,
				outputTokens: aiResult.outputTokens,
			}),
		)

		// Convert fetched data into expected format
		return this.getAnalysisParsedData(aiResult.message)
	}

	/**
	 * Формирует задачу для передачи в OpenAI.
	 * @param analysePhraseInput — данные для анализа предложения и фразы.
	 */
	getAnalysisTask(analysePhraseInput: AnalysePhraseInput): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
		const fieldsMapper = {
			bookName_bookAuthor: 'BookAuthor, BookName,',
			bookName_: 'BookName,',
			_bookAuthor: 'BookAuthor,',
			_: '',
		}
		const fields =
			fieldsMapper[
				`${analysePhraseInput.bookName ? 'bookName' : ''}_${analysePhraseInput.bookAuthor ? 'bookAuthor' : ''}`
			]

		const systemPrompt = `You are an experienced English teacher explaining vocabulary to Russian-speaking learners (CEFR B1–B2).
You will receive a JSON object with fields ${fields} Sentence, Phrase and Context. Use these data as context from a literary text.

Think in English first. Analyze the meaning, nuance, usage, collocations, and style of the expression Phrase in English.
Then explain everything in Russian, in a friendly and well-structured teaching style.

You must answer strictly in the following JSON format:
{
  "transcription": "...",
  "translate": "...",
  "analysis": "...",
  "examples": [
    {"sentence": "...", "translation": "..."},
    {"sentence": "...", "translation": "..."},
    {"sentence": "...", "translation": "..."}
  ]
}

Field requirements:
- transcription: phonetic transcription of Phrase in American English.
- translate: a short dictionary-style translation into Russian of only the words from Phrase. Do not write the part of speech. Do not translate any other words from the context. The context is used only to choose the correct sense of the words in Phrase.
- analysis: an extended but clear explanation in Russian, written for a learner, in the form of a small mini-lesson. Make sure to:
  1) Briefly explain the meaning of Phrase in the context of Sentence (what it means here in Russian).
  2) Explain how Phrase is typically used: how frequent it is, whether it sounds conversational or more literary/formal, and which typical constructions or collocations it appears in (for example, fixed expressions like "in the midst of ..."). If Phrase is a verb, briefly explain what kind of action it emphasizes (process, result, force, control, duration).
  3) Compare Phrase with 1–2 close synonyms and clearly explain the difference in tone or usage (for example, middle / center).
  4) When relevant, briefly describe the mental image or feeling that this word or phrase creates in the scene.
  5) Keep the analysis concise but informative (about 120–180 words).
  6) Write in Russian in a simple, friendly style for a person who is learning English, and break the text into small paragraphs or numbered points so that everything feels clearly organized.
- examples: three different example sentences using Phrase in other contexts (do not copy Sentence), each with a translation of the whole sentence into Russian.`

		return [
			{
				role: 'system',
				content: systemPrompt,
			},
			{
				role: 'user',
				content: JSON.stringify(
					{
						BookAuthor: analysePhraseInput.bookAuthor,
						BookName: analysePhraseInput.bookName,
						Sentence: analysePhraseInput.sentence,
						Phrase: analysePhraseInput.phrase,
						Context: analysePhraseInput.context,
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
				transcription: z.string(),
				translate: z.string(),
				analysis: z.string(),
				examples: z.array(
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
