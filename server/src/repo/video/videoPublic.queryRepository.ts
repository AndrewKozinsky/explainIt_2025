import { Injectable } from '@nestjs/common'
import { attachVideoTextRelations } from 'repo/video/attachVideoTextRelations'
import { PrismaService } from 'db/prisma.service'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { VideoPublicOutModel } from 'models/videoPublic/videoPublic.out.model'
import { VideoPublicLiteOutModel } from 'models/videoPublic/videoPublicLite.out.model'
import { Sentence, SentenceTranslation, Subtitle, SubtitleSentenceInit, VideoPublic } from 'prisma/generated/client'

type DbSentenceWithInit = Sentence & {
	SubtitleSentenceInit?: SubtitleSentenceInit[]
	SentenceTranslation?: SentenceTranslation[]
}

type DbSubtitleWithInit = Subtitle & { SubtitleSentenceInit?: SubtitleSentenceInit[] }

type DbVideoWithRelations = VideoPublic & {
	Sentence?: DbSentenceWithInit[]
	Subtitle?: DbSubtitleWithInit[]
}

@Injectable()
export class VideoPublicQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudRuS3Service: CloudRuS3Service,
	) {}

	@CatchDbError()
	async getVideoById(id: number) {
		const video = await this.prisma.videoPublic.findUnique({
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

		if (!video) return null

		return this.mapDbVideoToOutVideo(video)
	}

	@CatchDbError()
	async getVideos() {
		const videos = await this.prisma.videoPublic.findMany({
			orderBy: { created_at: 'desc' },
		})

		return await Promise.all(videos.map((video) => this.mapDbVideoToLiteOutVideo(video)))
	}

	async mapDbVideoToLiteOutVideo(dbVideo: VideoPublic): Promise<VideoPublicLiteOutModel> {
		const fileUrl = dbVideo.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key) : null

		return {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.language_code,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
		}
	}

	// TODO: fileName, fileS3Key, fileUrl, originalContent, processedContent are always have value!
	async mapDbVideoToOutVideo(dbVideo: DbVideoWithRelations): Promise<VideoPublicOutModel> {
		const fileUrl = dbVideo.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key) : null

		const base: Omit<VideoPublicOutModel, 'sentences' | 'subtitles' | 'subtitleSentenceInit'> = {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.language_code,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
		}

		return attachVideoTextRelations({
			base,
			dbVideo,
		})
	}
}
