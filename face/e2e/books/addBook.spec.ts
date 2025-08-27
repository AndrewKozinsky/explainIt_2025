import { expect, test } from '@playwright/test'
import { loginUser } from '../utils/common'
import testPagesUrls from '../utils/testPagesUrls'
import { server } from '../utils/server'

test.beforeEach(async ({ page }) => {
	await server.clearDB()
	await server.seedTestData()

	await loginUser(page)

	// Move to the Books page
	await page.goto(testPagesUrls.books)
})

test.only('new book has to appear when a user clicks on Add book button', async ({ page }) => {
	expect(page.url()).toBe(testPagesUrls.books)
})
