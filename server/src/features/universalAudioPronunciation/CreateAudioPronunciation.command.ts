import { randomUUID } from 'crypto'
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalAudioPronunciationRepository } from 'repo/audioPronunciation.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { GoogleTtsService } from 'infrastructure/googleTts/googleTts.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { LanguageCode } from 'prisma/generated/client'

export class CreateUniversalAudioPronunciationCommand implements ICommand {
	constructor(public universalPhraseId: number) {}
}

@CommandHandler(CreateUniversalAudioPronunciationCommand)
export class CreateUniversalAudioPronunciationHandler implements ICommandHandler<CreateUniversalAudioPronunciationCommand> {
	constructor(
		private universalPhraseQueryRepository: UniversalPhraseQueryRepository,
		private audioPronunciationRepository: UniversalAudioPronunciationRepository,
		private googleTtsService: GoogleTtsService,
		private cloudRuS3Service: CloudRuS3Service,
		private mainConfig: MainConfigService,
	) {}

	async execute(
		command: CreateUniversalAudioPronunciationCommand,
	): Promise<{ id: number; universalPhraseId: number; audioUrl: string }> {
		const { universalPhraseId } = command

		const phrase = await this.universalPhraseQueryRepository.getUniversalPhraseById(universalPhraseId)
		if (!phrase) {
			throw new CustomError(errorMessage.universalPhrase.notFound, ErrorCode.NotFound_404)
		}

		if (phrase.audioPronunciation) {
			throw new CustomError(errorMessage.audioPronunciation.alreadyExists, ErrorCode.BadRequest_400)
		}

		const audioBuffer = await this.googleTtsService.generateAudio(
			phrase.phrase,
			phrase.languageCode as LanguageCode,
		)

		const s3Key = this.buildS3Key(phrase.languageCode as LanguageCode)
		await this.cloudRuS3Service.uploadFile(s3Key, audioBuffer, 'audio/ogg')

		const created = await this.audioPronunciationRepository.createAudioPronunciation({
			universalPhraseId,
			s3Key,
		})

		const audioUrl = await this.cloudRuS3Service.getFileUrl(s3Key)
		return { id: created.id, universalPhraseId, audioUrl }
	}

	private buildS3Key(languageCode: LanguageCode): string {
		const workingMode = this.mainConfig.get().mode!
		const folder = ['localdev', 'localtest', 'localcheckserver'].includes(workingMode)
			? 'pronunciationsDev'
			: 'pronunciations'

		return `${folder}/${languageCode}/${randomUUID()}.ogg`
	}
}
