import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from '../../repo/db.repository'
import { DbController } from './db.controller'
import { PrismaService } from '../../db/prisma.service'
import { DbService } from './db.service'

const services = [PrismaService, DbService]

const repositories = [DBRepository]

@Module({
	imports: [CqrsModule],
	controllers: [DbController],
	providers: [...services, ...services, ...repositories],
})
export class DbModule {}
