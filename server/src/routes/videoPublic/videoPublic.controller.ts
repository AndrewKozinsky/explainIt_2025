import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { GetVideoPublicCommand } from 'features/video/GetVideoPublic.command'
import { GetVideosPublicCommand } from 'features/video/GetVideosPublic.command'
import { VideoPublicOutModel } from 'models/videoPublic/videoPublic.out.model'
import { VideoPublicLiteOutModel } from 'models/videoPublic/videoPublicLite.out.model'
import { ApiGetVideoPublic, ApiGetVideosPublic } from './openAPI.decorators'

@ApiTags('VideoPublic')
@Controller('video-public')
export class VideoPublicController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetVideosPublic()
	@HttpCode(HttpStatus.OK)
	@Get()
	async getVideosPublic(): Promise<VideoPublicLiteOutModel[]> {
		return await this.commandBus.execute(new GetVideosPublicCommand())
	}

	@ApiGetVideoPublic()
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getVideoPublic(@Param('id', ParseIntPipe) id: number): Promise<VideoPublicOutModel> {
		return await this.commandBus.execute(new GetVideoPublicCommand(id))
	}
}
