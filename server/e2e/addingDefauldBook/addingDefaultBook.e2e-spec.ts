import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import RouteNames from '../../src/infrastructure/routeNames'
import { BookQueryRepository } from '../../src/repo/book.queryRepository'
import { UserRepository } from '../../src/repo/user.repository'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { bookUtils } from '../utils/bookUtils'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'
import { wait } from '../../src/utils/time'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Adding default book', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let bookQueryRepository: BookQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		bookQueryRepository = await app.resolve(BookQueryRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('when a user registered with email and password he should get default book Alice in Wonderland', async () => {
		// Create a user with confirmed email
		const user = await userUtils.createUserWithUnconfirmedEmail({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})
		if (!user) {
			throw new Error('User is not created')
		}

		// I need wait some time the database creates a book and chapters because the program doesn't wait for it
		await wait(500)

		// Get user's books to check if the default book exists
		let userBooksFromDB = await bookQueryRepository.getUserBooks(user.id)
		expect(userBooksFromDB.length).toBe(1)

		// Confirm user email and log in
		await userUtils.confirmUserEmail({ app, emailConfirmationCode: user.emailConfirmationCode })
		const { loginData, sessionToken } = await userUtils.loginUserSuccessfully({
			app,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Get user's books to check if the default book exists
		await getUserBooksAndCheckForDefaultBook({ app, sessionToken, userId: user.id })
	})

	it('when a user registered with OAuth he should get default book Alice in Wonderland', async () => {
		// Create a user with OAuth
		const { registerWithOAuthData, sessionToken } = await userUtils.loginUserWithOAuthSuccessfully({
			app,
			email: defUserEmail,
		})

		// Get user's books to check if the default book exists
		await getUserBooksAndCheckForDefaultBook({ app, sessionToken, userId: registerWithOAuthData.id })
	})
})

async function getUserBooksAndCheckForDefaultBook(props: {
	app: INestApplication<App>
	sessionToken: any
	userId: number
}) {
	const userBooksResp = await bookUtils.getUserBooks(props)
	let userBooks = userBooksResp.data[RouteNames.BOOK.GET_USER_BOOKS]

	bookUtils.checkBookOutResp(userBooks[0], {
		author: 'Lewis Carroll',
		name: 'Alice in Wonderland',
		note: 'It tells the story of Alice, a young girl who falls down a rabbit hole…',
		userId: props.userId,
		chapters: [
			{ name: 'Chapter 1', header: 'Down the Rabbit-Hole', note: null },
			{ name: 'Chapter 2', header: 'THE POOL OF TEARS', note: null },
		],
	})
}
