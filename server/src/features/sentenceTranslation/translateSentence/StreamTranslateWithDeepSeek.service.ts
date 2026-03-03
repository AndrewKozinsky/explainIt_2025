import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { DeepSeekTokenUsageBalanceChargeCommand } from 'features/payment/DeepSeekTokenUsageBalanceCharge.command'
import { DeepSeekService } from 'infrastructure/deepSeek/deepSeek.service'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { StreamTranslateProviderInput, TranslateSentenceStreamEvent } from './TranslateSentence.command'

@Injectable()
export class StreamTranslateWithDeepSeek {
	constructor(
		private deepSeekService: DeepSeekService,
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private commandBus: CommandBus,
	) {}

	async *streamTranslate(input: StreamTranslateProviderInput): AsyncGenerator<TranslateSentenceStreamEvent> {
		const messages = this.getDeepSeekTranslationTask({
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
			videoYear: input.videoYear,
		})

		type TokenUsage = { inputTokens: number; outputTokens: number }
		let tokenUsage: TokenUsage | null = null
		let fullText = ''
		let lastPersistAtMs = 0

		const draftSentenceTranslation = await this.sentenceTranslationRepository.createSentenceTranslation({
			sentenceId: input.sentenceId,
			translation: '',
			analysis: null,
		})

		try {
			for await (const chunk of this.deepSeekService.generateTextStreamChunks({
				messages: [
					...messages,
					{
						role: 'user',
						content: input.text,
					},
				],
				abortSignal: input.abortSignal,
				onUsage: (usage) => {
					tokenUsage = usage ?? null
				},
				lowPriority: input.lowPriority,
			})) {
				fullText += chunk
				yield { type: 'chunk', text: chunk }

				const nowMs = Date.now()
				if (nowMs - lastPersistAtMs >= 750) {
					const partialResult = this.parsePartialTranslationAndAnalysis(fullText)
					if (partialResult) {
						await this.sentenceTranslationRepository.updateSentenceTranslationById(
							draftSentenceTranslation.id,
							{
								translation: partialResult.translation,
								analysis: partialResult.analysis,
							},
						)
						lastPersistAtMs = nowMs
					}
				}
			}

			const parsedResult = this.parseTranslationAndAnalysis(fullText)
			if (!parsedResult) {
				throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
			}

			await this.sentenceTranslationRepository.updateSentenceTranslationById(draftSentenceTranslation.id, {
				translation: parsedResult.translation,
				analysis: parsedResult.analysis,
			})
		} catch (error) {
			await this.sentenceTranslationRepository.deleteSentenceTranslationById(draftSentenceTranslation.id)
			throw error
		}

		if (input.chargeAfterTranslation && tokenUsage !== null) {
			const usage: TokenUsage = tokenUsage
			await this.commandBus.execute(
				new DeepSeekTokenUsageBalanceChargeCommand({
					userId: input.userId,
					inputTokens: usage.inputTokens,
					outputTokens: usage.outputTokens,
				}),
			)
		}

		yield { type: 'done' }
	}

	private getDeepSeekTranslationTask(input: {
		sourceLanguageCode: string
		targetLanguageCode: string
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}) {
		return [
			{
				role: 'system',
				content: this.getSecondTranslationTask(input),
			},
		] as const
	}

	private parseTranslationAndAnalysis(message: null | string): null | {
		translation: string
		analysis: null | string
	} {
		if (!message) return null

		const normalized = message.trim()
		if (!normalized) return null

		const parts = normalized.split(/\n\s*\n/)
		const translation = (parts[0] ?? '').trim()
		if (!translation) return null

		const analysis = parts.length > 1 ? parts.slice(1).join('\n\n').trim() : null

		return {
			translation,
			analysis: analysis ? analysis : null,
		}
	}

	private parsePartialTranslationAndAnalysis(message: null | string): null | {
		translation: string
		analysis: null | string
	} {
		if (!message) return null

		const normalized = message.trim()
		if (!normalized) return null

		const parts = normalized.split(/\n\s*\n/)
		const translation = (parts[0] ?? '').trim()
		const analysis = parts.length > 1 ? parts.slice(1).join('\n\n').trim() : null

		return {
			translation,
			analysis: analysis ? analysis : null,
		}
	}

	private getFirstTranslationTask(media: {
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}) {
		return `${this.getTaskIntro(media)}

Обязательные правила (важно)
Первой строкой пиши перевод предложения. Старайся в переводе соблюдать такой же порядок слов что и в оригинальном предложении.
Вторая строка пустая.
Затем переводы каждого слова кроме самых распространённых слов и имен собственных. Группируй слова если они объединяются в неделимую сущность (фразовые глаголы, идеомы, составные предлоги и союзы, коллокации и т.д.).

Далее на своё усмотрение добавь полезные языковые конструкции имеющиеся в предложении.
Если упоминаешь фразовый глагол (например wash away, look around и т.п.) — добавь 2–4 коротких примера с переводом.
Если упоминаешь грамматический шаблон/конструкцию (например as ... as ..., leave + object + adjective, take ... from ..., when + past, enough to, nothing but) — добавь 2–4 примера с переводом.

Не пиши оценочные/эссе‑формулировки:
Не используй фразы вроде «важный глагол», «полезная лексика», «книжное/высокое слово», «точность в пространстве», «кинематографично», «образно/поэтично» и т.п.
Не занимайся «литературной критикой». Только то, что помогает понять английский и перевод.

Стиль оформления:
Используй заголовки/пункты, можно нумерацию.
Английские фразы/слова оформляй в backticks: \`\`like this\`\`.
`
	}

	private getSecondTranslationTask(media: {
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}) {
		return `${this.getTaskIntro(media)}

Первой строкой пиши перевод всего текста.
Вторая строка пустая.

Далее пиши следующую структуру ответа в формате Markdown:

## Слова и выражения
*   **слово/фраза** — перевод.
    *   Короткий пример 1 с переводом.
    *   Короткий пример 2 с переводом.
[Разбирай все значимые слова. Группируй фразовые глаголы и идиомы.]

## Грамматика и конструкции
*   **Название грамматической конструкции/шаблона** — объяснение её функции и значения в этом предложении.
    *   Пример 1 с переводом, иллюстрирующий эту конструкцию.
    *   Пример 2 с переводом.
    *   Пример 3 с переводом.

Правила:
1.  Не пиши вводных или заключительных фраз, оценок ("это важное слово", "красивая метафора"), литературного анализа. Только факты, помогающие понять язык.
2.  Примеры должны быть короткими, релевантными и иллюстрировать именно то значение/конструкцию, которая разбирается.
3.  Английские слова и фразы в тексте ответа оформляй в backticks: \`like this\`.`
	}
	getTaskIntro(media?: { bookName?: string; bookAuthor?: string; videoName?: string; videoYear?: string | number }) {
		if (media?.bookName || media?.bookAuthor) {
			const bookName = media.bookName ?? ''
			const author = media.bookAuthor ?? ''
			const bookDetails = [bookName, author].filter(Boolean).join(' автора ')

			return (
				'Ты — помощник для изучения английского через чтение книги' +
				(bookDetails ? ` ${bookDetails}` : '') +
				'. Ответ присылай в формате Markdown (md)'
			)
		}

		if (media?.videoName || media?.videoYear) {
			const videoName = media.videoName ?? ''
			const year = media.videoYear ? `(${media.videoYear})` : ''
			const details = [videoName, year].filter(Boolean).join(' ')

			return (
				'Ты — помощник для изучения английского через просмотр фильма' +
				(details ? ` ${details}` : '') +
				'. Ответ присылай в формате Markdown (md)'
			)
		}

		return 'Ты — помощник для изучения английского. Ответ присылай в формате Markdown (md)'
	}
}
