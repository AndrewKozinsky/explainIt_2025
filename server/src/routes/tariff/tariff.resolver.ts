import { CommandBus } from '@nestjs/cqrs'
import { Query, Resolver } from '@nestjs/graphql'
import RouteNames from 'infrastructure/routeNames'
import { VideoPublicOutModel } from 'models/videoPublic/videoPublic.out.model'
import { VideoPublicLiteOutModel } from 'models/videoPublic/videoPublicLite.out.model'
import { tariffResolversDesc } from './resolverDescriptions'

@Resolver()
export class TariffResolver {
	constructor(private commandBus: CommandBus) {}

	@Query(() => [VideoPublicLiteOutModel], {
		name: RouteNames.TARIFF.GET_ALL,
		description: tariffResolversDesc.getTariffs,
	})
	async getTariffs() {
		// return await this.commandBus.execute(new GetVideosPublicCommand())
		return []
	}
}
