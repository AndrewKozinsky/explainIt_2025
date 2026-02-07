import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { VideoPublicQueryRepository } from 'repo/video/videoPublic.queryRepository'
import { VideoPublicRepository } from 'repo/video/videoPublic.repository'
import { Language } from 'utils/languages'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { VideoBase } from 'features/video/VideoBase'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { VideoPublicOutModel } from 'models/videoPublic/videoPublic.out.model'

// TODO: fileName, fileS3Key, fileUrl, originalContent, processedContent are always have value!
export type CreatePublicVideoInput = {
	name?: null | string
	originalContent?: null | string
	languageCode: Language
	year?: null | number
	fileName?: null | string
	fileS3Key?: null | string
}

export class CreatePublicVideoCommand implements ICommand {
	constructor(public createVideoInput: CreatePublicVideoInput) {}
}

@CommandHandler(CreatePublicVideoCommand)
export class CreatePublicVideoHandler extends VideoBase implements ICommandHandler<CreatePublicVideoCommand> {
	constructor(
		private videoRepository: VideoPublicRepository,
		private videoQueryRepository: VideoPublicQueryRepository,
		private sentenceRepository: SentenceRepository,
		private subtitleRepository: SubtitleRepository,
		private subtitleSentenceInitRepository: SubtitleSentenceInitRepository,
		private dbRepository: DBRepository,
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	async execute(command: CreatePublicVideoCommand): Promise<VideoPublicOutModel> {
		const { createVideoInput } = command

		const preparedContentResult = this.prepareTextContentForSaving({
			originalContent: createVideoInput.originalContent,
			previousProcessedContent: null,
		})

		const createdVideo = await this.dbRepository.wrapIntoPrismaTransaction({
			executableCode: async () => {
				const newVideo = await this.videoRepository.createVideo({
					name: createVideoInput.name,
					languageCode: createVideoInput.languageCode,
					year: createVideoInput.year,
					originalContent: preparedContentResult.originalContentForVideoUpdate,
					processedContent: preparedContentResult.processedContentForVideoUpdate,
					contentType: preparedContentResult.contentTypeForVideoUpdate,
					fileName: createVideoInput.fileName,
					fileS3Key: createVideoInput.fileS3Key,
					s3ProviderName: createVideoInput.fileS3Key ? 'cloudRu' : null,
				})

				if (!newVideo) {
					throw new CustomGraphQLError(errorMessage.video.notCreated, ErrorCode.InternalServerError_500)
				}

				if (preparedContentResult.preparedContent !== null) {
					if (preparedContentResult.subtitles) {
						await this.saveSubtitlesSentencesAndInit({
							videoType: 'public',
							videoId: newVideo.id,
							preparedContent: preparedContentResult.preparedContent,
							subtitles: preparedContentResult.subtitles,
							sentenceRepository: this.sentenceRepository,
							subtitleRepository: this.subtitleRepository,
							subtitleSentenceInitRepository: this.subtitleSentenceInitRepository,
						})
					} else {
						await generateSentencesAndSaveToDB({
							mainConfigService: this.mainConfig,
							sentenceRepository: this.sentenceRepository,
							content: preparedContentResult.preparedContent,
							videoPublicId: newVideo.id,
						})
					}
				}

				return newVideo
			},
		})

		if (!createdVideo) {
			throw new CustomGraphQLError(errorMessage.video.notCreated, ErrorCode.InternalServerError_500)
		}

		const video = await this.videoQueryRepository.getVideoById(createdVideo.id)
		if (!video) {
			throw new CustomGraphQLError(errorMessage.video.notFound, ErrorCode.InternalServerError_500)
		}

		return video
	}
}
