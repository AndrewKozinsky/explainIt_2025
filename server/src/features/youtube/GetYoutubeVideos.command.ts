import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { YoutubeService } from 'infrastructure/youtube/youtube.service'
import { YoutubeVideoOutModel, YoutubeVideosOutModel } from 'models/youtube/youtubeVideo.out.model'

export class GetYoutubeVideosCommand implements ICommand {
	constructor(
		public query: string,
		public limit: number,
		public pageToken?: string,
	) {}
}

@CommandHandler(GetYoutubeVideosCommand)
export class GetYoutubeVideosHandler implements ICommandHandler<GetYoutubeVideosCommand> {
	constructor(private youtubeService: YoutubeService) {}

	async execute(command: GetYoutubeVideosCommand): Promise<YoutubeVideosOutModel> {
		const { query, limit, pageToken } = command

		const result = await this.youtubeService.getVideos({
			query,
			limit: Math.min(Math.max(limit, 1), 50),
			pageToken,
		})

		return {
			videos: result.videos.map(
				(v): YoutubeVideoOutModel => ({
					videoId: v.videoId,
					title: v.title,
					channelName: v.channelName,
					channelLogoUrl: v.channelLogoUrl,
					thumbnailUrl: v.thumbnailUrl,
					viewCount: v.viewCount,
					durationSec: v.durationSec,
				}),
			),
			nextPageToken: result.nextPageToken,
			totalResults: result.totalResults,
		}
	}
}
