import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { AiDialogueScenarioOutModel } from 'models/aiDialogueScenario/aiDialogueScenario.out.model'
import { Prisma } from 'prisma/generated/client'

type AiDialogueScenarioDb = Prisma.AiDialogueScenarioGetPayload<{}>

@Injectable()
export class AiDialogueScenarioQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getPublicScenarios(): Promise<AiDialogueScenarioOutModel[]> {
		const scenarios = await this.prisma.aiDialogueScenario.findMany({
			where: { user_id: null },
			orderBy: { id: 'asc' },
		})

		return scenarios.map((scenario) => this.mapDbToOutModel(scenario))
	}

	mapDbToOutModel(dbScenario: AiDialogueScenarioDb): AiDialogueScenarioOutModel {
		return {
			id: dbScenario.id,
			slug: dbScenario.slug,
			title: dbScenario.title,
			description: dbScenario.description,
			languageCode: dbScenario.language_code,
		}
	}
}
