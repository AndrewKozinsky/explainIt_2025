import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateDefaultBookHandler } from 'src/features/book/CreateDefaultBook.command'
import { PrismaService } from '../../db/prisma.service'
import { ConfirmEmailHandler } from '../../features/auth/ConfirmEmail.command'
import { CreateUserWithEmailAndPasswordHandler } from '../../features/auth/CreateUserWithEmailAndPassword.command'
import { GetUserByIdHandler } from '../../features/auth/GetUserById.command'
import { LoginHandler } from '../../features/auth/Login.command'
import { LoginWithOAuthHandler } from '../../features/auth/LoginWithOAuth.command'
import { LogoutHandler } from '../../features/auth/Logout.command'
import { ResendConfirmationEmailHandler } from '../../features/auth/ResendConfirmationEmail.command'
import { BrowserService } from '../../infrastructure/browserService/browser.service'
import { EmailAdapterService } from '../../infrastructure/emailAdapter/email-adapter.service'
import { BalanceTransactionRepository } from 'src/repo/balanceTransaction.repository'
import { DBRepository } from 'src/repo/db.repository'
import { UserQueryRepository } from 'src/repo/user.queryRepository'
import { UserRepository } from 'src/repo/user.repository'
import { AuthResolver } from './auth.resolver'

const services = [PrismaService, EmailAdapterService, BrowserService]
const commandHandlers = [
	CreateUserWithEmailAndPasswordHandler,
	LoginHandler,
	ConfirmEmailHandler,
	ResendConfirmationEmailHandler,
	GetUserByIdHandler,
	LogoutHandler,
	LoginWithOAuthHandler,
	CreateDefaultBookHandler,
]
const resolvers = [AuthResolver]
const repositories = [UserRepository, UserQueryRepository, BalanceTransactionRepository, DBRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class AuthModule {}
