import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { pickLocalized } from 'utils/pickLocalized'
import { AiDialogueScenarioOutModel } from 'models/aiDialogueScenario/aiDialogueScenario.out.model'
import { Prisma } from 'prisma/generated/client'

type AiDialogueScenarioDb = Prisma.AiDialogueScenarioGetPayload<{}>

@Injectable()
export class AiDialogueScenarioQueryRepository {
	/** @param locale язык интерфейса, на котором возвращаются название и описание. */
	mapDbToOutModel(dbScenario: AiDialogueScenarioDb, locale: Language): AiDialogueScenarioOutModel {
		return {
			id: dbScenario.id,
			slug: dbScenario.slug,
			title: pickLocalized(dbScenario.title, locale),
			description: pickLocalized(dbScenario.description, locale),
		}
	}
}
