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
	 * Пытается начать генерацию озвучки реплики. Сначала создаёт запись в статусе generating.
	 * Если запись уже есть, перезапускает генерацию только после прошлой ошибки или зависания.
	 * shouldGenerate = true: этот запрос должен синтезировать файл. Иначе файл уже готов
	 * (status = ready) или его прямо сейчас синтезирует параллельный запрос.
	 */
	async startGenerationIfNeeded(position: AudioPosition, s3Key: string) {
		const insertResult = await this.prisma.aiDialogueAudio.createMany({
			data: [{ message_id: position.messageId, action_index: position.actionIndex, s3_key: s3Key }],
			skipDuplicates: true,
		})
		const isNewAudio = insertResult.count === 1

		const audio = await this.getAudio(position)
		if (!audio) return { audio: null, shouldGenerate: false }
		if (isNewAudio) return { audio, shouldGenerate: true }

		const restartResult = await this.prisma.aiDialogueAudio.updateMany({
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

		return { audio, shouldGenerate: restartResult.count === 1 }
	}

	setStatus(audioId: number, status: 'ready' | 'failed') {
		return this.prisma.aiDialogueAudio.update({ where: { id: audioId }, data: { status, updated_at: new Date() } })
	}
}
