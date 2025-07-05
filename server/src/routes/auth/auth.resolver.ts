import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import RouteNames from 'src/infrastructure/routeNames'
import { ConfirmEmailCommand } from '../../features/auth/ConfirmEmail.command'
import { CreateUserCommand } from '../../features/auth/CreateUser.command'
import { GetUserByIdCommand } from '../../features/auth/GetUserById.command'
import { LoginCommand } from '../../features/auth/Login.command'
import { LogoutCommand } from '../../features/auth/Logout.command'
import { ResendConfirmationEmailCommand } from '../../features/auth/ResendConfirmationEmail.command'
import { BrowserService } from '../../infrastructure/browserService/browser.service'
import { CheckSessionCookieGuard } from '../../infrastructure/guards/checkSessionCookie.guard'
import { UserOutModel } from '../../models/user/user.out.model'
import { ConfirmEmailInput } from './inputs/confirmEmail.input'
import { LoginInput } from './inputs/login.input'
import { RegisterUserInput } from './inputs/registerUser.input'
import { ResendConfirmationEmailInput } from './inputs/resendConfirmationEmail.input'
import { authResolversDesc } from './resolverDescriptions'
import { Request, Response } from 'express'

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

	@Mutation(() => Boolean, {
		name: RouteNames.AUTH.RESEND_CONFIRMATION_EMAIL,
		description: authResolversDesc.resendConfirmationEmail,
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	async resendConfirmationEmail(@Args('input') input: ResendConfirmationEmailInput) {
		return await this.commandBus.execute(new ResendConfirmationEmailCommand(input.email))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => UserOutModel, {
		name: RouteNames.AUTH.GET_ME,
		description: authResolversDesc.getMe,
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	async getMe(@Context('req') request: Request) {
		return await this.commandBus.execute(new GetUserByIdCommand(request.session.userId!))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => Boolean, {
		name: RouteNames.AUTH.LOGOUT,
		description: authResolversDesc.logout,
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	async logout(@Context() context: { req: Request; res: Response }) {
		return await this.commandBus.execute(new LogoutCommand(context.req, context.res))
	}
}
