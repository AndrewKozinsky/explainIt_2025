import assert from 'node:assert/strict'
import { mock, test } from 'node:test'
import { QueryClient } from '@tanstack/react-query'
import { aiDialogueScenarioConfig } from '@/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig'
import { AiDialogueScenarioGroupQueryFacade } from '@/entities/aiDialogueScenarioGroup/AiDialogueScenarioGroupQueryFacade'
import { AiDialogueScenarioGroupService } from '@/entities/aiDialogueScenarioGroup/AiDialogueScenarioGroupService'
import { AiDialogueScenarioGroupApi } from '@/entities/aiDialogueScenarioGroup/repository/AiDialogueScenarioGroupApi'
import { getScenarioGroupsConfig } from '@/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/fn/getScenarioGroupsConfig'

test('groups travel through generated API, repository, service and query without reordering; locale goes to Accept-Language', async () => {
	const original = Object.getOwnPropertyDescriptor(globalThis, 'window')

	Object.defineProperty(globalThis, 'window', {
		configurable: true,
		value: { location: { pathname: '/ru/dialogues' } },
	})

	const groups = [9, 2].map((id) => ({
		id,
		slug: `group-${id}`,
		title: `Группа ${id}`,
		description: `Зачем выбрать группу ${id}`,
		scenarios: [8, 1].map((scenarioId) => ({
			id: scenarioId,
			slug: `scenario-${scenarioId}`,
			title: scenarioId === 1 ? '' : `Сценарий ${scenarioId}`,
			description: 'Описание',
			userScenarioAmendmentHint: scenarioId === 1 ? null : 'Посольство Канады',
			conversationIdeas: scenarioId === 1 ? ['Попросить скидку', ' '] : ['Попросить скидку', 'Отказаться и уйти'],
			trainedSkills: 'Спрашивать цену и торговаться',
			coverUrl: `https://example.test/${scenarioId}.webp`,
		})),
	}))

	const fetch = mock.method(globalThis, 'fetch', async (url: RequestInfo | URL, init?: RequestInit) => {
		assert.equal(url, '/api/ai-dialogue-scenario-group')
		assert.equal(init?.credentials, 'include')
		assert.equal(init?.cache, 'no-store')
		assert.equal(new Headers(init?.headers).get('Accept-Language'), 'ru')
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

		const config = getScenarioGroupsConfig(data)

		assert.deepEqual(
			config.map((group) => [group.title, group.description]),
			[
				['Группа 9', 'Зачем выбрать группу 9'],
				['Группа 2', 'Зачем выбрать группу 2'],
			],
		)
		assert.equal(config[0].scenarios[0].title, 'Сценарий 8')
		assert.equal(config[0].scenarios[1].title, aiDialogueScenarioConfig.emptyScenarioName)
		assert.equal(config[0].scenarios[0].description, 'Описание')
		assert.equal(config[0].scenarios[0].coverUrl, groups[0].scenarios[0].coverUrl)
		assert.equal(config[0].scenarios[0].userScenarioAmendmentHint, 'Посольство Канады')
		assert.equal(
			config[0].scenarios[1].userScenarioAmendmentHint,
			aiDialogueScenarioConfig.defaultUserScenarioAmendmentHint,
		)
		assert.deepEqual(config[0].scenarios[0].conversationIdeas, ['Попросить скидку', 'Отказаться и уйти'])
		assert.deepEqual(config[0].scenarios[1].conversationIdeas, ['Попросить скидку'])
		assert.equal(config[0].scenarios[0].trainedSkills, 'Спрашивать цену и торговаться')
	} finally {
		fetch.mock.restore()
		client.clear()

		if (original) Object.defineProperty(globalThis, 'window', original)
		else Reflect.deleteProperty(globalThis, 'window')
	}
})
