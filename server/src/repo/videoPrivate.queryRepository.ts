import { Injectable } from '@nestjs/common'
import { VideoPrivateOutModel } from 'models/videoPrivate/videoPrivate.out.model'
import { VideoPrivate } from 'prisma/generated/client'
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

	@CatchDbError()
	async getUserVideos(userId: number) {
		const videos = await this.prisma.videoPrivate.findMany({
			where: { user_id: userId },
			orderBy: { created_at: 'desc' },
		})

		return videos.map((video) => this.mapDbVideoToOutVideo(video))
	}

	mapDbVideoToOutVideo(dbVideo: VideoPrivate): VideoPrivateOutModel {
		return {
			id: dbVideo.id,
			name: dbVideo.name,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl: dbVideo.file_url,
			isFileUploaded: dbVideo.is_file_uploaded,
			subtitles: dbVideo.subtitles,
			userId: dbVideo.user_id,
		}
	}
}
