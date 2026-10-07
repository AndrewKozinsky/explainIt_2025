import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import type { Prisma } from 'prisma/generated/client'

const images = {
	orderBy: { id: 'desc' as const },
	take: 1,
	select: { id: true, s3_key: true, mime_type: true, width: true, height: true, layout_version: true },
}

const jobs = { orderBy: { id: 'desc' as const }, take: 1, select: { status: true } }

const visualSelection = {
	id: true,
	user_id: true,
	AiDialogueCharacter: {
		orderBy: { id: 'asc' },
		select: {
			id: true,
			npc_id: true,
			name: true,
			role: true,
			AiDialogueImage: { ...images, where: { type: 'emotionSheet' } },
			ImageGenerationJob: { ...jobs, where: { type: 'emotionSheet' } },
		},
	},
	AiDialogueMessage: {
		where: { type: 'sceneUpdate' },
		orderBy: { id: 'asc' },
		select: {
			id: true,
			AiDialogueImage: { ...images, where: { type: 'scene' } },
			ImageGenerationJob: { ...jobs, where: { type: 'scene' } },
		},
	},
} as const satisfies Prisma.AiDialogueSelect

@Injectable()
export class AiDialogueVisualsRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Читает владельца и визуальное состояние в RepeatableRead, не смешивая ready с файлом другого снимка БД.
	 * До подписания ссылок и выдачи данных вызывающий код должен проверить user_id.
	 */
	getDialogueVisuals(id: number) {
		return this.prisma.$transaction((tx) => tx.aiDialogue.findUnique({ where: { id }, select: visualSelection }), {
			isolationLevel: 'RepeatableRead',
		})
	}

	/** Читает владельца завершённой генерации для SSE; null означает удалённую или ещё не завершённую цель. */
	async getCompletedJobDialogueId(id: number): Promise<number | null> {
		const job = await this.prisma.imageGenerationJob.findUnique({
			where: { id },
			select: {
				status: true,
				character: { select: { dialogue_id: true } },
				message: { select: { dialogue_id: true } },
			},
		})
		if (!job || !['ready', 'failed'].includes(job.status)) return null
		return job.character?.dialogue_id ?? job.message?.dialogue_id ?? null
	}
}
