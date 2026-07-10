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
import { CreatePrivateVideoCommand } from 'features/video/CreatePrivateVideo.command'
import { DeletePrivateVideoCommand } from 'features/video/DeletePrivateVideo.command'
import { GetUserVideosPrivateCommand } from 'features/video/GetUserVideosPrivate.command'
import { GetVideoPrivateCommand } from 'features/video/GetVideoPrivate.command'
import { GenerateSubtitlesCommand } from 'features/video/subtitlesGeneration/GenerateSubtitles.command'
import { GetSubtitlesGenerationStatusCommand } from 'features/video/subtitlesGeneration/GetSubtitlesGenerationStatus.command'
import { UpdatePrivateVideoCommand } from 'features/video/UpdatePrivateVideo.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { CreateVideoPrivateOutModel } from 'models/videoPrivate/createVideoPrivate.out.model'
import { UpdateVideoPrivateOutModel } from 'models/videoPrivate/updateVideoPrivate.out.model'
import { VideoPrivateLiteOutModel } from 'models/videoPrivate/videoPrivateLiteOut.model'
import { VideoPrivateOutModel } from 'models/videoPrivate/videoPrivateOut.model'
import { VideoPrivateSubtitlesStatusOutModel } from 'models/videoPrivate/videoPrivateSubtitlesStatus.out.model'
import { CreateVideoDto } from './dto/create-video.dto'
import { UpdateVideoDto } from './dto/update-video.dto'
import {
	ApiCreateVideo,
	ApiUpdateVideo,
	ApiDeleteVideo,
	ApiGetUserVideos,
	ApiGetVideo,
	ApiGenerateSubtitles,
	ApiGetSubtitlesStatus,
} from './openAPI.decorators'

@ApiTags('VideoPrivate')
@Controller('video-private')
export class VideoPrivateController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetUserVideos()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Get()
	async getUserVideosPrivate(@Req() request: Request): Promise<VideoPrivateLiteOutModel[]> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetUserVideosPrivateCommand(userId))
	}

	@ApiGetVideo()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getVideoPrivate(
		@Param('id', ParseIntPipe) id: number,
		@Req() request: Request,
	): Promise<VideoPrivateOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetVideoPrivateCommand(userId, id))
	}

	@ApiCreateVideo()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async createVideoPrivate(
		@Body() input: CreateVideoDto,
		@Req() request: Request,
	): Promise<CreateVideoPrivateOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new CreatePrivateVideoCommand(userId, input))
	}

	@ApiUpdateVideo()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Post(':id')
	async updateVideoPrivate(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateVideoDto,
		@Req() request: Request,
	): Promise<UpdateVideoPrivateOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new UpdatePrivateVideoCommand(userId, { id, ...input }))
	}

	@ApiDeleteVideo()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async deleteVideoPrivate(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<boolean> {
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
	): Promise<VideoPrivateSubtitlesStatusOutModel> {
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
	): Promise<VideoPrivateSubtitlesStatusOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetSubtitlesGenerationStatusCommand(userId, id))
	}
}
