import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPublicQueryRepository } from 'repo/video/videoPublic.queryRepository'

export class GetVideosPublicCommand implements ICommand {
	constructor() {}
}

@CommandHandler(GetVideosPublicCommand)
export class GetVideosPublicHandler implements ICommandHandler<GetVideosPublicCommand> {
	constructor(private videoPublicQueryRepository: VideoPublicQueryRepository) {}

	async execute(command: GetVideosPublicCommand) {
		return await this.videoPublicQueryRepository.getVideos()
	}
}
