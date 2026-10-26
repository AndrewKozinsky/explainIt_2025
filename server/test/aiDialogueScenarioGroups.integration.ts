import 'reflect-metadata'
import assert = require('node:assert/strict')
import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Global, Module } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Test } from '@nestjs/testing'
import { PrismaPg } from '@prisma/adapter-pg'
import { Client } from 'pg'
import { PrismaClient } from '../prisma/generated/client'
import { PrismaService } from '../src/db/prisma.service'
import { CreateAiDialogueScenariosHandler } from '../src/features/aiDialogueScenario/CreateAiDialogueScenarios.command'
import { aiDialogueScenarioGroups } from '../src/features/aiDialogueScenario/groups'
import { getPublicScenarioCoverKey } from '../src/features/aiDialogueScenario/publicScenarioCoverKey'
import { CloudflareS3Service } from '../src/infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from '../src/infrastructure/mainConfig/mainConfig.service'
import { AiDialogueScenarioRepository } from '../src/repo/aiDialogueScenario/aiDialogueScenario.repository'
import { AiDialogueScenarioGroupQueryRepository } from '../src/repo/aiDialogueScenarioGroup/aiDialogueScenarioGroup.queryRepository'
import { AiDialogueScenarioGroupModule } from '../src/routes/aiDialogueScenarioGroup/aiDialogueScenarioGroup.module'

// Only a fresh disposable database is accepted. No application configuration, worker or real R2 is loaded.
const connectionString = process.env.AI_DIALOGUE_SCENARIO_TEST_DB_URL
assert.ok(connectionString, 'Set AI_DIALOGUE_SCENARIO_TEST_DB_URL to a fresh disposable PostgreSQL database')
const target = new URL(connectionString)
assert.equal(target.pathname, '/explainit_scenario_groups_test', 'Only the dedicated test database is allowed')
assert.ok(['localhost', '127.0.0.1'].includes(target.hostname), 'Only a local test database is allowed')

const config = { get: () => ({ mode: 'localdev' }) }
const storage = { getFileUrl: async (key: string) => `https://covers.example/${key}?signed=test` }

@Global()
@Module({
	providers: [
		{ provide: MainConfigService, useValue: config },
		{ provide: CloudflareS3Service, useValue: storage },
	],
	exports: [MainConfigService, CloudflareS3Service],
})
class TestDependenciesModule {}

async function migrateWithExistingScenarios(sql: Client) {
	const tables = await sql.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'")
	assert.equal(tables.rowCount, 0, 'The dedicated test database must be empty')

	const migrationsPath = resolve(__dirname, '../prisma/migrations')
	const names = (await readdir(migrationsPath)).filter((name) => /^\d/.test(name)).sort()
	const lastMigration = '20261025120000_public_ai_dialogue_scenario_groups'

	assert.ok(names.includes(lastMigration), 'The public scenario groups migration must exist')

	for (const name of names.filter((name) => name < lastMigration)) {
		await sql.query(await readFile(resolve(migrationsPath, name, 'migration.sql'), 'utf8'))
	}
	const user = await sql.query(
		'INSERT INTO "User" ("email") VALUES (\'scenario-groups@example.test\') RETURNING "id"',
	)

	const ids: number[] = []

	for (const slug of ['at-the-dentist', 'passport-control', 'pool-membership', 'knock-at-the-door']) {
		const row = await sql.query(
			'INSERT INTO "AiDialogueScenario" ("slug", "title", "description", "system_prompt") VALUES ($1, \'Old title\', \'Old description\', \'Old prompt\') RETURNING "id"',
			[slug],
		)
		ids.push(row.rows[0].id)
	}
	const dialogue = await sql.query(
		'INSERT INTO "AiDialogue" ("scenario_id", "user_id", "source_language_code", "target_language_code", "updated_at") VALUES ($1, $2, \'en\', \'ru\', now()) RETURNING "id"',
		[ids[0], user.rows[0].id],
	)
	await sql.query(await readFile(resolve(migrationsPath, lastMigration, 'migration.sql'), 'utf8'))
	const migrated = await sql.query('SELECT "id", "group_id", "cover_s3_key" FROM "AiDialogueScenario" ORDER BY "id"')
	assert.deepEqual(
		migrated.rows.map((row) => row.id),
		ids,
	)
	assert.ok(migrated.rows.every((row) => row.group_id !== null && row.cover_s3_key !== null))

	let chosenStyleDialogueId: number | undefined
	for (const name of names.filter((name) => name > lastMigration)) {
		await sql.query(await readFile(resolve(migrationsPath, name, 'migration.sql'), 'utf8'))
		if (name === '20261026120000_ai_dialogue_illustration_style') {
			const chosenStyleDialogue = await sql.query(
				'INSERT INTO "AiDialogue" ("scenario_id", "user_id", "source_language_code", "target_language_code", "updated_at", "illustration_style_id") VALUES ($1, $2, \'en\', \'ru\', now(), \'watercolor\') RETURNING "id"',
				[ids[0], user.rows[0].id],
			)
			chosenStyleDialogueId = chosenStyleDialogue.rows[0].id
		}
	}
	const oldDialogue = await sql.query('SELECT "illustration_style_id" FROM "AiDialogue" WHERE "id" = $1', [
		dialogue.rows[0].id,
	])
	assert.equal(oldDialogue.rows[0].illustration_style_id, 'realism')
	const chosenStyleDialogue = await sql.query('SELECT "illustration_style_id" FROM "AiDialogue" WHERE "id" = $1', [
		chosenStyleDialogueId,
	])
	assert.equal(chosenStyleDialogue.rows[0].illustration_style_id, 'watercolor')
	const defaultStyleDialogue = await sql.query(
		'INSERT INTO "AiDialogue" ("scenario_id", "user_id", "source_language_code", "target_language_code", "updated_at") VALUES ($1, $2, \'en\', \'ru\', now()) RETURNING "illustration_style_id"',
		[ids[0], user.rows[0].id],
	)
	assert.equal(defaultStyleDialogue.rows[0].illustration_style_id, 'realism')

	return { userId: user.rows[0].id as number, dialogueId: dialogue.rows[0].id as number, scenarioIds: ids }
}

async function checkConstraints(sql: Client, userId: number, groupId: number) {
	const invalid = [
		[null, null, 'cover.webp', 'no-group'],
		[null, groupId, null, 'no-cover'],
		[null, groupId, '   ', 'blank-cover'],
		[null, groupId, 'cover.webp', null],
		[null, groupId, 'cover.webp', '   '],
		[userId, groupId, null, 'private-with-group'],
	]
	for (const values of invalid) {
		await assert.rejects(
			sql.query(
				'INSERT INTO "AiDialogueScenario" ("user_id", "group_id", "cover_s3_key", "slug", "title", "description", "system_prompt") VALUES ($1, $2, $3, $4, \'Title\', \'Description\', \'Prompt\')',
				values,
			),
			{ code: '23514' },
		)
	}
	await assert.rejects(sql.query('DELETE FROM "AiDialogueScenarioGroup" WHERE "id" = $1', [groupId]), {
		code: '23503',
	})
}

async function checkSynchronization(prisma: PrismaClient, userId: number) {
	const repository = new AiDialogueScenarioRepository(prisma as PrismaService)
	const handler = new CreateAiDialogueScenariosHandler(repository, config as MainConfigService)
	await handler.execute()
	const before = await prisma.aiDialogueScenario.findMany({ orderBy: { id: 'asc' } })
	await handler.execute()
	assert.deepEqual(await prisma.aiDialogueScenario.findMany({ orderBy: { id: 'asc' } }), before)
	assert.equal(await prisma.aiDialogueScenarioGroup.count(), 4)
	assert.equal(before.length, 12)
	assert.ok(before.every((row) => row.cover_s3_key === getPublicScenarioCoverKey('localdev', row.slug!)))
	const privateScenario = await repository.createScenario({
		userId,
		title: 'Private',
		description: 'Private description',
		systemPrompt: 'Private prompt',
	})
	assert.equal(privateScenario.group_id, null)
	assert.equal(privateScenario.cover_s3_key, null)
	const scenario = handler.getScenariosData()[0]
	await repository.synchronizePublicScenarios(
		aiDialogueScenarioGroups.map((group) => ({ ...group, title: 'Updated group title' })),
		[
			{
				...scenario,
				groupSlug: 'travel-abroad',
				title: 'Updated title',
				description: 'Updated description',
				systemPrompt: 'Updated prompt',
				coverS3Key: getPublicScenarioCoverKey('servermaster', scenario.slug),
			},
		],
	)
	const updated = await prisma.aiDialogueScenario.findUniqueOrThrow({
		where: { slug: scenario.slug },
		include: { group: true },
	})
	const originalScenario = before.find((row) => row.slug === scenario.slug)!
	assert.equal(updated.id, originalScenario.id)
	assert.equal(updated.created_at.toISOString(), originalScenario.created_at.toISOString())
	assert.equal(updated.title, 'Updated title')
	assert.equal(updated.description, 'Updated description')
	assert.equal(updated.system_prompt, 'Updated prompt')
	assert.equal(updated.group?.slug, 'travel-abroad')
	assert.equal(updated.group?.title, 'Updated group title')
	assert.equal(updated.cover_s3_key, getPublicScenarioCoverKey('servermaster', scenario.slug))
	await handler.execute()
	assert.deepEqual(await prisma.aiDialogueScenario.findUnique({ where: { id: privateScenario.id } }), privateScenario)
	// A colliding private slug must not be updated or made public; the whole transaction rolls back.
	await repository.createScenario({
		userId,
		slug: 'private-collision',
		title: 'Private collision',
		description: 'Private',
		systemPrompt: 'Private',
	})
	const log = console.error
	console.error = () => undefined
	try {
		await assert.rejects(
			repository.synchronizePublicScenarios(
				aiDialogueScenarioGroups.map((group) => ({ ...group, title: 'Must roll back' })),
				[{ ...scenario, slug: 'private-collision', coverS3Key: 'covers/unused.webp' }],
			),
		)
	} finally {
		console.error = log
	}
	assert.ok((await prisma.aiDialogueScenarioGroup.findMany()).every((group) => group.title !== 'Must roll back'))
	assert.equal(
		(await prisma.aiDialogueScenario.findUniqueOrThrow({ where: { slug: 'private-collision' } })).user_id,
		userId,
	)
}

async function checkGroups(prisma: PrismaClient) {
	await prisma.aiDialogueScenarioGroup.create({ data: { slug: 'empty', title: 'Empty group' } })
	const sameDate = new Date('2026-10-25T00:00:00Z')
	await prisma.aiDialogueScenarioGroup.updateMany({ data: { created_at: sameDate } })
	await prisma.aiDialogueScenario.updateMany({ where: { user_id: null }, data: { created_at: sameDate } })
	const repository = new AiDialogueScenarioGroupQueryRepository(
		prisma as PrismaService,
		storage as CloudflareS3Service,
	)
	const groups = await repository.getPublicScenarioGroups()
	assert.equal(groups.length, 4)
	assert.deepEqual(
		groups.map((group) => group.id),
		groups.map((group) => group.id).sort((a, b) => b - a),
	)
	assert.deepEqual(Object.fromEntries(groups.map((group) => [group.slug, group.scenarios.length])), {
		'home-and-everyday-life': 1,
		'city-and-services': 2,
		'food-and-shopping': 5,
		'travel-abroad': 4,
	})
	for (const group of groups) {
		assert.deepEqual(Object.keys(group).sort(), ['id', 'scenarios', 'slug', 'title'])
		const ids = group.scenarios.map((scenario) => scenario.id)
		assert.deepEqual(
			ids,
			[...ids].sort((a, b) => b - a),
		)
		for (const scenario of group.scenarios) {
			assert.deepEqual(Object.keys(scenario).sort(), ['coverUrl', 'description', 'id', 'slug', 'title'])
			assert.ok(scenario.coverUrl.includes(`/covers/localdev/${scenario.slug}.webp?signed=test`))
		}
	}
	const oldest = groups[0]
	await prisma.aiDialogueScenarioGroup.update({
		where: { id: oldest.id },
		data: { created_at: new Date('2020-01-01') },
	})
	const reordered = await repository.getPublicScenarioGroups()
	assert.equal(reordered.at(-1)?.id, oldest.id)
	const travel = groups.find((group) => group.slug === 'travel-abroad')!
	const scenario = travel.scenarios[0]
	await prisma.aiDialogueScenario.update({ where: { id: scenario.id }, data: { created_at: new Date('2020-01-01') } })
	const next = await repository.getPublicScenarioGroups()
	assert.equal(next.find((group) => group.slug === 'travel-abroad')?.scenarios.at(-1)?.id, scenario.id)
	return next
}

async function checkHttp(prisma: PrismaClient, expected: unknown) {
	const module = await Test.createTestingModule({ imports: [TestDependenciesModule, AiDialogueScenarioGroupModule] })
		.overrideProvider(PrismaService)
		.useValue(prisma)
		.compile()
	const app = module.createNestApplication({ logger: false })
	app.setGlobalPrefix('api')

	try {
		await app.listen(0, '127.0.0.1')
		const url = await app.getUrl()
		const response = await fetch(`${url}/api/ai-dialogue-scenario-group`)
		assert.equal(response.status, 200)
		assert.equal(response.headers.get('cache-control'), 'no-store')
		assert.deepEqual(await response.json(), expected)
		assert.equal((await fetch(`${url}/api/ai-dialogue-scenario`)).status, 404)
		const document = SwaggerModule.createDocument(app, new DocumentBuilder().build())
		assert.deepEqual(Object.keys(document.paths), ['/api/ai-dialogue-scenario-group'])
		const item = document.components?.schemas?.PublicAiDialogueScenarioOutModel as {
			required: string[]
			properties: Record<string, unknown>
		}
		assert.deepEqual([...item.required].sort(), ['coverUrl', 'description', 'id', 'slug', 'title'])
		assert.deepEqual(Object.keys(item.properties).sort(), ['coverUrl', 'description', 'id', 'slug', 'title'])
		const group = document.components?.schemas?.AiDialogueScenarioGroupOutModel as {
			properties: Record<string, unknown>
		}
		assert.deepEqual(Object.keys(group.properties).sort(), ['id', 'scenarios', 'slug', 'title'])
	} finally {
		await app.close()
	}
}

async function main() {
	const sql = new Client({ connectionString })
	const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) })
	await sql.connect()
	try {
		const original = await migrateWithExistingScenarios(sql)
		await checkSynchronization(prisma, original.userId)
		const group = await prisma.aiDialogueScenarioGroup.findFirstOrThrow()
		await checkConstraints(sql, original.userId, group.id)
		const dialogue = await prisma.aiDialogue.findUniqueOrThrow({ where: { id: original.dialogueId } })
		assert.equal(dialogue.scenario_id, original.scenarioIds[0])
		await checkHttp(prisma, await checkGroups(prisma))
		console.log(
			'Scenario groups: migrations, backfill, constraints, synchronization, private scenarios, ordering, HTTP and OpenAPI passed',
		)
	} finally {
		await prisma.$disconnect()
		await sql.end()
	}
}

void main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
