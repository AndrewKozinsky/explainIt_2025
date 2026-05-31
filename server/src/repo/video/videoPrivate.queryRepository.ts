import { Injectable } from '@nestjs/common'
import { attachVideoTextRelations } from 'repo/video/attachVideoTextRelations'
import { PrismaService } from 'db/prisma.service'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { VideoPrivateLiteOutModel } from 'models/videoPrivate/videoPrivateLiteOut.model'
import { VideoPrivateOutModel } from 'models/videoPrivate/videoPrivateOut.model'
import { Sentence, SentencePhraseTranslation, SentenceTranslation, Subtitle, SubtitleSentenceInit, VideoPrivate } from 'prisma/generated/client'
import { enrichSentencesWithGrammarConcepts } from '../grammarConcept/enrichSentencesWithGrammarConcepts'
import { GrammarConceptQueryRepository } from '../grammarConcept.queryRepository'

type DbSentenceWithInit = Sentence & {
	SubtitleSentenceInit?: SubtitleSentenceInit[]
	SentenceTranslation?: SentenceTranslation[]
	SentencePhraseTranslation?: SentencePhraseTranslation[]
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
		private grammarConceptQueryRepo: GrammarConceptQueryRepository,
	) {}

	@CatchDbError()
	async getVideoById(id: number, targetLanguageCode?: string) {
		const video = await this.prisma.videoPrivate.findUnique({
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

		return this.mapDbVideoToOutVideo(video, targetLanguageCode)
	}

	@CatchDbError()
	async getUserVideos(userId: number) {
		const videos = await this.prisma.videoPrivate.findMany({
			where: { user_id: userId },
			orderBy: { created_at: 'asc' },
		})

		return videos.map((video) => this.mapDbVideoToLiteOutVideo(video))
	}

	async mapDbVideoToLiteOutVideo(dbVideo: VideoPrivate): Promise<VideoPrivateLiteOutModel> {
		const fileUrl = dbVideo.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key) : null

		return {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.source_language_code,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			isFileUploaded: dbVideo.is_file_uploaded,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.user_id,
			fileSizeMb: dbVideo.file_size_mb,
			fileDurationSec: dbVideo.file_duration_sec,
		}
	}

	async mapDbVideoToOutVideo(
		dbVideo: DbVideoWithRelations,
		targetLanguageCode?: string,
	): Promise<VideoPrivateOutModel> {
		const fileUrl = dbVideo.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key) : null

		const base: Omit<VideoPrivateOutModel, 'sentences' | 'subtitles' | 'subtitleSentenceInit'> = {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.source_language_code,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			isFileUploaded: dbVideo.is_file_uploaded,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.user_id,
			fileSizeMb: dbVideo.file_size_mb,
			fileDurationSec: dbVideo.file_duration_sec,
			freeToUse: false,
		}

		const result = attachVideoTextRelations({ base, dbVideo })

		if (targetLanguageCode) {
			const grammarResults = await enrichSentencesWithGrammarConcepts({
				prisma: this.prisma,
				grammarConceptQueryRepo: this.grammarConceptQueryRepo,
				sentences: (dbVideo.Sentence ?? []).map((s) => ({
					id: s.id,
					startOffset: s.start_offset,
					length: s.length,
				})),
				content: dbVideo.processed_content ?? '',
				sourceLanguageCode: dbVideo.source_language_code,
				targetLanguageCode,
			})

			result.sentences = result.sentences!.map((s, i) => ({
				...s,
				grammarConcepts: grammarResults[i].grammarConcepts,
				missingGrammarConcepts: grammarResults[i].missingGrammarConcepts,
			})) as any
		}

		return result
	}
}
