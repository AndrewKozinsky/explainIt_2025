import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { PrismaService } from 'db/prisma.service'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { VideoPrivateServiceModel } from 'models/videoPrivate/videoPrivate.service.model'
import { VideoPrivate, S3ProviderName } from 'prisma/generated/client'

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
	}) {
		const newVideo = await this.prisma.videoPrivate.create({
			data: {
				name: dto.name,
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				content_type: dto.contentType,
				user_id: dto.userId,
				s3_provider_name: dto.s3ProviderName,
				language_code: dto.languageCode,
				file_size_mb: dto.fileSizeMb,
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
			languageCode: Language
			originalContent?: null | string
			processedContent?: null | string
			contentType?: 'text' | 'subtitles'
			fileSizeMb?: number
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
				language_code: dto.languageCode,
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				content_type: dto.contentType,
				file_size_mb: dto.fileSizeMb,
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

	@CatchDbError()
	async clearVideoFileFieldsById(videoId: number): Promise<void> {
		await this.prisma.videoPrivate.update({
			where: { id: videoId },
			data: {
				file_s3_key: null,
				is_file_uploaded: false,
				file_name: null,
			},
		})
	}

	async mapDbVideoToServiceVideo(dbVideo: VideoPrivate): Promise<VideoPrivateServiceModel> {
		const fileUrl = dbVideo.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key) : null

		return {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.language_code,
			fileUrl,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			userId: dbVideo.user_id,
			fileSizeMb: dbVideo.file_size_mb,
		}
	}
}
