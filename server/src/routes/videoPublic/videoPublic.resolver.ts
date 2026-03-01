import { CommandBus } from '@nestjs/cqrs'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { GetPublicVideoInput } from 'routes/videoPublic/inputs/getPublicVideo.input'
import { GetVideoPublicCommand } from 'features/video/GetVideoPublic.command'
import { GetVideosPublicCommand } from 'features/video/GetVideosPublic.command'
import RouteNames from 'infrastructure/routeNames'
import { VideoPublicOutModel } from 'models/videoPublic/videoPublic.out.model'
import { VideoPublicLiteOutModel } from 'models/videoPublic/videoPublicLite.out.model'
import { videoPublicResolversDesc } from './resolverDescriptions'

@Resolver()
export class VideoPublicResolver {
	constructor(private commandBus: CommandBus) {}

	@Query(() => [VideoPublicLiteOutModel], {
		name: RouteNames.VIDEO_PUBLIC.GET_VIDEOS,
		description: videoPublicResolversDesc.getVideosPublic,
	})
	async getVideosPublic() {
		return await this.commandBus.execute(new GetVideosPublicCommand())
	}

	@Query(() => VideoPublicOutModel, {
		name: RouteNames.VIDEO_PUBLIC.GET,
		description: videoPublicResolversDesc.getVideoPublic,
	})
	async getVideoPublic(@Args('input') input: GetPublicVideoInput) {
		return await this.commandBus.execute(new GetVideoPublicCommand(input.id))
	}
}
