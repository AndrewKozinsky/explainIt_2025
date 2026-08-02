import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoLiteOutModel } from 'models/video/videoLite.out.model'

export class GetVideosCommand implements ICommand {
	constructor(public userId?: number) {}
}

@CommandHandler(GetVideosCommand)
export class GetVideosHandler implements ICommandHandler<GetVideosCommand> {
	constructor(private videoQueryRepository: VideoQueryRepository) {}

	async execute(command: GetVideosCommand): Promise<VideoLiteOutModel[]> {
		const { userId } = command

		const [publicVideos, privateVideos] = await Promise.all([
			this.videoQueryRepository.getPublicVideos(),
			userId ? this.videoQueryRepository.getPrivateVideos(userId) : [],
		])

		return [...publicVideos, ...privateVideos]
	}
}
