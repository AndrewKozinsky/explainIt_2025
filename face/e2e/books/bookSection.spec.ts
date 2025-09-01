import { expect, test } from '@playwright/test'
import { BooksTest } from '_pages/books/books/booksTest'
import { serverTestDataConfig, UserRegisteredWithCredentialsConfig } from 'e2e/utils/serverTestDataConfig'
import { pageUrls } from 'сonsts/pageUrls'
import { loginUser } from '../utils/common'
import testPagesUrls from '../utils/testPagesUrls'
import { server } from '../utils/server'

test.beforeEach(async ({ page }) => {
	await server.clearDB()
	await server.seedTestData()
})

test.describe('Book section', () => {
	/*test('new user must have a default book in books list', async ({ page }) => {
		const userWithNoBooksConfig = serverTestDataConfig.getUsersConfig()
			.user_5 as UserRegisteredWithCredentialsConfig
		await loginUser(page, userWithNoBooksConfig)

		// Move to the Books page
		await page.goto(testPagesUrls.books)

		// Check that user has a default book in books list
		const $booksLinks = page.getByTestId(BooksTest.bookLink)
		await expect($booksLinks).toHaveCount(userWithNoBooksConfig.books.length + 1)
	})*/
})
