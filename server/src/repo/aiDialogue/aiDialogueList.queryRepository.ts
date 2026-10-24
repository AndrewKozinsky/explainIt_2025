import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { AiDialoguesPageOutModel } from 'models/aiDialogue/aiDialogueList.out.model'
import { mapAiDialogueListPage, readAiDialogueListPage } from './aiDialogueList.queryRepository.helpers'
import type { PaginationParams } from 'types/pagination'

@Injectable()
export class AiDialogueListQueryRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly storage: CloudflareS3Service,
	) {}

	/** Возвращает страницу пользователя с NPC только каждого конкретного диалога, независимо от сценария. */
	@CatchDbError()
	async getUserDialogues(userId: number, pagination: PaginationParams): Promise<AiDialoguesPageOutModel> {
		const snapshot = await this.prisma.$transaction((tx) => readAiDialogueListPage(tx, userId, pagination), {
			isolationLevel: 'RepeatableRead',
		})

		return mapAiDialogueListPage(snapshot, pagination, (key) => this.storage.getFileUrl(key))
	}
}
