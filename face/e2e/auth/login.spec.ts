import { test, expect } from '@playwright/test'
import { LoginFormTest } from '../../_pages/auth/authLogin/AuthLoginForm/fn/form'
import { errorMessages } from '../../utils/errorMessages'
import { getTextInputElems } from '../utils/common'
import testPagesUrls from '../utils/testPagesUrls'
import { server } from '../utils/server'
import { serverTestDataConfig } from '../utils/serverTestDataConfig'

test.beforeEach(async ({ page }) => {
	await server.clearDB()
	await server.seedTestData()
	await page.goto(testPagesUrls.authLogin)
})

test('has a form with necessary fields', async ({ page }) => {
	// Check that page has a form
	const $form = page.getByTestId(LoginFormTest.form.id)
	await expect($form).toHaveCount(1)

	// Check that form has the necessary fields
	// Get email field elements
	const {
		$root: $emailFieldRoot,
		$label: $emailFieldLabel,
		$input: $emailFieldInput,
		$error: $emailFieldError,
	} = getTextInputElems($form, LoginFormTest.emailField.id)

	// Check the email field
	await expect($emailFieldRoot).toHaveCount(1)
	await expect($emailFieldLabel).toHaveCount(1)
	await expect($emailFieldLabel).toHaveText('Почта')
	await expect($emailFieldInput).toHaveCount(1)
	await expect($emailFieldError).toHaveCount(0)

	// Get password field elements
	const {
		$root: $passwordFieldRoot,
		$label: $passwordFieldLabel,
		$input: $passwordFieldInput,
		$error: $passwordFieldError,
	} = getTextInputElems($form, LoginFormTest.passwordField.id)

	// Check the password field
	await expect($passwordFieldRoot).toHaveCount(1)
	await expect($passwordFieldLabel).toHaveCount(1)
	await expect($passwordFieldLabel).toHaveText('Пароль')
	await expect($passwordFieldInput).toHaveCount(1)
	await expect($passwordFieldError).toHaveCount(0)

	// Check that form has a submit button
	const $submitButton = page.getByTestId(LoginFormTest.submitButton.id)
	await expect($submitButton).toHaveCount(1)
	await expect($submitButton).toHaveText('Войти')

	// Check there is no error message
	const $errorMessage = page.getByTestId(LoginFormTest.failMessage.id)
	await expect($errorMessage).toHaveCount(0)
})

test('the form has to show errors if a user submit the form without filling this fields', async ({ page }) => {
	const $form = page.getByTestId(LoginFormTest.form.id)

	// Click on submit button
	const $submitButton = page.getByTestId(LoginFormTest.submitButton.id)
	await $submitButton.click()
	// Check that button isn't disabled
	await expect($submitButton).not.toBeDisabled()

	// Check there is an error near the email field
	const { $error: $emailFieldError } = getTextInputElems($form, LoginFormTest.emailField.id)
	await expect($emailFieldError).toHaveCount(1)
	await expect($emailFieldError).toHaveText(errorMessages.requiredField)

	// Check there is an error near the password field
	const { $error: $passwordFieldError } = getTextInputElems($form, LoginFormTest.passwordField.id)
	await expect($passwordFieldError).toHaveCount(1)
	await expect($passwordFieldError).toHaveText(errorMessages.requiredField)
})

test('the form has to show errors if a user types wrong value to the fields', async ({ page }) => {
	const $form = page.getByTestId(LoginFormTest.form.id)

	// Write wrong values to each field
	// Check there is an error near the email field
	const { $input: $emailFieldInput, $error: $emailFieldError } = getTextInputElems($form, LoginFormTest.emailField.id)
	await $emailFieldInput.fill('wrongemail.com')

	const { $input: $passwordFieldInput, $error: $passwordFieldError } = getTextInputElems(
		$form,
		LoginFormTest.passwordField.id,
	)
	await $passwordFieldInput.fill('Foo3')

	// Click on submit button
	const $submitButton = page.getByTestId(LoginFormTest.submitButton.id)
	await $submitButton.click()
	// Check that button isn't disabled
	await expect($submitButton).not.toBeDisabled()

	// Check for errors
	await expect($emailFieldError).toHaveCount(1)
	await expect($emailFieldError).toHaveText(errorMessages.wrongEmailFormat)

	await expect($passwordFieldError).toHaveCount(1)
	await expect($passwordFieldError).toHaveText(errorMessages.minCharacters(6))
})

test('the form has to show main error if a user is not found', async ({ page }) => {
	const user = serverTestDataConfig.getUsersConfig().user_1

	const $form = page.getByTestId(LoginFormTest.form.id)

	// Write correct values to each field
	// Check there is an error near the email field
	const { $input: $emailFieldInput } = getTextInputElems($form, LoginFormTest.emailField.id)
	await $emailFieldInput.fill('email@mail.com')

	const { $input: $passwordFieldInput } = getTextInputElems($form, LoginFormTest.passwordField.id)
	await $passwordFieldInput.fill('my-great-password')

	// Click on submit button
	const $submitButton = page.getByTestId(LoginFormTest.submitButton.id)
	await $submitButton.click()
	// Check that button is disabled
	await expect($submitButton).not.toBeDisabled()

	// Check for the main error message
	const $failMessage = await page.getByTestId(LoginFormTest.failMessage.id)
	await expect($failMessage).toHaveCount(1)
	await expect($failMessage).toHaveText(errorMessages.fromServer.userNotFound)
})

test('the form has to show main error if a user types correct data, but it from unconfirmed user', async ({ page }) => {
	const userWithUnconfirmedEmail = serverTestDataConfig.getUsersConfig().user_1
	if (userWithUnconfirmedEmail.type !== 'userRegisteredWithCredentials') return

	const $form = page.getByTestId(LoginFormTest.form.id)

	// Write correct values to each field
	// Check there is an error near the email field
	const { $input: $emailFieldInput } = getTextInputElems($form, LoginFormTest.emailField.id)
	await $emailFieldInput.fill(userWithUnconfirmedEmail.email)

	const { $input: $passwordFieldInput } = getTextInputElems($form, LoginFormTest.passwordField.id)
	await $passwordFieldInput.fill(userWithUnconfirmedEmail.password)

	// Click on submit button
	const $submitButton = page.getByTestId(LoginFormTest.submitButton.id)
	await $submitButton.click()
	// Check that button isn't disabled
	await expect($submitButton).not.toBeDisabled()

	// Check for the main error message
	const $failMessage = page.getByTestId(LoginFormTest.failMessage.id)
	await expect($failMessage).toHaveCount(1)
	await expect($failMessage).toHaveText(errorMessages.fromServer.emailIsNotConfirmed)
})

test('the form has to redirect to the main page after the form was filled up correctly', async ({ page }) => {
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

	// Check for the main error message
	const $failMessage = page.getByTestId(LoginFormTest.failMessage.id)
	await expect($failMessage).toHaveCount(0)

	// Check that current page is home page
	expect(page.url()).toBe(testPagesUrls.books)
})
