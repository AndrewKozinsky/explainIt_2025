import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPrivateQueryRepository } from 'repo/video/videoPrivate.queryRepository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export class GetVideoPrivateCommand implements ICommand {
	constructor(
		public userId: number,
		public videoId: number,
	) {}
}

@CommandHandler(GetVideoPrivateCommand)
export class GetVideoPrivateHandler implements ICommandHandler<GetVideoPrivateCommand> {
	constructor(private videoQueryRepository: VideoPrivateQueryRepository) {}

	async execute(command: GetVideoPrivateCommand) {
		const { userId, videoId } = command

		const video = await this.videoQueryRepository.getVideoById(videoId)
		if (!video) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}

		if (video.userId !== userId) {
			throw new CustomError(errorMessage.user.userIsNotOwner, ErrorStatusCode.Forbidden_403)
		}

		return video
	}
}
