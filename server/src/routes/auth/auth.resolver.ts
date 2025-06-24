import {UsePipes, ValidationPipe} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import {Args, Mutation, Resolver} from '@nestjs/graphql'
import RouteNames from 'src/infrastructure/routeNames'
import {CreateUserCommand} from '../../features/auth/CreateUser.command'
import {UserOutModel} from '../../models/user/user.out.model'
import {RegisterUserInput} from './inputs/registerUser.input'
import {authResolversDesc} from './resolverDescriptions'

@Resolver()
export class AuthResolver {
	constructor(private commandBus: CommandBus) {}

	@Mutation(() => UserOutModel, {
		name: RouteNames.AUTH.REGISTER,
		description: authResolversDesc.register,
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	async register(@Args('input') input: RegisterUserInput) {
		return await this.commandBus.execute(new CreateUserCommand(input))
	}
}
