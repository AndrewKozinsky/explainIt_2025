import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { SubscriptionBalanceTransactionRepository } from 'repo/subscriptionBalanceTransaction.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { StreamTranslateWithDeepSeek } from './StreamTranslateWithDeepSeek.service'

export type TranslateSentenceInput = {
	userId: number
	sentenceId: number
	text: string
	sourceLanguageCode?: null | string
	targetLanguageCode?: null | string
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}

export type TranslateSentenceResult = {
	translatedText: string
}

export type StreamTranslateProviderInput = {
	userId: number
	sentenceId: number
	text: string
	chargeAfterTranslation: boolean
	sourceLanguageCode: string
	targetLanguageCode: string
	abortSignal?: AbortSignal
	lowPriority?: boolean
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}

export type TranslateSentenceStreamEvent =
	| { type: 'chunk'; text: string }
	| { type: 'done' }
	| { type: 'error'; message: string }

export class TranslateSentenceCommand implements ICommand {
	constructor(public input: TranslateSentenceInput) {}
}

@CommandHandler(TranslateSentenceCommand)
export class TranslateSentenceHandler implements ICommandHandler<TranslateSentenceCommand> {
	constructor(
		private streamTranslateWithDeepSeek: StreamTranslateWithDeepSeek,
		private sentenceRepository: SentenceRepository,
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private subscriptionBalanceTransactionRepository: SubscriptionBalanceTransactionRepository,
	) {}

	async execute(command: TranslateSentenceCommand): Promise<TranslateSentenceResult> {
		const events = this.streamTranslate({ ...command.input })
		let translatedText = ''

		for await (const event of events) {
			if (event.type === 'chunk') {
				translatedText += event.text
			}
			if (event.type === 'error') {
				throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
			}
		}

		return {
			translatedText,
		}
	}

	async *streamTranslate(
		input: TranslateSentenceInput & { abortSignal?: AbortSignal },
	): AsyncGenerator<TranslateSentenceStreamEvent> {
		try {
			const chargeAfterTranslation = await this.shouldChargeAfterTranslationOrThrow({
				sentenceId: input.sentenceId,
			})

			if (chargeAfterTranslation) {
				await this.subscriptionBalanceTransactionRepository.ensureCanTranslatePrivateMediaOrThrow({
					userId: input.userId,
					minBalanceInKopecks: 10,
				})
			}

			const existingTranslation =
				await this.sentenceTranslationRepository.getFirstSentenceTranslationBySentenceId(input.sentenceId)

			if (existingTranslation) {
				throw new CustomGraphQLError(errorMessage.sentenceTranslation.alreadyExists, ErrorCode.BadRequest_400)
			}

			const sourceLanguageCode = input.sourceLanguageCode ?? 'en'
			const targetLanguageCode = input.targetLanguageCode ?? 'ru'

			yield* this.streamTranslateWithDeepSeek.streamTranslate({
				userId: input.userId,
				sentenceId: input.sentenceId,
				text: input.text,
				chargeAfterTranslation,
				sourceLanguageCode,
				targetLanguageCode,
				abortSignal: input.abortSignal,
				lowPriority: true,
				bookName: input.bookName,
				bookAuthor: input.bookAuthor,
				videoName: input.videoName,
				videoYear: input.videoYear,
			})

			return
		} catch (error) {
			console.log('Error in TranslateSentenceHandler => streamTranslate')
			console.error(error)

			const message = error instanceof Error ? error.message : 'Unknown error'
			yield { type: 'error', message }
		}
	}

	private async shouldChargeAfterTranslationOrThrow(input: { sentenceId: number }): Promise<boolean> {
		const sentenceDb = await this.sentenceRepository.getSentenceDbById(input.sentenceId)
		if (!sentenceDb) {
			throw new CustomGraphQLError(errorMessage.sentence.notFound, ErrorCode.NotFound_404)
		}

		const isPublicBook = Boolean(sentenceDb.bookChapter?.book_public_id)
		const isPublicVideo = Boolean(sentenceDb.video_public_id)
		const isPublicMedia = isPublicBook || isPublicVideo

		return !isPublicMedia
	}
}
