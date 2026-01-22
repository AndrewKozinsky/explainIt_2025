import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { CreatePrivateVideoInput } from 'routes/videoPrivate/inputs/createPrivateVideo.input'
import { DeletePrivateVideoInput } from 'routes/videoPrivate/inputs/deletePrivateVideo.input'
import { GetPrivateVideoInput } from 'routes/videoPrivate/inputs/getPrivateVideo.input'
import { UpdatePrivateVideoInput } from 'routes/videoPrivate/inputs/updatePrivateVideo.input'
import { CreatePrivateVideoCommand } from 'features/videoPrivate/CreatePrivateVideo.command'
import { DeletePrivateVideoCommand } from 'features/videoPrivate/DeletePrivateVideo.command'
import { GetUserVideosPrivateCommand } from 'features/videoPrivate/GetUserVideosPrivate.command'
import { GetVideoPrivateCommand } from 'features/videoPrivate/GetVideoPrivate.command'
import { UpdatePrivateVideoCommand } from 'features/videoPrivate/UpdatePrivateVideo.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { CreateVideoPrivateOutModel } from 'models/videoPrivate/createVideoPrivate.out.model'
import { UpdateVideoPrivateOutModel } from 'models/videoPrivate/updateVideoPrivate.out.model'
import { VideoPrivateOutModel } from 'models/videoPrivate/videoPrivate.out.model'
import { videoPrivateResolversDesc } from './resolverDescriptions'

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
