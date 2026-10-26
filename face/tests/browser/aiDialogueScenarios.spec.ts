import { expect, type Page, test } from '@playwright/test'

const titles = [
	'Паспортный контроль',
	'Заселение в отель',
	'Заказ в кафе',
	'Состав блюда',
	'Покупка одежды',
	'Возврат товара',
]
const groups = [
	{
		id: 8,
		slug: 'travel',
		title: JSON.stringify({ en: 'Travel', ru: 'Поездка за границу' }),
		scenarios: scenarios(0, 2),
	},
	{ id: 2, slug: 'food', title: JSON.stringify({ ru: 'Еда и покупки' }), scenarios: scenarios(2, 6) },
]

function scenarios(start: number, end: number) {
	return titles.slice(start, end).map((title, index) => ({
		id: start + index + 1,
		slug: `scenario-${start + index}`,
		title: JSON.stringify({ ru: title }),
		description: JSON.stringify({
			ru: 'Вы обсуждаете ситуацию с собеседником. Уточните детали и договоритесь о решении.',
		}),
		coverUrl: '/test-cover.svg',
	}))
}

async function setup(
	page: Page,
	options: { authenticated?: boolean; fail?: boolean; empty?: boolean; brokenCover?: boolean } = {},
) {
	let fail = options.fail
	let requests = 0
	let coverRequests = 0
	let releaseCreation: (() => void) | undefined
	let failCreation = false
	const posts: unknown[] = []
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.route('**/test-cover.svg', (route) => {
		coverRequests++
		if (options.brokenCover) return route.abort()
		return route.fulfill({
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="1152" height="576"><rect width="1152" height="576" fill="#c7b69c"/><rect x="690" y="60" width="300" height="370" fill="#e1d4be"/><circle cx="330" cy="200" r="70" fill="#9b7855"/><path d="M210 500V340Q330 270 450 340V500" fill="#80674d"/><rect y="480" width="1152" height="96" fill="#655a4d"/></svg>',
		})
	})
	await page.route('**/api/ai-dialogue-scenario-group', async (route) => {
		requests++
		if (fail) {
			fail = false
			return route.fulfill({ status: 500, json: { message: 'Failed' } })
		}
		return route.fulfill({ json: options.empty ? [] : groups })
	})
	await page.route('**/api/ai-dialogue', async (route) => {
		posts.push(route.request().postDataJSON())
		await new Promise<void>((resolve) => {
			releaseCreation = resolve
		})
		if (failCreation) return route.fulfill({ status: 500, json: { message: 'Failed' } })
		return route.fulfill({
			json: {
				id: 42,
				scenario: { id: 1, title: '{}' },
				messages: [],
				sourceLanguageCode: 'en',
				targetLanguageCode: 'ru',
				createdAt: '2026-10-25T00:00:00Z',
				updatedAt: '2026-10-25T00:00:00Z',
			},
		})
	})
	await page.route('**/api/ai-dialogue?**', (route) =>
		route.fulfill({
			json: { page: 1, pageSize: 10, total: 0, totalPages: 0, urlsExpireAt: '2099-01-01T00:00:00Z', items: [] },
		}),
	)
	await page.goto(`/?scenarios${options.authenticated ? '&authenticated' : ''}`)
	return {
		posts,
		errors,
		requests: () => requests,
		coverRequests: () => coverRequests,
		finishCreation: (failed = false) => {
			failCreation = failed
			releaseCreation?.()
		},
	}
}

test('desktop groups preserve server order and have four equal columns, counts and 2:1 covers', async ({
	page,
}, testInfo) => {
	const h = await setup(page)
	await expect(page.locator('.public-scenario-card')).toHaveCount(6)
	await expect(page.locator('.public-scenario-group__heading')).toHaveText(['Поездка за границу2', 'Еда и покупки4'])
	await expect(page.locator('.public-scenario-card .media-card-button__title')).toHaveText(titles)
	const cards = page.locator('.public-scenario-card')
	const first = (await cards.nth(0).boundingBox())!
	const third = (await cards.nth(2).boundingBox())!
	const sixth = (await cards.nth(5).boundingBox())!
	expect(first.width).toBe(third.width)
	expect(third.y).toBe(sixth.y)
	const cover = (await cards.first().locator('.media-card-button__cover').boundingBox())!
	expect(cover.width / cover.height).toBeCloseTo(2)

	await cards.first().focus()
	await page.keyboard.press('Enter')
	await expect(page.locator('.modal').getByRole('heading', { name: titles[0], exact: true })).toBeVisible()
	await expect(page.locator('.modal').getByText('Поездка за границу', { exact: true })).toBeVisible()
	await expect(page.locator('.start-dialogue-modal__summary')).toHaveText(
		JSON.parse(groups[0].scenarios[0].description).ru,
	)
	await expect(page.locator('.start-dialogue-modal > img')).toHaveAttribute('src', '/test-cover.svg')
	await expect(page.locator('.start-dialogue-modal > img')).toHaveJSProperty('naturalWidth', 1152)
	await expect(page.locator('.modal .switcher--size-medium')).toBeVisible()
	await expect(page.locator('.modal .label-with-field__description')).toHaveText('Можно изменить во время разговора')
	await page
		.locator('.start-dialogue-modal')
		.screenshot({ path: testInfo.outputPath('scenario-start-modal-desktop.png') })

	expect(h.posts).toHaveLength(0)
	await page.getByRole('button', { name: /Начать диалог$/ }).click()
	await expect(page.getByText('Войдите в учётную запись', { exact: true })).toBeVisible()
	await expect(page.locator('.modal')).toHaveCount(1)

	expect(h.posts).toHaveLength(0)
	await page.locator('.modal__close-button').click()
	await page.screenshot({ path: testInfo.outputPath('scenario-groups-desktop.png'), fullPage: true })

	expect(h.requests()).toBe(1)
	expect(h.errors).toEqual([])
})

test('mobile cards stay within the viewport and keep their cover slot after image errors', async ({
	page,
}, testInfo) => {
	await page.setViewportSize({ width: 390, height: 844 })
	const h = await setup(page, { brokenCover: true })
	await expect(page.locator('.public-scenario-card')).toHaveCount(6)
	await expect.poll(() => h.coverRequests()).toBeGreaterThan(0)
	const cards = page.locator('.public-scenario-card')
	const first = (await cards.nth(0).boundingBox())!
	const second = (await cards.nth(1).boundingBox())!
	expect(second.y).toBeGreaterThan(first.y + first.height)
	expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
	const cover = (await cards.first().locator('.media-card-button__cover').boundingBox())!
	expect(cover.width / cover.height).toBeCloseTo(2)
	await page.screenshot({ path: testInfo.outputPath('scenario-groups-mobile.png'), fullPage: true })
	await cards.first().click()
	await expect(page.getByRole('button', { name: /Начать диалог$/ })).toBeVisible()
	const modal = (await page.locator('.start-dialogue-modal').boundingBox())!
	expect(modal.x).toBeGreaterThanOrEqual(0)
	expect(modal.x + modal.width).toBeLessThanOrEqual(390)
	await page
		.locator('.start-dialogue-modal')
		.screenshot({ path: testInfo.outputPath('scenario-start-modal-mobile.png') })
	expect(h.errors).toEqual([])
})

test('group loading errors can be retried; an empty catalogue has an explicit message', async ({ page }) => {
	await setup(page, { fail: true, empty: true })
	await expect(page.getByText('Не удалось загрузить сценарии.')).toBeVisible()
	await page.getByRole('button', { name: 'Повторить' }).click()
	await expect(page.getByText('Пока нет доступных сценариев.')).toBeVisible()
})

test('authenticated creation blocks duplicate clicks, recovers from errors and navigates to the new dialogue', async ({
	page,
}) => {
	const h = await setup(page, { authenticated: true })
	await expect(page.getByRole('heading', { name: 'Мои диалоги' })).toBeVisible()
	const card = page.getByRole('button', { name: titles[0], exact: true })
	await card.click()
	const start = page.getByRole('button', { name: /Начать диалог$/ })
	await expect(start).toBeVisible()
	expect(h.posts).toHaveLength(0)
	await page.locator('.modal__close-button').click()

	await expect(page.locator('.modal')).toHaveCount(0)
	expect(h.posts).toHaveLength(0)
	await page.getByRole('button', { name: titles[1], exact: true }).click()
	await expect(page.locator('.modal').getByRole('heading', { name: titles[1], exact: true })).toBeVisible()
	await page.locator('.modal__close-button').click()
	await card.click()
	await expect(page.locator('.modal').getByRole('heading', { name: titles[0], exact: true })).toBeVisible()
	await page.locator('.modal').getByRole('button', { name: /^fr$/i }).click()
	await page.locator('.modal').getByRole('button', { name: 'B1', exact: true }).click()
	await start.click()
	await expect(start).toBeDisabled()

	for (const control of await page.locator('.start-dialogue-modal__settings button').all())
		await expect(control).toBeDisabled()

	await expect(page.getByRole('status', { name: 'Создаю диалог' })).toBeVisible()

	for (const button of await page.locator('.public-scenario-card').all()) await expect(button).toBeDisabled()
	expect(h.posts).toEqual([{ scenarioId: 1, sourceLanguageCode: 'fr', targetLanguageCode: 'ru', maxCefrLevel: 'B1' }])
	h.finishCreation(true)
	await expect(page.getByRole('alert')).toBeVisible()
	await expect(card).toBeEnabled()
	await expect(start).toBeEnabled()
	await expect(page.locator('.modal').getByRole('button', { name: /^fr$/i })).toBeDisabled()
	await expect(page.locator('.modal').getByRole('button', { name: 'B1', exact: true })).toBeDisabled()
	await start.click()
	await expect.poll(() => h.posts.length).toBe(2)
	expect(h.posts[1]).toEqual(h.posts[0])
	h.finishCreation()
	await expect(page).toHaveURL(/\/ru\/dialogues\/42$/)
	expect(h.errors).toEqual([])
})

test('language and level persist independently of video filters; Any persists and sends null', async ({ page }) => {
	const h = await setup(page, { authenticated: true })
	await page.evaluate(() => localStorage.setItem('lastLanguage', 'tr'))
	await page.evaluate(() => {
		localStorage.setItem('lastVideoProficiency', 'C1')
		localStorage.setItem('lastAiDialogProficiency', 'C2')
	})
	const card = page.getByRole('button', { name: titles[0], exact: true })
	await card.click()
	await expect(page.locator('.modal').getByRole('button', { name: /^en$/i })).toBeDisabled()
	await expect(page.locator('.modal').getByRole('button', { name: 'Any', exact: true })).toBeDisabled()
	expect(await page.evaluate(() => localStorage.getItem('lastLanguage'))).toBe('tr')
	await page.locator('.modal').getByRole('button', { name: /^de$/i }).click()
	expect(await page.evaluate(() => localStorage.getItem('lastLanguage'))).toBe('de')
	await page.locator('.modal').getByRole('button', { name: 'A2', exact: true }).click()
	expect(await page.evaluate(() => localStorage.getItem('lastAiDialogProficiency'))).toBe('A2')
	await page.locator('.modal__close-button').click()
	await card.click()
	await expect(page.locator('.modal').getByRole('button', { name: /^de$/i })).toBeDisabled()
	await expect(page.locator('.modal').getByRole('button', { name: 'A2', exact: true })).toBeDisabled()
	await page.reload()
	await card.click()
	await expect(page.locator('.modal').getByRole('button', { name: /^de$/i })).toBeDisabled()
	await expect(page.locator('.modal').getByRole('button', { name: 'A2', exact: true })).toBeDisabled()
	await page.locator('.modal').getByRole('button', { name: 'A1', exact: true }).click()
	await page.locator('.modal').getByRole('button', { name: 'Any', exact: true }).click()
	expect(await page.evaluate(() => localStorage.getItem('lastAiDialogProficiency'))).toBe('Any')
	await page.locator('.modal__close-button').click()
	await card.click()
	await expect(page.locator('.modal').getByRole('button', { name: 'Any', exact: true })).toBeDisabled()
	expect(await page.evaluate(() => localStorage.getItem('lastVideoProficiency'))).toBe('C1')
	await page.getByRole('button', { name: /Начать диалог$/ }).click()
	await expect.poll(() => h.posts.length).toBe(1)
	expect(h.posts).toEqual([{ scenarioId: 1, sourceLanguageCode: 'de', targetLanguageCode: 'ru', maxCefrLevel: null }])
	h.finishCreation()
	await expect(page).toHaveURL(/\/ru\/dialogues\/42$/)
	expect(h.errors).toEqual([])
})
