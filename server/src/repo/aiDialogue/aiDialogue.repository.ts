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

	/**
	 * Читает ключи изображений и удаляет принадлежащий пользователю диалог одной транзакцией.
	 * R2 вызывается только после её коммита; поздние файлы с новым namespace подхватит orphan scan.
	 * @returns Ключи исходников либо null, если диалог уже удалён или не принадлежит пользователю.
	 */
	async deleteDialogueAndGetImageKeys(id: number, userId: number): Promise<string[] | null> {
		return this.prisma.$transaction(async (tx) => {
			const images = await tx.aiDialogueImage.findMany({
				where: {
					OR: [
						{ character: { dialogue: { id, user_id: userId } } },
						{ message: { dialogue: { id, user_id: userId } } },
					],
				},
				select: { s3_key: true },
			})

			const deleted = await tx.aiDialogue.deleteMany({ where: { id, user_id: userId } })

			return deleted.count === 1 ? images.map((image) => image.s3_key) : null
		})
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
