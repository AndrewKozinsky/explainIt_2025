import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoLiteOutModel } from 'models/video/videoLite.out.model'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'

export class GetYoutubeRecommendationsCommand implements ICommand {
	constructor(
		public videoId: string,
		public limit: number,
	) {}
}

@CommandHandler(GetYoutubeRecommendationsCommand)
export class GetYoutubeRecommendationsHandler implements ICommandHandler<
	GetYoutubeRecommendationsCommand,
	VideoLiteOutModel[]
> {
	constructor(private videoQueryRepository: VideoQueryRepository) {}

	async execute(command: GetYoutubeRecommendationsCommand): Promise<VideoLiteOutModel[]> {
		return await this.videoQueryRepository.getRecommendationsForSavedVideo(command.videoId, command.limit)
	}
}
