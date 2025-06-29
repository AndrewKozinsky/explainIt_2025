import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PrismaService } from '../../db/prisma.service'
import { ConfirmEmailHandler } from '../../features/auth/ConfirmEmail.command'
import { CreateUserHandler } from '../../features/auth/CreateUser.command'
import { LoginHandler } from '../../features/auth/Login.command'
import { ResendConfirmationEmailHandler } from '../../features/auth/ResendConfirmationEmail.command'
import { BrowserService } from '../../infrastructure/browserService/browser.service'
import { EmailAdapterService } from '../../infrastructure/emailAdapter/email-adapter.service'
import { UserQueryRepository } from '../../repo/user.queryRepository'
import { UserRepository } from '../../repo/user.repository'
import { AuthResolver } from './auth.resolver'

const services = [PrismaService, EmailAdapterService, BrowserService]
const commandHandlers = [CreateUserHandler, LoginHandler, ConfirmEmailHandler, ResendConfirmationEmailHandler]
const resolvers = [AuthResolver]
const repositories = [UserRepository, UserQueryRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class AuthModule {}
