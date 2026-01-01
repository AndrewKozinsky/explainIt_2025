import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPrivateQueryRepository } from 'repo/videoPrivate.queryRepository'
import { VideoPrivateRepository } from 'repo/videoPrivate.repository'
import { VideoPrivateFileUrlBase } from 'features/videoPrivate/VideoPrivateFileUrl.base'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { YandexCloudS3Service } from 'infrastructure/yandexCloudS3/yandexCloudS3.service'
import { UpdateVideoPrivateOutModel } from 'models/videoPrivate/updateVideoPrivate.out.model'
import { VideoPrivateOutModel } from 'models/videoPrivate/videoPrivate.out.model'

export type UpdatePrivateVideoInput = {
	id: number
	name?: null | string
	subtitles?: null | string
	fileName?: null | string
	fileMimeType?: null | string
	isFileUploaded?: boolean
}

export class UpdatePrivateVideoCommand implements ICommand {
	constructor(
		public userId: number,
		public updateVideoInput: UpdatePrivateVideoInput,
	) {}
}

@CommandHandler(UpdatePrivateVideoCommand)
export class UpdatePrivateVideoHandler
	extends VideoPrivateFileUrlBase
	implements ICommandHandler<UpdatePrivateVideoCommand>
{
	constructor(
		private videoRepository: VideoPrivateRepository,
		private videoQueryRepository: VideoPrivateQueryRepository,
		private yandexCloudS3Service: YandexCloudS3Service,
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	async execute(command: UpdatePrivateVideoCommand): Promise<UpdateVideoPrivateOutModel> {
		const { userId, updateVideoInput } = command

		const videoForUpdating = await this.videoQueryRepository.getVideoById(updateVideoInput.id)
		if (!videoForUpdating) {
			throw new CustomGraphQLError(errorMessage.video.notFound, ErrorCode.NotFound_404)
		}

		if (videoForUpdating.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		const { fileName, fileS3Key, fileUrl, isFileUploaded, uploadUrl } =
			await this.getUploadFileUrlAndFileUrlAndUploadUrl(videoForUpdating, updateVideoInput)

		const updatedVideo = await this.videoRepository.updateVideoById(updateVideoInput.id, {
			name: updateVideoInput.name,
			subtitles: updateVideoInput.subtitles,
			fileName,
			fileS3Key,
			fileUrl,
			isFileUploaded,
		})

		if (!updatedVideo) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return {
			...updatedVideo,
			uploadUrl,
		}
	}

	async getUploadFileUrlAndFileUrlAndUploadUrl(
		videoForUpdating: VideoPrivateOutModel,
		updateVideoInput: UpdatePrivateVideoInput,
	): Promise<{
		fileName: null | string
		fileS3Key: null | string
		fileUrl: null | string
		isFileUploaded: boolean
		uploadUrl: null | string
	}> {
		// If try to delete a file then delete it
		if (updateVideoInput.fileName === null || updateVideoInput.isFileUploaded === false) {
			if (videoForUpdating.isFileUploaded && videoForUpdating.fileS3Key) {
				await this.yandexCloudS3Service.deleteFile(videoForUpdating.fileS3Key)
			}

			return {
				fileName: null,
				fileS3Key: null,
				fileUrl: null,
				isFileUploaded: false,
				uploadUrl: null,
			}
		}

		// They report that the file has been downloaded.
		if (updateVideoInput.isFileUploaded) {
			return {
				fileName: videoForUpdating.fileName,
				fileS3Key: videoForUpdating.fileS3Key,
				fileUrl: videoForUpdating.fileUrl,
				isFileUploaded: true,
				uploadUrl: null,
			}
		}

		// Put file name and mime type
		if (updateVideoInput.fileName && updateVideoInput.fileMimeType && !videoForUpdating.isFileUploaded) {
			const { s3FileKey, uploadUrl } = await this.prepareFileKeyAndUploadUrl(
				{ fileName: updateVideoInput.fileName, fileMimeType: updateVideoInput.fileMimeType },
				this.yandexCloudS3Service,
			)

			return {
				fileName: updateVideoInput.fileName,
				fileS3Key: s3FileKey,
				fileUrl: this.mainConfig.get().yandexCloud.s3.bucketUrl + '/' + s3FileKey,
				isFileUploaded: false,
				uploadUrl,
			}
		}

		return {
			fileName: videoForUpdating.fileName,
			fileS3Key: videoForUpdating.fileS3Key,
			fileUrl: videoForUpdating.fileUrl,
			isFileUploaded: videoForUpdating.isFileUploaded,
			uploadUrl: null,
		}
	}
}
