import { Injectable } from '@nestjs/common'
import { Prisma, VideoPrivate } from 'prisma/generated/client'
import { VideoPrivateOutModel } from 'src/models/videoPrivate/videoPrivate.out.model'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class VideoPrivateQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getVideoById(id: number) {
		const video = await this.prisma.videoPrivate.findUnique({
			where: { id },
		})

		if (!video) {
			return null
		}

		return this.mapDbVideoToOutVideo(video)
	}

	mapDbVideoToOutVideo(dbVideo: VideoPrivate): VideoPrivateOutModel {
		return {
			id: dbVideo.id,
			name: dbVideo.name,
			subtitles: dbVideo.subtitles,
			userId: dbVideo.user_id,
		}
	}
}
