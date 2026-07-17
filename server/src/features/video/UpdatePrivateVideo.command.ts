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
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { UpdateVideoOutModel } from 'models/video/updateVideo.out.model'
import { VideoLiteOutModel } from 'models/video/videoLite.out.model'

export type UpdatePrivateVideoInput = {
	id: number
	name?: null | string
	originalContent?: null | string
	fileName?: null | string
	fileMimeType?: null | string
	isFileUploaded?: boolean
	fileSizeMb?: number
	fileDurationSec?: number
}

export class UpdatePrivateVideoCommand implements ICommand {
	constructor(
		public userId: number,
		public updateVideoInput: UpdatePrivateVideoInput,
	) {}
}

@CommandHandler(UpdatePrivateVideoCommand)
export class UpdatePrivateVideoHandler extends VideoBase implements ICommandHandler<UpdatePrivateVideoCommand> {
	constructor(
		private videoRepository: VideoRepository,
		private videoQueryRepository: VideoQueryRepository,
		private subtitleRepository: SubtitleRepository,
		private sentenceRepository: SentenceRepository,
		private subtitleSentenceInitRepository: SubtitleSentenceInitRepository,
		private dbRepository: DBRepository,
		private cloudRuS3Service: CloudRuS3Service,
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	async execute(command: UpdatePrivateVideoCommand): Promise<UpdateVideoOutModel> {
		const { userId, updateVideoInput } = command

		const videoForUpdating = await this.videoQueryRepository.getVideoById(updateVideoInput.id)
		if (!videoForUpdating) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}

		if (videoForUpdating.userId !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		const { fileName, fileS3Key, isFileUploaded, uploadUrl } = await this.getUploadFileUrlAndFileDetails(
			videoForUpdating,
			updateVideoInput,
		)

		const preparedContentResult = this.prepareTextContentForSaving({
			originalContent: updateVideoInput.originalContent,
			previousProcessedContent: videoForUpdating.processedContent,
		})

		if (preparedContentResult.shouldUpdateRelatedTextData) {
			const effectiveLanguageCode = videoForUpdating.languageCode as Language | null

			if (preparedContentResult.processedContent !== null && !effectiveLanguageCode) {
				throw new CustomError(errorMessage.nlp.languageRequired, ErrorStatusCode.BadRequest_400)
			}

			await this.updateVideoTextData({
				videoId: updateVideoInput.id,
				processedContent: preparedContentResult.processedContent,
				languageCode: effectiveLanguageCode,
				subtitles: preparedContentResult.subtitles,
			})
		}

		const updatedVideo = await this.videoRepository.updateVideoById(updateVideoInput.id, {
			name: updateVideoInput.name,
			originalContent: preparedContentResult.originalContentForVideoUpdate,
			processedContent: preparedContentResult.processedContentForVideoUpdate,
			contentType: preparedContentResult.contentTypeForVideoUpdate,
			fileName,
			fileS3Key,
			s3ProviderName: 'cloudRu',
			isFileUploaded,
			fileSizeMb: updateVideoInput.fileSizeMb,
			fileDurationSec: updateVideoInput.fileDurationSec,
		})

		if (!updatedVideo) {
			throw new CustomError(errorMessage.unknownDbError, ErrorStatusCode.InternalServerError_500)
		}

		return {
			id: updatedVideo.id,
			videoCollectionId: updatedVideo.videoCollectionId,
			name: updatedVideo.name,
			languageCode: videoForUpdating.languageCode as Language | null,
			originalContent: updatedVideo.originalContent,
			processedContent: updatedVideo.processedContent,
			contentType: updatedVideo.contentType,
			userId: videoForUpdating.userId,
			uploadUrl,
			fileSizeMb: updatedVideo.fileSizeMb,
			fileDurationSec: updatedVideo.fileDurationSec,
		}
	}

	private async updateVideoTextData(dto: {
		videoId: number
		processedContent: null | string
		languageCode: null | Language
		subtitles?: Array<{
			startTimeMs: number
			endTimeMs: number
			startOffset: number
			length: number
			orderIndex: number
		}>
	}) {
		await this.dbRepository.wrapIntoPrismaTransaction({
			executableCode: async () => {
				await this.subtitleSentenceInitRepository.deleteByVideoId(dto.videoId)
				await this.subtitleRepository.deleteByVideoId(dto.videoId)
				await this.sentenceRepository.deleteByVideoId(dto.videoId)

				if (dto.processedContent === null) return

				if (!dto.languageCode) {
					throw new CustomError(errorMessage.nlp.languageRequired, ErrorStatusCode.BadRequest_400)
				}

				if (dto.subtitles) {
					await this.saveSubtitlesSentencesAndInit({
						videoId: dto.videoId,
						preparedContent: dto.processedContent,
						languageCode: dto.languageCode,
						subtitles: dto.subtitles,
						sentenceRepository: this.sentenceRepository,
						subtitleRepository: this.subtitleRepository,
						subtitleSentenceInitRepository: this.subtitleSentenceInitRepository,
					})
					return
				}

				await generateSentencesAndSaveToDB({
					mainConfigService: this.mainConfig,
					sentenceRepository: this.sentenceRepository,
					processedContent: dto.processedContent,
					languageCode: dto.languageCode,
					videoId: dto.videoId,
				})
			},
		})
	}

	async getUploadFileUrlAndFileDetails(
		videoForUpdating: VideoLiteOutModel,
		updateVideoInput: UpdatePrivateVideoInput,
	): Promise<{
		fileName: null | string
		fileS3Key: null | string
		isFileUploaded: boolean
		uploadUrl: null | string
	}> {
		if (updateVideoInput.fileName === null || updateVideoInput.isFileUploaded === false) {
			if (videoForUpdating.isFileUploaded && videoForUpdating.fileS3Key) {
				await this.cloudRuS3Service.deleteFile(videoForUpdating.fileS3Key)
			}

			return {
				fileName: null,
				fileS3Key: null,
				isFileUploaded: false,
				uploadUrl: null,
			}
		}

		if (updateVideoInput.isFileUploaded) {
			return {
				fileName: videoForUpdating.fileName,
				fileS3Key: videoForUpdating.fileS3Key,
				isFileUploaded: true,
				uploadUrl: null,
			}
		}

		if (updateVideoInput.fileName && updateVideoInput.fileMimeType && !videoForUpdating.isFileUploaded) {
			const { s3FileKey, uploadUrl } = await this.prepareFileKeyAndUploadUrl(
				{
					fileName: updateVideoInput.fileName,
					fileMimeType: updateVideoInput.fileMimeType,
					fileDestinationType: 'video',
				},
				this.cloudRuS3Service,
			)

			return {
				fileName: updateVideoInput.fileName,
				fileS3Key: s3FileKey,
				isFileUploaded: false,
				uploadUrl,
			}
		}

		return {
			fileName: videoForUpdating.fileName,
			fileS3Key: videoForUpdating.fileS3Key,
			isFileUploaded: videoForUpdating.isFileUploaded,
			uploadUrl: null,
		}
	}
}
