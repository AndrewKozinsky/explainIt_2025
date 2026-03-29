import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { VideoPublicQueryRepository } from 'repo/video/videoPublic.queryRepository'
import { VideoPublicRepository } from 'repo/video/videoPublic.repository'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { VideoBase } from 'features/video/VideoBase'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { UpdateVideoPublicOutModel } from 'models/videoPublic/updateVideoPublic.out.model'

export type UpdatePublicVideoInput = {
	id: number
	name?: string
	note?: string
	year: number
	covers?: string[]
	originalContent?: string
	fileName?: string
	fileS3Key?: string
}

export class UpdatePublicVideoCommand implements ICommand {
	constructor(public updateVideoInput: UpdatePublicVideoInput) {}
}

@CommandHandler(UpdatePublicVideoCommand)
export class UpdatePublicVideoHandler extends VideoBase implements ICommandHandler<UpdatePublicVideoCommand> {
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

	async execute(command: UpdatePublicVideoCommand): Promise<UpdateVideoPublicOutModel> {
		const { updateVideoInput } = command

		const videoForUpdating = await this.videoQueryRepository.getVideoById(updateVideoInput.id)
		if (!videoForUpdating) {
			throw new CustomGraphQLError(errorMessage.video.notFound, ErrorCode.NotFound_404)
		}

		const preparedContentResult = this.prepareTextContentForSaving({
			originalContent: updateVideoInput.originalContent,
			previousProcessedContent: videoForUpdating.processedContent,
		})

		const nameForUpdate = updateVideoInput.name ?? videoForUpdating.name
		const fileNameForUpdate = updateVideoInput.fileName ?? videoForUpdating.fileName
		const fileS3KeyForUpdate = updateVideoInput.fileS3Key ?? videoForUpdating.fileS3Key
		const s3ProviderNameForUpdate = 'cloudRu'

		const originalContentForUpdate =
			preparedContentResult.originalContentForVideoUpdate === undefined
				? videoForUpdating.originalContent
				: preparedContentResult.originalContentForVideoUpdate
		const processedContentForUpdate =
			preparedContentResult.processedContentForVideoUpdate === undefined
				? videoForUpdating.processedContent
				: preparedContentResult.processedContentForVideoUpdate
		const contentTypeForUpdate =
			preparedContentResult.contentTypeForVideoUpdate === undefined
				? videoForUpdating.contentType
				: preparedContentResult.contentTypeForVideoUpdate

		if (nameForUpdate === null || fileNameForUpdate === null || fileS3KeyForUpdate === null) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}
		if (originalContentForUpdate === null || processedContentForUpdate === null) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		if (preparedContentResult.shouldUpdateRelatedTextData) {
			await this.dbRepository.wrapIntoPrismaTransaction({
				executableCode: async () => {
					await this.subtitleSentenceInitRepository.deleteByVideoPublicId(updateVideoInput.id)
					await this.subtitleRepository.deleteByVideoPublicId(updateVideoInput.id)
					await this.sentenceRepository.deleteByVideoPublicId(updateVideoInput.id)

					if (preparedContentResult.processedContent !== null) {
						if (preparedContentResult.subtitles) {
							await this.saveSubtitlesSentencesAndInit({
								videoType: 'public',
								videoId: updateVideoInput.id,
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
								videoPublicId: updateVideoInput.id,
							})
						}
					}
				},
			})
		}

		const updatedVideo = await this.videoRepository.updateVideoById(updateVideoInput.id, {
			name: nameForUpdate,
			note: updateVideoInput.note,
			year: updateVideoInput.year,
			covers: updateVideoInput.covers,
			originalContent: originalContentForUpdate,
			processedContent: processedContentForUpdate,
			contentType: contentTypeForUpdate,
			fileName: fileNameForUpdate,
			fileS3Key: fileS3KeyForUpdate,
			s3ProviderName: s3ProviderNameForUpdate,
		})

		if (!updatedVideo) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return {
			id: updatedVideo.id,
			name: updatedVideo.name,
			year: updatedVideo.year,
			languageCode: updatedVideo.languageCode,
			originalContent: updatedVideo.originalContent,
			processedContent: updatedVideo.processedContent,
			contentType: updatedVideo.contentType,
			fileName: updatedVideo.fileName,
			fileS3Key: updatedVideo.fileS3Key,
		}
	}
}
