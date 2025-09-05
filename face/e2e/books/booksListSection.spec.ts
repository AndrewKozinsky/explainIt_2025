import { expect, test } from '@playwright/test'
import { BooksTest } from '_pages/books/books/booksTest'
import { serverTestDataConfig, UserRegisteredWithCredentialsConfig } from 'e2e/utils/serverTestDataConfig'
import { pageUrls } from 'сonsts/pageUrls'
import { getElementsStartsWithDataTestId, loginUser } from '../utils/common'
import testPagesUrls from '../utils/testPagesUrls'
import { server } from '../utils/server'

test.beforeEach(async ({ page }) => {
	await server.clearDB()
	await server.seedTestData()
})

test.describe('Books list section', () => {
	test('new user must have a default book in books list', async ({ page }) => {
		const userWithNoBooksConfig = serverTestDataConfig.getUsersConfig()
			.user_2 as UserRegisteredWithCredentialsConfig
		await loginUser(page, userWithNoBooksConfig)

		// Move to the Books page
		await page.goto(testPagesUrls.books)

		// Check that user has a default book in books list
		const $booksLinks = await getElementsStartsWithDataTestId(page, BooksTest.booksList.bookLinkItem(''))
		await expect($booksLinks).toHaveCount(1)
	})

	test('new book has to appear when a user clicks on Add book button', async ({ page }) => {
		const userWithNoBooksConfig = serverTestDataConfig.getUsersConfig()
			.user_2 as UserRegisteredWithCredentialsConfig
		await loginUser(page, userWithNoBooksConfig)

		// Move to the Books page
		await page.goto(testPagesUrls.books)

		// Click on the Add book button
		const $addBookButton = page.getByTestId(BooksTest.booksList.addBookButton)
		await $addBookButton.click()

		// Check that new book button is disabled
		await expect($addBookButton).toBeDisabled()

		// Click one more time when Add book button is enabled
		await expect($addBookButton).toBeEnabled()
		await $addBookButton.click()

		await expect($addBookButton).toBeDisabled()
		await expect($addBookButton).toBeEnabled()

		// Check that new book has appeared in the books list
		const $booksLinks = await getElementsStartsWithDataTestId(page, BooksTest.booksList.bookLinkItem(''))
		await expect($booksLinks).toHaveCount(3)
	})

	test('the program must redirect to the newly created book', async ({ page }) => {
		const userWithNoBooksConfig = serverTestDataConfig.getUsersConfig()
			.user_2 as UserRegisteredWithCredentialsConfig
		await loginUser(page, userWithNoBooksConfig)

		// Move to the Books page
		await page.goto(testPagesUrls.books)

		await page.goto(pageUrls.books.path)

		// Click on the Add book button
		const $addBookButton = page.getByTestId(BooksTest.booksList.addBookButton)
		await $addBookButton.click()

		// Wait for the GraphQL createBook response
		const createBookResponse = await page.waitForResponse(
			(res) => res.url().includes('/graphql') && !!res.request().postData()?.includes('book_create'),
		)

		const body = await createBookResponse.json()
		const newBookId = body.data.book_create.id

		// Wait for redirect to happen
		const bookPageUrl = pageUrls.books.book(newBookId).path
		await page.waitForURL(bookPageUrl)
		expect(page.url()).toContain(bookPageUrl)

		// await page.locator('[data-testid^="booksList_bookLink"]')
	})

	test.only('if a user in his configuratin has several books its count must be equal count of these books + 1', async ({
		page,
	}) => {
		const userWithNoBooksConfig = serverTestDataConfig.getUsersConfig()
			.user_5 as UserRegisteredWithCredentialsConfig
		await loginUser(page, userWithNoBooksConfig)

		const userBooksCount = userWithNoBooksConfig?.books?.length || 0

		// Move to the Books page
		await page.goto(testPagesUrls.books)

		// Check that user has a default book in the books list
		const $booksLinks = await getElementsStartsWithDataTestId(page, BooksTest.booksList.bookLinkItem(''))
		await expect($booksLinks).toHaveCount(userBooksCount + 1)
	})
})
