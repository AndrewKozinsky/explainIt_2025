import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { pickLocalized } from 'utils/pickLocalized'
import { PrismaService } from 'db/prisma.service'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import {
	AiDialogueScenarioGroupOutModel,
	PublicAiDialogueScenarioOutModel,
} from 'models/aiDialogueScenarioGroup/aiDialogueScenarioGroup.out.model'
import { Prisma } from 'prisma/generated/client'

const scenarioSelect = {
	id: true,
	slug: true,
	title: true,
	description: true,
	user_scenario_amendment_hint: true,
	cover_s3_key: true,
} as const
type PublicScenarioDb = Prisma.AiDialogueScenarioGetPayload<{ select: typeof scenarioSelect }>

@Injectable()
export class AiDialogueScenarioGroupQueryRepository {
	constructor(
		private prisma: PrismaService,
		private storage: CloudflareS3Service,
	) {}

	/** @param locale язык интерфейса, на котором возвращаются названия и описания групп и сценариев. */
	async getPublicScenarioGroups(locale: Language): Promise<AiDialogueScenarioGroupOutModel[]> {
		const groups = await this.getDbGroups()

		return Promise.all(
			groups.map(async (group) => ({
				id: group.id,
				slug: group.slug,
				title: pickLocalized(group.title, locale),
				description: pickLocalized(group.description, locale),
				scenarios: await Promise.all(
					group.AiDialogueScenario.map((scenario) => this.mapPublicScenario(scenario, locale)),
				),
			})),
		)
	}

	/** Обрабатывает ошибки только чтения БД, сохраняя CustomError последующего маппинга. */
	@CatchDbError()
	private async getDbGroups() {
		return this.prisma.aiDialogueScenarioGroup.findMany({
			where: { AiDialogueScenario: { some: { user_id: null } } },
			orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
			select: {
				id: true,
				slug: true,
				title: true,
				description: true,
				AiDialogueScenario: {
					where: { user_id: null },
					orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
					select: scenarioSelect,
				},
			},
		})
	}

	private async mapPublicScenario(
		scenario: PublicScenarioDb,
		locale: Language,
	): Promise<PublicAiDialogueScenarioOutModel> {
		if (!scenario.slug || !scenario.cover_s3_key) {
			throw new CustomError(
				errorMessage.aiDialogue.invalidPublicScenario,
				ErrorStatusCode.InternalServerError_500,
			)
		}

		return {
			id: scenario.id,
			slug: scenario.slug,
			title: pickLocalized(scenario.title, locale),
			description: pickLocalized(scenario.description, locale),
			userScenarioAmendmentHint: scenario.user_scenario_amendment_hint
				? pickLocalized(scenario.user_scenario_amendment_hint, locale)
				: null,
			coverUrl: await this.storage.getFileUrl(scenario.cover_s3_key),
		}
	}
}
