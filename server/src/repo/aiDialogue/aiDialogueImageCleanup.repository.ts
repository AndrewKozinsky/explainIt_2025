import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'

@Injectable()
export class AiDialogueImageCleanupRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Проверяет привязку файла, исходное активное задание и использование ключа в активных снимках референсов.
	 * RepeatableRead не допускает смешать отсутствие ассета до коммита со статусом ready после него.
	 * Проверка input.contains консервативна: лишнее совпадение сохраняет файл, но никогда не разрешает удаление.
	 * @param key Проверенный ключ уникального исходника приложения.
	 * @param jobId Идентификатор из пути объекта.
	 */
	isGeneratedImageInUse(key: string, jobId: number): Promise<boolean> {
		return this.prisma.$transaction(
			async (tx) => {
				if (await tx.aiDialogueImage.findUnique({ where: { s3_key: key }, select: { id: true } })) return true
				const activeStatuses = ['queued', 'waitingDependencies', 'generating'] as const
				const job = await tx.imageGenerationJob.findUnique({ where: { id: jobId }, select: { status: true } })
				if (job && activeStatuses.some((status) => status === job.status)) return true
				return Boolean(
					await tx.imageGenerationJob.findFirst({
						where: { status: { in: [...activeStatuses] }, input: { contains: key } },
						select: { id: true },
					}),
				)
			},
			{ isolationLevel: 'RepeatableRead' },
		)
	}
}
