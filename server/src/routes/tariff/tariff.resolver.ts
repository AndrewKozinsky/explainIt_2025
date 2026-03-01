import { CommandBus } from '@nestjs/cqrs'
import { Query, Resolver } from '@nestjs/graphql'
import { GetTariffsCommand } from 'features/tariff/GetTariffs.command'
import RouteNames from 'infrastructure/routeNames'
import { TariffOutModel } from 'models/tariff/tariff.out.model'
import { tariffResolversDesc } from './resolverDescriptions'

@Resolver()
export class TariffResolver {
	constructor(private commandBus: CommandBus) {}

	@Query(() => [TariffOutModel], {
		name: RouteNames.TARIFF.GET_ALL,
		description: tariffResolversDesc.getTariffs,
	})
	async getTariffs() {
		return await this.commandBus.execute(new GetTariffsCommand())
	}
}
