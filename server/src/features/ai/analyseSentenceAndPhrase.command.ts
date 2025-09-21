import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import OpenAI from 'openai'
import { z } from 'zod'
import { CustomGraphQLError } from 'src/infrastructure/exceptions/customErrors'
import { ErrorCode } from 'src/infrastructure/exceptions/errorCode'
import { errorMessage } from 'src/infrastructure/exceptions/errorMessage'
import { OpenAIModels, OpenAIService } from 'src/infrastructure/openAI/openAI.service'

type AnalyseSentenceAndPhraseInput = {
	bookAuthor: null | string
	bookName: null | string
	context: string
	sentence: string
	phrase: string
}

export class AnalyseSentenceAndPhraseCommand implements ICommand {
	constructor(public analyseSentenceAndPhraseInput: AnalyseSentenceAndPhraseInput) {}
}

@CommandHandler(AnalyseSentenceAndPhraseCommand)
export class AnalyseSentenceAndPhraseHandler implements ICommandHandler<AnalyseSentenceAndPhraseCommand> {
	constructor(private openAIService: OpenAIService) {}

	async execute(command: AnalyseSentenceAndPhraseCommand) {
		const { analyseSentenceAndPhraseInput } = command

		// Получить перевод предложения и перевод и анализ фразы через OpenAI.
		console.log(444)
		const analysis = await this.getAnalysis(analyseSentenceAndPhraseInput)
		if (!analysis) {
			throw new CustomGraphQLError(
				errorMessage.bookChapter.cannotAnalyzeSentenceAndPhrase,
				ErrorCode.InternalServerError_500,
			)
		}
		console.log(analysis)

		// Снять с баланса пользователя плату за использованные токены.

		return {
			id: 1,
			sentenceTranslation: 'sentenceTranslation',
		}
	}

	/**
	 * Запрашивает перевод предложения и перевод и анализ фразы через OpenAI.
	 * @param analyseSentenceAndPhraseInput — данные для анализа предложения и фразы.
	 */
	async getAnalysis(analyseSentenceAndPhraseInput: AnalyseSentenceAndPhraseInput) {
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
		if (!aiResult) return null

		// Convert fetched data into expected format
		return this.getAnalysisParsedData(aiResult)
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
	 * @param aiResult — ответ от OpenAI
	 */
	getAnalysisParsedData(aiResult: { inputTokens: number; outputTokens: number; message: string }) {
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
			parsedMessage = JSON.parse(aiResult.message)
		} catch (e) {
			return null
		}

		const validation = AnalysisMessageSchema.safeParse(parsedMessage)
		if (!validation.success) return null

		return { ...aiResult, message: validation.data as z.infer<typeof AnalysisMessageSchema> }
	}
}
