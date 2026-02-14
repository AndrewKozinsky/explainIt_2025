import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { TariffRepository } from 'repo/tariff.repository'

type CreateTariffDto = {
	code: string
	name: string
	price: number
	durationDays: number
	includedBalance: number
	includedFileStorageMb: number
}

export class CreateTariffsCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreateTariffsCommand)
export class CreateTariffsHandler implements ICommandHandler<CreateTariffsCommand> {
	constructor(private tariffRepository: TariffRepository) {}

	async execute() {
		const tariffsData = this.getTariffsData()

		const existingTariffs = await this.tariffRepository.getAllTariffs()

		for (let i = 0; i < tariffsData.length; i++) {
			const tariffData = tariffsData[i]

			if (existingTariffs.find((tariff) => tariff.code === tariffData.code)) {
				continue
			}

			await this.tariffRepository.createTariff(tariffData)
		}
	}

	getTariffsData(): CreateTariffDto[] {
		return [
			{
				code: 'base',
				name: 'Базовый',
				price: 15000, // 150 rub
				durationDays: 30,
				includedBalance: 0,
				includedFileStorageMb: 0,
			},
			{
				code: 'standard',
				name: 'Стандартный',
				price: 45000, // 450 rub
				durationDays: 30,
				includedBalance: 150,
				includedFileStorageMb: 5000,
			},
		]
	}
}
