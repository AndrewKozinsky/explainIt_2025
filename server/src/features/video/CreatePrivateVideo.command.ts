import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoRepository } from 'repo/video/video.repository'
import { Language } from 'utils/languages'
import { divideTextIntoSentences } from 'features/common/divideTextIntoSentences'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { VideoBase } from 'features/video/VideoBase'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { SubtitlesService } from 'infrastructure/subtitles/SubtitlesService'
import { CreateVideoOutModel } from 'models/video/createVideo.out.model'

export type CreatePrivateVideoInput = {
	name?: null | string
	originalContent?: null | string
	fileSizeMb?: number
	languageCode: Language
	durationSec: number
}

export class CreatePrivateVideoCommand implements ICommand {
	constructor(
		public userId: number,
		public createVideoInput: CreatePrivateVideoInput,
	) {}
}

@CommandHandler(CreatePrivateVideoCommand)
export class CreatePrivateVideoHandler extends VideoBase implements ICommandHandler<CreatePrivateVideoCommand> {
	constructor(
		private videoRepository: VideoRepository,
		private videoQueryRepository: VideoQueryRepository,
		private sentenceRepository: SentenceRepository,
		private subtitleRepository: SubtitleRepository,
		private subtitleSentenceInitRepository: SubtitleSentenceInitRepository,
		private dbRepository: DBRepository,
		mainConfig: MainConfigService,
		subtitlesService: SubtitlesService,
	) {
		super(mainConfig, subtitlesService)
	}

	async execute(command: CreatePrivateVideoCommand): Promise<CreateVideoOutModel> {
		const { userId, createVideoInput } = command

		const preparedContentResult = this.prepareTextContentForSaving({
			originalContent: createVideoInput.originalContent,
			previousProcessedContent: null,
		})

		// Pre-compute sentences OUTSIDE the transaction to avoid keeping
		// the DB transaction open during the external NLP HTTP call.
		let preComputedSentences: string[] | undefined
		if (preparedContentResult.processedContent) {
			preComputedSentences = await divideTextIntoSentences({
				mainConfigService: this.mainConfig,
				text: preparedContentResult.processedContent,
				languageCode: createVideoInput.languageCode,
			})
		}

		const createdVideo = await this.dbRepository.wrapIntoPrismaTransaction({
			executableCode: async () => {
				const newVideo = await this.videoRepository.createVideo({
					type: 'private',
					userId,
					name: createVideoInput.name,
					sourceLanguageCode: createVideoInput.languageCode,
					originalContent: preparedContentResult.originalContentForVideoUpdate,
					processedContent: preparedContentResult.processedContentForVideoUpdate,
					contentType: preparedContentResult.contentTypeForVideoUpdate,
					fileSizeMb: createVideoInput.fileSizeMb,
					durationSec: createVideoInput.durationSec,
				})

				if (!newVideo) {
					throw new CustomError(errorMessage.video.notCreated, ErrorStatusCode.InternalServerError_500)
				}

				if (preparedContentResult.processedContent !== null && preComputedSentences) {
					if (preparedContentResult.subtitles) {
						await this.saveSubtitlesSentencesAndInit({
							videoId: newVideo.id,
							preparedContent: preparedContentResult.processedContent,
							languageCode: createVideoInput.languageCode,
							subtitles: preparedContentResult.subtitles,
							sentenceRepository: this.sentenceRepository,
							subtitleRepository: this.subtitleRepository,
							subtitleSentenceInitRepository: this.subtitleSentenceInitRepository,
							preComputedSentences,
						})
					} else {
						await generateSentencesAndSaveToDB({
							mainConfigService: this.mainConfig,
							sentenceRepository: this.sentenceRepository,
							processedContent: preparedContentResult.processedContent,
							languageCode: createVideoInput.languageCode,
							videoId: newVideo.id,
							preComputedSentences,
						})
					}
				}

				return newVideo
			},
		})

		if (!createdVideo) {
			throw new CustomError(errorMessage.video.notCreated, ErrorStatusCode.InternalServerError_500)
		}

		const video = await this.videoQueryRepository.getCreateVideoById(createdVideo.id)
		if (!video) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.InternalServerError_500)
		}

		return video
	}
}
