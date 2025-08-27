import { Locator, Page } from '@playwright/test'
import { LoginFormTest } from '../../_pages/auth/authLogin/AuthLoginForm/fn/form'
import { serverTestDataConfig } from './serverTestDataConfig'
import testPagesUrls from './testPagesUrls'

export const consts = {
	serverUrl: 'http://localhost/api',
	clientUrl: 'http://localhost',
}

export function getTextInputElems($parentElem: Locator, rootDataTextId: string) {
	const $root = $parentElem.getByTestId(rootDataTextId)

	return {
		$root,
		$label: $root.locator('label'),
		$input: $root.locator('input'),
		$error: $root.locator('.field-error'),
	}
}

export async function loginUser(page: Page) {
	// Move to the Login page
	await page.goto(testPagesUrls.authLogin)

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
}
