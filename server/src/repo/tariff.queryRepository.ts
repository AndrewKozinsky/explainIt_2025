import { Injectable } from '@nestjs/common'
import { TariffOutModel } from 'models/tariff/tariff.out.model'
import { Tariff } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class TariffQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getTariffs(): Promise<TariffOutModel[]> {
		const tariffs = await this.prisma.tariff.findMany()

		return tariffs.map((t) => this.mapDbTariffToOutModel(t))
	}

	mapDbTariffToOutModel(dbTariff: Tariff): TariffOutModel {
		return {
			id: dbTariff.id,
			code: dbTariff.code,
			name: dbTariff.name,
			price: dbTariff.price,
			durationDays: dbTariff.duration_days,
			includedBalance: dbTariff.included_balance,
			includedFileStorageMb: dbTariff.included_file_storage_mb,
			createdAt: dbTariff.created_at,
		}
	}
}
