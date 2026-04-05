// import { randomUUID } from 'crypto'
// import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
// import { parseBuffer } from 'music-metadata'
// import { AudioPronunciationQueryRepository } from 'repo/audioPronunciation.queryRepository'
// import { AudioPronunciationRepository } from 'repo/audioPronunciation.repository'
// import { VoiceRepository } from 'repo/voice.repository'
// import { WordQueryRepository } from 'repo/word.queryRepository'
// import { languages } from 'utils/languages'
// import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
// import { ElevenLabsService } from 'infrastructure/elevenLabs/elevenLabs.service'
// import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
// import { ErrorCode } from 'infrastructure/exceptions/errorCode'
// import { errorMessage } from 'infrastructure/exceptions/errorMessage'
// import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
// import { LanguageCode } from 'prisma/generated/client'

/*export class CreateAudioPronunciationCommand implements ICommand {
	constructor(public wordId: number) {}
}*/

/*@CommandHandler(CreateAudioPronunciationCommand)
export class CreateAudioPronunciationHandler implements ICommandHandler<CreateAudioPronunciationCommand> {
	constructor(
		private wordQueryRepository: WordQueryRepository,
		private voiceRepository: VoiceRepository,
		private audioPronunciationRepository: AudioPronunciationRepository,
		private audioPronunciationQueryRepository: AudioPronunciationQueryRepository,
		private elevenLabsService: ElevenLabsService,
		private cloudRuS3Service: CloudRuS3Service,
		private mainConfig: MainConfigService,
	) {}

	async execute(command: CreateAudioPronunciationCommand) {
		const { wordId } = command

		const word = await this.wordQueryRepository.getWordById(wordId)
		if (!word) {
			throw new CustomGraphQLError(errorMessage.word.notFound, ErrorCode.NotFound_404)
		}

		const voice = await this.voiceRepository.getVoiceByLanguageCode(word.languageCode as LanguageCode)
		if (!voice) {
			throw new CustomGraphQLError(errorMessage.elevenLabs.voiceNotFound, ErrorCode.InternalServerError_500)
		}

		const audioBuffer = await this.elevenLabsService.generateAudio(word.word, word.languageCode)

		const duration = await this.getAudioDurationMs(audioBuffer)

		const fileKey = this.buildS3FileKey(word.languageCode)
		const bucketUrl = this.mainConfig.get().cloudRu.s3.bucketUrl

		await this.cloudRuS3Service.uploadFile(fileKey, audioBuffer, 'audio/mpeg')

		const audioUrl = `${bucketUrl}/${fileKey}`

		const created = await this.audioPronunciationRepository.createAudioPronunciation({
			wordId,
			voiceId: voice.id,
			audioUrl,
			duration,
		})

		return await this.audioPronunciationQueryRepository.getAudioPronunciationById(created.id)
	}

	private buildS3FileKey(languageCode: LanguageCode): string {
		const workingMode = this.mainConfig.get().mode!
		const audioFolderName = ['localdev', 'localtest', 'localcheckserver'].includes(workingMode)
			? 'pronunciationsDev'
			: 'pronunciations'

		const languageFolder = languages[languageCode].nameEng
		const fileName = `${randomUUID()}.mp3`

		return `${audioFolderName}/${languageFolder}/${fileName}`
	}

	private async getAudioDurationMs(buffer: Buffer): Promise<number> {
		try {
			const metadata = await parseBuffer(new Uint8Array(buffer), { mimeType: 'audio/mpeg' })
			return Math.round((metadata.format.duration ?? 0) * 1000)
		} catch {
			return 0
		}
	}
}*/
