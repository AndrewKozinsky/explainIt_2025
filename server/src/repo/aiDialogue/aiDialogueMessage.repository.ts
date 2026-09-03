import { Injectable } from '@nestjs/common'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class AiDialogueMessageRepository {
	constructor(private prisma: PrismaService) {}

	// Сохраняет одно событие диалога. Дискриминатор `type` ложится в одноимённую
	// колонку, тело события (без `type`) — в payload как JSON-строка. Возвращает
	// строку БД вместе с назначенным сервером id и created_at.
	@CatchDbError()
	async createMessage(dto: { dialogueId: number; event: AiDialogueEvent }) {
		const { type, ...payload } = dto.event
		return this.prisma.aiDialogueMessage.create({
			data: {
				dialogue_id: dto.dialogueId,
				type,
				payload: JSON.stringify(payload),
			},
		})
	}
}
