import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TariffRepository } from 'repo/tariff.repository'
import { TariffResolver } from 'routes/tariff/tariff.resolver'
import { PrismaService } from 'db/prisma.service'
import { CreateTariffsHandler } from 'features/tariff/CreateTariffs.command'

const services = [PrismaService]

const commandHandlers = [CreateTariffsHandler]

const resolvers = [TariffResolver]

const repositories = [TariffRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class TariffModule {}
