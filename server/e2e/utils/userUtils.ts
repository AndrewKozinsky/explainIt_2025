import { INestApplication } from '@nestjs/common'
import { Request } from 'express'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserServiceModel } from '../../src/models/auth/auth.service.model'
import { UserOutModel } from '../../src/models/user/user.out.model'
import { UserRepository } from '../../src/repo/user.repository'
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

	async createUserAndLogin(props: {
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
			}
			sessionToken: {
				value: string
				path: '/'
				expires: string
				sameSite: string
			}
		}
	},

	isUserEmailConfirmed(user: UserServiceModel) {
		return user.isEmailConfirmed && !user.emailConfirmationCode && !user.confirmationCodeExpirationDate
	},

	checkUserOutModel(user: UserOutModel) {
		expect(typeof user.id).toBe('number')
		expect(typeof user.email).toBe('string')
		expect(typeof user.balance).toBe('number')
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

	checkUserOutResponseData(
		user: any,
		checks?: { id?: number; email?: string; isUserConfirmed?: boolean; balance?: number },
	) {
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
		if (checks?.balance) {
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
