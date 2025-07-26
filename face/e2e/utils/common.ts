import { Locator } from 'playwright-core'

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
