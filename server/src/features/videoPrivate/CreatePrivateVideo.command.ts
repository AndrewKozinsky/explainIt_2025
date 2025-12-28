import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPrivateQueryRepository } from 'repo/videoPrivate.queryRepository'
import { VideoPrivateRepository } from 'repo/videoPrivate.repository'
import { VideoPrivateFileUrlBase } from 'features/videoPrivate/VideoPrivateFileUrl.base'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { YandexCloudS3Service } from 'infrastructure/yandexCloudS3/yandexCloudS3.service'
import { CreateVideoPrivateOutModel } from 'models/videoPrivate/createVideoPrivate.out.model'

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
export class CreatePrivateVideoHandler
	extends VideoPrivateFileUrlBase
	implements ICommandHandler<CreatePrivateVideoCommand>
{
	constructor(
		private videoRepository: VideoPrivateRepository,
		private videoQueryRepository: VideoPrivateQueryRepository,
		private yandexCloudS3Service: YandexCloudS3Service,
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	async execute(command: CreatePrivateVideoCommand): Promise<CreateVideoPrivateOutModel> {
		const { userId, createVideoInput } = command

		const { fileUrl, uploadUrl } = await this.prepareFileUrlAndUploadUrl(
			{ fileName: createVideoInput.fileName, fileMimeType: createVideoInput.fileMimeType },
			this.yandexCloudS3Service,
		)

		const createdVideo = await this.videoRepository.createVideo({
			userId,
			name: createVideoInput.name,
			subtitles: createVideoInput.subtitles,
			url: fileUrl,
		})
		if (!createdVideo) {
			throw new CustomGraphQLError(errorMessage.video.notCreated, ErrorCode.InternalServerError_500)
		}

		return {
			...createdVideo,
			uploadUrl,
		}
	}
}
