import { Injectable } from '@nestjs/common'
import { Subtitle } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class SubtitleRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createSubtitle(dto: {
		videoPrivateId: number
		startTimeMs: number
		endTimeMs: number
		orderIndex: number
		startOffset: number
		length: number
	}) {
		const subtitle = await this.prisma.subtitle.create({
			data: {
				video_private_id: dto.videoPrivateId,
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
	async deleteByVideoPrivateId(videoPrivateId: number): Promise<number> {
		const res = await this.prisma.subtitle.deleteMany({
			where: { video_private_id: videoPrivateId },
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
