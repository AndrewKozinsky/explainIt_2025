import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { SeedTestDataHandler } from '../../features/db/SeedTestData.command'
import { DBRepository } from 'src/repo/db.repository'
import { UserRepository } from 'src/repo/user.repository'
import { DbController } from './db.controller'
import { PrismaService } from '../../db/prisma.service'
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
