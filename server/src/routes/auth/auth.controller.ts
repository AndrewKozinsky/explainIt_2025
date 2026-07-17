import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { ConfirmEmailInput } from 'routes/auth/inputs/confirmEmail.input'
import { LoginInput } from 'routes/auth/inputs/login.input'
import { LoginWithOAuthInput } from 'routes/auth/inputs/loginWithOAuth.input'
import { RegisterUserInput } from 'routes/auth/inputs/registerUser.input'
import { ResendConfirmationEmailInput } from 'routes/auth/inputs/resendConfirmationEmail.input'
import { ConfirmEmailCommand } from 'features/auth/ConfirmEmail.command'
import { CreateUserWithEmailAndPasswordCommand } from 'features/auth/CreateUserWithEmailAndPassword.command'
import { GetUserByIdCommand } from 'features/auth/GetUserById.command'
import { LoginCommand } from 'features/auth/Login.command'
import { LoginWithOAuthCommand } from 'features/auth/LoginWithOAuth.command'
import { LogoutCommand } from 'features/auth/Logout.command'
import { ResendConfirmationEmailCommand } from 'features/auth/ResendConfirmationEmail.command'
import { BrowserService } from 'infrastructure/browserService/browser.service'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { UserOutModel } from 'models/user/user.out.model'
import {
	ApiLogin,
	ApiGetMe,
	ApiLoginWithOAuth,
	ApiRegister,
	ApiConfirmEmail,
	ApiResendConfirmationEmail,
	ApiLogout,
} from './openAPI.decorators'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private commandBus: CommandBus,
		private browserService: BrowserService,
	) {}

	@ApiLogin()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() input: LoginInput, @Req() request: Request): Promise<UserOutModel> {
		const clientIP = this.browserService.getClientIP(request)
		const clientName = this.browserService.getClientName(request)

		return await this.commandBus.execute(new LoginCommand(request, input, clientIP, clientName))
	}

	@ApiRegister()
	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	async register(@Body() input: RegisterUserInput): Promise<UserOutModel> {
		return await this.commandBus.execute(new CreateUserWithEmailAndPasswordCommand(input))
	}

	@ApiConfirmEmail()
	@HttpCode(HttpStatus.OK)
	@Post('confirm-email')
	async confirmEmail(@Body() input: ConfirmEmailInput): Promise<boolean> {
		return await this.commandBus.execute(new ConfirmEmailCommand(input))
	}

	@ApiResendConfirmationEmail()
	@HttpCode(HttpStatus.OK)
	@Post('resend-confirmation-email')
	async resendConfirmationEmail(@Body() input: ResendConfirmationEmailInput): Promise<boolean> {
		return await this.commandBus.execute(new ResendConfirmationEmailCommand(input.email))
	}

	@ApiLogout()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Post('logout')
	async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<boolean> {
		return await this.commandBus.execute(new LogoutCommand(request, response))
	}

	@ApiGetMe()
	@UseGuards(CheckSessionCookieGuard)
	@Get('me')
	async getMe(@Req() request: Request): Promise<UserOutModel> {
		return await this.commandBus.execute(new GetUserByIdCommand(request.session.userId!))
	}

	@ApiLoginWithOAuth()
	@HttpCode(HttpStatus.OK)
	@Post('login-with-oauth')
	async loginWithOAuth(@Body() input: LoginWithOAuthInput, @Req() request: Request): Promise<UserOutModel> {
		const clientIP = this.browserService.getClientIP(request)
		const clientName = this.browserService.getClientName(request)

		return await this.commandBus.execute(
			new LoginWithOAuthCommand({ request, loginWithOAuthInput: input, clientIP, clientName }),
		)
	}
}
