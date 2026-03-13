import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { PrismaService } from 'db/prisma.service'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { VideoPublicServiceModel } from 'models/videoPublic/videoPublic.service.model'
import { S3ProviderName, VideoPublic } from 'prisma/generated/client'

@Injectable()
export class VideoPublicRepository {
	constructor(
		private prisma: PrismaService,
		private cloudRuS3Service: CloudRuS3Service,
	) {}

	@CatchDbError()
	async createVideo(dto: {
		name: string
		languageCode: Language
		note: string
		covers: string[]
		coverBackgroundColor: string
		year: number
		originalContent: string
		processedContent: string
		contentType?: 'text' | 'subtitles'
		fileName: string
		fileS3Key: string
		s3ProviderName: S3ProviderName
		freeToUse?: boolean
	}) {
		const newVideo = await this.prisma.videoPublic.create({
			data: {
				name: dto.name,
				language_code: dto.languageCode,
				note: dto.note ?? null,
				covers: dto.covers,
				coverBackgroundColor: dto.coverBackgroundColor,
				year: dto.year,
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				content_type: dto.contentType,
				file_name: dto.fileName,
				file_s3_key: dto.fileS3Key,
				s3_provider_name: dto.s3ProviderName,
				free_to_use: dto.freeToUse,
			},
		})

		return this.mapDbVideoToServiceVideo(newVideo)
	}

	@CatchDbError()
	async updateVideoById(
		videoId: number,
		dto: {
			name?: string
			languageCode?: Language
			note?: string
			covers?: string[]
			year: number
			originalContent?: string
			processedContent?: string
			contentType?: 'text' | 'subtitles'
			fileName?: string
			fileS3Key?: string
			s3ProviderName?: S3ProviderName
		},
	) {
		const updatedVideo = await this.prisma.videoPublic.update({
			where: { id: videoId },
			data: {
				name: dto.name,
				language_code: dto.languageCode,
				note: dto.note,
				covers: dto.covers,
				year: dto.year,
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				content_type: dto.contentType,
				file_name: dto.fileName,
				file_s3_key: dto.fileS3Key,
				s3_provider_name: dto.s3ProviderName,
			},
		})

		if (!updatedVideo) return null

		return this.mapDbVideoToServiceVideo(updatedVideo)
	}

	@CatchDbError()
	async deleteVideoById(videoId: number) {
		await this.prisma.videoPublic.delete({
			where: { id: videoId },
		})
	}

	async mapDbVideoToServiceVideo(dbVideo: VideoPublic): Promise<VideoPublicServiceModel> {
		const fileUrl = await this.cloudRuS3Service.getFileUrl(dbVideo.file_s3_key)

		return {
			id: dbVideo.id,
			name: dbVideo.name,
			year: dbVideo.year,
			languageCode: dbVideo.language_code,
			note: dbVideo.note,
			covers: dbVideo.covers,
			fileName: dbVideo.file_name,
			fileS3Key: dbVideo.file_s3_key,
			fileUrl,
			originalContent: dbVideo.original_content,
			processedContent: dbVideo.processed_content,
			contentType: dbVideo.content_type,
			freeToUse: dbVideo.free_to_use ?? false,
		}
	}
}
