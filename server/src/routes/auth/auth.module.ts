import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PrismaService } from '../../db/prisma.service'
import { CreateUserHandler } from '../../features/auth/CreateUser.command'
import { EmailAdapterService } from '../../infrastructure/emailAdapter/email-adapter.service'
import { UserQueryRepository } from '../../repo/user.queryRepository'
import { UserRepository } from '../../repo/user.repository'
import { AuthResolver } from './auth.resolver'

const services = [PrismaService, EmailAdapterService]
const commandHandlers = [CreateUserHandler]
const resolvers = [AuthResolver]
const repositories = [UserRepository, UserQueryRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class AuthModule {}
