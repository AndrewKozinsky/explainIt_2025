import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPublicQueryRepository } from 'repo/video/videoPublic.queryRepository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

export class GetVideoPublicCommand implements ICommand {
	constructor(
		public videoId: number,
		public targetLanguageCode?: string,
	) {}
}

@CommandHandler(GetVideoPublicCommand)
export class GetVideoPublicHandler implements ICommandHandler<GetVideoPublicCommand> {
	constructor(private videoPublicQueryRepository: VideoPublicQueryRepository) {}

	async execute(command: GetVideoPublicCommand) {
		const { videoId, targetLanguageCode } = command

		const video = await this.videoPublicQueryRepository.getVideoById(videoId, targetLanguageCode)
		if (!video) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}

		return video
	}
}
