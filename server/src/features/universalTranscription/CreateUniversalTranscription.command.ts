import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UniversalTranscriptionQueryRepository } from 'repo/universalTranscription.queryRepository'
import { UniversalTranscriptionRepository } from 'repo/universalTranscription.repository'
import { DeepSeekService } from 'infrastructure/deepSeek/deepSeek.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LanguageCode } from 'prisma/generated/enums'

export class CreateUniversalTranscriptionCommand implements ICommand {
	constructor(public universalPhraseId: number) {}
}

@CommandHandler(CreateUniversalTranscriptionCommand)
export class CreateUniversalTranscriptionHandler implements ICommandHandler<CreateUniversalTranscriptionCommand> {
	constructor(
		private universalPhraseQueryRepository: UniversalPhraseQueryRepository,
		private universalTranscriptionRepository: UniversalTranscriptionRepository,
		private universalTranscriptionQueryRepository: UniversalTranscriptionQueryRepository,
		private deepSeekService: DeepSeekService,
	) {}

	async execute(command: CreateUniversalTranscriptionCommand) {
		const { universalPhraseId } = command

		const phrase = await this.universalPhraseQueryRepository.getUniversalPhraseById(universalPhraseId)
		if (!phrase) {
			throw new CustomError(errorMessage.universalPhrase.notFound, ErrorStatusCode.NotFound_404)
		}

		if (phrase.transcription) {
			throw new CustomError(errorMessage.universalTranscription.alreadyExists, ErrorStatusCode.BadRequest_400)
		}

		const transcription = await this.getTranscriptionFromDeepSeek(phrase.phrase, phrase.languageCode)

		const created = await this.universalTranscriptionRepository.createTranscription({
			universalPhraseId,
			ipa: transcription.ipa,
			pinyin: transcription.pinyin,
		})

		return await this.universalTranscriptionQueryRepository.getTranscriptionById(created.id)
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
			throw new CustomError(
				errorMessage.universalTranscription.cannotGetTranscriptionFromLLM,
				ErrorStatusCode.InternalServerError_500,
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
			throw new CustomError(
				errorMessage.universalTranscription.cannotGetTranscriptionFromLLM,
				ErrorStatusCode.InternalServerError_500,
			)
		}
	}
}
