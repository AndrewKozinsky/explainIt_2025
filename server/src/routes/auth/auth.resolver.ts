import { UsePipes, ValidationPipe } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import RouteNames from 'src/infrastructure/routeNames'
import { CreateUserCommand } from '../../features/auth/CreateUser.command'
import { UserOutModel } from '../../models/user/user.out.model'
import { LoginInput } from './inputs/login.input'
import { RegisterUserInput } from './inputs/registerUser.input'
import { authResolversDesc } from './resolverDescriptions'

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

	@Mutation(() => UserOutModel, {
		name: RouteNames.AUTH.LOGIN,
		description: authResolversDesc.login,
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	async login(
		@Args('input') input: LoginInput,
		// @Context('req') request: Request,
		// @Context('res') response: Response,
	) {
		// const clientIP = this.browserService.getClientIP(request)
		// const clientName = this.browserService.getClientName(request)
		// const commandRes = await this.commandBus.execute(new LoginCommand(input, clientIP, clientName))
		// const { accessTokenStr, refreshTokenStr, user } = commandRes
		// this.cookieService.setRefreshTokenInCookie(response, refreshTokenStr)
		// this.cookieService.setAccessTokenInCookie(response, accessTokenStr)
		// return user
	}
}
