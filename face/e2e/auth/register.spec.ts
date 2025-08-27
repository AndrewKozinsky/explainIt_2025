import { test, expect } from '@playwright/test'
import { RegisterFormTest } from '../../_pages/auth/authRegister/AuthRegisterForm/fn/form'
import { errorMessage } from '../../utils/errorMessage'
import { getTextInputElems } from '../utils/common'
import testPagesUrls from '../utils/testPagesUrls'
import { server } from '../utils/server'
import { serverTestDataConfig } from '../utils/serverTestDataConfig'

test.beforeEach(async ({ page }) => {
	await server.clearDB()
	await server.seedTestData()

	await page.goto(testPagesUrls.authRegister)
})

test.skip('has a form with necessary fields', async ({ page }) => {
	// Check that page has a form
	const $form = page.getByTestId(RegisterFormTest.form.id)
	await expect($form).toHaveCount(1)

	// Check that form has the necessary fields
	// Get email field elements
	const {
		$root: $emailFieldRoot,
		$label: $emailFieldLabel,
		$input: $emailFieldInput,
		$error: $emailFieldError,
	} = getTextInputElems($form, RegisterFormTest.emailField.id)

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
	} = getTextInputElems($form, RegisterFormTest.passwordField.id)

	// Check the password field
	await expect($passwordFieldRoot).toHaveCount(1)
	await expect($passwordFieldLabel).toHaveCount(1)
	await expect($passwordFieldLabel).toHaveText('Пароль')
	await expect($passwordFieldInput).toHaveCount(1)
	await expect($passwordFieldError).toHaveCount(0)

	// Get password again field elements
	const {
		$root: $passwordAgainFieldRoot,
		$label: $passwordAgainFieldLabel,
		$input: $passwordAgainFieldInput,
		$error: $passwordAgainFieldError,
	} = getTextInputElems($form, RegisterFormTest.passwordAgainField.id)

	// Check the password again field
	await expect($passwordAgainFieldRoot).toHaveCount(1)
	await expect($passwordAgainFieldLabel).toHaveCount(1)
	await expect($passwordAgainFieldLabel).toHaveText('Пароль ещё раз')
	await expect($passwordAgainFieldInput).toHaveCount(1)
	await expect($passwordAgainFieldError).toHaveCount(0)

	// Check that form has a submit button
	const $submitButton = page.getByTestId(RegisterFormTest.submitButton.id)
	await expect($submitButton).toHaveCount(1)
	await expect($submitButton).toHaveText('Зарегистрироваться')

	// Check there is no succuss or error message
	const $successMessage = page.getByTestId(RegisterFormTest.successMessage.id)
	await expect($successMessage).toHaveCount(0)
	const $errorMessage = page.getByTestId(RegisterFormTest.failMessage.id)
	await expect($errorMessage).toHaveCount(0)
})

test.skip('the form has to show errors if a user submit the form without filling this fields', async ({ page }) => {
	const $form = page.getByTestId(RegisterFormTest.form.id)

	// Click on submit button
	const $submitButton = page.getByTestId(RegisterFormTest.submitButton.id)
	await $submitButton.click()
	// Check that button isn't disabled
	await expect($submitButton).not.toBeDisabled()

	// Check there is an error near the email field
	const { $error: $emailFieldError } = getTextInputElems($form, RegisterFormTest.emailField.id)
	await expect($emailFieldError).toHaveCount(1)
	await expect($emailFieldError).toHaveText(errorMessage.requiredField)

	// Check there is an error near the password field
	const { $error: $passwordFieldError } = getTextInputElems($form, RegisterFormTest.passwordField.id)
	await expect($passwordFieldError).toHaveCount(1)
	await expect($passwordFieldError).toHaveText(errorMessage.requiredField)

	// Check there is an error near the password again field
	const { $error: $passwordAgainFieldError } = getTextInputElems($form, RegisterFormTest.passwordAgainField.id)
	await expect($passwordAgainFieldError).toHaveCount(1)
	await expect($passwordAgainFieldError).toHaveText(errorMessage.requiredField)
})

test.skip('the form has to show errors if a user types wrong value to the fields', async ({ page }) => {
	const $form = page.getByTestId(RegisterFormTest.form.id)

	// Write wrong values to each field
	// Check there is an error near the email field
	const { $input: $emailFieldInput, $error: $emailFieldError } = getTextInputElems(
		$form,
		RegisterFormTest.emailField.id,
	)
	await $emailFieldInput.fill('wrongemail.com')

	const { $input: $passwordFieldInput, $error: $passwordFieldError } = getTextInputElems(
		$form,
		RegisterFormTest.passwordField.id,
	)
	await $passwordFieldInput.fill('Foo3')

	// Check there is an error near the password again field
	const { $input: $passwordAgainFieldInput, $error: $passwordAgainFieldError } = getTextInputElems(
		$form,
		RegisterFormTest.passwordAgainField.id,
	)
	await $passwordAgainFieldInput.fill('foo')

	// Click on submit button
	const $submitButton = page.getByTestId(RegisterFormTest.submitButton.id)
	await $submitButton.click()
	// Check that button isn't disabled
	await expect($submitButton).not.toBeDisabled()

	// Check for errors
	await expect($emailFieldError).toHaveCount(1)
	await expect($emailFieldError).toHaveText(errorMessage.wrongEmailFormat)

	await expect($passwordFieldError).toHaveCount(1)
	await expect($passwordFieldError).toHaveText(errorMessage.minCharacters(6))

	await expect($passwordAgainFieldError).toHaveCount(1)
	await expect($passwordAgainFieldError).toHaveText(errorMessage.passwordsMustBeTheSame)
})

test.skip('the form has to show main error if a user types correct data, but it from unconfirmed user', async ({
	page,
}) => {
	const userWithUnconfirmedEmail = serverTestDataConfig.getUsersConfig().user_1
	if (userWithUnconfirmedEmail.type !== 'userRegisteredWithCredentials') return

	const $form = page.getByTestId(RegisterFormTest.form.id)

	// Write correct values to each field
	// Check there is an error near the email field
	const { $input: $emailFieldInput } = getTextInputElems($form, RegisterFormTest.emailField.id)
	await $emailFieldInput.fill(userWithUnconfirmedEmail.email)

	const { $input: $passwordFieldInput } = getTextInputElems($form, RegisterFormTest.passwordField.id)
	await $passwordFieldInput.fill(userWithUnconfirmedEmail.password)

	// Check there is an error near the password again field
	const { $input: $passwordAgainFieldInput } = getTextInputElems($form, RegisterFormTest.passwordAgainField.id)
	await $passwordAgainFieldInput.fill(userWithUnconfirmedEmail.password)

	// Click on submit button
	const $submitButton = await page.getByTestId(RegisterFormTest.submitButton.id)
	await $submitButton.click()
	// Check that button isn't disabled
	await expect($submitButton).not.toBeDisabled()

	// Check for the main error message
	const $failMessage = await page.getByTestId(RegisterFormTest.failMessage.id)
	await expect($failMessage).toHaveCount(1)
	await expect($failMessage).toHaveText(errorMessage.fromServer.emailIsNotConfirmed)
})

test.skip('the form has to show main success message after the form was filled up correctly', async ({ page }) => {
	const $form = page.getByTestId(RegisterFormTest.form.id)

	// Write correct values to each field
	// Check there is an error near the email field
	const { $input: $emailFieldInput } = getTextInputElems($form, RegisterFormTest.emailField.id)
	await $emailFieldInput.fill('email@mail.com')

	const { $input: $passwordFieldInput } = getTextInputElems($form, RegisterFormTest.passwordField.id)
	await $passwordFieldInput.fill('password-123456')

	// Check there is an error near the password again field
	const { $input: $passwordAgainFieldInput } = getTextInputElems($form, RegisterFormTest.passwordAgainField.id)
	await $passwordAgainFieldInput.fill('password-123456')

	// Click on submit button
	const $submitButton = await page.getByTestId(RegisterFormTest.submitButton.id)
	await $submitButton.click()
	// Check that button is disabled
	await expect($submitButton).toBeDisabled()

	// Check for the main error message
	const $successMessage = await page.getByTestId(RegisterFormTest.successMessage.id)
	await expect($successMessage).toHaveCount(1)
	await expect($successMessage).toHaveText('На почту email@mail.com отправлено письмо с кодом подтверждения.')
})
