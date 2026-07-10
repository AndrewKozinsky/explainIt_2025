import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { ConfirmEmailHandler } from 'features/auth/ConfirmEmail.command'
import { CreateUserWithEmailAndPasswordHandler } from 'features/auth/CreateUserWithEmailAndPassword.command'
import { GetUserByIdHandler } from 'features/auth/GetUserById.command'
import { LoginHandler } from 'features/auth/Login.command'
import { LoginWithOAuthHandler } from 'features/auth/LoginWithOAuth.command'
import { LogoutHandler } from 'features/auth/Logout.command'
import { ResendConfirmationEmailHandler } from 'features/auth/ResendConfirmationEmail.command'
import { BrowserService } from 'infrastructure/browserService/browser.service'
import { EmailAdapterService } from 'infrastructure/emailAdapter/email-adapter.service'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { AuthController } from './auth.controller'

const services = [PrismaService, EmailAdapterService, BrowserService]
const commandHandlers = [
	CreateUserWithEmailAndPasswordHandler,
	LoginHandler,
	LoginWithOAuthHandler,
	GetUserByIdHandler,
	ConfirmEmailHandler,
	ResendConfirmationEmailHandler,
	LogoutHandler,
]
const repositories = [UserRepository, UserQueryRepository, DBRepository]
const guards = [CheckSessionCookieGuard]

@Module({
	imports: [CqrsModule],
	controllers: [AuthController],
	providers: [...services, ...commandHandlers, ...repositories, ...guards],
})
export class AuthModule {}
