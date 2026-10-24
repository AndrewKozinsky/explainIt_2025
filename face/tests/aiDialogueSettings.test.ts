import assert from 'node:assert/strict'
import { afterEach, beforeEach, mock, test } from 'node:test'
import { type InfiniteData, MutationObserver, QueryClient } from '@tanstack/react-query'
import { AiDialogueQueryFacade, aiDialogueQueryKeys } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import { AiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import { AiDialogueApi } from '@/entities/aiDialogue/repository/AiDialogueApi'
import type { AiDialogueModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import type { AiDialoguesPageModel } from '@/entities/aiDialogue/types/aiDialogueList'
import type { AiDialogueOutModel } from '@/shared/api/generated/models'

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
beforeEach(function () {
	Object.defineProperty(globalThis, 'window', { configurable: true, value: {} })
})
afterEach(function () {
	mock.restoreAll()
	if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow)
	else Reflect.deleteProperty(globalThis, 'window')
})

function rawDialogue(maxCefrLevel: AiDialogueModel['maxCefrLevel'] = 'A2'): AiDialogueOutModel {
	return {
		id: 1,
		scenario: { id: 3, slug: 'customs', title: 'Customs', description: 'At customs' },
		sourceLanguageCode: 'en',
		targetLanguageCode: 'ru',
		maxCefrLevel,
		createdAt: '2026-10-19T00:00:00.000Z',
		updatedAt: '2026-10-19T01:00:00.000Z',
	}
}

function harness() {
	const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false, gcTime: 0 } } })
	const service = new AiDialogueService(new AiDialogueApi())
	const facade = new AiDialogueQueryFacade(service)
	const current: AiDialogueModel = { ...rawDialogue(), scenario: { ...rawDialogue().scenario, slug: 'customs' } }
	queryClient.setQueryData(aiDialogueQueryKeys.detail(1), current)

	queryClient.setQueryData(aiDialogueQueryKeys.userList(7), {
		pages: [
			{
				page: 1,
				pageSize: 3,
				total: 2,
				totalPages: 1,
				urlsExpireAt: '2099-01-01T00:00:00Z',
				items: [current, { ...current, id: 2 }].map((item) => ({
					...item,
					lastMessage: null,
					sceneImage: null,
					characters: [],
				})),
			},
		],
		pageParams: [1],
	})

	const observer = new MutationObserver(queryClient, facade.updateDialogue(1, queryClient))

	return { queryClient, observer, current, service, facade }
}

test('the service sends each level and explicit null through the generated PATCH route', async function () {
	const { service, queryClient } = harness()

	try {
		for (const maxCefrLevel of ['A1', 'A2', 'B1', 'B2', null] as const) {
			const fetchMock = mock.method(
				globalThis,
				'fetch',
				async function (url: RequestInfo | URL, options?: RequestInit) {
					assert.equal(url, '/api/ai-dialogue/1')
					assert.equal(options?.method, 'PATCH')
					assert.equal(options?.credentials, 'include')
					assert.deepEqual(JSON.parse(String(options?.body)), { maxCefrLevel })
					return Response.json(rawDialogue(maxCefrLevel))
				},
			)

			const result = await service.updateDialogue(1, { maxCefrLevel })

			assert.equal(result.error, null)
			assert.equal(result.data.maxCefrLevel, maxCefrLevel)
			fetchMock.mock.restore()
		}
	} finally {
		queryClient.clear()
	}
})

test('detail loading preserves the server level, including the unrestricted default', async function () {
	const { facade, queryClient } = harness()

	try {
		mock.method(globalThis, 'fetch', async () => Response.json(rawDialogue(null)))

		const dialogue = await queryClient.fetchQuery(facade.getDialogue(1))
		assert.equal(dialogue.maxCefrLevel, null)
	} finally {
		queryClient.clear()
	}
})

test('selection stays saved while PATCH is pending; success updates detail and list without touching audio', async function () {
	const { observer, queryClient, current } = harness()
	const audio = { dialogueId: 1, items: [] }
	queryClient.setQueryData(aiDialogueQueryKeys.audio(1), audio)
	let release!: (response: Response) => void

	const response = new Promise<Response>((resolve) => {
		release = resolve
	})

	mock.method(globalThis, 'fetch', () => response)

	try {
		const pending = observer.mutate({ maxCefrLevel: 'B1' })
		assert.equal(observer.getCurrentResult().isPending, true)
		assert.equal(queryClient.getQueryData(aiDialogueQueryKeys.detail(1)), current)
		release(Response.json(rawDialogue('B1')))
		await pending
		assert.equal(observer.getCurrentResult().isPending, false)
		assert.equal(queryClient.getQueryData<AiDialogueModel>(aiDialogueQueryKeys.detail(1))?.maxCefrLevel, 'B1')

		const list = queryClient.getQueryData<InfiniteData<AiDialoguesPageModel>>(aiDialogueQueryKeys.userList(7))!
			.pages[0].items

		assert.equal(list[0].maxCefrLevel, 'B1')
		assert.equal(list[1].maxCefrLevel, 'A2')
		assert.equal(queryClient.getQueryData(aiDialogueQueryKeys.audio(1)), audio)
	} finally {
		queryClient.clear()
	}
})

test('a failed PATCH leaves the saved selection and caches intact and permits another attempt', async function () {
	const { observer, queryClient, current } = harness()
	mock.method(globalThis, 'fetch', async function () {
		return Response.json({ message: [{ field: 'maxCefrLevel', messages: ['Unsupported level'] }] }, { status: 400 })
	})
	try {
		await assert.rejects(observer.mutate({ maxCefrLevel: 'B2' }), /Unsupported level/)

		assert.equal(observer.getCurrentResult().isPending, false)
		assert.equal(queryClient.getQueryData(aiDialogueQueryKeys.detail(1)), current)
		assert.equal(
			queryClient.getQueryData<InfiniteData<AiDialoguesPageModel>>(aiDialogueQueryKeys.userList(7))?.pages[0]
				.items[0].maxCefrLevel,
			'A2',
		)
		mock.method(globalThis, 'fetch', async () => Response.json(rawDialogue(null)))
		await observer.mutate({ maxCefrLevel: null })
		assert.equal(queryClient.getQueryData<AiDialogueModel>(aiDialogueQueryKeys.detail(1))?.maxCefrLevel, null)
	} finally {
		queryClient.clear()
	}
})
