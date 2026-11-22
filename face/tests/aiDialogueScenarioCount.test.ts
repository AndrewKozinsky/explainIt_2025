import assert from 'node:assert/strict'
import { test } from 'node:test'
import { QueryClient } from '@tanstack/react-query'
import { AiDialogueScenarioQueryFacade } from '@/entities/aiDialogueScenario/AiDialogueScenarioQueryFacade'
import { AiDialogueScenarioService } from '@/entities/aiDialogueScenario/AiDialogueScenarioService'
import { AiDialogueScenarioApi } from '@/entities/aiDialogueScenario/repository/AiDialogueScenarioApi'
import type { AiDialogueScenarioGroupModel } from '@/entities/aiDialogueScenarioGroup/repository/AiDialogueScenarioGroupRepository'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

function createQueries(result: ApiResult<AiDialogueScenarioGroupModel[]>) {
	return new AiDialogueScenarioQueryFacade(
		new AiDialogueScenarioService(
			new AiDialogueScenarioApi({
				async getAiDialogueScenarioGroups(signal) {
					assert.ok(signal instanceof AbortSignal)
					return result
				},
			}),
		),
	)
}

test('scenario count includes scenarios from every group and handles an empty catalog', async () => {
	const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } })
	try {
		for (const sizes of [[], [0], [1], [2, 0, 3]]) {
			const groups = sizes.map((size, id) => ({
				id,
				slug: `group-${id}`,
				title: 'Group',
				description: '',
				scenarios: Array.from({ length: size }, (_, index) => ({
					id: index,
					slug: `scenario-${index}`,
					title: 'Scenario',
					description: '',
					userScenarioAmendmentHint: null,
					conversationIdeas: [],
					trainedSkills: '',
					coverUrl: '',
				})),
			}))
			const queries = createQueries({ data: groups, error: null, errors: null })
			assert.equal(await client.fetchQuery(queries.getPublicScenarioCount()), sizes.reduce((a, b) => a + b, 0))
		}
	} finally {
		client.clear()
	}
})

test('API errors reach the query as failures rather than a zero count', async () => {
	const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } })
	try {
		for (const failure of [
			{ error: 'Unavailable', errors: null },
			{ error: null, errors: [{ field: 'locale', messages: ['Invalid locale'] }] },
		]) {
			const queries = createQueries({ ...failure, data: null as unknown as AiDialogueScenarioGroupModel[] })
			await assert.rejects(client.fetchQuery(queries.getPublicScenarioCount()))
		}
	} finally {
		client.clear()
	}
})
