import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'

/** Генерация считается зависшей (процесс упал), если запись не обновлялась дольше этого времени. */
const STALE_GENERATION_MS = 2 * 60_000

type AudioPosition = { messageId: number; actionIndex: number }

@Injectable()
export class AiDialogueAudioRepository {
	constructor(private readonly prisma: PrismaService) {}

	/** Сообщение с владельцем диалога: по нему проверяется доступ и берётся озвучиваемый текст. */
	getMessageWithOwner(messageId: number) {
		return this.prisma.aiDialogueMessage.findUnique({
			where: { id: messageId },
			select: { id: true, dialogue_id: true, type: true, payload: true, dialogue: { select: { user_id: true } } },
		})
	}

	getVoice(dialogueId: number, npcId: string) {
		return this.prisma.aiDialogueVoice.findUnique({
			where: { dialogue_id_npc_id: { dialogue_id: dialogueId, npc_id: npcId } },
		})
	}

	getAudio({ messageId, actionIndex }: AudioPosition) {
		return this.prisma.aiDialogueAudio.findUnique({
			where: { message_id_action_index: { message_id: messageId, action_index: actionIndex } },
		})
	}

	/**
	 * Резервирует генерацию озвучки реплики. Возвращает запись и признак, что генерировать должен этот запрос.
	 * Запрос получает право на генерацию, если записи не было, прошлая генерация завершилась ошибкой
	 * или зависла. Иначе вызывающий отдаёт готовый файл либо ждёт параллельный запрос.
	 */
	async claim(position: AudioPosition, s3Key: string) {
		const created = await this.prisma.aiDialogueAudio.createMany({
			data: [{ message_id: position.messageId, action_index: position.actionIndex, s3_key: s3Key }],
			skipDuplicates: true,
		})

		const audio = await this.getAudio(position)
		if (!audio) return { audio: null, isClaimed: false }
		if (created.count === 1) return { audio, isClaimed: true }

		const retaken = await this.prisma.aiDialogueAudio.updateMany({
			where: {
				id: audio.id,
				OR: [
					{ status: 'failed' },
					{ status: 'generating', updated_at: { lt: new Date(Date.now() - STALE_GENERATION_MS) } },
				],
			},
			// updated_at в схеме не обновляется автоматически: по нему определяется зависшая генерация.
			data: { status: 'generating', updated_at: new Date() },
		})

		return { audio, isClaimed: retaken.count === 1 }
	}

	setStatus(audioId: number, status: 'ready' | 'failed') {
		return this.prisma.aiDialogueAudio.update({ where: { id: audioId }, data: { status, updated_at: new Date() } })
	}
}
