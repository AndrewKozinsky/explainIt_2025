import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPublicQueryRepository } from 'repo/video/videoPublic.queryRepository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export class GetVideoPublicCommand implements ICommand {
	constructor(public videoId: number) {}
}

@CommandHandler(GetVideoPublicCommand)
export class GetVideoPublicHandler implements ICommandHandler<GetVideoPublicCommand> {
	constructor(private videoPublicQueryRepository: VideoPublicQueryRepository) {}

	async execute(command: GetVideoPublicCommand) {
		const { videoId } = command

		const video = await this.videoPublicQueryRepository.getVideoById(videoId)
		if (!video) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}

		return video
	}
}
