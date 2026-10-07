import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'

@Injectable()
export class ImageGenerationWorkerRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Читает актуальное состояние задания перед шагом worker или проверкой результата.
	 * @param id Идентификатор ImageGenerationJob в БД.
	 * @returns Задание либо null, если оно удалено или не существует.
	 */
	findJob(id: number) {
		return this.prisma.imageGenerationJob.findUnique({ where: { id } })
	}

	/**
	 * Переводит queued/waitingDependencies в ожидание референсов и обновляет время состояния.
	 * Не меняет generating/ready/failed и не восстанавливает удалённое задание.
	 * @param id Идентификатор ImageGenerationJob в БД.
	 */
	async waitForDependencies(id: number): Promise<void> {
		await this.prisma.imageGenerationJob.updateMany({
			where: { id, status: { in: ['queued', 'waitingDependencies'] } },
			data: { status: 'waitingDependencies', updated_at: new Date() },
		})
	}

	/**
	 * Записывает ошибку (до 1000 символов), увеличивает счётчик ошибок и обновляет время состояния.
	 * Сохраняет внешние реквизиты запроса; ready/failed и удалённые задания не изменяет.
	 * @param id Идентификатор ImageGenerationJob в БД.
	 * @param message Диагностическое сообщение без секретов и временных URL.
	 * @param terminal Нужно ли окончательно перевести задание в failed.
	 */
	async recordFailure(id: number, message: string, terminal: boolean): Promise<void> {
		await this.prisma.imageGenerationJob.updateMany({
			where: { id, status: { notIn: ['ready', 'failed'] } },
			data: {
				error: message.slice(0, 1000),
				attempts: { increment: 1 },
				updated_at: new Date(),
				...(terminal ? { status: 'failed' as const } : {}),
			},
		})
	}
}
