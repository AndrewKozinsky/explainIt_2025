import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { VideoServiceModel } from 'models/video/video.service.model'
import { Video, S3ProviderName, SubtitlesGenerationStatus } from 'prisma/generated/client'

@Injectable()
export class VideoRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createVideo(dto: {
		videoCollectionId: number
		name?: null | string
		note?: null | string
		originalContent?: null | string
		processedContent?: null | string
		contentType?: 'text' | 'subtitles'
		s3ProviderName?: null | S3ProviderName
		fileName?: null | string
		fileS3Key?: null | string
		fileSizeMb?: number
		fileDurationSec?: number
	}) {
		const newVideo = await this.prisma.video.create({
			data: {
				video_collection_id: dto.videoCollectionId,
				name: dto.name ?? null,
				note: dto.note,
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				content_type: dto.contentType ?? 'text',
				s3_provider_name: dto.s3ProviderName,
				file_name: dto.fileName,
				file_s3_key: dto.fileS3Key,
				file_size_mb: dto.fileSizeMb ?? 0,
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
			note?: null | string
			originalContent?: null | string
			processedContent?: null | string
			contentType?: 'text' | 'subtitles'
			fileSizeMb?: number
			fileDurationSec?: number
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
				note: dto.note,
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
		await this.prisma.video.delete({
			where: { id: videoId },
		})
	}

	@CatchDbError()
	async getVideoOwnerAndUrlByVideoId(id: number) {
		const video = await this.prisma.video.findUnique({
			where: { id },
			select: {
				file_s3_key: true,
				video_collection: {
					select: { user_id: true },
				},
			},
		})

		if (!video) {
			return null
		}

		return {
			userId: video.video_collection.user_id,
			fileS3Key: video.file_s3_key,
		}
	}

	/**
	 * Atomically transition the video from an idle/done/failed state to PENDING
	 * and clear any previous error. Returns true if the transition happened.
	 */
	@CatchDbError()
	async tryStartSubtitlesGeneration(videoId: number, userId: number): Promise<boolean> {
		const res = await this.prisma.video.updateMany({
			where: {
				id: videoId,
				video_collection: { user_id: userId },
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
		await this.prisma.video.update({
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
		const res = await this.prisma.video.updateMany({
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
		const video = await this.prisma.video.findUnique({
			where: { id: videoId },
			select: {
				is_file_uploaded: true,
				file_s3_key: true,
				file_duration_sec: true,
				subtitles_generation_charge_kopecks: true,
				subtitles_generation_refunded_at: true,
				subtitles_generation_status: true,
				subtitles_generation_error: true,
				subtitles_generation_started_at: true,
				subtitles_generation_job_id: true,
				video_collection: {
					select: {
						user_id: true,
						source_language_code: true,
					},
				},
			},
		})
		if (!video) return null

		return {
			userId: video.video_collection.user_id,
			languageCode: video.video_collection.source_language_code,
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

	async mapDbVideoToServiceVideo(dbVideo: Video): Promise<VideoServiceModel> {
		return {
			id: dbVideo.id,
			videoCollectionId: dbVideo.video_collection_id,
			name: dbVideo.name,
			note: dbVideo.note,
			fileUrl: null,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			fileSizeMb: dbVideo.file_size_mb,
			fileDurationSec: dbVideo.file_duration_sec,
		}
	}
}
