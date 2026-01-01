import { Injectable } from '@nestjs/common'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { VideoPrivate } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { VideoPrivateServiceModel } from '../models/videoPrivate/videoPrivate.service.model'

@Injectable()
export class VideoPrivateRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createVideo(dto: { userId: number; name?: null | string; subtitles?: null | string }) {
		const newVideo = await this.prisma.videoPrivate.create({
			data: {
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
			fileName?: null | string
			fileS3Key?: null | string
			fileUrl?: null | string
			isFileUploaded?: boolean
			name?: null | string
			subtitles?: null | string
		},
	) {
		const updatedVideo = await this.prisma.videoPrivate.update({
			where: { id: videoId },
			data: {
				file_name: dto.fileName,
				file_s3_key: dto.fileS3Key,
				file_url: dto.fileUrl,
				is_file_uploaded: dto.isFileUploaded,
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
				file_url: true,
			},
		})

		if (!video) {
			return null
		}

		return {
			userId: video.user_id,
			url: video.file_url,
		}
	}

	mapDbVideoToServiceVideo(dbVideo: VideoPrivate): VideoPrivateServiceModel {
		return {
			id: dbVideo.id,
			name: dbVideo.name,
			fileUrl: dbVideo.file_url,
			subtitles: dbVideo.subtitles,
			userId: dbVideo.user_id,
		}
	}
}
