import { Injectable } from '@nestjs/common'
import { attachVideoTextRelations } from 'repo/video/attachVideoTextRelations'
import { PrismaService } from 'db/prisma.service'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { VideoPublicOutModel } from 'models/videoPublic/videoPublic.out.model'
import { VideoPublicLiteOutModel } from 'models/videoPublic/videoPublicLite.out.model'
import { Sentence, SentencePhraseTranslation, SentenceTranslation, Subtitle, SubtitleSentenceInit, VideoPublic } from 'prisma/generated/client'
import { enrichSentencesWithGrammarConcepts } from '../grammarConcept/enrichSentencesWithGrammarConcepts'
import { GrammarConceptQueryRepository } from '../grammarConcept.queryRepository'

type DbSentenceWithInit = Sentence & {
	SubtitleSentenceInit?: SubtitleSentenceInit[]
	SentenceTranslation?: SentenceTranslation[]
	SentencePhraseTranslation?: SentencePhraseTranslation[]
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
		private grammarConceptQueryRepo: GrammarConceptQueryRepository,
	) {}

	@CatchDbError()
	async getVideoById(id: number, targetLanguageCode?: string) {
		const video = await this.prisma.videoPublic.findUnique({
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

		if (!video) return null

		return this.mapDbVideoToOutVideo(video, targetLanguageCode)
	}

	@CatchDbError()
	async getVideos() {
		const videos = await this.prisma.videoPublic.findMany({
			orderBy: { id: 'asc' },
		})

		return await Promise.all(videos.map((video) => this.mapDbVideoToLiteOutVideo(video)))
	}

	async mapDbVideoToLiteOutVideo(dbVideo: VideoPublic): Promise<VideoPublicLiteOutModel> {
		const fileUrl = await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key)

		return {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.source_language_code,
			note: dbVideo.note,
			covers: dbVideo.covers,
			coverBackgroundColor: dbVideo.coverBackgroundColor,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			freeToUse: dbVideo.free_to_use ?? false,
		}
	}

	async mapDbVideoToOutVideo(
		dbVideo: DbVideoWithRelations,
		targetLanguageCode?: string,
	): Promise<VideoPublicOutModel> {
		const fileUrl = await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key)

		const base: Omit<VideoPublicOutModel, 'sentences' | 'subtitles' | 'subtitleSentenceInit'> = {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.source_language_code,
			note: dbVideo.note,
			covers: dbVideo.covers,
			coverBackgroundColor: dbVideo.coverBackgroundColor,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			freeToUse: dbVideo.free_to_use ?? false,
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
