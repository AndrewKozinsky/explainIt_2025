import { Injectable } from '@nestjs/common'
import { AiDialogueScenarioQueryRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.queryRepository'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'
import { Prisma } from 'prisma/generated/client'

type AiDialogueDb = Prisma.AiDialogueGetPayload<{ include: { scenario: true } }>

@Injectable()
export class AiDialogueQueryRepository {
	constructor(
		private prisma: PrismaService,
		private aiDialogueScenarioQueryRepository: AiDialogueScenarioQueryRepository,
	) {}

	@CatchDbError()
	async getUserDialogues(userId: number): Promise<AiDialogueOutModel[]> {
		const dialogues = await this.prisma.aiDialogue.findMany({
			where: { user_id: userId },
			include: { scenario: true },
			orderBy: { id: 'desc' },
		})

		return dialogues.map((dialogue) => this.mapDbToOutModel(dialogue))
	}

	@CatchDbError()
	async getDialogueById(id: number): Promise<null | AiDialogueOutModel> {
		const dialogue = await this.prisma.aiDialogue.findUnique({
			where: { id },
			include: { scenario: true },
		})
		if (!dialogue) return null

		return this.mapDbToOutModel(dialogue)
	}

	mapDbToOutModel(dbDialogue: AiDialogueDb): AiDialogueOutModel {
		return {
			id: dbDialogue.id,
			scenario: this.aiDialogueScenarioQueryRepository.mapDbToOutModel(dbDialogue.scenario),
			createdAt: dbDialogue.created_at.toISOString(),
			updatedAt: dbDialogue.updated_at.toISOString(),
		}
	}
}
