import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { CreatePrivateVideoCommand } from 'src/features/videoPrivate/CreatePrivateVideo.command'
import { CreateVideoPrivateOutModel } from 'src/models/videoPrivate/creareVideoPrivate.out.model'
import { CreatePrivateVideoInput } from 'src/routes/videoPrivate/inputs/createPrivateVideo.input'
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
}
