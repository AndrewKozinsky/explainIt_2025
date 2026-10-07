import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import { ImageGenerationJob } from 'prisma/generated/client'

export type PublishedDialogueImage = {
	s3Key: string
	mime: string
	width: number
	height: number
	layoutVersion: string | null
}

@Injectable()
export class ImageGenerationAssetsRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Читает задание для проверки актуального статуса перед публикацией в R2.
	 * @param id Идентификатор ImageGenerationJob в БД.
	 * @returns Задание либо null, если оно не существует.
	 */
	findJob(id: number) {
		return this.prisma.imageGenerationJob.findUnique({ where: { id } })
	}

	/**
	 * Проверяет привязку объекта R2 к изображению, в том числе после потери ответа коммита.
	 * @param s3Key Уникальный ключ объекта внутри бакета R2.
	 * @returns Запись AiDialogueImage либо null, если объект не привязан.
	 */
	findImage(s3Key: string) {
		return this.prisma.aiDialogueImage.findUnique({ where: { s3_key: s3Key } })
	}

	/**
	 * Читает тип сообщения и его диалог для проверки владельца сцены; сам тип здесь не фильтруется.
	 * @param id Идентификатор AiDialogueMessage.
	 * @returns Поля владельца либо null, если сообщение не существует.
	 */
	findSceneMessage(id: number) {
		return this.prisma.aiDialogueMessage.findUnique({ where: { id }, select: { dialogue_id: true, type: true } })
	}

	/**
	 * Загружает NPC только из указанного диалога вместе со спрайтами и статусами их генерации.
	 * Спрайты упорядочены от новых к старым; порядок самих NPC не гарантируется.
	 * @param dialogueId Диалог, которому должны принадлежать участники.
	 * @param ids Сохранённые идентификаторы AiDialogueCharacter из снимка задания сцены.
	 */
	findCharacters(dialogueId: number, ids: number[]) {
		return this.prisma.aiDialogueCharacter.findMany({
			where: { dialogue_id: dialogueId, id: { in: ids } },
			include: {
				AiDialogueImage: { where: { type: 'emotionSheet' }, orderBy: { id: 'desc' } },
				ImageGenerationJob: { where: { type: 'emotionSheet' }, select: { status: true } },
			},
		})
	}

	/**
	 * Одной транзакцией создаёт AiDialogueImage и переводит существующее задание generating в ready.
	 * Условное обновление блокирует строку и проверяет прежнего владельца, защищая от повторной публикации.
	 * @param job Прочитанное задание с идентификаторами владельца и типом изображения.
	 * @param image Метаданные уже загруженного и проверенного объекта R2.
	 * @returns true при публикации; false, если задание удалено, сменило владельца или уже не generating.
	 * @throws Ошибка Prisma при неудачной транзакции; она не доказывает отсутствие коммита при потере соединения.
	 */
	async saveImageAndMarkJobReady(job: ImageGenerationJob, image: PublishedDialogueImage): Promise<boolean> {
		return this.prisma.$transaction(async (tx) => {
			const result = await tx.imageGenerationJob.updateMany({
				where: { id: job.id, status: 'generating', character_id: job.character_id, message_id: job.message_id },
				data: { status: 'ready', error: null, updated_at: new Date() },
			})
			if (result.count !== 1) return false
			await tx.aiDialogueImage.create({
				data: {
					character_id: job.character_id,
					message_id: job.message_id,
					type: job.type,
					layout_version: image.layoutVersion,
					s3_key: image.s3Key,
					mime_type: image.mime,
					width: image.width,
					height: image.height,
				},
			})
			return true
		})
	}
}
