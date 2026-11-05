jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))
jest.mock('infrastructure/cloudflareS3/cloudflareS3.service', () => ({ CloudflareS3Service: class {} }))

import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { AiDialogueScenarioGroupQueryRepository } from './aiDialogueScenarioGroup.queryRepository'

function harness(rows: unknown[] = []) {
	const prisma = { aiDialogueScenarioGroup: { findMany: jest.fn().mockResolvedValue(rows) } }
	const storage = { getFileUrl: jest.fn(async (key: string) => `https://signed.example/${key}`) }
	const repository = new AiDialogueScenarioGroupQueryRepository(prisma as never, storage as never)

	return { repository, prisma, storage }
}

function group() {
	return {
		id: 5,
		slug: 'travel-abroad',
		title: '{"en":"Travel abroad","ru":"Поездка за границу"}',
		description: '{"en":"Useful before a trip","ru":"Пригодится в поездке"}',
		AiDialogueScenario: [
			{
				id: 12,
				slug: 'hotel-check-in',
				title: '{"ru":"Заселение в отель"}',
				description: '{"ru":"Описание"}',
				user_scenario_amendment_hint: '{"en":"A hotel in Rome","ru":"Отель в Риме"}',
				conversation_ideas:
					'{"en":["Ask about breakfast"],"ru":["Спросить про завтрак","Попросить номер с видом"]}',
				trained_skills: '{"en":"Check in smoothly","ru":"Заселяться без заминок"}',
				cover_s3_key: 'covers/localdev/hotel-check-in.webp',
			},
			{
				id: 2,
				slug: 'passport-control',
				title: '{"ru":"Паспортный контроль"}',
				description: '{"ru":"Описание"}',
				user_scenario_amendment_hint: null,
				conversation_ideas: '{"en":["Explain the purpose of your trip"]}',
				trained_skills: '{"en":"Answer a border officer"}',
				cover_s3_key: 'covers/localdev/passport-control.webp',
			},
		],
	}
}

describe('Public AI dialogue scenario groups', () => {
	it('selects nonempty public groups and public scenarios, ordered by seed position and ID ascending', async () => {
		const { repository, prisma } = harness()
		await repository.getPublicScenarioGroups('ru')

		expect(prisma.aiDialogueScenarioGroup.findMany).toHaveBeenCalledWith({
			where: { AiDialogueScenario: { some: { user_id: null } } },
			orderBy: [{ position: 'asc' }, { id: 'asc' }],
			select: {
				id: true,
				slug: true,
				title: true,
				description: true,
				AiDialogueScenario: {
					where: { user_id: null },
					orderBy: [{ position: 'asc' }, { id: 'asc' }],
					select: {
						id: true,
						slug: true,
						title: true,
						description: true,
						user_scenario_amendment_hint: true,
						conversation_ideas: true,
						trained_skills: true,
						cover_s3_key: true,
					},
				},
			},
		})
	})

	it('preserves DB ordering, localizes texts, signs covers, and exposes no storage keys or prompts', async () => {
		const row = group()
		const { repository, storage } = harness([row])

		const result = await repository.getPublicScenarioGroups('ru')

		expect(result).toEqual([
			{
				id: row.id,
				slug: row.slug,
				title: 'Поездка за границу',
				description: 'Пригодится в поездке',
				scenarios: [
					{
						id: 12,
						slug: 'hotel-check-in',
						title: 'Заселение в отель',
						description: 'Описание',
						userScenarioAmendmentHint: 'Отель в Риме',
						conversationIdeas: ['Спросить про завтрак', 'Попросить номер с видом'],
						trainedSkills: 'Заселяться без заминок',
						coverUrl: 'https://signed.example/covers/localdev/hotel-check-in.webp',
					},
					{
						id: 2,
						slug: 'passport-control',
						title: 'Паспортный контроль',
						description: 'Описание',
						userScenarioAmendmentHint: null,
						conversationIdeas: ['Explain the purpose of your trip'],
						trainedSkills: 'Answer a border officer',
						coverUrl: 'https://signed.example/covers/localdev/passport-control.webp',
					},
				],
			},
		])

		expect(storage.getFileUrl.mock.calls).toEqual(row.AiDialogueScenario.map((s) => [s.cover_s3_key]))
		expect(Object.keys(result[0])).toEqual(['id', 'slug', 'title', 'description', 'scenarios'])
		expect(Object.keys(result[0].scenarios[0])).toEqual([
			'id',
			'slug',
			'title',
			'description',
			'userScenarioAmendmentHint',
			'conversationIdeas',
			'trainedSkills',
			'coverUrl',
		])
	})

	it('falls back to English when the requested locale has no translation', async () => {
		const { repository } = harness([group()])
		const [result] = await repository.getPublicScenarioGroups('de')

		expect(result).toMatchObject({ title: 'Travel abroad', description: 'Useful before a trip' })
	})

	it('returns an empty array without signing any URL when there are no public groups', async () => {
		const { repository, storage } = harness()
		await expect(repository.getPublicScenarioGroups('ru')).resolves.toEqual([])

		expect(storage.getFileUrl).not.toHaveBeenCalled()
	})

	it.each(['slug', 'cover_s3_key', 'conversation_ideas', 'trained_skills'] as const)(
		'preserves CustomError 500 when a public scenario has no %s',
		async (field) => {
			const row = group()
			row.AiDialogueScenario[0][field] = ''
			const { repository } = harness([row])

			await expect(repository.getPublicScenarioGroups('ru')).rejects.toMatchObject({
				constructor: CustomError,
				errorMessage: errorMessage.aiDialogue.invalidPublicScenario,
				statusCode: ErrorStatusCode.InternalServerError_500,
			})
		},
	)

	it('does not present a signing failure as a successful empty group list', async () => {
		const { repository, storage } = harness([group()])
		storage.getFileUrl.mockRejectedValue(new Error('storage unavailable'))
		const log = jest.spyOn(console, 'error').mockImplementation(() => undefined)

		try {
			await expect(repository.getPublicScenarioGroups('ru')).rejects.toBeDefined()
		} finally {
			log.mockRestore()
		}
	})
})
