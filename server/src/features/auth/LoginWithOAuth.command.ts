import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import axios from 'axios'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { MainConfigService } from '../../infrastructure/mainConfig/mainConfig.service'
import { LoginWithOAuthInputModel } from '../../models/auth/auth.input.model'
import { UserOutModel } from '../../models/user/user.out.model'
import { UserRepository } from '../../repo/user.repository'
import { Request } from 'express'
import { UserQueryRepository } from 'src/repo/user.queryRepository'
import { OAuthProviderType } from '../../routes/auth/inputs/loginWithOAuth.input'
import { CreateUserCommand } from './CreateUser.command'
const qs = require('qs') // You can also use URLSearchParams instead

export class LoginWithOAuthCommand implements ICommand {
	constructor(
		public request: Request,
		public loginWithOAuthInput: LoginWithOAuthInputModel,
		public clientIP: string,
		public clientName: string,
	) {}
}

@CommandHandler(LoginWithOAuthCommand)
export class LoginWithOAuthHandler implements ICommandHandler<LoginWithOAuthCommand> {
	constructor(
		private userRepository: UserRepository,
		private userQueryRepository: UserQueryRepository,
		private mainConfigService: MainConfigService,
		private commandBus: CommandBus,
	) {}

	async execute(command: LoginWithOAuthCommand) {
		const { request, loginWithOAuthInput, clientIP, clientName } = command
		const { code, providerType } = loginWithOAuthInput

		let accessToken = await this.getAccessToken(code, providerType)

		if (!accessToken) {
			throw new CustomGraphQLError(errorMessage.cannotGetAccessTokenForOAuthProvider, ErrorCode.BadRequest_400)
		}

		let userData = await this.getUserDataFromOAuthProvider(accessToken, providerType)

		if (!userData) {
			throw new CustomGraphQLError(
				errorMessage.cannotGetUserDataFromOAuthProvider,
				ErrorCode.InternalServerError_500,
			)
		}

		const { email } = userData

		const user = await this.userRepository.getUserByEmail(email)

		if (user) {
			if (!user.isUserConfirmed) {
				await this.userRepository.updateUser(user.id, { is_user_confirmed: true })
			}
		} else {
			const createUserCommand = new CreateUserCommand({ email, isUserConfirmed: true })
			await this.commandBus.execute(createUserCommand)
		}

		const outUser = await this.userQueryRepository.getUserByEmail(email)
		if (!outUser) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return await this.saveSession(request, outUser, clientIP, clientName)
	}

	async getAccessToken(code: string, providerType: OAuthProviderType) {
		const getAccessTokenMapper: Record<OAuthProviderType, (code: string) => Promise<null | string>> = {
			github: this.getAccessTokenForGitHub.bind(this),
			google: this.getAccessTokenForGoogle.bind(this),
			yandex: this.getAccessTokenForYandex.bind(this),
		}

		try {
			return await getAccessTokenMapper[providerType](code)
		} catch (error: unknown) {
			console.log(error)
			return null
		}
	}

	async getAccessTokenForGitHub(code: string) {
		const { clientId, clientSecret } = this.mainConfigService.get().oauth.github
		const requestUrl = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`

		const getGitHubAccessTokenResp = await axios.post(
			requestUrl,
			{},
			{
				headers: {
					Accept: 'application/json',
				},
			},
		)

		return getGitHubAccessTokenResp.data.access_token
	}

	async getAccessTokenForGoogle(code: string) {
		const { clientId, clientSecret, redirectUrl } = this.mainConfigService.get().oauth.google
		const requestUrl = `https://www.googleapis.com/oauth2/v4/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUrl}`

		const getGoogleAccessTokenResp = await axios.post(
			requestUrl,
			{},
			{
				headers: {
					Accept: 'application/json',
				},
			},
		)

		return getGoogleAccessTokenResp.data.access_token
	}

	async getAccessTokenForYandex(code: string) {
		const { clientId, clientSecret } = this.mainConfigService.get().oauth.yandex

		const data = qs.stringify({
			grant_type: 'authorization_code',
			code,
			client_id: clientId, // optional if using Basic Auth
			client_secret: clientSecret, // optional if using Basic Auth
		})

		const getYandexAccessTokenResp = await axios.post('https://oauth.yandex.ru/token', data, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(data),
			},
		})

		return getYandexAccessTokenResp.data.access_token
	}

	async getUserDataFromOAuthProvider(
		accessToken: string,
		providerType: OAuthProviderType,
	): Promise<null | { name: null | string; email: string }> {
		const getUserDataMapper: Record<
			OAuthProviderType,
			(accessToken: string) => Promise<null | { name: null | string; email: string }>
		> = {
			github: this.getUserDataFromGitHub,
			google: this.getUserDataFromGoogle,
			yandex: this.getUserDataFromYandex,
		}

		try {
			return await getUserDataMapper[providerType](accessToken)
		} catch (error: unknown) {
			console.log(error)
			return null
		}
	}

	async getUserDataFromGitHub(accessToken: string) {
		const getGitHubAccessTokenResp = await axios.get('https://api.github.com/user', {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		})

		const { name, email } = getGitHubAccessTokenResp.data
		if (!email) return null

		return {
			name,
			email: email.toLowerCase(),
		}
	}

	async getUserDataFromGoogle(accessToken: string) {
		const getGoogleAccessTokenResp = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		})

		const { name, email } = getGoogleAccessTokenResp.data
		if (!email) return null

		return {
			name,
			email: email.toLowerCase(),
		}
	}

	async getUserDataFromYandex(accessToken: string) {
		const config = {
			oauthToken: accessToken,
			format: 'json', // optional - can be 'json', 'xml', or 'jwt'
		}

		const params = new URLSearchParams()
		if (config.format) params.append('format', config.format)

		const getYandexAccessTokenResp = await axios.get('https://login.yandex.ru/info', {
			params: params,
			headers: {
				Authorization: `OAuth ${config.oauthToken}`,
			},
		})

		// Emails is an array. There may be troubles ahead because I will take the first email
		const { real_name, emails } = getYandexAccessTokenResp.data
		if (!emails.length) return null

		return {
			name: real_name,
			email: emails[0].toLowerCase(),
		}
	}

	async saveSession(req: Request, user: UserOutModel, clientIP: string, clientName: string) {
		return new Promise((resolve, reject) => {
			if (!req.session) {
				throw new CustomGraphQLError(errorMessage.noSessionObject, ErrorCode.InternalServerError_500)
			}

			req.session.userId = user.id
			req.session.clientIP = clientIP
			req.session.clientName = clientName

			req.session.save((err) => {
				if (err) {
					console.log(err)

					return reject(
						new CustomGraphQLError(errorMessage.cannotSaveSession, ErrorCode.InternalServerError_500),
					)
				}

				resolve(user)
			})
		})
	}
}
