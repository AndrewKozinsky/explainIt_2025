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
	async createTariff(dto: {
		code: string
		name: string
		price: number
		includedBalance: number
		includedFileStorageMb: number
	}) {
		const newTariff = await this.prisma.tariff.create({
			data: {
				code: dto.code,
				name: dto.name,
				price: dto.price,
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
			name: dbTariff.name,
			price: dbTariff.price,
			includedBalance: dbTariff.included_balance,
			includedFileStorageMb: dbTariff.included_file_storage_mb,
			createdAt: dbTariff.created_at,
		}
	}
}
