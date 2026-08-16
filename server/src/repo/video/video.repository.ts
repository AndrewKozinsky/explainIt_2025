import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { VideoServiceModel } from 'models/video/video.service.model'
import { LanguageCode, Video, S3ProviderName, SubtitlesSource, SubtitlesStatus } from 'prisma/generated/client'

@Injectable()
export class VideoRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createVideo(dto: {
		type: 'public' | 'private'
		userId?: null | number
		name?: null | string
		about?: null | string
		sourceLanguageCode: string
		youtubeVideoId?: null | string
		originalContent?: null | string
		processedContent?: null | string
		contentType?: 'text' | 'subtitles'
		s3ProviderName?: null | S3ProviderName
		fileName?: null | string
		fileS3Key?: null | string
		fileSizeMb?: number
		durationSec: number
		fileDurationSec?: number
		coverFileName?: null | string
		coverFileS3Key?: null | string
		coverUrl?: null | string
		subtitlesSource?: SubtitlesSource
		subtitlesStatus?: SubtitlesStatus
	}) {
		const newVideo = await this.prisma.video.create({
			data: {
				type: dto.type,
				user_id: dto.userId ?? null,
				name: dto.name ?? null,
				about: dto.about,
				source_language_code: dto.sourceLanguageCode as LanguageCode,
				youtube_video_id: dto.youtubeVideoId ?? null,
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				content_type: dto.contentType ?? 'text',
				s3_provider_name: dto.s3ProviderName,
				file_name: dto.fileName,
				file_s3_key: dto.fileS3Key,
				file_size_mb: dto.fileSizeMb ?? 0,
				duration_sec: dto.durationSec,
				cover_file_name: dto.coverFileName,
				cover_file_s3_key: dto.coverFileS3Key,
				cover_file_s3_provider_name: dto.coverFileS3Key ? 'cloudRu' : null,
				cover_url: dto.coverUrl,
				subtitles_source: dto.subtitlesSource ?? 'user',
				subtitles_status: dto.subtitlesStatus ?? 'idle',
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
			s3ProviderName?: null | S3ProviderName
			isFileUploaded?: boolean
			name?: null | string
			about?: null | string
			sourceLanguageCode?: string
			youtubeVideoId?: null | string
			originalContent?: null | string
			processedContent?: null | string
			contentType?: 'text' | 'subtitles'
			fileSizeMb?: number
			durationSec?: null | number
			coverFileName?: null | string
			coverFileS3Key?: null | string
			isCoverFileUploaded?: boolean
			coverUrl?: null | string
			subtitlesSource?: SubtitlesSource
			subtitlesStatus?: SubtitlesStatus
			subtitlesErrorCode?: null | string
			subtitlesJobId?: null | string
			proficiencyLevel?: null | number
			topic?: null | string
			learnabilityScore?: null | number
		},
	) {
		const updatedVideo = await this.prisma.video.update({
			where: { id: videoId },
			data: {
				file_name: dto.fileName,
				file_s3_key: dto.fileS3Key,
				s3_provider_name: dto.s3ProviderName,
				is_file_uploaded: dto.isFileUploaded,
				name: dto.name,
				about: dto.about,
				...(dto.sourceLanguageCode !== undefined
					? { source_language_code: dto.sourceLanguageCode as LanguageCode }
					: {}),
				...(dto.youtubeVideoId !== undefined ? { youtube_video_id: dto.youtubeVideoId } : {}),
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				content_type: dto.contentType,
				file_size_mb: dto.fileSizeMb,
				...(dto.durationSec !== undefined && dto.durationSec !== null ? { duration_sec: dto.durationSec } : {}),
				cover_file_name: dto.coverFileName,
				cover_file_s3_key: dto.coverFileS3Key,
				cover_file_s3_provider_name: dto.coverFileS3Key ? 'cloudRu' : null,
				is_cover_file_uploaded: dto.isCoverFileUploaded,
				cover_url: dto.coverUrl,
				...(dto.subtitlesSource !== undefined ? { subtitles_source: dto.subtitlesSource } : {}),
				...(dto.subtitlesStatus !== undefined ? { subtitles_status: dto.subtitlesStatus } : {}),
				...(dto.subtitlesErrorCode !== undefined ? { subtitles_error_code: dto.subtitlesErrorCode } : {}),
				...(dto.subtitlesJobId !== undefined ? { subtitles_job_id: dto.subtitlesJobId } : {}),
				proficiency_level: dto.proficiencyLevel,
				topic: dto.topic,
				learnability_score: dto.learnabilityScore,
			},
		})

		if (!updatedVideo) {
			return null
		}

		return this.mapDbVideoToServiceVideo(updatedVideo)
	}

	@CatchDbError()
	async deleteVideoById(videoId: number) {
		await this.prisma.video.delete({
			where: { id: videoId },
		})
	}

	@CatchDbError()
	async getVideoOwnerAndUrlByVideoId(id: number) {
		const video = await this.prisma.video.findUnique({
			where: { id },
			select: {
				user_id: true,
				file_s3_key: true,
			},
		})

		if (!video) {
			return null
		}

		return {
			userId: video.user_id,
			fileS3Key: video.file_s3_key,
		}
	}

	/**
	 * Atomically transition the video from an idle/done/failed state to PENDING
	 * and clear any previous error. Returns true if the transition happened.
	 */
	@CatchDbError()
	async tryStartSubtitlesProcessing(videoId: number, userId: number): Promise<boolean> {
		const res = await this.prisma.video.updateMany({
			where: {
				id: videoId,
				user_id: userId,
				subtitles_status: {
					notIn: [SubtitlesStatus.pending, SubtitlesStatus.processing],
				},
			},
			data: {
				subtitles_status: SubtitlesStatus.pending,
				subtitles_error_code: null,
			},
		})
		return res.count === 1
	}

	@CatchDbError()
	async setSubtitlesStatus(
		videoId: number,
		status: SubtitlesStatus,
		opts: { errorCode?: null | string; jobId?: null | string } = {},
	): Promise<void> {
		await this.prisma.video.update({
			where: { id: videoId },
			data: {
				subtitles_status: status,
				...(opts.errorCode !== undefined ? { subtitles_error_code: opts.errorCode } : {}),
				...(opts.jobId !== undefined ? { subtitles_job_id: opts.jobId } : {}),
			},
		})
	}

	@CatchDbError()
	async getSubtitlesState(videoId: number) {
		const video = await this.prisma.video.findUnique({
			where: { id: videoId },
			select: {
				user_id: true,
				is_file_uploaded: true,
				file_s3_key: true,
				duration_sec: true,
				source_language_code: true,
				youtube_video_id: true,
				subtitles_source: true,
				subtitles_status: true,
				subtitles_error_code: true,
				subtitles_job_id: true,
			},
		})
		if (!video) return null

		return {
			userId: video.user_id,
			languageCode: video.source_language_code,
			youtubeVideoId: video.youtube_video_id,
			isFileUploaded: video.is_file_uploaded,
			fileS3Key: video.file_s3_key,
			durationSec: video.duration_sec,
			source: video.subtitles_source,
			status: video.subtitles_status,
			errorCode: video.subtitles_error_code,
			jobId: video.subtitles_job_id,
		}
	}

	async mapDbVideoToServiceVideo(dbVideo: Video): Promise<VideoServiceModel> {
		return {
			id: dbVideo.id,
			type: dbVideo.type,
			userId: dbVideo.user_id,
			name: dbVideo.name,
			about: dbVideo.about,
			sourceLanguageCode: dbVideo.source_language_code,
			youtubeVideoId: dbVideo.youtube_video_id,
			fileUrl: null,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			fileSizeMb: dbVideo.file_size_mb,
			durationSec: dbVideo.duration_sec,
			coverFileName: dbVideo.cover_file_name,
			coverFileS3Key: dbVideo.cover_file_s3_key,
			isCoverFileUploaded: dbVideo.is_cover_file_uploaded,
			coverUrl: dbVideo.cover_url,
			subtitlesSource: dbVideo.subtitles_source,
			subtitlesStatus: dbVideo.subtitles_status,
			subtitlesErrorCode: dbVideo.subtitles_error_code,
			subtitlesJobId: dbVideo.subtitles_job_id,
			proficiencyLevel: dbVideo.proficiency_level,
			topic: dbVideo.topic,
			learnabilityScore: dbVideo.learnability_score,
		}
	}
}
