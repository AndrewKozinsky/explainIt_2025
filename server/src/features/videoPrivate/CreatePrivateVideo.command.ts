import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'src/infrastructure/mainConfig/mainConfig.service'
import { YandexCloudS3Service } from 'src/infrastructure/yandexCloudS3/yandexCloudS3.service'
import { CreateVideoPrivateOutModel } from 'src/models/videoPrivate/creareVideoPrivate.out.model'
import { VideoPrivateQueryRepository } from 'src/repo/videoPrivate.queryRepository'
import { VideoPrivateRepository } from 'src/repo/videoPrivate.repository'

export type CreatePrivateVideoInput = {
	name?: null | string
	subtitles?: null | string
	fileName?: null | string
	fileMimeType?: null | string
}

export class CreatePrivateVideoCommand implements ICommand {
	constructor(
		public userId: number,
		public createVideoInput: CreatePrivateVideoInput,
	) {}
}

@CommandHandler(CreatePrivateVideoCommand)
export class CreatePrivateVideoHandler implements ICommandHandler<CreatePrivateVideoCommand> {
	constructor(
		private videoRepository: VideoPrivateRepository,
		private videoQueryRepository: VideoPrivateQueryRepository,
		private yandexCloudS3Service: YandexCloudS3Service,
		private mainConfig: MainConfigService,
	) {}

	async execute(command: CreatePrivateVideoCommand): Promise<CreateVideoPrivateOutModel> {
		const { userId, createVideoInput } = command

		let fileUrl: null | string = null
		let uploadUrl: null | string = null

		if (createVideoInput.fileName && createVideoInput.fileMimeType) {
			fileUrl = this.createFileUrl(createVideoInput.fileName)

			uploadUrl = await this.yandexCloudS3Service.createUploadUrl(fileUrl, createVideoInput.fileMimeType)
		}

		const createdVideo = await this.videoRepository.createVideo({ userId, ...createVideoInput })
		if (!createdVideo) {
			throw new CustomGraphQLError(errorMessage.video.notCreated, ErrorCode.InternalServerError_500)
		}

		const newVideo = await this.videoQueryRepository.getVideoById(createdVideo.id)
		if (!newVideo) {
			throw new CustomGraphQLError(errorMessage.video.notCreated, ErrorCode.InternalServerError_500)
		}

		return {
			...createdVideo,
			uploadUrl,
		}
	}

	createFileUrl(fileName: string) {
		const isDevMode = ['localtest', 'localdev'].includes(this.mainConfig.get().mode!)
		const rootFolderName = isDevMode ? 'videoDev' : 'video'
		return `${rootFolderName}/${crypto.randomUUID()}-${fileName}`
	}
}
