import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DbController } from './db.controller'
import { PrismaService } from '../../db/prisma.service'
import {DbService} from './db.service'

const services = [DbService]

@Module({
	imports: [CqrsModule],
	controllers: [DbController],
	providers: [PrismaService, ...services],
})
export class DbModule {}
