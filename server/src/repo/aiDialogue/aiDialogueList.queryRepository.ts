import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
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

	/**
	 * Возвращает страницу пользователя с NPC только каждого конкретного диалога, независимо от сценария.
	 * @param locale язык интерфейса, на котором возвращаются названия сценариев.
	 */
	@CatchDbError()
	async getUserDialogues(
		userId: number,
		pagination: PaginationParams,
		locale: Language,
	): Promise<AiDialoguesPageOutModel> {
		const snapshot = await this.prisma.$transaction((tx) => readAiDialogueListPage(tx, userId, pagination), {
			isolationLevel: 'RepeatableRead',
		})

		return mapAiDialogueListPage(snapshot, pagination, (key) => this.storage.getFileUrl(key), locale)
	}
}
