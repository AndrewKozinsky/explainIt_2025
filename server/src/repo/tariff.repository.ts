import { Injectable } from '@nestjs/common'
import { TariffServiceModel } from 'models/tariff/tariff.service.model'
import { Tariff } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class TariffRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getAllTariffs(): Promise<TariffServiceModel[]> {
		const tariffs = await this.prisma.tariff.findMany()

		return tariffs.map((tariff) => this.mapDbTariffToServiceTariff(tariff))
	}

	@CatchDbError()
	async getTariffById(tariffId: number): Promise<null | TariffServiceModel> {
		const tariff = await this.prisma.tariff.findUnique({
			where: { id: tariffId },
		})
		if (!tariff) return null

		return this.mapDbTariffToServiceTariff(tariff)
	}

	@CatchDbError()
	async createTariff(dto: {
		code: string
		slogan: string
		name: string
		description: string
		price: number
		durationDays: number
		includedBalance: number
		includedFileStorageMb: number
	}) {
		const newTariff = await this.prisma.tariff.create({
			data: {
				code: dto.code,
				slogan: dto.slogan,
				name: dto.name,
				description: dto.description,
				price: dto.price,
				duration_days: dto.durationDays,
				included_balance: dto.includedBalance,
				included_file_storage_mb: dto.includedFileStorageMb,
			},
		})

		return this.mapDbTariffToServiceTariff(newTariff)
	}

	mapDbTariffToServiceTariff(dbTariff: Tariff): TariffServiceModel {
		return {
			id: dbTariff.id,
			code: dbTariff.code,
			slogan: dbTariff.slogan,
			name: dbTariff.name,
			description: dbTariff.description,
			price: dbTariff.price,
			durationDays: dbTariff.duration_days,
			includedBalance: dbTariff.included_balance,
			includedFileStorageMb: dbTariff.included_file_storage_mb,
			createdAt: dbTariff.created_at,
		}
	}
}
