import { Injectable } from '@nestjs/common'
import { attachVideoTextRelations } from 'repo/video/attachVideoTextRelations'
import { PrismaService } from 'db/prisma.service'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { UniversalPhraseOutModel } from 'models/universalPhrase/universalPhrase.out.model'
import { CreateVideoOutModel } from 'models/video/createVideo.out.model'
import { VideoOutModel } from 'models/video/video.out.model'
import { VideoLiteOutModel } from 'models/video/videoLite.out.model'
import {
	LanguageCode,
	Prisma,
	Sentence,
	SentencePhraseTranslation,
	SentenceTranslation,
	Subtitle,
	SubtitleSentenceInit,
	Video,
} from 'prisma/generated/client'
import { UniversalPhraseQueryRepository } from '../universalPhrase/universalPhrase.queryRepository'

type DbSentenceWithInit = Sentence & {
	SubtitleSentenceInit?: SubtitleSentenceInit[]
	SentenceTranslation?: SentenceTranslation[]
	SentencePhraseTranslation?: SentencePhraseTranslation[]
}

type DbSubtitleWithInit = Subtitle & { SubtitleSentenceInit?: SubtitleSentenceInit[] }

type DbVideoWithRelations = Video & {
	Sentence?: DbSentenceWithInit[]
	Subtitle?: DbSubtitleWithInit[]
}

@Injectable()
export class VideoQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudflareS3Service: CloudflareS3Service,
		private universalPhraseQueryRepo: UniversalPhraseQueryRepository,
	) {}

	@CatchDbError()
	async getVideoById(id: number) {
		const video = await this.prisma.video.findUnique({
			where: { id },
			include: {
				Sentence: {
					orderBy: { order_index: 'asc' },
					include: {
						SubtitleSentenceInit: { orderBy: { start_offset: 'asc' } },
						SentenceTranslation: { orderBy: { created_at: 'asc' } },
						SentencePhraseTranslation: { orderBy: { created_at: 'asc' } },
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
	async getVideoByYoutubeId(youtubeVideoId: string) {
		const video = await this.prisma.video.findUnique({
			where: { youtube_video_id: youtubeVideoId },
			include: {
				Sentence: {
					orderBy: { order_index: 'asc' },
					include: {
						SubtitleSentenceInit: { orderBy: { start_offset: 'asc' } },
						SentenceTranslation: { orderBy: { created_at: 'asc' } },
						SentencePhraseTranslation: { orderBy: { created_at: 'asc' } },
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
	async getPublicVideos() {
		const videos = await this.prisma.video.findMany({
			where: { type: 'public', youtube_video_id: null },
			orderBy: { created_at: 'asc' },
		})

		return Promise.all(videos.map((video) => this.mapDbVideoToLiteOutVideo(video)))
	}

	@CatchDbError()
	async getPrivateVideos(userId: number) {
		const videos = await this.prisma.video.findMany({
			where: { type: 'private', user_id: userId },
			orderBy: { created_at: 'asc' },
		})

		return Promise.all(videos.map((video) => this.mapDbVideoToLiteOutVideo(video)))
	}

	@CatchDbError()
	async getSavedYoutubeVideos(filters?: {
		maxDurationSec?: number
		minDurationSec?: number
		proficiencyLevel?: number
		topic?: string
		languageCode?: LanguageCode
	}) {
		const where: Prisma.VideoWhereInput = {
			youtube_video_id: { not: null },
		}

		if (filters?.minDurationSec !== undefined || filters?.maxDurationSec !== undefined) {
			where.duration_sec = {}
			if (filters?.minDurationSec !== undefined) {
				;(where.duration_sec as Prisma.IntFilter).gte = filters.minDurationSec
			}
			if (filters?.maxDurationSec !== undefined) {
				;(where.duration_sec as Prisma.IntFilter).lte = filters.maxDurationSec
			}
		}
		if (filters?.proficiencyLevel !== undefined) {
			where.proficiency_level = filters.proficiencyLevel
		}
		if (filters?.topic !== undefined) {
			where.topic = filters.topic
		}
		if (filters?.languageCode !== undefined) {
			where.source_language_code = filters.languageCode
		}

		const videos = await this.prisma.video.findMany({
			where,
			orderBy: { learnability_score: { sort: 'desc', nulls: 'last' } },
		})

		return Promise.all(videos.map((video) => this.mapDbVideoToLiteOutVideo(video)))
	}

	@CatchDbError()
	async getCreateVideoById(id: number) {
		const video = await this.prisma.video.findUnique({
			where: { id },
		})

		if (!video) {
			return null
		}

		return this.mapDbVideoToCreateOutVideo(video)
	}

	async mapDbVideoToCreateOutVideo(dbVideo: Video): Promise<CreateVideoOutModel> {
		return {
			id: dbVideo.id,
			type: dbVideo.type as 'public' | 'private',
			name: dbVideo.name,
			languageCode: dbVideo.source_language_code as CreateVideoOutModel['languageCode'],
			proficiencyLevel: dbVideo.proficiency_level,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.user_id ?? null,
			subtitlesSource: dbVideo.subtitles_source,
			subtitlesStatus: dbVideo.subtitles_status,
			subtitlesErrorCode: dbVideo.subtitles_error_code,
		}
	}

	async mapDbVideoToLiteOutVideo(dbVideo: Video): Promise<VideoLiteOutModel> {
		const [fileUrl, coverUrl] = await Promise.all([
			this.resolveFileUrl(dbVideo.file_s3_key),
			this.resolveCoverUrl(dbVideo.cover_file_s3_key, dbVideo.cover_url),
		])

		return {
			id: dbVideo.id,
			type: dbVideo.type as 'public' | 'private',
			name: dbVideo.name,
			proficiencyLevel: dbVideo.proficiency_level ?? null,
			languageCode: dbVideo.source_language_code,
			youtubeVideoId: dbVideo.youtube_video_id,
			about: dbVideo.about,
			topic: dbVideo.topic,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			isFileUploaded: !!dbVideo.is_file_uploaded,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.user_id ?? null,
			fileSizeMb: dbVideo.file_size_mb,
			durationSec: dbVideo.duration_sec,
			coverFileName: dbVideo.cover_file_name,
			coverFileS3Key: dbVideo.cover_file_s3_key,
			isCoverFileUploaded: dbVideo.is_cover_file_uploaded,
			coverUrl,
			uploadCoverUrl: null,
			subtitlesSource: dbVideo.subtitles_source,
			subtitlesStatus: dbVideo.subtitles_status,
			subtitlesErrorCode: dbVideo.subtitles_error_code,
		}
	}

	async mapDbVideoToOutVideo(dbVideo: DbVideoWithRelations): Promise<VideoOutModel> {
		const [fileUrl, coverUrl] = await Promise.all([
			this.resolveFileUrl(dbVideo.file_s3_key),
			this.resolveCoverUrl(dbVideo.cover_file_s3_key, dbVideo.cover_url),
		])

		const base: Omit<VideoOutModel, 'sentences' | 'subtitles' | 'subtitleSentenceInit'> = {
			id: dbVideo.id,
			type: dbVideo.type as 'public' | 'private',
			name: dbVideo.name,
			proficiencyLevel: dbVideo.proficiency_level ?? null,
			languageCode: dbVideo.source_language_code,
			youtubeVideoId: dbVideo.youtube_video_id,
			about: dbVideo.about,
			topic: dbVideo.topic,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			isFileUploaded: !!dbVideo.is_file_uploaded,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.user_id ?? null,
			fileSizeMb: dbVideo.file_size_mb,
			durationSec: dbVideo.duration_sec,
			coverFileName: dbVideo.cover_file_name,
			coverFileS3Key: dbVideo.cover_file_s3_key,
			isCoverFileUploaded: dbVideo.is_cover_file_uploaded,
			coverUrl,
			uploadCoverUrl: null,
			subtitlesSource: dbVideo.subtitles_source,
			subtitlesStatus: dbVideo.subtitles_status,
			subtitlesErrorCode: dbVideo.subtitles_error_code,
		}

		const universalPhraseByText = await this.buildUniversalPhraseMap(dbVideo)

		const result = attachVideoTextRelations({ base, dbVideo, universalPhraseByText })

		return result
	}

	private async resolveFileUrl(fileS3Key: string | null): Promise<string | null> {
		return fileS3Key ? await this.cloudflareS3Service.getFileUrl(fileS3Key) : null
	}

	/**
	 * Resolve cover URL: S3 presigned URL takes priority,
	 * falls back to stored URL (e.g. YouTube thumbnail).
	 */
	private async resolveCoverUrl(coverFileS3Key: string | null, coverUrl: string | null): Promise<string | null> {
		if (coverFileS3Key) {
			return await this.cloudflareS3Service.getFileUrl(coverFileS3Key)
		}

		return coverUrl ?? null
	}

	private async buildUniversalPhraseMap(
		dbVideo: DbVideoWithRelations,
	): Promise<Map<string, UniversalPhraseOutModel>> {
		const phraseTexts = new Set<string>()
		for (const s of dbVideo.Sentence ?? []) {
			for (const pt of s.SentencePhraseTranslation ?? []) {
				if (pt.phrase) {
					phraseTexts.add(pt.phrase)
				}
			}
		}

		if (phraseTexts.size === 0) {
			return new Map()
		}

		const sourceLanguageCode = dbVideo.source_language_code

		const dbPhrases = await this.prisma.universalPhrase.findMany({
			where: {
				text: { in: [...phraseTexts] },
				source_language_code: sourceLanguageCode as LanguageCode,
			},
			include: {
				UniversalTranscription: true,
				UniversalAudioPronunciation: true,
			},
		})

		const map = new Map<string, UniversalPhraseOutModel>()
		await Promise.all(
			dbPhrases.map(async (p) => {
				const out = await this.universalPhraseQueryRepo.mapDbUniversalPhraseToOutModel(p)
				map.set(p.text, out)
			}),
		)

		return map
	}
}
