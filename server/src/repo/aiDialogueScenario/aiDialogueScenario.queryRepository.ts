import { Injectable } from '@nestjs/common'
import { AiDialogueScenarioOutModel } from 'models/aiDialogueScenario/aiDialogueScenario.out.model'
import { Prisma } from 'prisma/generated/client'

type AiDialogueScenarioDb = Prisma.AiDialogueScenarioGetPayload<{}>

@Injectable()
export class AiDialogueScenarioQueryRepository {
	mapDbToOutModel(dbScenario: AiDialogueScenarioDb): AiDialogueScenarioOutModel {
		return {
			id: dbScenario.id,
			slug: dbScenario.slug,
			title: dbScenario.title,
			description: dbScenario.description,
		}
	}
}
