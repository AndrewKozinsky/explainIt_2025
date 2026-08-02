import { Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { GetYoutubeVideoInput } from 'routes/youtube/inputs/getYoutubeVideo.input'
import { GetYoutubeVideosInput } from 'routes/youtube/inputs/getYoutubeVideos.input'
import { CreateYoutubeVideoCommand } from 'features/youtube/CreateYoutubeVideo.command'
import { GetYoutubeVideosCommand } from 'features/youtube/GetYoutubeVideos.command'
import { VideoOutModel } from 'models/video/video.out.model'
import { YoutubeVideosOutModel } from 'models/youtube/youtubeVideo.out.model'
import { ApiGetYoutubeVideoById, ApiGetYoutubeVideos, ApiCreateYoutubeVideo } from './openAPI.decorators'

@ApiTags('YouTube')
@Controller('youtube')
export class YoutubeController {
	constructor(
		private commandBus: CommandBus,
		private videoQueryRepository: VideoQueryRepository,
	) {}

	@ApiGetYoutubeVideos()
	@HttpCode(HttpStatus.OK)
	@Get()
	async getVideos(@Query() query: GetYoutubeVideosInput): Promise<YoutubeVideosOutModel> {
		return await this.commandBus.execute(
			new GetYoutubeVideosCommand(query.query, query.limit ?? 20, query.pageToken),
		)
	}

	@ApiGetYoutubeVideoById()
	@HttpCode(HttpStatus.OK)
	@Get(':videoId')
	async getVideoById(@Param() params: GetYoutubeVideoInput): Promise<null | VideoOutModel> {
		return await this.videoQueryRepository.getVideoByYoutubeId(params.videoId)
	}

	@ApiCreateYoutubeVideo()
	@HttpCode(HttpStatus.CREATED)
	@Post(':videoId')
	async createVideo(@Param() params: GetYoutubeVideoInput): Promise<VideoOutModel> {
		return await this.commandBus.execute(new CreateYoutubeVideoCommand(params.videoId))
	}
}
