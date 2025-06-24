import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import {CreateUserHandler} from '../../features/auth/CreateUser.command'
import {UserRepository} from '../../repo/user.repository'
import { AuthResolver } from './auth.resolver'

const commandHandlers = [CreateUserHandler]
const resolvers = [AuthResolver]
const repositories = [
	UserRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...commandHandlers, ...resolvers, ...repositories],
})
export class AuthModule {}
