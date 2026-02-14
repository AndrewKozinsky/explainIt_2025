import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TariffQueryRepository } from 'repo/tariff.queryRepository'
import { TariffRepository } from 'repo/tariff.repository'
import { TariffResolver } from 'routes/tariff/tariff.resolver'
import { PrismaService } from 'db/prisma.service'
import { CreateTariffsHandler } from 'features/tariff/CreateTariffs.command'
import { GetTariffsHandler } from 'features/tariff/GetTariffs.command'

const services = [PrismaService]

const commandHandlers = [CreateTariffsHandler, GetTariffsHandler]

const resolvers = [TariffResolver]

const repositories = [TariffRepository, TariffQueryRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class TariffModule {}
