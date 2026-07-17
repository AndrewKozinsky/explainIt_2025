import { Injectable } from '@nestjs/common'
import { attachVideoTextRelations } from 'repo/video/attachVideoTextRelations'
import { PrismaService } from 'db/prisma.service'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
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
	video_collection?: { type: string; user_id: number | null; source_language_code: string }
	Sentence?: DbSentenceWithInit[]
	Subtitle?: DbSubtitleWithInit[]
}

type UniversalPhraseWithRelations = Prisma.UniversalPhraseGetPayload<{
	include: {
		UniversalTranscription: true
		UniversalAudioPronunciation: true
	}
}>

@Injectable()
export class VideoQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudRuS3Service: CloudRuS3Service,
		private universalPhraseQueryRepo: UniversalPhraseQueryRepository,
	) {}

	@CatchDbError()
	async getVideoById(id: number) {
		const video = await this.prisma.video.findUnique({
			where: { id },
			include: {
				video_collection: true,
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
	async getVideos(userId?: number) {
		const where: Prisma.VideoWhereInput = {
			video_collection: {
				OR: [{ type: 'public' as const }, ...(userId ? [{ user_id: userId, type: 'private' as const }] : [])],
			},
		}

		const videos = await this.prisma.video.findMany({
			where,
			include: { video_collection: true },
			orderBy: { created_at: 'asc' },
		})

		return Promise.all(videos.map((video) => this.mapDbVideoToLiteOutVideo(video)))
	}

	@CatchDbError()
	async getCreateVideoById(id: number) {
		const video = await this.prisma.video.findUnique({
			where: { id },
			include: { video_collection: true },
		})

		if (!video) {
			return null
		}

		return this.mapDbVideoToCreateOutVideo(video)
	}

	async mapDbVideoToCreateOutVideo(
		dbVideo: Video & { video_collection?: { type: string; user_id: number | null; source_language_code: string } },
	): Promise<CreateVideoOutModel> {
		return {
			id: dbVideo.id,
			videoCollectionId: dbVideo.video_collection_id,
			type: (dbVideo.video_collection?.type as 'public' | 'private') ?? 'public',
			name: dbVideo.name,
			languageCode: (dbVideo.video_collection?.source_language_code as CreateVideoOutModel['languageCode']) ?? 'en',
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.video_collection?.user_id ?? null,
		}
	}

	async mapDbVideoToLiteOutVideo(
		dbVideo: Video & { video_collection?: { type: string; user_id: number | null; source_language_code: string } },
	): Promise<VideoLiteOutModel> {
		const fileUrl = dbVideo.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key) : null

		return {
			id: dbVideo.id,
			videoCollectionId: dbVideo.video_collection_id,
			type: (dbVideo.video_collection?.type as 'public' | 'private') ?? 'public',
			name: dbVideo.name,
			languageCode: dbVideo.video_collection?.source_language_code ?? null,
			note: dbVideo.note,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			isFileUploaded: !!dbVideo.is_file_uploaded,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.video_collection?.user_id ?? null,
			fileSizeMb: dbVideo.file_size_mb,
			fileDurationSec: dbVideo.file_duration_sec,
		}
	}

	async mapDbVideoToOutVideo(dbVideo: DbVideoWithRelations): Promise<VideoOutModel> {
		const fileUrl = dbVideo.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key) : null

		const base: Omit<VideoOutModel, 'sentences' | 'subtitles' | 'subtitleSentenceInit'> = {
			id: dbVideo.id,
			videoCollectionId: dbVideo.video_collection_id,
			type: (dbVideo.video_collection?.type as 'public' | 'private') ?? 'public',
			name: dbVideo.name,
			languageCode: dbVideo.video_collection?.source_language_code ?? null,
			note: dbVideo.note,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			isFileUploaded: !!dbVideo.is_file_uploaded,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.video_collection?.user_id ?? null,
			fileSizeMb: dbVideo.file_size_mb,
			fileDurationSec: dbVideo.file_duration_sec,
		}

		const universalPhraseByText = await this.buildUniversalPhraseMap(dbVideo)

		const result = attachVideoTextRelations({ base, dbVideo, universalPhraseByText })

		return result
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

		const sourceLanguageCode = dbVideo.video_collection?.source_language_code
		if (!sourceLanguageCode) {
			return new Map()
		}

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
