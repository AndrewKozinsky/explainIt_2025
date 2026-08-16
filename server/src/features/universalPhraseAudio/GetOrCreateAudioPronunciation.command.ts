import { randomUUID } from 'crypto'
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase/universalPhrase.queryRepository'
import { UniversalPhraseAudioQueryRepository } from 'repo/universalPhrase/universalPhraseAudio.queryRepository'
import { UniversalPhraseAudioRepository } from 'repo/universalPhrase/universalPhraseAudio.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { GoogleTtsService } from 'infrastructure/googleTts/googleTts.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { UniversalAudioPronunciationOutModel } from 'models/audioPronunciation/audioPronunciation.out.model'
import { LanguageCode } from 'prisma/generated/client'

export class GetOrCreateUniversalPhraseAudioCommand implements ICommand {
	constructor(public universalPhraseId: number) {}
}

@CommandHandler(GetOrCreateUniversalPhraseAudioCommand)
export class GetOrCreateUniversalPhraseAudioHandler implements ICommandHandler<GetOrCreateUniversalPhraseAudioCommand> {
	constructor(
		private universalPhraseQueryRepository: UniversalPhraseQueryRepository,
		private audioQueryRepository: UniversalPhraseAudioQueryRepository,
		private audioRepository: UniversalPhraseAudioRepository,
		private googleTtsService: GoogleTtsService,
		private cloudflareS3Service: CloudflareS3Service,
		private mainConfig: MainConfigService,
	) {}

	async execute(command: GetOrCreateUniversalPhraseAudioCommand): Promise<UniversalAudioPronunciationOutModel> {
		const { universalPhraseId } = command

		const existingAudio = await this.audioQueryRepository.getAudioByUniversalPhraseId(universalPhraseId)
		if (existingAudio) {
			return existingAudio
		}

		const phrase = await this.universalPhraseQueryRepository.getUniversalPhraseById(universalPhraseId)
		if (!phrase) {
			throw new CustomError(errorMessage.universalPhrase.notFound, ErrorStatusCode.NotFound_404)
		}

		const audioBuffer = await this.googleTtsService.generateAudio(
			phrase.text,
			phrase.sourceLanguageCode as LanguageCode,
		)

		const s3Key = this.buildS3Key(phrase.sourceLanguageCode as LanguageCode)
		await this.cloudflareS3Service.uploadFile(s3Key, audioBuffer, 'audio/ogg')

		await this.audioRepository.createAudio({
			universalPhraseId,
			s3Key,
		})

		return (await this.audioQueryRepository.getAudioByUniversalPhraseId(universalPhraseId))!
	}

	private buildS3Key(languageCode: LanguageCode): string {
		const workingMode = this.mainConfig.get().mode!
		const folder = ['localdev', 'localtest', 'localcheckserver'].includes(workingMode)
			? 'pronunciationsDev'
			: 'pronunciations'

		return `${folder}/${languageCode}/${randomUUID()}.ogg`
	}
}
