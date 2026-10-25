jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))

import { CreateAiDialogueScenariosHandler } from './CreateAiDialogueScenarios.command'
import { aiDialogueScenarioGroups } from './groups'
import { getPublicScenarioCoverKey } from './publicScenarioCoverKey'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

describe('Public scenario seeds', () => {
	function harness(mode: string | undefined = 'localdev') {
		const repository = { synchronizePublicScenarios: jest.fn() }
		const config = { get: () => ({ mode }) }

		return { repository, handler: new CreateAiDialogueScenariosHandler(repository as never, config as never) }
	}

	it('synchronizes all twelve scenarios and four groups with environment-specific cover keys', async () => {
		const { repository, handler } = harness('servermaster')
		await handler.execute()
		const [groups, scenarios] = repository.synchronizePublicScenarios.mock.calls[0]

		expect(groups).toBe(aiDialogueScenarioGroups)
		expect(groups).toHaveLength(4)
		expect(scenarios).toHaveLength(12)

		for (const scenario of scenarios) {
			expect(scenario.coverS3Key).toBe(`ai-dialogue-public-scenarios/covers/servermaster/${scenario.slug}.webp`)
		}
	})

	it('has unique keys, valid group membership and translations on all seven interface languages', () => {
		const { handler } = harness()
		const scenarios = handler.getScenariosData()
		const groupSlugs = aiDialogueScenarioGroups.map((group) => group.slug)
		expect(new Set(groupSlugs).size).toBe(4)
		expect(new Set(scenarios.map((scenario) => scenario.slug)).size).toBe(12)

		for (const scenario of scenarios) {
			expect(groupSlugs).toContain(scenario.groupSlug)
			expect(scenario.systemPrompt.trim().length).toBeGreaterThan(100)
		}

		const texts = [
			...aiDialogueScenarioGroups.map((group) => group.title),
			...scenarios.flatMap((s) => [s.title, s.description]),
		]

		for (const text of texts) {
			const translations = JSON.parse(text)
			expect(Object.keys(translations).sort()).toEqual(['de', 'en', 'es', 'fr', 'it', 'ru', 'tr'])
			for (const value of Object.values(translations)) expect(value).toEqual(expect.stringMatching(/\S/))
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
