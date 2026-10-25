jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))

import { aiDialogueScenarioGroups } from 'features/aiDialogueScenario/groups'
import { travelScenarios } from 'features/aiDialogueScenario/scenarios/travelScenarios'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { AiDialogueScenarioRepository } from './aiDialogueScenario.repository'

describe('Scenario synchronization', () => {
	function harness() {
		const tx = {
			aiDialogueScenarioGroup: {
				upsert: jest.fn(async ({ where }) => ({ id: where.slug === 'travel-abroad' ? 4 : 2 })),
			},
			aiDialogueScenario: { upsert: jest.fn(), findUnique: jest.fn().mockResolvedValue(null) },
		}

		const prisma = { $transaction: jest.fn(async (work) => work(tx)), aiDialogueScenario: { create: jest.fn() } }

		return { repository: new AiDialogueScenarioRepository(prisma as never), prisma, tx }
	}

	it('upserts groups and scenarios in one transaction without changing their IDs or creation dates', async () => {
		const { repository, tx, prisma } = harness()
		const scenario = {
			...travelScenarios.find((s) => s.slug === 'passport-control')!,
			coverS3Key: 'covers/localdev/passport-control.webp',
		}

		await repository.synchronizePublicScenarios(aiDialogueScenarioGroups, [scenario])

		expect(prisma.$transaction).toHaveBeenCalledTimes(1)
		expect(tx.aiDialogueScenarioGroup.upsert).toHaveBeenCalledTimes(4)
		expect(tx.aiDialogueScenario.upsert).toHaveBeenCalledWith({
			where: { slug: 'passport-control' },
			create: {
				slug: scenario.slug,
				user_id: null,
				group_id: 4,
				title: scenario.title,
				description: scenario.description,
				system_prompt: scenario.systemPrompt,
				cover_s3_key: scenario.coverS3Key,
			},
			update: {
				group_id: 4,
				title: scenario.title,
				description: scenario.description,
				system_prompt: scenario.systemPrompt,
				cover_s3_key: scenario.coverS3Key,
			},
		})
	})

	it('preserves the missing-group error key and does not start a transaction', async () => {
		const { repository, prisma } = harness()
		const scenario = { ...travelScenarios[0], coverS3Key: 'covers/localdev/passport-control.webp' }
		await expect(repository.synchronizePublicScenarios([], [scenario])).rejects.toMatchObject({
			constructor: CustomError,
			errorMessage: errorMessage.aiDialogue.scenarioGroupNotFound,
			statusCode: ErrorStatusCode.InternalServerError_500,
		})
		expect(prisma.$transaction).not.toHaveBeenCalled()
	})

	it('preserves the private-slug conflict error key and does not upsert the scenario', async () => {
		const { repository, tx } = harness()
		tx.aiDialogueScenario.findUnique.mockResolvedValue({ user_id: 7 } as never)
		const scenario = { ...travelScenarios[0], coverS3Key: 'covers/localdev/passport-control.webp' }
		await expect(repository.synchronizePublicScenarios(aiDialogueScenarioGroups, [scenario])).rejects.toMatchObject(
			{
				constructor: CustomError,
				errorMessage: errorMessage.aiDialogue.scenarioSlugAlreadyOwned,
				statusCode: ErrorStatusCode.InternalServerError_500,
			},
		)
		expect(tx.aiDialogueScenario.upsert).not.toHaveBeenCalled()
	})

	it('creates a user-owned scenario without a group or cover', async () => {
		const { repository, prisma } = harness()
		await repository.createScenario({
			userId: 7,
			title: 'My scenario',
			description: 'Description',
			systemPrompt: 'Prompt',
		})
		expect(prisma.aiDialogueScenario.create).toHaveBeenCalledWith({
			data: {
				user_id: 7,
				slug: null,
				group_id: null,
				cover_s3_key: null,
				title: 'My scenario',
				description: 'Description',
				system_prompt: 'Prompt',
			},
		})
	})
})
