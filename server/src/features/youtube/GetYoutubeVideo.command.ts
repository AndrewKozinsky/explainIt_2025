import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { YoutubeService } from 'infrastructure/youtube/youtube.service'
import { YoutubeVideoOutModel } from 'models/youtube/youtubeVideo.out.model'

export class GetYoutubeVideoCommand implements ICommand {
	constructor(public videoId: string) {}
}

@CommandHandler(GetYoutubeVideoCommand)
export class GetYoutubeVideoHandler implements ICommandHandler<GetYoutubeVideoCommand> {
	constructor(private youtubeService: YoutubeService) {}

	async execute(command: GetYoutubeVideoCommand): Promise<YoutubeVideoOutModel> {
		const result = await this.youtubeService.getVideoById(command.videoId)

		return {
			videoId: result.videoId,
			title: result.title,
			channelName: result.channelName,
			channelLogoUrl: result.channelLogoUrl,
			thumbnailUrl: result.thumbnailUrl,
			viewCount: result.viewCount,
			durationSec: result.durationSec,
		}
	}
}
