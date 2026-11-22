import { EXAM_MIN_REPLIES } from '../../widgets/aiDialogueExam/fn/examProgress'
import { resolve } from 'node:path'
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
		title: 'Поездка за границу',
		description: 'Пригодится перед поездкой.',
		scenarios: scenarios(0, 2),
	},
	{ id: 2, slug: 'food', title: 'Еда и покупки', description: '', scenarios: scenarios(2, 6) },
]

function scenarios(start: number, end: number) {
	return titles.slice(start, end).map((title, index) => ({
		id: start + index + 1,
		slug: `scenario-${start + index}`,
		title,
		description: 'Вы обсуждаете ситуацию с собеседником. Уточните детали и договоритесь о решении.',
		userScenarioAmendmentHint: null,
		conversationIdeas: start + index === 1 ? [] : ['Уточнить детали', 'Договориться о решении'],
		trainedSkills: start + index === 1 ? '' : 'Уточнять детали и договариваться',
		coverUrl: '/test-cover.svg',
	}))
}

async function setup(
	page: Page,
	options: {
		authenticated?: boolean
		fail?: boolean
		empty?: boolean
		brokenCover?: boolean
		failStyles?: boolean
		emptyStyles?: boolean
		extraStyle?: boolean
		brokenStyle?: boolean
		locale?: string
		defaultStyleId?: string
	} = {},
) {
	let fail = options.fail
	let requests = 0
	let coverRequests = 0
	let styleRequests = 0
	let failStyles = options.failStyles
	let releaseCreation: (() => void) | undefined
	let failCreation = false
	const posts: unknown[] = []
	const errors: string[] = []

	page.on('pageerror', (error) => errors.push(error.message))

	await page.route('**/test-style-*.webp*', (route) => {
		if (options.brokenStyle) return route.abort()
		const requestedStyle = /test-style-([a-z]+)\.webp/.exec(route.request().url())![1]
		const imageName = requestedStyle === 'pastel' ? 'drawing' : requestedStyle

		if (process.env.AI_DIALOGUE_STYLE_PREVIEW_DIR) {
			return route.fulfill({
				path: resolve(process.env.AI_DIALOGUE_STYLE_PREVIEW_DIR, `${imageName}.png`),
				contentType: 'image/png',
			})
		}

		return route.fulfill({
			contentType: 'image/svg+xml',
			body: `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="${imageName === 'realism' ? '#a6b7b4' : imageName === 'drawing' ? '#c8aa8b' : '#d5c8c4'}"/><circle cx="150" cy="160" r="65" fill="#b97e58"/><circle cx="365" cy="160" r="65" fill="#d5ac86"/><path d="M50 400V280Q150 210 250 280V400" fill="#aa5733"/><path d="M265 400V280Q365 210 465 280V400" fill="#47678b"/><rect y="390" width="512" height="122" fill="#9b7555"/></svg>`,
		})
	})
	await page.route('**/api/ai-dialogue/illustration-styles', (route) => {
		styleRequests++
		if (failStyles) {
			failStyles = false
			return route.fulfill({ status: 500, json: { message: 'Unavailable' } })
		}

		const ids = options.emptyStyles
			? []
			: ['realism', 'drawing', 'watercolor', ...(options.extraStyle ? ['pastel'] : [])]

		return route.fulfill({
			json: {
				defaultStyleId: options.defaultStyleId ?? 'realism',
				styles: ids.map((id) => ({
					id,
					titleKey: `aiDialogue.illustrationStyles.${id}`,
					previewUrl: `/test-style-${id}.webp?revision=${styleRequests}`,
				})),
			},
		})
	})

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
				scenario: { id: 1, title: '' },
				messages: [],
				sourceLanguageCode: 'en',
				targetLanguageCode: 'ru',
				illustrationStyleId: route.request().postDataJSON().illustrationStyleId,
				mode: route.request().postDataJSON().mode,
				cefrLevel: route.request().postDataJSON().cefrLevel,
				createdAt: '2026-10-25T00:00:00Z',
				updatedAt: '2026-10-25T00:00:00Z',
			},
		})
	})
	await page.route('**/api/ai-dialogue?**', (route) =>
		route.fulfill({
			json: { page: 1, pageSize: 10, total: 0, totalPages: 0, items: [] },
		}),
	)
	await page.goto(
		`/?scenarios${options.authenticated ? '&authenticated' : ''}${options.locale ? `&locale=${options.locale}` : ''}`,
	)
	return {
		posts,
		errors,
		requests: () => requests,
		coverRequests: () => coverRequests,
		styleRequests: () => styleRequests,
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
	await expect(page.locator('.public-scenario-group__description')).toHaveText(['Пригодится перед поездкой.'])
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
	await expect(page.locator('.start-dialogue-modal__summary')).toHaveText(groups[0].scenarios[0].description)
	await expect(page.locator('.start-dialogue-modal__hint-title')).toHaveText(['Идеи для диалога', 'Что тренирует'])
	await expect(page.locator('.start-dialogue-modal__hint-text')).toHaveText('Уточнять детали и договариваться')
	await expect(page.locator('.start-dialogue-modal__idea')).toHaveText(['Уточнить детали', 'Договориться о решении'])
	await expect(page.locator('.start-dialogue-modal > img')).toHaveAttribute('src', '/test-cover.svg')
	await expect(page.locator('.start-dialogue-modal > img')).toHaveJSProperty('naturalWidth', 1152)
	await expect(page.locator('.modal .switcher--size-medium')).toHaveCount(2)
	for (const switcher of await page.locator('.modal .switcher--size-medium').all())
		await expect(switcher).toBeVisible()
	await expect(page.locator('.modal .label-with-field__description')).toHaveText('Можно изменить во время разговора')
	await expect(page.getByRole('radio', { name: 'Реализм', exact: true })).toBeChecked()
	await expect(page.getByRole('radio')).toHaveCount(3)
	const previews = page.locator('.illustration-style-switcher__preview')
	for (const preview of await previews.all()) {
		const box = (await preview.boundingBox())!
		expect(box.width / box.height).toBeCloseTo(4 / 3)
	}
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
	await expect(page.getByRole('radio')).toHaveCount(3)
	await expect(page.getByRole('button', { name: /Начать диалог$/ })).toBeVisible()
	const modal = (await page.locator('.start-dialogue-modal').boundingBox())!
	expect(modal.x).toBeGreaterThanOrEqual(0)
	expect(modal.x + modal.width).toBeLessThanOrEqual(390)
	for (const preview of await page.locator('.illustration-style-switcher__preview').all()) {
		const box = (await preview.boundingBox())!
		expect(box.width / box.height).toBeCloseTo(4 / 3)
	}
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

	const settingsButtons = page.locator(
		'.start-dialogue-modal .language-switch button, .start-dialogue-modal .switcher button',
	)
	expect(await settingsButtons.count()).toBeGreaterThan(0)
	for (const control of await settingsButtons.all()) await expect(control).toBeDisabled()
	for (const radio of await page.getByRole('radio').all()) await expect(radio).toBeDisabled()

	await expect(page.getByRole('status', { name: 'Создаю диалог' })).toBeVisible()

	for (const button of await page.locator('.public-scenario-card').all()) await expect(button).toBeDisabled()
	expect(h.posts).toEqual([
		{
			scenarioId: 1,
			sourceLanguageCode: 'fr',
			targetLanguageCode: 'ru',
			cefrLevel: 'B1',
			mode: 'practice',
			illustrationStyleId: 'realism',
			userScenarioAmendment: null,
		},
	])
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

	await page.evaluate(() => localStorage.setItem('lastLanguage', 'ru'))
	await page.evaluate(() => {
		localStorage.setItem('lastVideoProficiency', 'C1')
		localStorage.setItem('lastAiDialogProficiency', 'C2')
	})

	const card = page.getByRole('button', { name: titles[0], exact: true })
	await card.click()
	await expect(page.locator('.modal').getByRole('button', { name: /^en$/i })).toBeDisabled()
	await expect(page.locator('.modal').getByRole('button', { name: 'Любой', exact: true })).toBeDisabled()
	expect(await page.evaluate(() => localStorage.getItem('lastLanguage'))).toBe('ru')
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
	await page.locator('.modal').getByRole('button', { name: 'Любой', exact: true }).click()
	expect(await page.evaluate(() => localStorage.getItem('lastAiDialogProficiency'))).toBe('Any')
	await page.locator('.modal__close-button').click()
	await card.click()
	await expect(page.locator('.modal').getByRole('button', { name: 'Любой', exact: true })).toBeDisabled()
	expect(await page.evaluate(() => localStorage.getItem('lastVideoProficiency'))).toBe('C1')
	await page.getByRole('button', { name: /Начать диалог$/ }).click()
	await expect.poll(() => h.posts.length).toBe(1)
	expect(h.posts).toEqual([
		{
			scenarioId: 1,
			sourceLanguageCode: 'de',
			targetLanguageCode: 'ru',
			cefrLevel: null,
			mode: 'practice',
			illustrationStyleId: 'realism',
			userScenarioAmendment: null,
		},
	])
	h.finishCreation()
	await expect(page).toHaveURL(/\/ru\/dialogues\/42$/)
	expect(h.errors).toEqual([])
})

test('style selection supports keyboard input, persists across reloads and sends a fourth server style', async ({
	page,
}) => {
	const h = await setup(page, { authenticated: true, extraStyle: true })
	const card = page.getByRole('button', { name: titles[0], exact: true })
	await card.click()
	const realism = page.getByRole('radio', { name: 'Реализм', exact: true })
	await expect(realism).toBeChecked()
	await expect(page.getByRole('radio')).toHaveCount(4)
	await realism.focus()
	await page.keyboard.press('ArrowRight')
	await expect(page.getByRole('radio', { name: 'Рисунок', exact: true })).toBeChecked()
	await page.keyboard.press('ArrowRight')
	await expect(page.getByRole('radio', { name: 'Акварель', exact: true })).toBeChecked()
	expect(await page.evaluate(() => localStorage.getItem('lastAiDialogueIllustrationStyle'))).toBe('watercolor')
	await page.locator('.modal__close-button').click()
	await card.click()
	await expect(page.getByRole('radio', { name: 'Акварель', exact: true })).toBeChecked()
	await page.reload()
	await card.click()
	await expect(page.getByRole('radio', { name: 'Акварель', exact: true })).toBeChecked()
	await page.getByText('pastel', { exact: true }).click()
	await page.getByRole('button', { name: /Начать диалог$/ }).click()
	await expect.poll(() => h.posts.length).toBe(1)
	expect(h.posts[0]).toMatchObject({ illustrationStyleId: 'pastel' })
	for (const radio of await page.getByRole('radio').all()) await expect(radio).toBeDisabled()
	h.finishCreation()
	await expect(page).toHaveURL(/\/ru\/dialogues\/42$/)
	expect(h.errors).toEqual([])
})

test('an unavailable saved style falls back to the server default without overwriting storage', async ({ page }) => {
	const h = await setup(page, { defaultStyleId: 'drawing' })
	await page.evaluate(() => localStorage.setItem('lastAiDialogueIllustrationStyle', 'removed-style'))
	await page.getByRole('button', { name: titles[0], exact: true }).click()
	await expect(page.getByRole('radio', { name: 'Рисунок', exact: true })).toBeChecked()
	expect(await page.evaluate(() => localStorage.getItem('lastAiDialogueIllustrationStyle'))).toBe('removed-style')
	expect(h.errors).toEqual([])
})

test('a failed catalog can be retried and creation waits for a valid style', async ({ page }) => {
	const h = await setup(page, { failStyles: true })
	await page.getByRole('button', { name: titles[0], exact: true }).click()
	await expect(page.getByText('Не удалось загрузить стили.', { exact: true })).toBeVisible()
	const start = page.getByRole('button', { name: /Начать диалог$/ })
	await expect(start).toBeDisabled()
	await page.getByRole('button', { name: 'Повторить', exact: true }).click()
	await expect(page.getByRole('radio', { name: 'Реализм', exact: true })).toBeChecked()
	await expect(start).toBeEnabled()
	expect(h.posts).toHaveLength(0)
	expect(h.errors).toEqual([])
})

test('an empty style catalog keeps creation disabled', async ({ page }) => {
	const h = await setup(page, { emptyStyles: true })
	await page.getByRole('button', { name: titles[0], exact: true }).click()
	await expect(page.getByText('Нет доступных стилей.', { exact: true })).toBeVisible()
	await expect(page.getByRole('button', { name: /Начать диалог$/ })).toBeDisabled()
	expect(h.posts).toHaveLength(0)
})

test('broken previews preserve their slots and allow choosing a style by its label', async ({ page }) => {
	const h = await setup(page, { brokenStyle: true, authenticated: true })
	await page.getByRole('button', { name: titles[0], exact: true }).click()
	await expect(page.getByRole('radio')).toHaveCount(3)
	await expect(page.locator('.illustration-style-switcher__preview img')).toHaveCount(0)
	await page.getByText('Рисунок', { exact: true }).click()
	await page.getByRole('button', { name: /Начать диалог$/ }).click()
	await expect.poll(() => h.posts.length).toBe(1)
	expect(h.posts[0]).toMatchObject({ illustrationStyleId: 'drawing' })
	h.finishCreation()
	await expect(page).toHaveURL(/\/ru\/dialogues\/42$/)
	expect(h.errors).toEqual([])
})

test('an open selector does not automatically reload the catalog', async ({ page }) => {
	const now = new Date()
	await page.clock.install({ time: now })
	const h = await setup(page)
	await page.getByRole('button', { name: titles[0], exact: true }).click()
	await expect(page.getByRole('radio')).toHaveCount(3)
	await page.getByText('Акварель', { exact: true }).click()
	await expect(page.locator('.illustration-style-switcher__preview img').first()).toHaveAttribute('src', /revision=1/)
	await page.clock.fastForward(7 * 60 * 60_000)
	expect(h.styleRequests()).toBe(1)
	await expect(page.locator('.illustration-style-switcher__preview img').first()).toHaveAttribute('src', /revision=1/)
	await expect(page.getByRole('radio', { name: 'Акварель', exact: true })).toBeChecked()
	expect(h.posts).toHaveLength(0)
	expect(h.errors).toEqual([])
})

test('style titles and the selector label are translated on the client', async ({ page }) => {
	const h = await setup(page, { locale: 'en' })
	await page.locator('.public-scenario-card').first().click()
	await expect(page.getByRole('radiogroup', { name: 'Illustration style' })).toBeVisible()
	await expect(page.getByRole('radio')).toHaveCount(3)
	await expect(page.getByRole('radio', { name: 'Realism', exact: true })).toBeChecked()
	await expect(page.getByRole('radio', { name: 'Watercolor', exact: true })).toBeVisible()
	expect(h.errors).toEqual([])
})

test('exam offers A1–C1, restores unrestricted practice and sends the selected mode', async ({ page }, testInfo) => {
	const h = await setup(page, { authenticated: true })
	await page.getByRole('button', { name: titles[0], exact: true }).click()
	const modal = page.locator('.start-dialogue-modal')
	await expect(modal.getByRole('button', { name: 'Практика', exact: true })).toBeDisabled()
	await expect(modal.getByRole('button', { name: 'Любой', exact: true })).toBeDisabled()
	await modal.getByRole('button', { name: 'Экзамен', exact: true }).click()
	await expect(modal.getByRole('button', { name: 'Любой', exact: true })).toHaveCount(0)
	await expect(modal.getByRole('button', { name: 'A1', exact: true })).toBeDisabled()
	await expect(modal.getByText('Начальная сложность', { exact: true })).toBeVisible()
	await expect(modal.getByText('Можно изменить во время разговора', { exact: true })).toHaveCount(0)
	await modal.getByRole('button', { name: 'Практика', exact: true }).click()
	await expect(modal.getByRole('button', { name: 'Любой', exact: true })).toBeDisabled()
	await modal.getByRole('button', { name: 'Экзамен', exact: true }).click()
	await modal.getByRole('button', { name: 'C1', exact: true }).click()
	await modal.screenshot({ path: testInfo.outputPath('scenario-exam-start.png') })
	await modal.getByRole('button', { name: /Начать диалог$/ }).click()
	await expect.poll(() => h.posts.length).toBe(1)
	expect(h.posts[0]).toMatchObject({ mode: 'exam', cefrLevel: 'C1' })
	await expect(modal.getByRole('button', { name: 'Практика', exact: true })).toBeDisabled()
	h.finishCreation(true)
	await expect(page.getByRole('alert')).toBeVisible()
	await expect(modal.getByRole('button', { name: 'Экзамен', exact: true })).toBeDisabled()
	await expect(modal.getByRole('button', { name: 'C1', exact: true })).toBeDisabled()
	expect(h.errors).toEqual([])
})

test('exam renders audio without speech text or reveal controls and actions without translation or word buttons', async ({
	page,
}) => {
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))
	await page.goto('/?exam-content')
	await expect(page.locator('.details-block-wrapper__content')).toHaveCount(0)
	await expect(page.locator('.details-block-wrapper__switcher')).toHaveCount(0)
	await expect(page.getByText('holds out his hand', { exact: true })).toBeVisible()
	await expect(page.getByText('Secret spoken question')).toHaveCount(0)
	await expect(page.getByText('Секретный перевод')).toHaveCount(0)
	await expect(page.getByText('Протягивает руку')).toHaveCount(0)
	await expect(page.locator('.ai-dialogue-text-with-translation button')).toHaveCount(0)
	await expect(page.locator('.ai-dialogue-content-block button')).toHaveCount(1)
	await page.getByText('holds out his hand', { exact: true }).click()
	expect(errors).toEqual([])
})

for (const level of ['A0', 'C1'] as const) {
	test(`exam submission counts replies, recovers after a failure and persists ${level} without the reply form`, async ({
		page,
	}, testInfo) => {
		const h = await setup(page, { authenticated: true })
		let replies = 0
		let result: object | undefined
		let requests = 0
		let finish!: (fail?: boolean) => void
		const date = '2026-11-22T00:00:00Z'
		const userMessages = () =>
			Array.from({ length: replies }, (_, index) => ({
				id: index + 1,
				dialogueId: 42,
				createdAt: date,
				payload: { type: 'userActions', actions: [{ type: 'speech', content: 'My trip is for work.' }] },
			}))
		await page.route('**/api/ai-dialogue/42', (route) =>
			route.fulfill({
				json: {
					id: 42,
					mode: 'exam',
					cefrLevel: 'A1',
					sourceLanguageCode: 'en',
					targetLanguageCode: 'ru',
					illustrationStyleId: 'realism',
					scenario: { id: 1, slug: 'passport-control', title: titles[0], description: 'Airport' },
					createdAt: date,
					updatedAt: date,
				},
			}),
		)
		await page.route('**/api/ai-dialogue/42/visuals', (route) =>
			route.fulfill({ json: { dialogueId: 42, userAvatarUrl: '', scenes: [], characters: [] } }),
		)
		await page.route('**/api/ai-dialogue/42/stream', (route) =>
			route.fulfill({
				contentType: 'text/event-stream',
				body: [...userMessages(), ...(result ? [result] : [])]
					.map((message) => `data: ${JSON.stringify({ type: 'message', message })}\n\n`)
					.join(''),
			}),
		)
		await page.route('**/api/ai-dialogue/42/check-exam', async (route) => {
			requests++
			const fail = await new Promise<boolean>((resolve) => {
				finish = (fail = false) => resolve(fail)
			})
			if (fail) return route.fulfill({ status: 500, json: { message: 'Failed' } })
			result = {
				id: 11,
				dialogueId: 42,
				createdAt: date,
				payload: {
					type: 'examResult',
					assessedThroughMessageId: replies,
					level,
					summary: 'Отчёт об этой попытке',
					strengths: level === 'C1' ? ['Поддерживали разговор'] : [],
					errors: [],
					recommendations: ['Продолжайте практиковать самостоятельные ответы'],
				},
			}
			return route.fulfill({ json: result })
		})
		await page.goto('/?scenarios&authenticated&exam-page')
		await expect(page.getByRole('button', { name: /Проверка будет доступна через/, exact: true })).toBeDisabled()
		await expect(page.locator('.ai-dialogue-input')).toBeVisible()
		replies = EXAM_MIN_REPLIES
		await page.reload()
		const check = page.getByRole('button', { name: 'Проверить результат', exact: true })
		await expect(check).toBeEnabled()
		await check.click()
		await expect.poll(() => requests).toBe(1)
		await expect(page.locator('.ai-dialogue-input textarea')).toHaveAttribute('readonly', '')
		finish(true)
		await expect(page.getByRole('alert')).toBeVisible()
		await expect(check).toBeEnabled()
		await expect(page.locator('.ai-dialogue-input textarea')).not.toHaveAttribute('readonly', '')
		await check.click()
		await expect.poll(() => requests).toBe(2)
		finish()
		await expect(page.getByRole('heading', { name: 'Результат экзамена' })).toBeVisible()
		await expect(page.locator('.ai-dialogue-input')).toHaveCount(0)
		await expect(page.locator('.ai-dialogue-left-wrapper__input')).toHaveCount(0)
		await expect(check).toHaveCount(0)
		await expect(
			page.getByText(
				level === 'A0' ? 'В этой попытке A1 не подтверждён' : 'В этой попытке подтверждён уровень C1',
				{ exact: true },
			),
		).toBeVisible()
		await page
			.locator('.ai-dialogue-exam-submission')
			.screenshot({ path: testInfo.outputPath(`exam-result-${level}.png`) })
		await page.reload()
		await expect(page.getByRole('heading', { name: 'Результат экзамена' })).toBeVisible()
		await expect(page.locator('.ai-dialogue-input')).toHaveCount(0)
		expect(requests).toBe(2)
		expect(h.errors).toEqual([])
	})
}

for (const mode of ['practice', 'exam'] as const) {
	test(`${mode} applies its autoplay policy to new scenes and NPC speech without changing saved settings`, async ({
		page,
	}) => {
		const h = await setup(page, { authenticated: true })
		await page.addInitScript(() => localStorage.setItem('aiDialogueAutoVoice', 'false'))
		const date = '2026-11-22T00:00:00Z'
		const audioRequests: number[] = []
		await page.route('**/api/ai-dialogue/42', (route) =>
			route.fulfill({
				json: {
					id: 42,
					mode,
					cefrLevel: 'A1',
					sourceLanguageCode: 'en',
					targetLanguageCode: 'ru',
					illustrationStyleId: 'realism',
					scenario: { id: 1, slug: 'passport-control', title: titles[0], description: 'Airport' },
					createdAt: date,
					updatedAt: date,
				},
			}),
		)
		await page.route('**/api/ai-dialogue/42/visuals', (route) =>
			route.fulfill({ json: { dialogueId: 42, userAvatarUrl: '', scenes: [], characters: [] } }),
		)
		await page.route('**/api/ai-dialogue/42/audio', (route) => {
			audioRequests.push(route.request().postDataJSON().actionIndex)
			return route.fulfill({ status: 500, json: { message: 'Audio failed' } })
		})
		const events = [
			{ type: 'turnStarted' },
			{
				type: 'message',
				message: {
					id: 1,
					dialogueId: 42,
					createdAt: date,
					payload: { type: 'sceneUpdate', content: 'At the desk.', translation: '' },
				},
			},
			{
				type: 'message',
				message: {
					id: 2,
					dialogueId: 42,
					createdAt: date,
					payload: {
						type: 'npcActions',
						npcId: 'officer',
						npcName: 'Alex',
						npcRole: 'officer',
						emotion: 'neutral',
						actions: [{ type: 'speech', content: 'Your passport, please.', translation: '' }],
					},
				},
			},
			{ type: 'turnDone' },
		]
		await page.route('**/api/ai-dialogue/42/stream', (route) =>
			route.fulfill({
				contentType: 'text/event-stream',
				body: events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(''),
			}),
		)
		await page.goto('/?scenarios&authenticated&exam-page')
		await expect(page.locator('.ai-dialogue-content-block')).toHaveCount(2)
		const expected = mode === 'exam' ? 2 : 0
		await expect.poll(() => audioRequests.length).toBe(expected)
		if (mode === 'exam') expect(audioRequests).toEqual([-1, 0])
		await page.locator('.ai-dialogue-content-block button').first().click()
		await expect.poll(() => audioRequests.length).toBe(expected + 1)
		expect(await page.evaluate(() => localStorage.getItem('aiDialogueAutoVoice'))).toBe('false')
		expect(h.errors).toEqual([])
	})
}
