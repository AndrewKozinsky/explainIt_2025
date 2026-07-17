import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoRepository } from 'repo/video/video.repository'
import { Language } from 'utils/languages'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { VideoBase } from 'features/video/VideoBase'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { VideoOutModel } from 'models/video/video.out.model'

export type CreatePublicVideoInput = {
	videoCollectionId: number
	name: string
	note: string
	originalContent: string
	languageCode: Language
	fileName: string
	fileS3Key: string
}

export class CreatePublicVideoCommand implements ICommand {
	constructor(public createVideoInput: CreatePublicVideoInput) {}
}

@CommandHandler(CreatePublicVideoCommand)
export class CreatePublicVideoHandler extends VideoBase implements ICommandHandler<CreatePublicVideoCommand> {
	constructor(
		private videoRepository: VideoRepository,
		private videoQueryRepository: VideoQueryRepository,
		private sentenceRepository: SentenceRepository,
		private subtitleRepository: SubtitleRepository,
		private subtitleSentenceInitRepository: SubtitleSentenceInitRepository,
		private dbRepository: DBRepository,
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	async execute(command: CreatePublicVideoCommand): Promise<VideoOutModel> {
		const { createVideoInput } = command

		const preparedContentResult = this.prepareTextContentForSaving({
			originalContent: createVideoInput.originalContent,
			previousProcessedContent: null,
		})

		if (
			preparedContentResult.originalContentForVideoUpdate === undefined ||
			preparedContentResult.originalContentForVideoUpdate === null ||
			preparedContentResult.processedContentForVideoUpdate === undefined ||
			preparedContentResult.processedContentForVideoUpdate === null ||
			preparedContentResult.contentTypeForVideoUpdate === undefined
		) {
			throw new CustomError(errorMessage.video.notCreated, ErrorStatusCode.BadRequest_400)
		}

		const createdVideo = await this.dbRepository.wrapIntoPrismaTransaction({
			executableCode: async () => {
				const newVideo = await this.videoRepository.createVideo({
					videoCollectionId: createVideoInput.videoCollectionId,
					name: createVideoInput.name,
					note: createVideoInput.note,
					originalContent: preparedContentResult.originalContentForVideoUpdate!,
					processedContent: preparedContentResult.processedContentForVideoUpdate!,
					contentType: preparedContentResult.contentTypeForVideoUpdate,
					fileName: createVideoInput.fileName,
					fileS3Key: createVideoInput.fileS3Key,
					s3ProviderName: 'cloudRu',
				})

				if (!newVideo) {
					throw new CustomError(errorMessage.video.notCreated, ErrorStatusCode.InternalServerError_500)
				}

				if (preparedContentResult.processedContent !== null) {
					if (preparedContentResult.subtitles) {
						await this.saveSubtitlesSentencesAndInit({
							videoId: newVideo.id,
							preparedContent: preparedContentResult.processedContent,
							languageCode: createVideoInput.languageCode,
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
							languageCode: createVideoInput.languageCode,
							videoId: newVideo.id,
						})
					}
				}

				return newVideo
			},
		})

		if (!createdVideo) {
			throw new CustomError(errorMessage.video.notCreated, ErrorStatusCode.InternalServerError_500)
		}

		const video = await this.videoQueryRepository.getVideoById(createdVideo.id)
		if (!video) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.InternalServerError_500)
		}

		return video
	}
}
