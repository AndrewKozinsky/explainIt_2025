import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import type { Flux3Request } from 'infrastructure/fluxImageGeneration/flux3Image.adapter'

@Injectable()
export class ImageGenerationRequestRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Возвращает задание генерации вместе с сохранёнными реквизитами внешнего запроса.
	 *
	 * @param id Идентификатор ImageGenerationJob в БД.
	 * @throws Ошибка Prisma, если задание не найдено или чтение не удалось.
	 */
	getJob(id: number) {
		return this.prisma.imageGenerationJob.findUniqueOrThrow({ where: { id } })
	}

	/**
	 * Атомарно резервирует отправку запроса, переводя задание в generating.
	 * Допускает только queued или waitingDependencies с пустыми внешними реквизитами.
	 * Вызывающий код должен предварительно проверить готовность зависимостей.
	 *
	 * @param id Идентификатор ImageGenerationJob в БД.
	 * @returns true, если отправка зарезервирована; false, если задание отсутствует
	 * или уже не соответствует условиям. При false отправлять запрос нельзя.
	 */
	async claimSubmission(id: number): Promise<boolean> {
		const result = await this.prisma.imageGenerationJob.updateMany({
			where: {
				id,
				status: { in: ['queued', 'waitingDependencies'] },
				provider_request_id: null,
				provider_polling_url: null,
			},
			data: { status: 'generating' },
		})
		return result.count === 1
	}

	/**
	 * Атомарно сохраняет ID и polling URL принятого запроса BFL для продолжения генерации.
	 * Обновляет только generating с пустыми внешними реквизитами, не перезаписывая
	 * существующий запрос и не восстанавливая удалённое задание.
	 *
	 * @param id Идентификатор ImageGenerationJob в БД.
	 * @param request Реквизиты, возвращённые BFL после отправки запроса.
	 * @throws Если задание отсутствует, имеет другой статус или реквизиты уже записаны.
	 * Ошибка сохранения не означает отказ BFL: повторный POST может создать дубликат.
	 */
	async saveRequest(id: number, request: Flux3Request): Promise<void> {
		const result = await this.prisma.imageGenerationJob.updateMany({
			where: { id, status: 'generating', provider_request_id: null, provider_polling_url: null },
			data: { provider_request_id: request.requestId, provider_polling_url: request.pollingUrl },
		})

		if (result.count !== 1) throw new Error('Image generation job deleted or request already recorded')
	}
}
