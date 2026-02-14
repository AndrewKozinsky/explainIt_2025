import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { TariffOutModel } from 'models/tariff/tariff.out.model'
import { TariffQueryRepository } from 'repo/tariff.queryRepository'

export class GetTariffsCommand implements ICommand {
	constructor() {}
}

@CommandHandler(GetTariffsCommand)
export class GetTariffsHandler implements ICommandHandler<GetTariffsCommand> {
	constructor(private tariffQueryRepository: TariffQueryRepository) {}

	async execute(): Promise<TariffOutModel[]> {
		return await this.tariffQueryRepository.getTariffs()
	}
}
