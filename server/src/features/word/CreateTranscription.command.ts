import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { TranscriptionQueryRepository } from 'repo/transcription.queryRepository'
import { TranscriptionRepository } from 'repo/transcription.repository'
import { WordQueryRepository } from 'repo/word.queryRepository'
import { DeepSeekService } from 'infrastructure/deepSeek/deepSeek.service'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { LanguageCode } from 'prisma/generated/enums'

export class CreateTranscriptionCommand implements ICommand {
	constructor(public wordId: number) {}
}

@CommandHandler(CreateTranscriptionCommand)
export class CreateTranscriptionHandler implements ICommandHandler<CreateTranscriptionCommand> {
	constructor(
		private wordQueryRepository: WordQueryRepository,
		private transcriptionRepository: TranscriptionRepository,
		private transcriptionQueryRepository: TranscriptionQueryRepository,
		private deepSeekService: DeepSeekService,
	) {}

	async execute(command: CreateTranscriptionCommand) {
		const { wordId } = command

		// Этот класс нужно дополнить для китайского и японского языков. Для китайского языка нужно добавить pinyin, для японского - hiragana и katakana.
		// Узнай подробности.

		const word = await this.wordQueryRepository.getWordById(wordId)
		if (!word) {
			throw new CustomGraphQLError(errorMessage.word.notFound, ErrorCode.NotFound_404)
		}

		if (word.transcription) {
			throw new CustomGraphQLError(errorMessage.transcription.alreadyExists, ErrorCode.BadRequest_400)
		}

		const transcription = await this.getTranscriptionFromDeepSeek(word.word, word.languageCode)

		const created = await this.transcriptionRepository.createTranscription({
			wordId,
			ipa: transcription.ipa,
			pinyin: transcription.pinyin,
		})

		return await this.transcriptionQueryRepository.getTranscriptionById(created.id)
	}

	private async getTranscriptionFromDeepSeek(word: string, languageCode: LanguageCode) {
		// const isChinese = languageCode === LanguageCode.zhCMN

		/*const { systemPrompt, userPrompt } = isChinese
			? {
					systemPrompt:
						'You are a linguistics expert. Return a JSON object with pinyin for the given Chinese word. ' +
						'The JSON must have one field: "pinyin" (string). ' +
						'Return only valid JSON, no extra text.',
					userPrompt: `Provide the pinyin for the Chinese word "${word}".`,
				}
			: {
					systemPrompt:
						'You are a linguistics expert. Return a JSON object with IPA transcription for the given word. ' +
						'The JSON must have one field: "ipa" (string, IPA transcription without slashes at the beginning and end). ' +
						'Return only valid JSON, no extra text.',
					userPrompt: `Provide the IPA transcription for the word "${word}" in language "${languageCode}".`,
				}*/

		let systemPrompt =
			'You are a linguistics expert. Return a JSON object with IPA transcription for the given word. ' +
			'The JSON must have one field: "ipa" (string, IPA transcription without slashes at the beginning and end). ' +
			'Return only valid JSON, no extra text.'

		const userPrompt = `Provide the IPA transcription for the word "${word}" in language "${languageCode}".`

		const response = await this.deepSeekService.generateText({
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt },
			],
			responseFormat: { type: 'json_object' },
		})

		if (!response.message) {
			throw new CustomGraphQLError(
				errorMessage.transcription.cannotGetTranscriptionFromLLM,
				ErrorCode.InternalServerError_500,
			)
		}

		try {
			const parsed = JSON.parse(response.message) as { ipa?: string; pinyin?: string }

			const ipa = parsed.ipa ? parsed.ipa.replace(/^\/|\/$/g, '') : null

			return {
				ipa,
				pinyin: null,
			}
		} catch {
			throw new CustomGraphQLError(
				errorMessage.transcription.cannotGetTranscriptionFromLLM,
				ErrorCode.InternalServerError_500,
			)
		}
	}
}
