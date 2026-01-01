import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPrivateRepository } from 'repo/videoPrivate.repository'
import { VideoPrivateFileUrlBase } from 'features/videoPrivate/VideoPrivateFileUrl.base'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { CreateVideoPrivateOutModel } from 'models/videoPrivate/createVideoPrivate.out.model'

export type CreatePrivateVideoInput = {
	name?: null | string
	subtitles?: null | string
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
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	async execute(command: CreatePrivateVideoCommand): Promise<CreateVideoPrivateOutModel> {
		const { userId, createVideoInput } = command

		const createdVideo = await this.videoRepository.createVideo({
			userId,
			name: createVideoInput.name,
			subtitles: createVideoInput.subtitles,
		})
		if (!createdVideo) {
			throw new CustomGraphQLError(errorMessage.video.notCreated, ErrorCode.InternalServerError_500)
		}

		return createdVideo
	}
}
