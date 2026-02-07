import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { VideoPublicRepository } from 'repo/video/videoPublic.repository'
import { Language } from 'utils/languages'
import { PrismaService } from 'db/prisma.service'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { VideoBase } from 'features/video/VideoBase'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { Prisma } from 'prisma/generated/client'
import { charadeSubs } from './publicVideosSubtitles/charadeSubs'
import { hisGirlFridaySubs } from './publicVideosSubtitles/hisGirlFridaySubs'

export class CreateVideosPublicCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreateVideosPublicCommand)
export class CreatePublicVideosHandler extends VideoBase implements ICommandHandler<CreateVideosPublicCommand> {
	constructor(
		private prisma: PrismaService,
		private videoPublicRepository: VideoPublicRepository,
		private sentenceRepository: SentenceRepository,
		private subtitleRepository: SubtitleRepository,
		private subtitleSentenceInitRepository: SubtitleSentenceInitRepository,
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	async execute() {
		const videosData = this.getVideosData()

		for (let i = 0; i < videosData.length; i++) {
			const videoData = videosData[i]

			const existingVideo = await this.prisma.videoPublic.findFirst({
				where: {
					file_s3_key: videoData.file_s3_key,
				},
				select: { id: true },
			})

			if (existingVideo) {
				continue
			}

			const preparedContentResult = this.prepareTextContentForSaving({
				originalContent: videoData.originalContent,
				previousProcessedContent: null,
			})

			if (
				preparedContentResult.originalContentForVideoUpdate === undefined ||
				preparedContentResult.originalContentForVideoUpdate === null ||
				preparedContentResult.processedContentForVideoUpdate === undefined ||
				preparedContentResult.processedContentForVideoUpdate === null ||
				preparedContentResult.contentTypeForVideoUpdate === undefined
			) {
				continue
			}

			let newVideo: Awaited<ReturnType<VideoPublicRepository['createVideo']>>
			try {
				newVideo = await this.videoPublicRepository.createVideo({
					name: videoData.name,
					languageCode: videoData.languageCode as Language,
					year: videoData.year,
					originalContent: preparedContentResult.originalContentForVideoUpdate,
					processedContent: preparedContentResult.processedContentForVideoUpdate,
					contentType: preparedContentResult.contentTypeForVideoUpdate,
					fileName: videoData.fileName,
					fileS3Key: videoData.file_s3_key,
					s3ProviderName: 'cloudRu',
				})
			} catch (e) {
				if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
					continue
				}
				throw e
			}

			if (preparedContentResult.preparedContent !== null) {
				if (preparedContentResult.subtitles) {
					await this.saveSubtitlesSentencesAndInit({
						videoType: 'public',
						videoId: newVideo.id,
						preparedContent: preparedContentResult.preparedContent,
						subtitles: preparedContentResult.subtitles,
						sentenceRepository: this.sentenceRepository,
						subtitleRepository: this.subtitleRepository,
						subtitleSentenceInitRepository: this.subtitleSentenceInitRepository,
					})
				} else {
					await generateSentencesAndSaveToDB({
						mainConfigService: this.mainConfig,
						sentenceRepository: this.sentenceRepository,
						content: preparedContentResult.preparedContent,
						videoPublicId: newVideo.id,
					})
				}
			}
		}
	}

	getVideosData() {
		return [
			{
				name: 'Charade', // Charade (1963).mp4
				languageCode: 'en',
				year: 1963,
				fileName: 'Charade (1963).mp4',
				file_s3_key: 'publicVideoDev/Charade (1963).mp4', // privateVideoDev/4adf6f8e-d299-49f5-b144-7171402e6c8a-test.mp4
				originalContent: charadeSubs,
			},
			{
				name: 'His Girl Friday', // His Girl Friday (1940).mp4
				languageCode: 'en',
				year: 1940,
				fileName: 'His Girl Friday (1940).mp4',
				file_s3_key: 'publicVideoDev/His Girl Friday (1940).mp4',
				originalContent: hisGirlFridaySubs,
			},
		]
	}
}
