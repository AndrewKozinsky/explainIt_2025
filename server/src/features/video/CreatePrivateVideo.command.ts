import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { VideoBase } from 'features/video/VideoBase'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { CreateVideoPrivateOutModel } from 'models/videoPrivate/createVideoPrivate.out.model'
import { LanguageCode } from 'prisma/generated/enums'

export type CreatePrivateVideoInput = {
	name?: null | string
	originalContent?: null | string
	fileSizeMb?: number
	languageCode?: null | LanguageCode
}

export class CreatePrivateVideoCommand implements ICommand {
	constructor(
		public userId: number,
		public createVideoInput: CreatePrivateVideoInput,
	) {}
}

@CommandHandler(CreatePrivateVideoCommand)
export class CreatePrivateVideoHandler extends VideoBase implements ICommandHandler<CreatePrivateVideoCommand> {
	constructor(
		private videoRepository: VideoPrivateRepository,
		private sentenceRepository: SentenceRepository,
		private subtitleRepository: SubtitleRepository,
		private subtitleSentenceInitRepository: SubtitleSentenceInitRepository,
		private dbRepository: DBRepository,
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	async execute(command: CreatePrivateVideoCommand): Promise<CreateVideoPrivateOutModel> {
		const { userId, createVideoInput } = command

		const preparedContentResult = this.prepareTextContentForSaving({
			originalContent: createVideoInput.originalContent,
			previousProcessedContent: null,
		})

		const createdVideo = await this.dbRepository.wrapIntoPrismaTransaction({
			executableCode: async () => {
				const newVideo = await this.videoRepository.createVideo({
					userId,
					name: createVideoInput.name,
					languageCode: createVideoInput.languageCode,
					originalContent: preparedContentResult.originalContentForVideoUpdate,
					processedContent: preparedContentResult.processedContentForVideoUpdate,
					contentType: preparedContentResult.contentTypeForVideoUpdate,
					fileSizeMb: createVideoInput.fileSizeMb,
				})

				if (!newVideo) {
					throw new CustomGraphQLError(errorMessage.video.notCreated, ErrorCode.InternalServerError_500)
				}

				if (preparedContentResult.processedContent !== null) {
					if (preparedContentResult.subtitles) {
						await this.saveSubtitlesSentencesAndInit({
							videoType: 'private',
							videoId: newVideo.id,
							preparedContent: preparedContentResult.processedContent,
							subtitles: preparedContentResult.subtitles,
							sentenceRepository: this.sentenceRepository,
							subtitleRepository: this.subtitleRepository,
							subtitleSentenceInitRepository: this.subtitleSentenceInitRepository,
						})
					} else {
						await generateSentencesAndSaveToDB({
							mainConfigService: this.mainConfig,
							sentenceRepository: this.sentenceRepository,
							processedContent: preparedContentResult.processedContent,
							videoPrivateId: newVideo.id,
						})
					}
				}

				return newVideo
			},
		})

		if (!createdVideo) {
			throw new CustomGraphQLError(errorMessage.video.notCreated, ErrorCode.InternalServerError_500)
		}

		return createdVideo
	}
}
