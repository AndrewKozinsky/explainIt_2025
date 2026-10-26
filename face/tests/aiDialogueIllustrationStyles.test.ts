import assert from 'node:assert/strict'
import { afterEach, mock, test } from 'node:test'
import { QueryClient } from '@tanstack/react-query'
import { AiDialogueQueryFacade } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import { AiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import { AiDialogueApi } from '@/entities/aiDialogue/repository/AiDialogueApi'
import { mapToAiDialogueIllustrationStyles } from '@/entities/aiDialogue/repository/mapToAiDialogueIllustrationStyles'
import { localStorageManager } from '@/shared/utils/localStorageManager'

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
afterEach(function () {
	mock.restoreAll()
	if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow)
	else Reflect.deleteProperty(globalThis, 'window')
})

const catalog = {
	defaultStyleId: 'drawing',
	urlsExpireAt: '2099-01-01T00:00:00Z',
	styles: ['drawing', 'realism', 'watercolor', 'pastel'].map((id) => ({
		id,
		titleKey: `aiDialogue.illustrationStyles.${id}`,
		previewUrl: `https://example.test/${id}.webp`,
	})),
}

test('the public catalog travels through Service/API/Orval and keeps arbitrary IDs, translation keys and server order', async () => {
	Object.defineProperty(globalThis, 'window', { configurable: true, value: {} })
	const fetch = mock.method(globalThis, 'fetch', async (url: RequestInfo | URL, init?: RequestInit) => {
		assert.equal(url, '/api/ai-dialogue/illustration-styles')
		assert.equal(init?.credentials, 'include')
		assert.equal(init?.cache, 'no-store')
		assert.ok(init?.signal)
		return Response.json(catalog)
	})
	const client = new QueryClient({ defaultOptions: { queries: { gcTime: 0 } } })
	const options = new AiDialogueQueryFacade(new AiDialogueService(new AiDialogueApi())).getIllustrationStyles()
	try {
		assert.deepEqual(await client.fetchQuery(options), {
			defaultStyleId: catalog.defaultStyleId,
			styles: catalog.styles,
		})

		assert.equal(fetch.mock.callCount(), 1)
		assert.equal(options.refetchInterval, false)
		assert.equal(options.refetchOnWindowFocus, false)
		assert.equal(options.refetchOnReconnect, false)
	} finally {
		client.clear()
	}
})

test('creation sends the selected style and detail mapping preserves the saved style', async () => {
	Object.defineProperty(globalThis, 'window', { configurable: true, value: {} })

	const input = {
		scenarioId: 2,
		sourceLanguageCode: 'fr' as const,
		targetLanguageCode: 'ru' as const,
		maxCefrLevel: null,
		illustrationStyleId: 'pastel',
	}

	mock.method(globalThis, 'fetch', async (url: RequestInfo | URL, init?: RequestInit) => {
		assert.equal(url, '/api/ai-dialogue')
		assert.deepEqual(JSON.parse(String(init?.body)), input)

		return Response.json(
			{
				id: 42,
				...input,
				scenario: { id: 2, title: '{}', description: '{}' },
				createdAt: '2026-10-26T00:00:00Z',
				updatedAt: '2026-10-26T00:00:00Z',
			},
			{ status: 201 },
		)
	})

	const result = await new AiDialogueService(new AiDialogueApi()).createDialogue(input)

	assert.equal(result.error, null)
	assert.equal(result.data.illustrationStyleId, 'pastel')
})

test('empty catalogs stay empty; malformed catalogs do not become selectable styles', () => {
	assert.deepEqual(mapToAiDialogueIllustrationStyles({ ...catalog, styles: [] }).styles, [])

	for (const invalid of [
		null,
		{},
		{ ...catalog, defaultStyleId: 'missing' },
		{ ...catalog, styles: [catalog.styles[0], catalog.styles[0]] },
		{ ...catalog, styles: [{ id: 'drawing', titleKey: '', previewUrl: '/image.webp' }] },
	]) {
		assert.throws(() => mapToAiDialogueIllustrationStyles(invalid))
	}
})

test('catalog HTTP failures remain errors and abort signals propagate', async () => {
	Object.defineProperty(globalThis, 'window', { configurable: true, value: {} })
	const fetch = mock.method(globalThis, 'fetch', async () =>
		Response.json({ message: 'Unavailable' }, { status: 500 }),
	)
	const service = new AiDialogueService(new AiDialogueApi())
	assert.ok((await service.getIllustrationStyles()).error)
	fetch.mock.mockImplementation(async () => {
		throw new DOMException('Cancelled', 'AbortError')
	})
	await assert.rejects(service.getIllustrationStyles(new AbortController().signal), { name: 'AbortError' })
})

test('the last style uses its own storage key and remains optional when storage is blocked', () => {
	const saved = new Map<string, string>()

	Object.defineProperty(globalThis, 'window', {
		configurable: true,
		value: {
			localStorage: {
				getItem: (key: string) => saved.get(key) ?? null,
				setItem: (key: string, value: string) => saved.set(key, value),
			},
		},
	})
	localStorageManager.lastAiDialogueIllustrationStyle.set('new-style')
	assert.equal(localStorageManager.lastAiDialogueIllustrationStyle.get(), 'new-style')
	assert.equal(saved.get('lastAiDialogueIllustrationStyle'), 'new-style')
	assert.equal(saved.has('lastLanguage'), false)
	Object.defineProperty(globalThis, 'window', {
		configurable: true,
		value: {
			get localStorage() {
				throw new Error('Storage disabled')
			},
		},
	})
	assert.equal(localStorageManager.lastAiDialogueIllustrationStyle.get(), null)
	assert.doesNotThrow(() => localStorageManager.lastAiDialogueIllustrationStyle.set('drawing'))
})
