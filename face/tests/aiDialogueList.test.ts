import assert from 'node:assert/strict'
import { mock, test } from 'node:test'
import { InfiniteQueryObserver, QueryClient } from '@tanstack/react-query'
import { AiDialogueQueryFacade, aiDialogueQueryKeys } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import { AiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import { AiDialogueApi } from '@/entities/aiDialogue/repository/AiDialogueApi'
import { formatDialogueDate } from '@/widgets/aiUserDialogues/ui/UserAiDialoguesList/fn/formatDialogueDate'

for (const [date, expected] of [
	['2026-10-24', 'сегодня'],
	['2026-10-23', 'вчера'],
	['2026-10-19', '5 дней назад'],
	['2026-09-24', 'месяц назад'],
	['2024-10-24', '2 года назад'],
] as const)
	test(`relative calendar date: ${expected}`, () => {
		assert.equal(formatDialogueDate(`${date}T12:00:00`, 'ru', new Date('2026-10-24T13:00:00')), expected)
	})

test('same calendar date stays today even around midnight; invalid dates do not leak into UI', () => {
	assert.equal(formatDialogueDate('2026-10-24T00:01:00', 'ru', new Date('2026-10-24T23:59:00')), 'сегодня')
	assert.equal(formatDialogueDate('invalid', 'ru'), '')
})

test('pagination uses Service/API/generated GET and retains earlier pages when loading more', async () => {
	const original = Object.getOwnPropertyDescriptor(globalThis, 'window')
	Object.defineProperty(globalThis, 'window', { configurable: true, value: {} })

	const calls: string[] = []

	const fetch = mock.method(globalThis, 'fetch', async (url: RequestInfo | URL, init?: RequestInit) => {
		calls.push(String(url))
		assert.equal(init?.credentials, 'include')
		assert.equal(init?.cache, 'no-store')
		assert.ok(init?.signal)
		const page = Number(new URL(String(url), 'http://test').searchParams.get('page'))

		return Response.json({
			page,
			pageSize: 10,
			total: 20,
			totalPages: 2,
			urlsExpireAt: '2099-01-01T00:00:00Z',
			items: [
				{
					id: page,
					scenario: { id: 1, title: '{}' },
					sourceLanguageCode: 'en',
					maxCefrLevel: null,
					createdAt: '2026-10-24T00:00:00Z',
					lastMessage: null,
					sceneImage: null,
					characters: [{ npcId: 'one', emotionSheet: null }],
				},
			],
		})
	})
	const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } })
	const facade = new AiDialogueQueryFacade(new AiDialogueService(new AiDialogueApi()))
	const observer = new InfiniteQueryObserver(client, facade.getUserDialogues(7))
	try {
		await observer.refetch()
		assert.equal(observer.getCurrentResult().hasNextPage, true)
		await observer.fetchNextPage()
		const result = observer.getCurrentResult()
		assert.deepEqual(
			result.data?.pages.map((page) => page.items[0].id),
			[1, 2],
		)
		assert.equal(result.hasNextPage, false)
		assert.equal(result.data?.pages[0].items[0].characters[0].name, null)
		assert.deepEqual(calls, ['/api/ai-dialogue?page=1&pageSize=10', '/api/ai-dialogue?page=2&pageSize=10'])
		assert.notDeepEqual(aiDialogueQueryKeys.userList(7), aiDialogueQueryKeys.userList(8))
	} finally {
		fetch.mock.restore()
		client.clear()
		if (original) Object.defineProperty(globalThis, 'window', original)
		else Reflect.deleteProperty(globalThis, 'window')
	}
})
