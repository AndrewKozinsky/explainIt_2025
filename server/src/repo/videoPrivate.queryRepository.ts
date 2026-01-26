import { Injectable } from '@nestjs/common'
import { VideoPrivateLiteOutModel, VideoPrivateOutModel } from 'src/models/videoPrivate/videoPrivateLiteOut.model'
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
			include: {
				Sentence: {
					orderBy: { order_index: 'asc' },
					include: { SubtitleSentenceInit: { orderBy: { start_offset: 'asc' } } },
				},
				Subtitle: {
					orderBy: { order_index: 'asc' },
					include: { SubtitleSentenceInit: { orderBy: { start_offset: 'asc' } } },
				},
			},
		})

		if (!video) {
			return null
		}

		return this.mapDbVideoToLiteOutVideo(video)
	}

	@CatchDbError()
	async getUserVideos(userId: number) {
		const videos = await this.prisma.videoPrivate.findMany({
			where: { user_id: userId },
			orderBy: { created_at: 'desc' },
		})

		return videos.map((video) => this.mapDbVideoToLiteOutVideo(video))
	}

	mapDbVideoToLiteOutVideo(dbVideo: VideoPrivate): VideoPrivateLiteOutModel {
		return {
			id: dbVideo.id,
			name: dbVideo.name,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl: dbVideo.file_url,
			isFileUploaded: dbVideo.is_file_uploaded,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.user_id,
			fileSizeMb: dbVideo.file_size_mb,
		}
	}

	mapDbVideoToOutVideo(dbVideo: VideoPrivate): VideoPrivateOutModel {
		return {
			id: dbVideo.id,
		}
	}
}
