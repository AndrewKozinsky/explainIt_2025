import { Injectable } from '@nestjs/common'
import { Prisma, VideoPrivate } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { VideoPrivateServiceModel } from '../models/videoPrivate/videoPrivate.service.model'

@Injectable()
export class VideoPrivateRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createVideo(dto: { userId: number; url?: null | string; name?: null | string; subtitles?: null | string }) {
		const newVideo = await this.prisma.videoPrivate.create({
			data: {
				url: dto.url,
				name: dto.name,
				subtitles: dto.subtitles,
				user_id: dto.userId,
			},
		})

		return this.mapDbVideoToServiceVideo(newVideo)
	}

	@CatchDbError()
	async updateVideoById(
		videoId: number,
		dto: {
			url?: null | string
			name?: null | string
			subtitles?: null | string
		},
	) {
		const updatedVideo = await this.prisma.videoPrivate.update({
			where: { id: videoId },
			data: {
				url: dto.url,
				name: dto.name,
				subtitles: dto.subtitles,
			},
		})

		if (!updatedVideo) {
			return null
		}

		return this.mapDbVideoToServiceVideo(updatedVideo)
	}

	@CatchDbError()
	async deleteVideoById(videoId: number) {
		await this.prisma.videoPrivate.delete({
			where: { id: videoId },
		})
	}

	@CatchDbError()
	async getVideoOwnerAndUrlByVideoId(id: number) {
		const video = await this.prisma.videoPrivate.findUnique({
			where: { id },
			select: {
				user_id: true,
				url: true,
			},
		})

		if (!video) {
			return null
		}

		return {
			userId: video.user_id,
			url: video.url,
		}
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
