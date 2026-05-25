import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { PrismaService } from 'db/prisma.service'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { VideoPrivateServiceModel } from 'models/videoPrivate/videoPrivate.service.model'
import { VideoPrivate, S3ProviderName, SubtitlesGenerationStatus } from 'prisma/generated/client'

@Injectable()
export class VideoPrivateRepository {
	constructor(
		private prisma: PrismaService,
		private cloudRuS3Service: CloudRuS3Service,
	) {}

	@CatchDbError()
	async createVideo(dto: {
		userId: number
		name?: null | string
		languageCode: Language
		originalContent?: null | string
		processedContent?: null | string
		contentType?: 'text' | 'subtitles'
		s3ProviderName?: null | S3ProviderName
		fileSizeMb?: number
		fileDurationSec?: number
	}) {
		const newVideo = await this.prisma.videoPrivate.create({
			data: {
				name: dto.name,
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				content_type: dto.contentType,
				user_id: dto.userId,
				s3_provider_name: dto.s3ProviderName,
				source_language_code: dto.languageCode,
				file_size_mb: dto.fileSizeMb,
				file_duration_sec: dto.fileDurationSec,
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
			languageCode?: null | Language
			originalContent?: null | string
			processedContent?: null | string
			contentType?: 'text' | 'subtitles'
			fileSizeMb?: number
			fileDurationSec?: number
		},
	) {
		const updatedVideo = await this.prisma.videoPrivate.update({
			where: { id: videoId },
			data: {
				file_name: dto.fileName,
				file_s3_key: dto.fileS3Key,
				s3_provider_name: dto.s3ProviderName,
				is_file_uploaded: dto.isFileUploaded,
				name: dto.name,
				...(dto.languageCode !== undefined && dto.languageCode !== null
					? { source_language_code: dto.languageCode }
					: {}),
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				content_type: dto.contentType,
				file_size_mb: dto.fileSizeMb,
				file_duration_sec: dto.fileDurationSec,
			},
		})

		if (!updatedVideo) {
			return null
		}

		return this.mapDbVideoToServiceVideo(updatedVideo)
	}

	@CatchDbError()
	async deleteVideoById(videoId: number) {
		await this.prisma.videoPrivate.delete({
			where: { id: videoId },
		})
	}

	@CatchDbError()
	async getVideoOwnerAndUrlByVideoId(id: number) {
		const video = await this.prisma.videoPrivate.findUnique({
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

	@CatchDbError()
	async getVideosWithUploadedFilesByUserIds(userIds: number[]): Promise<Array<{ id: number; fileS3Key: string }>> {
		if (!userIds.length) return []

		const videos = await this.prisma.videoPrivate.findMany({
			where: {
				user_id: {
					in: userIds,
				},
				is_file_uploaded: true,
				file_s3_key: {
					not: null,
				},
			},
			select: {
				id: true,
				file_s3_key: true,
			},
		})
		return videos
			.filter((video) => Boolean(video.file_s3_key))
			.map((video) => ({ id: video.id, fileS3Key: video.file_s3_key! }))
	}

	/**
	 * Atomically transition the video from an idle/done/failed state to PENDING
	 * and clear any previous error. Returns true if the transition happened.
	 * Returns false if the video is already pending/processing (someone else is
	 * generating subtitles right now) or if the video doesn't belong to the user.
	 */
	@CatchDbError()
	async tryStartSubtitlesGeneration(videoId: number, userId: number): Promise<boolean> {
		const res = await this.prisma.videoPrivate.updateMany({
			where: {
				id: videoId,
				user_id: userId,
				subtitles_generation_status: {
					notIn: [SubtitlesGenerationStatus.pending, SubtitlesGenerationStatus.processing],
				},
			},
			data: {
				subtitles_generation_status: SubtitlesGenerationStatus.pending,
				subtitles_generation_error: null,
				subtitles_generation_started_at: new Date(),
				subtitles_generation_charge_kopecks: null,
				subtitles_generation_refunded_at: null,
			},
		})
		return res.count === 1
	}

	@CatchDbError()
	async setSubtitlesGenerationStatus(
		videoId: number,
		status: SubtitlesGenerationStatus,
		opts: { error?: null | string; jobId?: null | string; chargeKopecks?: null | number } = {},
	): Promise<void> {
		await this.prisma.videoPrivate.update({
			where: { id: videoId },
			data: {
				subtitles_generation_status: status,
				...(opts.error !== undefined ? { subtitles_generation_error: opts.error } : {}),
				...(opts.jobId !== undefined ? { subtitles_generation_job_id: opts.jobId } : {}),
				...(opts.chargeKopecks !== undefined
					? { subtitles_generation_charge_kopecks: opts.chargeKopecks }
					: {}),
			},
		})
	}

	@CatchDbError()
	async tryMarkSubtitlesGenerationRefunded(videoId: number): Promise<boolean> {
		const res = await this.prisma.videoPrivate.updateMany({
			where: {
				id: videoId,
				subtitles_generation_charge_kopecks: {
					not: null,
				},
				subtitles_generation_refunded_at: null,
			},
			data: {
				subtitles_generation_refunded_at: new Date(),
			},
		})
		return res.count === 1
	}

	@CatchDbError()
	async getSubtitlesGenerationState(videoId: number) {
		const video = await this.prisma.videoPrivate.findUnique({
			where: { id: videoId },
			select: {
				user_id: true,
				source_language_code: true,
				is_file_uploaded: true,
				file_s3_key: true,
				file_duration_sec: true,
				subtitles_generation_charge_kopecks: true,
				subtitles_generation_refunded_at: true,
				subtitles_generation_status: true,
				subtitles_generation_error: true,
				subtitles_generation_started_at: true,
				subtitles_generation_job_id: true,
			},
		})
		if (!video) return null

		return {
			userId: video.user_id,
			languageCode: video.source_language_code,
			isFileUploaded: video.is_file_uploaded,
			fileS3Key: video.file_s3_key,
			fileDurationSec: video.file_duration_sec,
			chargeKopecks: video.subtitles_generation_charge_kopecks,
			refundedAt: video.subtitles_generation_refunded_at,
			status: video.subtitles_generation_status,
			error: video.subtitles_generation_error,
			startedAt: video.subtitles_generation_started_at,
			jobId: video.subtitles_generation_job_id,
		}
	}

	@CatchDbError()
	async clearVideoFileFieldsById(videoId: number): Promise<void> {
		await this.prisma.videoPrivate.update({
			where: { id: videoId },
			data: {
				file_s3_key: null,
				is_file_uploaded: false,
				file_name: null,
				file_duration_sec: null,
			},
		})
	}

	async mapDbVideoToServiceVideo(dbVideo: VideoPrivate): Promise<VideoPrivateServiceModel> {
		const fileUrl = dbVideo.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key) : null

		return {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.source_language_code,
			fileUrl,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.user_id,
			fileSizeMb: dbVideo.file_size_mb,
			fileDurationSec: dbVideo.file_duration_sec,
		}
	}
}
