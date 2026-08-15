import { Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { GetSavedYoutubeVideosInput } from 'routes/youtube/inputs/getSavedYoutubeVideos.input'
import { GetYoutubeVideoInput } from 'routes/youtube/inputs/getYoutubeVideo.input'
import { GetYoutubeVideosInput } from 'routes/youtube/inputs/getYoutubeVideos.input'
import { VIDEO_TOPICS } from 'utils/videoTopics'
import { CreateYoutubeVideoCommand } from 'features/youtube/CreateYoutubeVideo.command'
import { GetSavedYoutubeVideosCommand } from 'features/youtube/GetSavedYoutubeVideos.command'
import { GetVideoByYoutubeIdCommand } from 'features/youtube/GetVideoByYoutubeId.command'
import { GetYoutubeVideosCommand } from 'features/youtube/GetYoutubeVideos.command'
import { VideoOutModel } from 'models/video/video.out.model'
import { VideoLiteOutModel } from 'models/video/videoLite.out.model'
import { YoutubeVideosOutModel } from 'models/youtube/youtubeVideo.out.model'
import {
	ApiGetYoutubeVideoById,
	ApiGetYoutubeSearch,
	ApiGetSavedYoutubeVideos,
	ApiCreateYoutubeVideo,
	ApiGetYoutubeTopics,
} from './openAPI.decorators'

@ApiTags('YouTube')
@Controller('youtube')
export class YoutubeController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetYoutubeSearch()
	@HttpCode(HttpStatus.OK)
	@Get('search')
	async getYouTubeVideos(@Query() query: GetYoutubeVideosInput): Promise<YoutubeVideosOutModel> {
		return await this.commandBus.execute(
			new GetYoutubeVideosCommand(query.query, query.limit ?? 20, query.pageToken),
		)
	}

	@ApiGetSavedYoutubeVideos()
	@HttpCode(HttpStatus.OK)
	@Get('saved')
	async getSavedVideos(@Query() query: GetSavedYoutubeVideosInput): Promise<VideoLiteOutModel[]> {
		return await this.commandBus.execute(
			new GetSavedYoutubeVideosCommand({
				maxDurationSec: query.maxDurationSec,
				minDurationSec: query.minDurationSec,
				proficiencyLevel: query.proficiencyLevel,
				topic: query.topic,
				languageCode: query.languageCode,
				sortBy: query.sortBy,
				sortDirection: query.sortDirection,
			}),
		)
	}

	@ApiGetYoutubeTopics()
	@HttpCode(HttpStatus.OK)
	@Get('topics')
	getVideoTopics(): readonly string[] {
		return VIDEO_TOPICS as unknown as string[]
	}

	@ApiGetYoutubeVideoById()
	@HttpCode(HttpStatus.OK)
	@Get(':videoId')
	async getVideoById(@Param() params: GetYoutubeVideoInput): Promise<null | VideoOutModel> {
		return await this.commandBus.execute(new GetVideoByYoutubeIdCommand(params.videoId))
	}

	@ApiCreateYoutubeVideo()
	@HttpCode(HttpStatus.CREATED)
	@Post(':videoId')
	async createVideo(@Param() params: GetYoutubeVideoInput): Promise<VideoOutModel> {
		return await this.commandBus.execute(new CreateYoutubeVideoCommand(params.videoId))
	}
}
