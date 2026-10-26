import 'reflect-metadata'
import assert = require('node:assert/strict')
import { writeFile } from 'node:fs/promises'
import { ExecutionContext, ValidationPipe } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Test } from '@nestjs/testing'
import { CreateAiDialogueHandler } from '../src/features/aiDialogue/CreateAiDialogue.command'
import { GetAiDialogueIllustrationStylesHandler } from '../src/features/aiDialogue/illustrationStyles/GetAiDialogueIllustrationStyles.command'
import { CloudflareS3Service } from '../src/infrastructure/cloudflareS3/cloudflareS3.service'
import { GlobalExceptionFilter } from '../src/infrastructure/exceptions/global-exception.filter'
import { CheckSessionCookieGuard } from '../src/infrastructure/guards/checkSessionCookie.guard'
import { MainConfigService } from '../src/infrastructure/mainConfig/mainConfig.service'
import { AiDialogueQueryRepository } from '../src/repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from '../src/repo/aiDialogue/aiDialogue.repository'
import { AiDialogueScenarioRepository } from '../src/repo/aiDialogueScenario/aiDialogueScenario.repository'
import { AiDialogueController } from '../src/routes/aiDialogue/aiDialogue.controller'

// Real HTTP, controller, CQRS, DTO validation and OpenAPI. No AppModule, DB, R2 or paid generators.
async function main() {
	const saved: Record<string, unknown>[] = []
	const module = await Test.createTestingModule({
		imports: [CqrsModule],
		controllers: [AiDialogueController],
		providers: [
			GetAiDialogueIllustrationStylesHandler,
			CreateAiDialogueHandler,
			{ provide: MainConfigService, useValue: { get: () => ({ mode: 'localdev' }) } },
			{
				provide: CloudflareS3Service,
				useValue: { getFileUrl: async (key: string) => `https://signed.example/${key}` },
			},
			{ provide: AiDialogueScenarioRepository, useValue: { getScenarioById: async () => ({ user_id: null }) } },
			{
				provide: AiDialogueRepository,
				useValue: {
					createDialogue: async (dto: Record<string, unknown>) => {
						saved.push(dto)
						return { id: saved.length }
					},
				},
			},
			{
				provide: AiDialogueQueryRepository,
				useValue: {
					getDialogueById: async (id: number) => ({ id, ...saved[id - 1] }),
				},
			},
		],
	})
		.overrideGuard(CheckSessionCookieGuard)
		.useValue({
			canActivate(context: ExecutionContext) {
				const request = context.switchToHttp().getRequest()
				if (request.headers['x-test-user'] !== '7') return false
				request.user = { id: 7 }
				return true
			},
		})
		.compile()

	const app = module.createNestApplication({ logger: false })

	app.setGlobalPrefix('api')
	app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
	app.useGlobalFilters(new GlobalExceptionFilter())
	try {
		await app.listen(0, '127.0.0.1')
		const url = await app.getUrl()
		const response = await fetch(`${url}/api/ai-dialogue/illustration-styles`)
		assert.equal(response.status, 200)
		assert.equal(response.headers.get('cache-control'), 'no-store')
		const catalog = (await response.json()) as {
			defaultStyleId: string
			styles: { id: string; titleKey: string; previewUrl: string }[]
		}
		assert.equal(catalog.defaultStyleId, 'realism')
		assert.deepEqual(
			catalog.styles.map((style) => style.id),
			['realism', 'drawing', 'watercolor'],
		)
		assert.ok(catalog.styles.every((style) => style.previewUrl.includes('/styles/localdev/')))
		assert.ok(catalog.styles.every((style) => style.titleKey === `aiDialogue.illustrationStyles.${style.id}`))

		async function create(extra: Record<string, unknown>, authenticated = true) {
			return fetch(`${url}/api/ai-dialogue`, {
				method: 'POST',
				headers: { 'content-type': 'application/json', ...(authenticated ? { 'x-test-user': '7' } : {}) },
				body: JSON.stringify({ scenarioId: 1, sourceLanguageCode: 'en', targetLanguageCode: 'ru', ...extra }),
			})
		}

		assert.equal((await create({}, false)).status, 403)

		for (const style of ['realism', 'drawing', 'watercolor', undefined]) {
			const created = await create(style ? { illustrationStyleId: style } : {})
			assert.equal(created.status, 201)
			const body = (await created.json()) as { illustrationStyleId: string }
			assert.equal(body.illustrationStyleId, style ?? 'realism')
		}

		for (const illustrationStyleId of ['unknown', 'legacy', '../photo.webp', 5]) {
			assert.equal((await create({ illustrationStyleId })).status, 400)
		}
		assert.equal(saved.length, 4)
		const patch = await fetch(`${url}/api/ai-dialogue/1`, {
			method: 'PATCH',
			headers: { 'content-type': 'application/json', 'x-test-user': '7' },
			body: JSON.stringify({ illustrationStyleId: 'drawing' }),
		})
		assert.equal(patch.status, 400)

		const document = SwaggerModule.createDocument(app, new DocumentBuilder().build())
		const schemas = document.components!.schemas! as Record<
			string,
			{ required?: string[]; properties: Record<string, { type?: string; enum?: string[] }> }
		>
		assert.ok(document.paths['/api/ai-dialogue/illustration-styles'].get)
		assert.equal(schemas.CreateAiDialogueInput.properties.illustrationStyleId.type, 'string')
		assert.equal(schemas.CreateAiDialogueInput.properties.illustrationStyleId.enum, undefined)
		assert.ok(!schemas.CreateAiDialogueInput.required?.includes('illustrationStyleId'))
		assert.ok(schemas.AiDialogueOutModel.required?.includes('illustrationStyleId'))
		assert.deepEqual(Object.keys(schemas.AiDialogueIllustrationStyleOutModel.properties).sort(), [
			'id',
			'previewUrl',
			'titleKey',
		])
		if (process.env.AI_DIALOGUE_OPENAPI_OUTPUT) {
			await writeFile(process.env.AI_DIALOGUE_OPENAPI_OUTPUT, JSON.stringify(document))
		}
		console.log(
			'Illustration styles: public HTTP, CQRS, creation, default, validation, immutable selection and OpenAPI passed',
		)
	} finally {
		await app.close()
	}
}
main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
