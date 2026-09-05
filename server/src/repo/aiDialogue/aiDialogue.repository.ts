import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class AiDialogueRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createDialogue(dto: {
		userId: number
		scenarioId: number
		sourceLanguageCode: Language
		targetLanguageCode: Language
	}) {
		return this.prisma.aiDialogue.create({
			data: {
				user_id: dto.userId,
				scenario_id: dto.scenarioId,
				source_language_code: dto.sourceLanguageCode,
				target_language_code: dto.targetLanguageCode,
			},
		})
	}

	@CatchDbError()
	async getDialogueById(id: number) {
		return this.prisma.aiDialogue.findUnique({ where: { id } })
	}

	@CatchDbError()
	async deleteDialogueById(id: number) {
		return this.prisma.aiDialogue.delete({ where: { id } })
	}

	// Обновляет компактную сводку диалога. summary — JSON-строка (массив блоков
	// { state, history }), summaryUpTo — id последнего покрытого сводкой сообщения.
	@CatchDbError()
	async updateSummary(id: number, dto: { summary: string; summaryUpTo: number }) {
		return this.prisma.aiDialogue.update({
			where: { id },
			data: {
				summary: dto.summary,
				summary_up_to: dto.summaryUpTo,
			},
		})
	}
}
