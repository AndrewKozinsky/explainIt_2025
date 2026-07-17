import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoOutModel } from 'models/video/video.out.model'

export class GetVideoCommand implements ICommand {
	constructor(
		public videoId: number,
		public userId?: number,
	) {}
}

@CommandHandler(GetVideoCommand)
export class GetVideoHandler implements ICommandHandler<GetVideoCommand> {
	constructor(private videoQueryRepository: VideoQueryRepository) {}

	async execute(command: GetVideoCommand): Promise<VideoOutModel | null> {
		const { videoId, userId } = command

		const video = await this.videoQueryRepository.getVideoById(videoId)
		if (!video) {
			return null
		}

		// If private video, check ownership
		if (video.type === 'private') {
			if (!userId || video.userId !== userId) {
				return null
			}
		}

		return video
	}
}
