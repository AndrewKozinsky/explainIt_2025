import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { TariffQueryRepository } from 'repo/tariff.queryRepository'
import { TariffOutModel } from 'models/tariff/tariff.out.model'

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
