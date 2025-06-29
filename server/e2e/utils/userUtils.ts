import { INestApplication } from '@nestjs/common'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserOutModel } from '../../src/models/user/user.out.model'
import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReq } from '../makeGQReq'
import { defUserEmail, defUserPassword } from './common'
import { queries } from '../../src/features/test/queries'

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

	/*async createUserAndLogin(props: {
		app: INestApplication
		userRepository: UserRepository
		role: UserRole
		email?: string
		password?: string
	}) {
		const { fixedEmail, fixedPassword } = userUtils.getUserEmailAndPasswordDependsOnRole(props)

		await userUtils.createUserWithConfirmedEmail({
			app: props.app,
			userRepository: props.userRepository,
			role: props.role,
			email: fixedEmail,
			password: fixedPassword,
		})

		return userUtils.loginUser({
			app: props.app,
			email: fixedEmail,
			password: fixedPassword,
		})
	},*/

	/*async loginUser(props: { app: INestApplication; email: string; password: string }) {
		const loginQuery = queries.auth.login({ email: props.email, password: props.password })
		const [loginResp, cookies] = await makeGraphQLReq(props.app, loginQuery)
		if (!loginResp.data) {
			throw new Error('Unable to log in')
		}

		return {
			loginData: loginResp.data[RouteNames.AUTH.LOGIN],
			accessToken: cookies?.accessToken,
			refreshToken: cookies?.refreshToken,
		}
	},*/

	/*isUserEmailConfirmed(user: UserServiceModel) {
		return user.isEmailConfirmed && !user.emailConfirmationCode && !user.confirmationCodeExpirationDate
	},*/

	checkUserOutModel(user: UserOutModel) {
		expect(typeof user.id).toBe('number')
		expect(typeof user.email).toBe('string')
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
}
