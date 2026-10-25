import assert from 'node:assert/strict'
import { mock, test } from 'node:test'
import { QueryClient } from '@tanstack/react-query'
import { AiDialogueScenarioGroupQueryFacade } from '@/entities/aiDialogueScenarioGroup/AiDialogueScenarioGroupQueryFacade'
import { AiDialogueScenarioGroupService } from '@/entities/aiDialogueScenarioGroup/AiDialogueScenarioGroupService'
import { AiDialogueScenarioGroupApi } from '@/entities/aiDialogueScenarioGroup/repository/AiDialogueScenarioGroupApi'
import { getScenarioGroupsConfig } from '@/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/fn/getScenarioGroupsConfig'

test('groups travel through generated API, repository, service and query without reordering; cards use locale and fallback', async () => {
	const original = Object.getOwnPropertyDescriptor(globalThis, 'window')
	Object.defineProperty(globalThis, 'window', { configurable: true, value: {} })

	const groups = [9, 2].map((id) => ({
		id,
		slug: `group-${id}`,
		title: JSON.stringify({ ru: `Группа ${id}`, en: 'Group' }),
		scenarios: [8, 1].map((scenarioId) => ({
			id: scenarioId,
			slug: `scenario-${scenarioId}`,
			title: JSON.stringify({ ru: `Сценарий ${scenarioId}`, '*': 'Fallback' }),
			description: JSON.stringify({ '*': 'Description' }),
			coverUrl: `https://example.test/${scenarioId}.webp`,
		})),
	}))

	const fetch = mock.method(globalThis, 'fetch', async (url: RequestInfo | URL, init?: RequestInit) => {
		assert.equal(url, '/api/ai-dialogue-scenario-group')
		assert.equal(init?.credentials, 'include')
		assert.equal(init?.cache, 'no-store')
		assert.ok(init?.signal)
		return Response.json(groups)
	})

	const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } })
	const options = new AiDialogueScenarioGroupQueryFacade(
		new AiDialogueScenarioGroupService(new AiDialogueScenarioGroupApi()),
	).getAiDialogueScenarioGroups()

	try {
		const data = await client.fetchQuery(options)
		assert.deepEqual(data, groups)
		assert.equal(fetch.mock.callCount(), 1)
		assert.equal(options.refetchInterval, false)
		assert.equal(options.refetchOnWindowFocus, false)
		assert.equal(options.refetchOnReconnect, false)
		const localized = getScenarioGroupsConfig(data, 'ru')
		assert.deepEqual(
			localized.map((group) => group.title),
			['Группа 9', 'Группа 2'],
		)
		assert.deepEqual(
			localized[0].scenarios.map((scenario) => scenario.title),
			['Сценарий 8', 'Сценарий 1'],
		)
		assert.equal(localized[0].scenarios[0].description, 'Description')
		assert.equal(localized[0].scenarios[0].coverUrl, groups[0].scenarios[0].coverUrl)
		assert.equal(getScenarioGroupsConfig(data, 'de')[0].scenarios[0].title, 'Fallback')
	} finally {
		fetch.mock.restore()
		client.clear()

		if (original) Object.defineProperty(globalThis, 'window', original)
		else Reflect.deleteProperty(globalThis, 'window')
	}
})
