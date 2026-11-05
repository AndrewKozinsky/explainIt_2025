jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))

import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { CreateAiDialogueScenariosHandler } from './CreateAiDialogueScenarios.command'
import { aiDialogueScenarioGroups } from './groups'
import { getPublicScenarioCoverKey } from './publicScenarioCoverKey'

const languageCodes = ['de', 'en', 'es', 'fr', 'it', 'ru', 'tr']

describe('Public scenario seeds', () => {
	function harness(mode: string | undefined = 'localdev') {
		const repository = { synchronizePublicScenarios: jest.fn() }
		const config = { get: () => ({ mode }) }

		return { repository, handler: new CreateAiDialogueScenariosHandler(repository as never, config as never) }
	}

	it('synchronizes every seed scenario and group with environment-specific cover keys', async () => {
		const { repository, handler } = harness('servermaster')

		await handler.execute()
		const [groups, scenarios] = repository.synchronizePublicScenarios.mock.calls[0]

		expect(groups).toEqual(handler.getGroupsData())
		expect(groups).toHaveLength(aiDialogueScenarioGroups.length)
		expect(scenarios.map((scenario: { slug: string }) => scenario.slug)).toEqual(
			handler.getScenariosData().map((s) => s.slug),
		)

		for (const scenario of scenarios) {
			expect(scenario.coverS3Key).toBe(`ai-dialogue-public-scenarios/covers/servermaster/${scenario.slug}.webp`)
		}
	})

	it('orders groups by their first scenario in getScenariosData and keeps the scenarios of a group together', () => {
		const { handler } = harness()
		const scenarioGroupOrder = handler.getScenariosData().map((scenario) => scenario.groupSlug)
		const firstAppearance = [...new Set(scenarioGroupOrder)]
		const groupOrder = handler.getGroupsData().map((group) => group.slug)

		expect(groupOrder.slice(0, firstAppearance.length)).toEqual(firstAppearance)

		// Сценарии одной группы идут подряд: иначе порядок на странице не совпадёт с getScenariosData.
		const runs = scenarioGroupOrder.filter((slug, index) => slug !== scenarioGroupOrder[index - 1])
		expect(runs).toEqual(firstAppearance)
	})

	it('has unique keys, valid group membership and translations on all seven interface languages', () => {
		const { handler } = harness()
		const scenarios = handler.getScenariosData()
		const groupSlugs = aiDialogueScenarioGroups.map((group) => group.slug)

		expect(new Set(groupSlugs).size).toBe(groupSlugs.length)
		expect(new Set(scenarios.map((scenario) => scenario.slug)).size).toBe(scenarios.length)

		for (const scenario of scenarios) {
			expect(groupSlugs).toContain(scenario.groupSlug)
			expect(scenario.systemPrompt.trim().length).toBeGreaterThan(100)
		}

		const texts = [
			...aiDialogueScenarioGroups.flatMap((group) => [group.title, group.description]),
			...scenarios.flatMap((s) => [s.title, s.description, s.trainedSkills]),
			...scenarios.flatMap((s) => (s.userScenarioAmendmentHint ? [s.userScenarioAmendmentHint] : [])),
		]

		for (const text of texts) {
			const translations = JSON.parse(text)
			expect(Object.keys(translations).sort()).toEqual(languageCodes)
			for (const value of Object.values(translations)) expect(value).toEqual(expect.stringMatching(/\S/))
		}
	})

	it('has 2–4 conversation ideas on all seven interface languages, the same number in each language', () => {
		const { handler } = harness()

		for (const scenario of handler.getScenariosData()) {
			const translations: Record<string, unknown> = JSON.parse(scenario.conversationIdeas)
			expect(Object.keys(translations).sort()).toEqual(languageCodes)

			const counts = new Set<number>()

			for (const ideas of Object.values(translations)) {
				expect(Array.isArray(ideas)).toBe(true)
				const list = ideas as unknown[]
				counts.add(list.length)
				for (const idea of list) expect(idea).toEqual(expect.stringMatching(/\S/))
			}

			expect(counts.size).toBe(1)
			const [count] = counts
			expect(count).toBeGreaterThanOrEqual(2)
			expect(count).toBeLessThanOrEqual(4)
		}
	})

	it('rejects an unconfigured MODE before writing to the database', async () => {
		const { repository, handler } = harness('')
		await expect(handler.execute()).rejects.toMatchObject({
			constructor: CustomError,
			errorMessage: errorMessage.aiDialogue.invalidScenarioCoverKey,
			statusCode: ErrorStatusCode.InternalServerError_500,
		})
		expect(repository.synchronizePublicScenarios).not.toHaveBeenCalled()
	})

	it.each(['localtest', 'localdev', 'localcheckserver', 'serverdevelop', 'servermaster'])(
		'isolates covers for MODE=%s',
		(mode) => {
			expect(getPublicScenarioCoverKey(mode, 'passport-control')).toBe(
				`ai-dialogue-public-scenarios/covers/${mode}/passport-control.webp`,
			)
		},
	)

	it.each(['../private', 'passport/control', 'passport-control.webp', ''])('rejects invalid slugs: %s', (slug) => {
		expect(() => getPublicScenarioCoverKey('localdev', slug)).toThrow()
	})
})
