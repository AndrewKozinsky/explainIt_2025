import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class SentenceChatThreadRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getThreadById(id: number) {
		return this.prisma.sentenceChatThread.findUnique({ where: { id } })
	}

	@CatchDbError()
	async getThreadByUserAndSentence(dto: { userId: number; sentenceId: number }) {
		return this.prisma.sentenceChatThread.findUnique({
			where: {
				user_id_sentence_id: {
					user_id: dto.userId,
					sentence_id: dto.sentenceId,
				},
			},
		})
	}

	@CatchDbError()
	async createThread(dto: { userId: number; sentenceId: number }) {
		return this.prisma.sentenceChatThread.create({
			data: {
				user_id: dto.userId,
				sentence_id: dto.sentenceId,
			},
		})
	}

	@CatchDbError()
	async touchThread(threadId: number) {
		await this.prisma.sentenceChatThread.update({
			where: { id: threadId },
			data: { updated_at: new Date() },
		})
	}
}
