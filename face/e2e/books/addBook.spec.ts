import { test } from '@playwright/test'
import { LoginFormTest } from '../../_pages/auth/authLogin/AuthLoginForm/fn/form'
import { getTextInputElems } from '../utils/common'
import testPagesUrls from '../utils/testPagesUrls'
import { server } from '../utils/server'
import { serverTestDataConfig } from '../utils/serverTestDataConfig'

test.beforeEach(async ({ page }) => {
	await server.clearDB()
	await server.seedTestData()
})

test.only('new book has to appear when a user clicks on Add book button', async ({ page }) => {
	const user = serverTestDataConfig.getUsersConfig().user_2
	if (user.type !== 'userRegisteredWithCredentials') return

	const $form = page.getByTestId(LoginFormTest.form.id)

	// Write correct values to each field
	// Check there is an error near the email field
	const { $input: $emailFieldInput } = getTextInputElems($form, LoginFormTest.emailField.id)
	await $emailFieldInput.fill(user.email)
	const { $input: $passwordFieldInput } = getTextInputElems($form, LoginFormTest.passwordField.id)
	await $passwordFieldInput.fill(user.password)

	// Click on submit button
	const $submitButton = page.getByTestId(LoginFormTest.submitButton.id)
	await $submitButton.click()

	// Move to the Books page
	await page.goto(testPagesUrls.books)
})
