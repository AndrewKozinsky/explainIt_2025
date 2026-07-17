import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { VideoCollectionOutModel } from 'models/videoCollection/videoCollection.out.model'
import { Prisma } from 'prisma/generated/client'

type DbVideoCollectionWithVideos = Prisma.VideoCollectionGetPayload<{ include: { Video: true } }>

@Injectable()
export class VideoCollectionQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudRuS3Service: CloudRuS3Service,
	) {}

	@CatchDbError()
	async getVideoCollectionById(id: number) {
		const collection = await this.prisma.videoCollection.findUnique({
			where: { id },
			include: { Video: { orderBy: { created_at: 'asc' } } },
		})

		if (!collection) {
			return null
		}

		return this.mapDbVideoCollectionToOutModel(collection)
	}

	async mapDbVideoCollectionToOutModel(
		dbCollection: DbVideoCollectionWithVideos,
	): Promise<VideoCollectionOutModel> {
		const videos = await Promise.all(
			dbCollection.Video.map(async (video) => ({
				id: video.id,
				name: video.name,
				note: video.note,
				fileName: video.file_name,
				fileUrl: video.file_s3_key ? await this.cloudRuS3Service.getFileUrl(video.file_s3_key) : null,
				isFileUploaded: !!video.is_file_uploaded,
			})),
		)

		return {
			id: dbCollection.id,
			type: dbCollection.type,
			userId: dbCollection.user_id,
			name: dbCollection.name,
			languageCode: dbCollection.source_language_code,
			note: dbCollection.note,
			videos,
		}
	}
}
