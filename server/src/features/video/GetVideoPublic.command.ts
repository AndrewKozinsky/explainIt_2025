import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPublicQueryRepository } from 'repo/video/videoPublic.queryRepository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
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
			throw new CustomGraphQLError(errorMessage.video.notFound, ErrorCode.NotFound_404)
		}

		return video
	}
}
