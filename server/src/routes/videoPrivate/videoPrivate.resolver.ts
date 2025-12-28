import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { CreatePrivateVideoCommand } from 'src/features/videoPrivate/CreatePrivateVideo.command'
import { DeletePrivateVideoCommand } from 'src/features/videoPrivate/DeletePrivateVideo.command'
import { GetVideoPrivateCommand } from 'src/features/videoPrivate/GetVideoPrivate.command'
import { GetUserVideosPrivateCommand } from 'src/features/videoPrivate/GetUserVideosPrivate.command'
import { UpdatePrivateVideoCommand } from 'src/features/videoPrivate/UpdatePrivateVideo.command'
import { CreateVideoPrivateOutModel } from 'src/models/videoPrivate/createVideoPrivate.out.model'
import { UpdateVideoPrivateOutModel } from 'src/models/videoPrivate/updateVideoPrivate.out.model'
import { VideoPrivateOutModel } from 'src/models/videoPrivate/videoPrivate.out.model'
import { CreatePrivateVideoInput } from 'src/routes/videoPrivate/inputs/createPrivateVideo.input'
import { DeletePrivateVideoInput } from 'src/routes/videoPrivate/inputs/deletePrivateVideo.input'
import { GetPrivateVideoInput } from 'src/routes/videoPrivate/inputs/getPrivateVideo.input'
import { UpdatePrivateVideoInput } from 'src/routes/videoPrivate/inputs/updatePrivateVideo.input'
import { videoPrivateResolversDesc } from './resolverDescriptions'
import { Request } from 'express'

@Resolver()
export class VideoPrivateResolver {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => CreateVideoPrivateOutModel, {
		name: RouteNames.VIDEO_PRIVATE.CREATE,
		description: videoPrivateResolversDesc.createVideoPrivate,
	})
	async createVideoPrivate(@Args('input') input: CreatePrivateVideoInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new CreatePrivateVideoCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => UpdateVideoPrivateOutModel, {
		name: RouteNames.VIDEO_PRIVATE.UPDATE,
		description: videoPrivateResolversDesc.updateVideoPrivate,
	})
	async updateVideoPrivate(@Args('input') input: UpdatePrivateVideoInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new UpdatePrivateVideoCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => Boolean, {
		name: RouteNames.VIDEO_PRIVATE.DELETE,
		description: videoPrivateResolversDesc.deleteVideoPrivate,
	})
	async deleteVideoPrivate(@Args('input') input: DeletePrivateVideoInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new DeletePrivateVideoCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => [VideoPrivateOutModel], {
		name: RouteNames.VIDEO_PRIVATE.GET_USER_VIDEOS,
		description: videoPrivateResolversDesc.getUserVideosPrivate,
	})
	async getUserVideosPrivate(@Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetUserVideosPrivateCommand(userId))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => VideoPrivateOutModel, {
		name: RouteNames.VIDEO_PRIVATE.GET,
		description: videoPrivateResolversDesc.getVideoPrivate,
	})
	async getVideoPrivate(@Args('input') input: GetPrivateVideoInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetVideoPrivateCommand(userId, input.id))
	}
}
