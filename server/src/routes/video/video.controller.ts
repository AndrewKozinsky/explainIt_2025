import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { CreateVideoInput } from 'routes/video/input/createVideo.input'
import { UpdateVideoInput } from 'routes/video/input/updateVideo.input'
import { CreatePrivateVideoCommand } from 'features/video/CreatePrivateVideo.command'
import { DeletePrivateVideoCommand } from 'features/video/DeletePrivateVideo.command'
import { GetVideoCommand } from 'features/video/GetVideo.command'
import { GetVideosCommand } from 'features/video/GetVideos.command'
import { GenerateSubtitlesCommand } from 'features/video/subtitlesGeneration/GenerateSubtitles.command'
import { GetSubtitlesGenerationStatusCommand } from 'features/video/subtitlesGeneration/GetSubtitlesGenerationStatus.command'
import { UpdateVideoCommand } from 'features/video/UpdateVideo.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { CreateVideoOutModel } from 'models/video/createVideo.out.model'
import { UpdateVideoOutModel } from 'models/video/updateVideo.out.model'
import { VideoOutModel } from 'models/video/video.out.model'
import { VideoLiteOutModel } from 'models/video/videoLite.out.model'
import { VideoSubtitlesStatusOutModel } from 'models/video/videoSubtitlesStatus.out.model'
import {
	ApiCreateVideo,
	ApiUpdateVideo,
	ApiDeleteVideo,
	ApiGetVideos,
	ApiGetVideo,
	ApiGenerateSubtitles,
	ApiGetSubtitlesStatus,
} from './openAPI.decorators'

@ApiTags('Video')
@Controller('video')
export class VideoController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetVideos()
	@HttpCode(HttpStatus.OK)
	@Get()
	async getVideos(@Req() request: Request): Promise<VideoLiteOutModel[]> {
		const userId = request.session?.userId
		return await this.commandBus.execute(new GetVideosCommand(userId))
	}

	@ApiGetVideo()
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getVideo(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<VideoOutModel | null> {
		const userId = request.session?.userId
		return await this.commandBus.execute(new GetVideoCommand(id, userId))
	}

	@ApiCreateVideo()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async createVideo(@Body() input: CreateVideoInput, @Req() request: Request): Promise<CreateVideoOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new CreatePrivateVideoCommand(userId, input))
	}

	@ApiUpdateVideo()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Post(':id')
	async updateVideo(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateVideoInput,
		@Req() request: Request,
	): Promise<UpdateVideoOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new UpdateVideoCommand(userId, { id, ...input }))
	}

	@ApiDeleteVideo()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async deleteVideo(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<boolean> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new DeletePrivateVideoCommand(userId, { id }))
	}

	@ApiGenerateSubtitles()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Post(':id/generate-subtitles')
	async generateSubtitles(
		@Param('id', ParseIntPipe) id: number,
		@Req() request: Request,
	): Promise<VideoSubtitlesStatusOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GenerateSubtitlesCommand(userId, id))
	}

	@ApiGetSubtitlesStatus()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Get(':id/subtitles-status')
	async getSubtitlesStatus(
		@Param('id', ParseIntPipe) id: number,
		@Req() request: Request,
	): Promise<VideoSubtitlesStatusOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetSubtitlesGenerationStatusCommand(userId, id))
	}
}
