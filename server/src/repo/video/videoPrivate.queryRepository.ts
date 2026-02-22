import { Injectable } from '@nestjs/common'
import { attachVideoTextRelations } from 'repo/video/attachVideoTextRelations'
import { PrismaService } from 'db/prisma.service'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { VideoPrivateLiteOutModel } from 'models/videoPrivate/videoPrivateLiteOut.model'
import { VideoPrivateOutModel } from 'models/videoPrivate/videoPrivateOut.model'
import { Sentence, SentenceTranslation, Subtitle, SubtitleSentenceInit, VideoPrivate } from 'prisma/generated/client'

type DbSentenceWithInit = Sentence & {
	SubtitleSentenceInit?: SubtitleSentenceInit[]
	SentenceTranslation?: SentenceTranslation[]
}
type DbSubtitleWithInit = Subtitle & { SubtitleSentenceInit?: SubtitleSentenceInit[] }
type DbVideoWithRelations = VideoPrivate & {
	Sentence?: DbSentenceWithInit[]
	Subtitle?: DbSubtitleWithInit[]
}

@Injectable()
export class VideoPrivateQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudRuS3Service: CloudRuS3Service,
	) {}

	@CatchDbError()
	async getVideoById(id: number) {
		const video = await this.prisma.videoPrivate.findUnique({
			where: { id },
			include: {
				Sentence: {
					orderBy: { order_index: 'asc' },
					include: {
						SubtitleSentenceInit: { orderBy: { start_offset: 'asc' } },
						SentenceTranslation: { orderBy: { created_at: 'asc' } },
					},
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

		return this.mapDbVideoToOutVideo(video)
	}

	@CatchDbError()
	async getUserVideos(userId: number) {
		const videos = await this.prisma.videoPrivate.findMany({
			where: { user_id: userId },
			orderBy: { created_at: 'desc' },
		})

		return videos.map((video) => this.mapDbVideoToLiteOutVideo(video))
	}

	async mapDbVideoToLiteOutVideo(dbVideo: VideoPrivate): Promise<VideoPrivateLiteOutModel> {
		const fileUrl = dbVideo.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key) : null

		return {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.language_code,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			isFileUploaded: dbVideo.is_file_uploaded,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.user_id,
			fileSizeMb: dbVideo.file_size_mb,
		}
	}

	async mapDbVideoToOutVideo(dbVideo: DbVideoWithRelations): Promise<VideoPrivateOutModel> {
		const fileUrl = dbVideo.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key) : null

		const base: Omit<VideoPrivateOutModel, 'sentences' | 'subtitles' | 'subtitleSentenceInit'> = {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.language_code,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			isFileUploaded: dbVideo.is_file_uploaded,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.user_id,
			fileSizeMb: dbVideo.file_size_mb,
			freeToUse: false,
		}

		return attachVideoTextRelations({
			base,
			dbVideo,
		})
	}
}
