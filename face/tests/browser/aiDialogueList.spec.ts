import { expect, type Page, test } from '@playwright/test'
import type { AiDialogueListItemModel, AiDialoguesPageModel } from '@/entities/aiDialogue/types/aiDialogueList'

function svgImage(svg: string) {
	return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
const scene = svgImage(
	'<svg xmlns="http://www.w3.org/2000/svg" width="1152" height="576"><rect width="1152" height="576" fill="#d6c6b0"/><rect x="660" y="80" width="340" height="350" rx="15" fill="#ede6d9"/><circle cx="320" cy="210" r="65" fill="#ad8c67"/><path d="M210 500V340Q320 270 430 340V500" fill="#907b63"/><rect y="470" width="1152" height="106" fill="#756653"/></svg>',
)
const sheet = svgImage(
	'<svg xmlns="http://www.w3.org/2000/svg" width="960" height="720"><rect width="960" height="720" fill="#c642a4"/><rect width="240" height="240" fill="#e5c99f"/><ellipse cx="120" cy="138" rx="70" ry="92" fill="#b47b52"/><path d="M47 110Q30 0 120 15Q220 0 193 110L170 63H70Z" fill="#49342a"/><circle cx="95" cy="125" r="5"/><circle cx="145" cy="125" r="5"/><path d="M95 180H145" stroke="#643f32" stroke-width="5"/></svg>',
)

const medal = svgImage(
	'<svg xmlns="http://www.w3.org/2000/svg" width="76" height="100"><path d="M38 2 74 14V51Q74 76 38 98 2 76 2 51V14Z" fill="#153b34" stroke="#d9ae51" stroke-width="3"/><text x="38" y="55" text-anchor="middle" font-size="23" fill="#ffe4a3">A1</text></svg>',
)

function dialogues(count = 5): AiDialogueListItemModel[] {
	const titles = [
		'Покупка абонемента в бассейн',
		'Заселение в отель',
		'Стук в дверь',
		'Паспортный контроль',
		'У стоматолога',
	]

	return Array.from({ length: count }, (_, index) => ({
		id: index + 1,
		scenarioTitle: titles[index] ?? `Диалог ${index + 1}`,
		sourceLanguageCode: index === 2 ? 'de' : 'en',
		cefrLevel: index === 2 ? null : 'A2',
		mode: 'practice',
		lastMessage: {
			name: index === 0 ? 'Anna' : 'Mary',
			role: 'receptionist',
			text:
				index === 0
					? 'We can talk about the pool. Do you want to buy a membership?'
					: 'Hello! Welcome to our swimming pool. We have three memberships: one visit costs 400 rubles, ten visits cost 3500 rubles, and one month costs 6000 rubles. Which one would you like?',
			textType: index === 2 ? 'action' : 'speech',
			avatarUrl: sheet,
		},
		sceneImageUrl: scene,
		exam: null,
	}))
}

async function setup(page: Page, items = dialogues(), failFirst = false) {
	let current = [...items]
	let failNext = false
	const requests: number[] = []
	const deleted: number[] = []
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(error.message))

	await page.route('**/api/ai-dialogue**', async (route) => {
		const request = route.request()

		if (request.method() === 'DELETE') {
			const id = Number(new URL(request.url()).pathname.split('/').pop())
			deleted.push(id)
			current = current.filter((item) => item.id !== id)
			return route.fulfill({ json: true })
		}
		const params = new URL(request.url()).searchParams
		const pageNumber = Number(params.get('page'))
		requests.push(pageNumber)
		expect(params.get('pageSize')).toBe('10')

		if (failFirst || failNext) {
			failFirst = false
			failNext = false
			return route.fulfill({ status: 500, json: { message: 'Error' } })
		}

		const data: AiDialoguesPageModel = {
			page: pageNumber,
			pageSize: 10,
			total: current.length,
			totalPages: Math.ceil(current.length / 10),
			items: current.slice((pageNumber - 1) * 10, pageNumber * 10),
		}

		return route.fulfill({ json: data })
	})
	await page.goto('/')

	return {
		requests,
		deleted,
		errors,
		failNext: () => {
			failNext = true
		},
	}
}

test('practice shows only the last speaker and crops the neutral sprite cell', async ({ page }, testInfo) => {
	const h = await setup(page)
	const cards = page.locator('.ai-dialogue-card')
	const firstCard = cards.first()

	await expect(cards).toHaveCount(5)
	await expect(firstCard.getByText('Практика')).toBeVisible()
	await expect(page.getByText('Без ограничения')).toBeVisible()
	await expect(firstCard.getByText('Anna')).toBeVisible()
	await expect(firstCard.getByText('receptionist')).toBeVisible()
	await expect(firstCard.getByText('We can talk about the pool.', { exact: false })).toBeVisible()
	await expect(
		firstCard.getByRole('link', { name: 'Открыть диалог «Покупка абонемента в бассейн»' }),
	).toHaveAttribute('href', '/ru/dialogues/1')
	const firstScene = await firstCard.locator('.ai-dialogue-scene-image').boundingBox()
	expect([firstScene?.width, firstScene?.height]).toEqual([180, 90])
	const face = firstCard.locator('.character-avatars__face')
	await expect(face).toHaveCount(1)
	const cell = (await face.boundingBox())!
	const sprite = (await face.locator('img').boundingBox())!
	expect(sprite.width).toBe(cell.width * 4)
	expect(sprite.height).toBe(cell.height * 3)
	expect(sprite.x).toBe(cell.x)
	expect(sprite.y).toBe(cell.y)
	await page.screenshot({ path: testInfo.outputPath('my-dialogues.png'), fullPage: true })
	expect(h.errors).toEqual([])
})

test('exam shows its status and confirmed level, and both modes adapt to the available width', async ({
	page,
}, testInfo) => {
	const [practice, firstExam, secondExam, thirdExam] = dialogues()
	const items: AiDialogueListItemModel[] = [
		practice,
		{ ...firstExam, mode: 'exam', lastMessage: null, exam: { status: 'inProgress', level: null, medalUrl: null } },
		{
			...secondExam,
			mode: 'exam',
			cefrLevel: 'B1',
			lastMessage: null,
			exam: { status: 'passed', level: 'A1', medalUrl: medal },
		},
		{ ...thirdExam, mode: 'exam', lastMessage: null, exam: { status: 'failed', level: null, medalUrl: null } },
	]
	const h = await setup(page, items)
	const cards = page.locator('.ai-dialogue-card')
	await expect(cards).toHaveCount(4)
	await expect(cards.nth(1).getByText('Экзамен начат')).toBeVisible()
	await expect(cards.nth(2).getByText('Экзамен сдан')).toBeVisible()
	await expect(cards.nth(2).getByText('B1', { exact: true })).toBeVisible()
	await expect(cards.nth(2).getByText('Уровень A1 подтверждён', { exact: false })).toBeVisible()
	await expect(cards.nth(2).locator('.ai-dialogue-earned-medal')).toHaveAttribute('src', medal)
	await expect(cards.nth(3).getByText('Экзамен не сдан')).toBeVisible()
	await expect(cards.nth(1).locator('.ai-dialogue-exam-shield')).toBeVisible()
	await expect(cards.nth(3).locator('.ai-dialogue-exam-shield path')).toHaveCount(2)
	await page.screenshot({ path: testInfo.outputPath('wide.png'), fullPage: true })

	for (const width of [800, 400]) {
		await page.setViewportSize({ width, height: 900 })
		const details = page.locator('.ai-dialogue-card__details')
		if (width === 800) {
			for (const card of await cards.all()) {
				const overview = (await card.locator('.ai-dialogue-card__overview').boundingBox())!
				const extra = (await card.locator('.ai-dialogue-card__details').boundingBox())!
				expect(extra.y).toBeGreaterThan(overview.y + overview.height)
			}
		} else {
			for (const detail of await details.all()) {
				await expect(detail).toBeHidden()
			}
			const image = (await cards.first().locator('.ai-dialogue-scene-image').boundingBox())!
			const title = (await cards.first().locator('h4').boundingBox())!
			expect(title.y).toBeGreaterThan(image.y + image.height)
		}
		await page.screenshot({ path: testInfo.outputPath(`width-${width}.png`), fullPage: true })
	}
	expect(h.errors).toEqual([])
})

test('load-more errors preserve cards; retry and deletion refresh all loaded pages without skipping a dialogue', async ({
	page,
}) => {
	const items = dialogues(25)
	const h = await setup(page, items)
	await expect(page.locator('.ai-dialogue-card')).toHaveCount(5)
	h.failNext()
	await page.getByRole('button', { name: 'Предыдущие диалоги' }).click()
	await expect(page.getByRole('alert')).toBeVisible()
	await expect(page.locator('.ai-dialogue-card')).toHaveCount(5)
	await page.getByRole('button', { name: 'Предыдущие диалоги' }).click()
	await expect(page.locator('.ai-dialogue-card')).toHaveCount(15)
	await expect(page.locator('.ai-dialogue-card h4')).toHaveText(items.slice(0, 15).map((item) => item.scenarioTitle))
	await page.getByRole('button', { name: 'Предыдущие диалоги' }).click()
	await expect(page.locator('.ai-dialogue-card')).toHaveCount(25)
	await expect(page.getByRole('button', { name: 'Предыдущие диалоги' })).toHaveCount(0)
	await page.getByRole('button', { name: 'Удалить диалог «Покупка абонемента в бассейн»' }).click()
	await expect(page.getByText('Вы уверены, что хотите удалить диалог?')).toBeVisible()
	expect(h.deleted).toEqual([])
	await page.locator('.modal').getByRole('button', { name: 'Удалить диалог', exact: true }).click()
	await expect(page.locator('.modal')).toHaveCount(0)
	await expect(page.locator('.ai-dialogue-card')).toHaveCount(24)
	await expect(page.locator('.ai-dialogue-card h4')).toHaveText(items.slice(1).map((item) => item.scenarioTitle))
	expect(h.deleted).toEqual([1])
	expect(h.requests).toEqual([1, 2, 2, 3, 1, 2, 3])
	expect(h.errors).toEqual([])
})

test('initial loading errors can be retried and an empty account has no load-more button', async ({ page }) => {
	await setup(page, [], true)
	await expect(page.getByRole('alert')).toBeVisible()
	await page.getByRole('button', { name: 'Повторить', exact: true }).click()
	await expect(page.getByText('У вас ещё нет ни одного диалога.', { exact: false })).toBeVisible()
	await expect(page.getByRole('button', { name: 'Предыдущие диалоги' })).toHaveCount(0)
})

test('a dialogue without messages or a scene keeps its layout and controls', async ({ page }) => {
	const item = dialogues()[0]
	item.lastMessage = null
	item.sceneImageUrl = null
	const h = await setup(page, [item])
	await expect(page.locator('.ai-dialogue-card')).toHaveCount(1)
	await expect(page.getByText('Пока нет сообщений персонажей.')).toBeVisible()
	await expect(page.locator('.ai-dialogue-scene-image')).toHaveCount(0)
	await page.getByRole('button', { name: 'Удалить диалог «Покупка абонемента в бассейн»' }).click()
	await page.locator('.modal__close-button').click()
	await expect(page.locator('.modal')).toHaveCount(0)
	expect(h.deleted).toEqual([])
	expect(h.errors).toEqual([])
})
