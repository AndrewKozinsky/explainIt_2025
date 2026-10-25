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
		AiDialogueScenario: [
			{
				id: 12,
				slug: 'hotel-check-in',
				title: '{"ru":"Заселение в отель"}',
				description: '{"ru":"Описание"}',
				cover_s3_key: 'covers/localdev/hotel-check-in.webp',
			},
			{
				id: 2,
				slug: 'passport-control',
				title: '{"ru":"Паспортный контроль"}',
				description: '{"ru":"Описание"}',
				cover_s3_key: 'covers/localdev/passport-control.webp',
			},
		],
	}
}

describe('Public AI dialogue scenario groups', () => {
	it('selects nonempty public groups and public scenarios, ordered by creation date and ID descending', async () => {
		const { repository, prisma } = harness()
		await repository.getPublicScenarioGroups()

		expect(prisma.aiDialogueScenarioGroup.findMany).toHaveBeenCalledWith({
			where: { AiDialogueScenario: { some: { user_id: null } } },
			orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
			select: {
				id: true,
				slug: true,
				title: true,
				AiDialogueScenario: {
					where: { user_id: null },
					orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
					select: { id: true, slug: true, title: true, description: true, cover_s3_key: true },
				},
			},
		})
	})

	it('preserves DB ordering and translations, signs covers, and exposes no storage keys or prompts', async () => {
		const row = group()
		const { repository, storage } = harness([row])
		const result = await repository.getPublicScenarioGroups()
		expect(result).toEqual([
			{
				id: row.id,
				slug: row.slug,
				title: row.title,
				scenarios: row.AiDialogueScenario.map(({ cover_s3_key, ...scenario }) => ({
					...scenario,
					coverUrl: `https://signed.example/${cover_s3_key}`,
				})),
			},
		])
		expect(storage.getFileUrl.mock.calls).toEqual(row.AiDialogueScenario.map((s) => [s.cover_s3_key]))
		expect(Object.keys(result[0])).toEqual(['id', 'slug', 'title', 'scenarios'])
		expect(Object.keys(result[0].scenarios[0])).toEqual(['id', 'slug', 'title', 'description', 'coverUrl'])
	})

	it('returns an empty array without signing any URL when there are no public groups', async () => {
		const { repository, storage } = harness()
		await expect(repository.getPublicScenarioGroups()).resolves.toEqual([])
		expect(storage.getFileUrl).not.toHaveBeenCalled()
	})

	it.each(['slug', 'cover_s3_key'] as const)(
		'preserves CustomError 500 when a public scenario has no %s',
		async (field) => {
			const row = group()
			row.AiDialogueScenario[0][field] = ''
			const { repository } = harness([row])
			await expect(repository.getPublicScenarioGroups()).rejects.toMatchObject({
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
			await expect(repository.getPublicScenarioGroups()).rejects.toBeDefined()
		} finally {
			log.mockRestore()
		}
	})
})
