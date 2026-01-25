import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class SubtitleSentenceInitRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createMany(dto: {
		items: Array<{
			subtitleId: number
			sentenceId: number
			startOffset: number
			length: number
		}>
	}) {
		if (dto.items.length === 0) return 0

		const res = await this.prisma.subtitleSentenceInit.createMany({
			data: dto.items.map((item) => ({
				subtitle_id: item.subtitleId,
				sentence_id: item.sentenceId,
				start_offset: item.startOffset,
				length: item.length,
			})),
		})

		return res.count
	}

	@CatchDbError()
	async deleteByVideoPrivateId(videoPrivateId: number): Promise<number> {
		const res = await this.prisma.subtitleSentenceInit.deleteMany({
			where: { subtitle: { video_private_id: videoPrivateId } },
		})

		return res.count
	}
}
