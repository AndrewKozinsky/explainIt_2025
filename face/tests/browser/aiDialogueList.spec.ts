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
		scenario: { id: 2, title: JSON.stringify({ ru: titles[index] ?? `Диалог ${index + 1}` }) },
		sourceLanguageCode: index === 2 ? 'de' : 'en',
		maxCefrLevel: index === 2 ? null : 'A2',
		createdAt: new Date(Date.now() - index * 86_400_000).toISOString(),
		lastMessage: {
			id: 100 + index,
			npcId: 'anna',
			name: index === 0 ? 'Anna' : 'Mary',
			role: 'receptionist',
			text:
				index === 0
					? 'We can talk about the pool. Do you want to buy a membership?'
					: 'Hello! Welcome to our swimming pool. We have three memberships: one visit costs 400 rubles, ten visits cost 3500 rubles, and one month costs 6000 rubles. Which one would you like?',
			textType: index === 2 ? 'action' : 'speech',
			createdAt: new Date(Date.now() - (index === 2 ? 5 : index) * 86_400_000).toISOString(),
		},
		sceneImage: { id: index, url: scene, mimeType: 'image/svg+xml', width: 1152, height: 576, layoutVersion: null },
		characters: Array.from({ length: index < 2 ? 5 : 2 }, (_, id) => ({
			npcId: `npc-${id}`,
			name: `Персонаж ${id + 1}`,
			role: 'receptionist',
			generationStatus: 'ready',
			emotionSheet: {
				id,
				url: sheet,
				mimeType: 'image/svg+xml',
				width: 960,
				height: 720,
				layoutVersion: 'emotion-grid-4x3-v1',
			},
		})),
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
			urlsExpireAt: '2099-01-01T00:00:00Z',
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

test('the desktop layout matches the half-size reference and crops just the neutral sprite cell', async ({
	page,
}, testInfo) => {
	const h = await setup(page)
	const cards = page.locator(':is(.medium-dialogue-card, .large-dialogue-card)')
	await expect(cards).toHaveCount(3)
	await expect(page.getByText('Последний диалог')).toHaveCount(1)
	await expect(page.getByText('Без ограничения')).toBeVisible()
	await expect(page.getByText('+2', { exact: true })).toBeVisible()
	await expect(
		cards.first().getByRole('link', { name: 'Ответить в диалоге «Покупка абонемента в бассейн»' }),
	).toHaveAttribute('href', '/ru/dialogues/1')
	const cover = await cards.first().locator(':is(.medium-dialogue-card, .large-dialogue-card)__scene').boundingBox()
	const small = await cards.nth(1).locator(':is(.medium-dialogue-card, .large-dialogue-card)__scene').boundingBox()
	expect([cover?.width, cover?.height, small?.width, small?.height]).toEqual([240, 120, 120, 60])
	const face = cards.nth(1).locator('.character-avatars__face').first()
	const cell = (await face.boundingBox())!
	const sprite = (await face.locator('img').boundingBox())!
	expect(sprite.width).toBe((cell.width - 2) * 4)
	expect(sprite.height).toBe((cell.height - 2) * 3)
	expect(sprite.x).toBe(cell.x + 1)
	expect(sprite.y).toBe(cell.y + 1)
	await page.screenshot({ path: testInfo.outputPath('my-dialogues.png'), fullPage: true })
	expect(h.errors).toEqual([])
})

test('load-more errors preserve cards; retry and deletion refresh all loaded pages without skipping a dialogue', async ({
	page,
}) => {
	const items = dialogues(25)
	const h = await setup(page, items)
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card)')).toHaveCount(3)
	h.failNext()
	await page.getByRole('button', { name: 'Предыдущие диалоги' }).click()
	await expect(page.getByRole('alert')).toBeVisible()
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card)')).toHaveCount(3)
	await page.getByRole('button', { name: 'Предыдущие диалоги' }).click()
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card)')).toHaveCount(13)
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card) h4')).toHaveText(
		items.slice(0, 13).map((item) => JSON.parse(item.scenario.title).ru),
	)
	await page.getByRole('button', { name: 'Предыдущие диалоги' }).click()
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card)')).toHaveCount(23)
	await page.getByRole('button', { name: 'Предыдущие диалоги' }).click()
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card)')).toHaveCount(25)
	await expect(page.getByRole('button', { name: 'Предыдущие диалоги' })).toHaveCount(0)
	await page.getByRole('button', { name: 'Удалить диалог «Покупка абонемента в бассейн»' }).click()
	await expect(page.getByText('Вы уверены, что хотите удалить диалог?')).toBeVisible()
	expect(h.deleted).toEqual([])
	await page.locator('.modal').getByRole('button', { name: 'Удалить диалог', exact: true }).click()
	await expect(page.locator('.modal')).toHaveCount(0)
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card)')).toHaveCount(24)
	await expect(page.locator('.large-dialogue-card h4')).toHaveText('Заселение в отель')
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card) h4')).toHaveText(
		items.slice(1).map((item) => JSON.parse(item.scenario.title).ru),
	)
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

test('a dialogue without messages, scene or a sprite keeps its layout and controls', async ({ page }) => {
	const item = dialogues()[0]
	item.lastMessage = null
	item.sceneImage = null
	item.characters[0].emotionSheet = null
	item.characters = item.characters.slice(0, 1)
	const h = await setup(page, [item])
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card)')).toHaveCount(1)
	await expect(page.getByText('Пока нет сообщений персонажей.')).toBeVisible()
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card)__scene img')).toHaveCount(0)
	await expect(page.locator('.character-avatars__placeholder')).toBeVisible()
	await expect(page.locator(':is(.medium-dialogue-card, .large-dialogue-card) time')).toHaveCount(0)
	await page.getByRole('button', { name: 'Удалить диалог «Покупка абонемента в бассейн»' }).click()
	await page.locator('.modal__close-button').click()
	await expect(page.locator('.modal')).toHaveCount(0)
	expect(h.deleted).toEqual([])
	expect(h.errors).toEqual([])
})
