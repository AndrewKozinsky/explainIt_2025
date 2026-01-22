import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { UserRepository } from 'repo/user.repository'
import { SeedTestDataHandler } from 'features/db/SeedTestData.command'
import { PrismaService } from '../../db/prisma.service'
import { DbController } from './db.controller'
import { DbService } from './db.service'

const services = [PrismaService, DbService]

const repositories = [UserRepository, DBRepository]

const commandHandlers = [SeedTestDataHandler]

@Module({
	imports: [CqrsModule],
	controllers: [DbController],
	providers: [...services, ...services, ...repositories, ...commandHandlers],
})
export class DbModule {}
