import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { Subtitle } from 'prisma/generated/client'

@Injectable()
export class SubtitleRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createSubtitle(dto: {
		videoId?: number
		startTimeMs: number
		endTimeMs: number
		orderIndex: number
		startOffset: number
		length: number
	}) {
		const subtitle = await this.prisma.subtitle.create({
			data: {
				video_id: dto.videoId,
				start_time_ms: dto.startTimeMs,
				end_time_ms: dto.endTimeMs,
				order_index: dto.orderIndex,
				start_offset: dto.startOffset,
				length: dto.length,
			},
		})

		return this.mapDbSubtitleToServiceSubtitle(subtitle)
	}

	@CatchDbError()
	async deleteByVideoId(videoId: number): Promise<number> {
		const res = await this.prisma.subtitle.deleteMany({
			where: { video_id: videoId },
		})
		return res.count
	}

	mapDbSubtitleToServiceSubtitle(dbSubtitle: Subtitle) {
		return {
			id: dbSubtitle.id,
			startTimeMs: dbSubtitle.start_time_ms,
			endTimeMs: dbSubtitle.end_time_ms,
			orderIndex: dbSubtitle.order_index,
			startOffset: dbSubtitle.start_offset,
			length: dbSubtitle.length,
		}
	}
}
