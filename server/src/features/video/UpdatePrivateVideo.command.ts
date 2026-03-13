import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { VideoPrivateQueryRepository } from 'repo/video/videoPrivate.queryRepository'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { Language } from 'utils/languages'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { VideoBase } from 'features/video/VideoBase'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { UpdateVideoPrivateOutModel } from 'models/videoPrivate/updateVideoPrivate.out.model'
import { VideoPrivateLiteOutModel } from 'models/videoPrivate/videoPrivateLiteOut.model'

export type UpdatePrivateVideoInput = {
	id: number
	name?: null | string
	languageCode: Language
	originalContent?: null | string
	fileName?: null | string
	fileMimeType?: null | string
	isFileUploaded?: boolean
	fileSizeMb?: number
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
		private videoRepository: VideoPrivateRepository,
		private videoQueryRepository: VideoPrivateQueryRepository,
		private subtitleRepository: SubtitleRepository,
		private sentenceRepository: SentenceRepository,
		private subtitleSentenceInitRepository: SubtitleSentenceInitRepository,
		private dbRepository: DBRepository,
		private cloudRuS3Service: CloudRuS3Service,
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	/**
	 * Updates a private video owned by the user.
	 *
	 * Responsibilities:
	 * - validates access (video exists + ownership)
	 * - computes file upload/delete actions
	 * - prepares text content (plain text or SRT)
	 * - rebuilds related text data (subtitles/sentences/init) when needed
	 * - persists fields to DB and returns GraphQL output model
	 */
	async execute(command: UpdatePrivateVideoCommand): Promise<UpdateVideoPrivateOutModel> {
		const { userId, updateVideoInput } = command

		const videoForUpdating = await this.videoQueryRepository.getVideoById(updateVideoInput.id)
		if (!videoForUpdating) {
			throw new CustomGraphQLError(errorMessage.video.notFound, ErrorCode.NotFound_404)
		}

		if (videoForUpdating.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
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
			await this.updateVideoTextData({
				videoType: 'private',
				videoId: updateVideoInput.id,
				preparedContent: preparedContentResult.preparedContent,
				subtitles: preparedContentResult.subtitles,
			})
		}

		const updatedVideo = await this.videoRepository.updateVideoById(updateVideoInput.id, {
			name: updateVideoInput.name,
			languageCode: updateVideoInput.languageCode,
			originalContent: preparedContentResult.originalContentForVideoUpdate,
			processedContent: preparedContentResult.processedContentForVideoUpdate,
			contentType: preparedContentResult.contentTypeForVideoUpdate,
			fileName,
			fileS3Key,
			s3ProviderName: 'cloudRu',
			isFileUploaded,
			fileSizeMb: updateVideoInput.fileSizeMb,
		})

		if (!updatedVideo) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return {
			...updatedVideo,
			languageCode: updatedVideo.languageCode,
			uploadUrl,
		}
	}

	private async updateVideoTextData(dto: {
		videoType: 'private'
		videoId: number
		preparedContent: null | string
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
				await this.subtitleSentenceInitRepository.deleteByVideoPrivateId(dto.videoId)
				await this.subtitleRepository.deleteByVideoPrivateId(dto.videoId)
				await this.sentenceRepository.deleteByVideoPrivateId(dto.videoId)

				if (dto.preparedContent === null) return

				if (dto.subtitles) {
					await this.saveSubtitlesSentencesAndInit({
						videoType: 'private',
						videoId: dto.videoId,
						preparedContent: dto.preparedContent,
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
					content: dto.preparedContent,
					videoPrivateId: dto.videoId,
				})
			},
		})
	}

	/**
	 * Computes file-related fields (name/s3Key/url/isUploaded) and a pre-signed upload URL.
	 *
	 * Handles:
	 * - file deletion request (`fileName === null` or `isFileUploaded === false`)
	 * - file marked as uploaded (`isFileUploaded === true`)
	 * - upload URL generation when a file is being attached for the first time
	 */
	async getUploadFileUrlAndFileDetails(
		videoForUpdating: VideoPrivateLiteOutModel,
		updateVideoInput: UpdatePrivateVideoInput,
	): Promise<{
		fileName: null | string
		fileS3Key: null | string
		isFileUploaded: boolean
		uploadUrl: null | string
	}> {
		// If tries to delete the file, so delete it
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

		// If report that the file has been downloaded.
		if (updateVideoInput.isFileUploaded) {
			return {
				fileName: videoForUpdating.fileName,
				fileS3Key: videoForUpdating.fileS3Key,
				isFileUploaded: true,
				uploadUrl: null,
			}
		}

		// Put file name and mime type
		if (updateVideoInput.fileName && updateVideoInput.fileMimeType && !videoForUpdating.isFileUploaded) {
			const { s3FileKey, uploadUrl } = await this.prepareFileKeyAndUploadUrl(
				{
					fileName: updateVideoInput.fileName,
					fileMimeType: updateVideoInput.fileMimeType,
					fileDestinationType: 'privateVideo',
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
