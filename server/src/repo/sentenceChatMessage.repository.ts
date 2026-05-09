import { Injectable } from '@nestjs/common'
import { SentenceChatMessageRole, SentenceChatMessageStatus } from 'prisma/generated/enums'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class SentenceChatMessageRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getMessageById(id: number) {
		return this.prisma.sentenceChatMessage.findUnique({ where: { id } })
	}

	@CatchDbError()
	async getMessagesByThreadId(threadId: number) {
		return this.prisma.sentenceChatMessage.findMany({
			where: { thread_id: threadId },
			orderBy: { id: 'asc' },
		})
	}

	@CatchDbError()
	async getLastMessageInThread(threadId: number) {
		return this.prisma.sentenceChatMessage.findFirst({
			where: { thread_id: threadId },
			orderBy: { id: 'desc' },
		})
	}

	// Возвращает последние N сообщений в хронологическом порядке (для контекста диалога).
	@CatchDbError()
	async getLastMessagesByThreadId(threadId: number, limit: number) {
		const rows = await this.prisma.sentenceChatMessage.findMany({
			where: { thread_id: threadId },
			orderBy: { id: 'desc' },
			take: limit,
		})
		return rows.reverse()
	}

	@CatchDbError()
	async createMessage(dto: {
		threadId: number
		role: SentenceChatMessageRole
		content: string
		status: SentenceChatMessageStatus
	}) {
		return this.prisma.sentenceChatMessage.create({
			data: {
				thread_id: dto.threadId,
				role: dto.role,
				content: dto.content,
				status: dto.status,
			},
		})
	}

	@CatchDbError()
	async updateMessage(
		id: number,
		dto: {
			content?: string
			status?: SentenceChatMessageStatus
			errorMessage?: null | string
		},
	) {
		return this.prisma.sentenceChatMessage.update({
			where: { id },
			data: {
				...(dto.content !== undefined ? { content: dto.content } : {}),
				...(dto.status !== undefined ? { status: dto.status } : {}),
				...(dto.errorMessage !== undefined ? { error_message: dto.errorMessage } : {}),
			},
		})
	}

	@CatchDbError()
	async hasActiveStreamingMessageForUser(userId: number): Promise<boolean> {
		const found = await this.prisma.sentenceChatMessage.findFirst({
			where: {
				status: 'streaming',
				thread: { user_id: userId },
			},
			select: { id: true },
		})
		return !!found
	}

	@CatchDbError()
	async markAllStreamingAsFailedForUser(userId: number, errorText: string) {
		await this.prisma.sentenceChatMessage.updateMany({
			where: {
				status: 'streaming',
				thread: { user_id: userId },
			},
			data: {
				status: 'failed',
				error_message: errorText,
			},
		})
	}
}
