import { Injectable } from '@nestjs/common'
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

const scenarioSelect = { id: true, slug: true, title: true, description: true, cover_s3_key: true } as const
type PublicScenarioDb = Prisma.AiDialogueScenarioGetPayload<{ select: typeof scenarioSelect }>

@Injectable()
export class AiDialogueScenarioGroupQueryRepository {
	constructor(
		private prisma: PrismaService,
		private storage: CloudflareS3Service,
	) {}

	async getPublicScenarioGroups(): Promise<AiDialogueScenarioGroupOutModel[]> {
		const groups = await this.getDbGroups()

		return Promise.all(
			groups.map(async (group) => ({
				id: group.id,
				slug: group.slug,
				title: group.title,
				scenarios: await Promise.all(
					group.AiDialogueScenario.map((scenario) => this.mapPublicScenario(scenario)),
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
				AiDialogueScenario: {
					where: { user_id: null },
					orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
					select: scenarioSelect,
				},
			},
		})
	}

	private async mapPublicScenario(scenario: PublicScenarioDb): Promise<PublicAiDialogueScenarioOutModel> {
		if (!scenario.slug || !scenario.cover_s3_key) {
			throw new CustomError(
				errorMessage.aiDialogue.invalidPublicScenario,
				ErrorStatusCode.InternalServerError_500,
			)
		}

		return {
			id: scenario.id,
			slug: scenario.slug,
			title: scenario.title,
			description: scenario.description,
			coverUrl: await this.storage.getFileUrl(scenario.cover_s3_key),
		}
	}
}
