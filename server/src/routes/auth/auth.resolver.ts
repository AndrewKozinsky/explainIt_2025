import { UsePipes, ValidationPipe } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import RouteNames from 'src/infrastructure/routeNames'
import { ConfirmEmailCommand } from '../../features/auth/ConfirmEmail.command'
import { CreateUserCommand } from '../../features/auth/CreateUser.command'
import { LoginCommand } from '../../features/auth/Login.command'
import { BrowserService } from '../../infrastructure/browserService/browser.service'
import { UserOutModel } from '../../models/user/user.out.model'
import { ConfirmEmailInput } from './inputs/confirmEmail.input'
import { LoginInput } from './inputs/login.input'
import { RegisterUserInput } from './inputs/registerUser.input'
import { authResolversDesc } from './resolverDescriptions'
import { Request } from 'express'

@Resolver()
export class AuthResolver {
	constructor(
		private commandBus: CommandBus,
		private browserService: BrowserService,
	) {}

	@Mutation(() => UserOutModel, {
		name: RouteNames.AUTH.REGISTER,
		description: authResolversDesc.register,
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	async register(@Args('input') input: RegisterUserInput) {
		return await this.commandBus.execute(new CreateUserCommand(input))
	}

	@Mutation(() => UserOutModel, {
		name: RouteNames.AUTH.LOGIN,
		description: authResolversDesc.login,
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	async login(@Args('input') input: LoginInput, @Context('req') request: Request) {
		const clientIP = this.browserService.getClientIP(request)
		const clientName = this.browserService.getClientName(request)

		return await this.commandBus.execute(new LoginCommand(request, input, clientIP, clientName))
	}

	@Query(() => Boolean, {
		name: RouteNames.AUTH.CONFIRM_EMAIL,
		description: authResolversDesc.confirmEmail,
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	async confirmEmail(@Args('input') input: ConfirmEmailInput) {
		return await this.commandBus.execute(new ConfirmEmailCommand(input))
	}
}
