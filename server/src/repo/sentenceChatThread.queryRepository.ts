import { Injectable } from '@nestjs/common'
import { SentenceChatMessageOutModel } from 'models/sentenceChat/sentenceChatMessage.out.model'
import { SentenceChatThreadOutModel } from 'models/sentenceChat/sentenceChatThread.out.model'
import { SentenceChatMessage } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class SentenceChatThreadQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getThreadWithMessagesByUserAndSentence(dto: {
		userId: number
		sentenceId: number
	}): Promise<null | SentenceChatThreadOutModel> {
		const thread = await this.prisma.sentenceChatThread.findUnique({
			where: {
				user_id_sentence_id: {
					user_id: dto.userId,
					sentence_id: dto.sentenceId,
				},
			},
			include: {
				SentenceChatMessage: {
					orderBy: { id: 'asc' },
				},
			},
		})

		if (!thread) return null

		return {
			id: thread.id,
			sentenceId: thread.sentence_id,
			messages: thread.SentenceChatMessage.map((m) => this.mapDbMessageToOutModel(m)),
			createdAt: thread.created_at.toISOString(),
			updatedAt: thread.updated_at.toISOString(),
		}
	}

	@CatchDbError()
	async getThreadById(threadId: number): Promise<null | SentenceChatThreadOutModel> {
		const thread = await this.prisma.sentenceChatThread.findUnique({
			where: { id: threadId },
			include: {
				SentenceChatMessage: {
					orderBy: { id: 'asc' },
				},
			},
		})

		if (!thread) return null

		return {
			id: thread.id,
			sentenceId: thread.sentence_id,
			messages: thread.SentenceChatMessage.map((m) => this.mapDbMessageToOutModel(m)),
			createdAt: thread.created_at.toISOString(),
			updatedAt: thread.updated_at.toISOString(),
		}
	}

	@CatchDbError()
	async getMessageById(messageId: number): Promise<null | SentenceChatMessageOutModel> {
		const message = await this.prisma.sentenceChatMessage.findUnique({ where: { id: messageId } })
		if (!message) return null

		return this.mapDbMessageToOutModel(message)
	}

	private mapDbMessageToOutModel(dbMessage: SentenceChatMessage): SentenceChatMessageOutModel {
		return {
			id: dbMessage.id,
			threadId: dbMessage.thread_id,
			role: dbMessage.role,
			content: dbMessage.content,
			status: dbMessage.status,
			errorMessage: dbMessage.error_message ?? null,
			createdAt: dbMessage.created_at.toISOString(),
			updatedAt: dbMessage.updated_at.toISOString(),
		}
	}
}
