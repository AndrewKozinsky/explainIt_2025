import { Injectable } from '@nestjs/common'
import { VideoPrivateLiteOutModel } from 'models/videoPrivate/videoPrivateLiteOut.model'
import { VideoPrivateOutModel } from 'models/videoPrivate/videoPrivateOut.model'
import { Sentence, Subtitle, SubtitleSentenceInit, VideoPrivate } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

type DbSentenceWithInit = Sentence & { SubtitleSentenceInit?: SubtitleSentenceInit[] }
type DbSubtitleWithInit = Subtitle & { SubtitleSentenceInit?: SubtitleSentenceInit[] }
type DbVideoWithRelations = VideoPrivate & {
	Sentence?: DbSentenceWithInit[]
	Subtitle?: DbSubtitleWithInit[]
}

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

	mapDbVideoToOutVideo(dbVideo: DbVideoWithRelations): VideoPrivateOutModel {
		const base: Omit<VideoPrivateOutModel, 'sentences' | 'subtitles' | 'subtitleSentenceInit'> = {
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

		const sentences = (dbVideo.Sentence ?? []).map((s) => ({
			id: s.id,
			startOffset: s.start_offset,
			length: s.length,
			orderIndex: s.order_index,
		}))

		if (dbVideo.content_type !== 'subtitles') {
			return {
				...base,
				sentences,
				subtitles: null,
				subtitleSentenceInit: null,
			}
		}

		const subtitles = (dbVideo.Subtitle ?? []).map((s) => ({
			id: s.id,
			startTimeMs: s.start_time_ms,
			endTimeMs: s.end_time_ms,
			startOffset: s.start_offset,
			length: s.length,
			orderIndex: s.order_index,
		}))

		const subtitleSentenceInitById = new Map<number, SubtitleSentenceInit>()
		for (const subtitle of dbVideo.Subtitle ?? []) {
			for (const init of subtitle.SubtitleSentenceInit ?? []) {
				subtitleSentenceInitById.set(init.id, init)
			}
		}

		const subtitleSentenceInit = Array.from(subtitleSentenceInitById.values()).map((i) => ({
			id: i.id,
			subtitleId: i.subtitle_id,
			sentenceId: i.sentence_id,
			startOffset: i.start_offset,
			length: i.length,
		}))

		return {
			...base,
			sentences,
			subtitles,
			subtitleSentenceInit,
		}
	}
}
