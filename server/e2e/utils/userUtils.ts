import { INestApplication } from '@nestjs/common'
import { Request } from 'express'
import { LoginWithOAuthHandler } from '../../src/features/auth/LoginWithOAuth.command'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserServiceModel } from '../../src/models/auth/auth.service.model'
import { UserRepository } from '../../src/repo/user.repository'
import { OAuthProviderType } from '../../src/routes/auth/inputs/loginWithOAuth.input'
import { makeGraphQLReq } from '../makeGQReq'
import { defUserEmail, defUserPassword } from './common'
import { queries } from '../../src/features/db/queries'
import { z } from 'zod'

export const userUtils = {
	async createUserWithUnconfirmedEmail(props: {
		app: INestApplication
		userRepository: UserRepository
		email?: string
		password?: string
	}) {
		const mutationArgs = {
			email: props.email ?? defUserEmail,
			password: props.password ?? defUserPassword,
		}

		const createUserMutation = queries.auth.registerUser(mutationArgs)

		const [createUserResp] = await makeGraphQLReq(props.app, createUserMutation)

		const routeName = RouteNames.AUTH.REGISTER
		// console.log(createUserResp.errors[0].extensions.validationErrors)
		const userId = createUserResp.data[routeName].id

		return props.userRepository.getUserById(userId)
	},

	async createUserWithConfirmedEmail(props: {
		app: INestApplication
		userRepository: UserRepository
		email?: string
		password?: string
	}) {
		const createdUser = await userUtils.createUserWithUnconfirmedEmail(props)
		if (!createdUser) return

		const { emailConfirmationCode } = createdUser

		const confirmEmailQuery = queries.auth.confirmEmail(emailConfirmationCode!)

		const [confirmEmailResp] = await makeGraphQLReq(props.app, confirmEmailQuery)

		return props.userRepository.getUserById(createdUser.id)
	},

	async createUserWithEmailAndPasswordAndLogin(props: {
		app: INestApplication
		userRepository: UserRepository
		email?: string
		password?: string
	}) {
		const email = props.email ?? defUserEmail
		const password = props.password ?? defUserPassword

		await userUtils.createUserWithConfirmedEmail({
			app: props.app,
			userRepository: props.userRepository,
			email,
			password,
		})

		return userUtils.loginUser({
			app: props.app,
			email,
			password,
		})
	},

	async loginUser(props: { app: INestApplication; email: string; password: string }) {
		const loginQuery = queries.auth.login({ email: props.email, password: props.password })
		const [loginResp, loginRespCookies] = await makeGraphQLReq(props.app, loginQuery)

		if (!loginResp.data) {
			throw new Error('Unable to log in')
		}

		return {
			loginData: loginResp.data[RouteNames.AUTH.LOGIN],
			sessionToken: loginRespCookies.session,
		} as {
			loginData: {
				id: number
				email: string
				isUserConfirmed: boolean
				balance: number
			}
			sessionToken: {
				value: string
				path: '/'
				expires: string
				sameSite: string
			}
		}
	},

	async loginUserWithOAuthSuccessfully(props: { app: INestApplication; email: string }) {
		// Get LoginWithOAuthHandler use case to create a mock below
		const loginWithOAuthHandler = props.app.get<LoginWithOAuthHandler>(LoginWithOAuthHandler)

		// Method getUserDataFromOAuthCode returns email and name
		jest.spyOn(loginWithOAuthHandler, 'getUserDataFromOAuthCode').mockResolvedValue({
			email: props.email,
			name: 'Test User',
		})

		const registerWithOAuthUserMutation = queries.auth.loginUserWithOAuth({
			providerType: OAuthProviderType.YANDEX,
			code: 'some code',
		})

		// Register the user with OAuth for the first time
		const [registerWithOAuthResp, registerWithOAuthCookies] = await makeGraphQLReq(
			props.app,
			registerWithOAuthUserMutation,
		)

		return {
			registerWithOAuthData: registerWithOAuthResp.data[RouteNames.AUTH.LOGIN_WITH_OAUTH],
			sessionToken: registerWithOAuthCookies.session,
		} as {
			registerWithOAuthData: {
				id: number
				email: string
				isUserConfirmed: boolean
				balance: number
			}
			sessionToken: {
				value: string
				path: '/'
				expires: string
				sameSite: string
			}
		}
	},

	async loginUserWithOAuthFail(props: { app: INestApplication }) {
		// Get LoginWithOAuthHandler use case to create a mock below
		const loginWithOAuthHandler = props.app.get<LoginWithOAuthHandler>(LoginWithOAuthHandler)

		// Create a mock for method getUserDataFromOAuthProvider. It returns null to imitate wrong answer from OAuth provider
		jest.spyOn(loginWithOAuthHandler, 'getUserDataFromOAuthProvider').mockResolvedValue(null)

		// Create a mutation to register the user with OAuth
		const registerWithOAuthUserMutation = queries.auth.loginUserWithOAuth({
			providerType: OAuthProviderType.YANDEX,
			code: 'some code',
		})

		// A try to register the user with OAuth
		const [registerWithOAuthResp] = await makeGraphQLReq(props.app, registerWithOAuthUserMutation)
		return registerWithOAuthResp
	},

	isUserEmailConfirmed(user: UserServiceModel) {
		return user.isEmailConfirmed && !user.emailConfirmationCode && !user.confirmationCodeExpirationDate
	},

	checkSessionCookie(cookiesObj: any) {
		expect(cookiesObj).toEqual({
			session: expect.objectContaining({
				value: expect.any(String),
				path: '/',
				expires: expect.any(String),
				sameSite: 'Lax',
			}),
		})
	},

	checkUserOutResp(user: any, checks?: { id?: number; email?: string; isUserConfirmed?: boolean; balance?: number }) {
		expect(user).toEqual({
			id: expect.any(Number),
			email: expect.any(String),
			isUserConfirmed: expect.any(Boolean),
			balance: expect.any(Number),
		})

		if (checks?.id) {
			expect(user.id).toBe(checks.id)
		}
		if (checks?.email) {
			expect(user.email).toBe(checks.email)
		}
		if (checks?.isUserConfirmed !== undefined) {
			expect(user.isUserConfirmed).toBe(checks.isUserConfirmed)
		}
		if (checks?.balance !== undefined) {
			expect(user.balance).toBe(checks.balance)
		}
	},

	checkUserServiceResponseData(
		user: any,
		checks?: {
			id?: number
			email?: string
			password?: null | string
			emailConfirmationCode?: null | string
			confirmationCodeExpirationDate?: null | string
			isEmailConfirmed?: boolean
			isUserConfirmed?: boolean
			balance?: number
		},
	) {
		const userDataSchema = z
			.object({
				id: z.number(),
				email: z.string(),
				password: z.string().nullable(),
				emailConfirmationCode: z.string().nullable(),
				confirmationCodeExpirationDate: z.string().nullable(),
				isEmailConfirmed: z.boolean(),
				isUserConfirmed: z.boolean(),
				balance: z.number(),
			})
			.strict()

		const parsed = userDataSchema.safeParse(user)

		if (!parsed.success) {
			throw new Error(`Invalid user object: ${parsed.error.message}`)
		}

		if (checks?.id) {
			expect(user.id).toBe(checks.id)
		}
		if (checks?.email) {
			expect(user.email).toBe(checks.email)
		}
		if (checks.password !== undefined) {
			if (checks.password === null) expect(user.password).toBe(null)
			else expect(typeof user.password).toBe('string')
		}
		if (checks.emailConfirmationCode !== undefined) {
			if (checks.emailConfirmationCode === null) expect(user.emailConfirmationCode).toBe(null)
			else expect(typeof user.emailConfirmationCode).toBe('string')
		}
		if (checks.confirmationCodeExpirationDate !== undefined) {
			if (checks.confirmationCodeExpirationDate === null) expect(user.confirmationCodeExpirationDate).toBe(null)
			else expect(typeof user.confirmationCodeExpirationDate).toBe('string')
		}
		if (checks?.isEmailConfirmed !== undefined) {
			expect(user.isEmailConfirmed).toBe(checks.isEmailConfirmed)
		}
		if (checks?.isUserConfirmed !== undefined) {
			expect(user.isUserConfirmed).toBe(checks.isUserConfirmed)
		}
		if (checks?.balance !== undefined) {
			expect(user.balance).toBe(checks.balance)
		}
	},

	getFakeRequestForOAuth() {
		return {
			session: {
				userId: null,
				clientIP: null,
				clientName: null,
				save: (callback: (err?: any) => void) => callback(null),
			},
		} as any as Request
	},
}
