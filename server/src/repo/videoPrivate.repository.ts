import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { VideoPrivateServiceModel } from '../models/videoPrivate/videoPrivate.service.model'
import { Prisma, VideoPrivate } from 'prisma/generated/client'

@Injectable()
export class VideoPrivateRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createVideo(dto: { userId: number; author?: null | string; name?: null | string; note?: null | string }) {
		const newVideo = await this.prisma.videoPrivate.create({
			data: {
				name: dto.name,
				subtitles: dto.note,
				user_id: dto.userId,
			},
		})

		return this.mapDbVideoToServiceVideo(newVideo)
	}

	mapDbVideoToServiceVideo(dbVideo: VideoPrivate): VideoPrivateServiceModel {
		return {
			id: dbVideo.id,
			name: dbVideo.name,
			subtitles: dbVideo.subtitles,
			userId: dbVideo.user_id,
		}
	}
}
