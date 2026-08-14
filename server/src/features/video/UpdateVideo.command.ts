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
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { CueWithOffset } from 'infrastructure/subtitles/subtitles.types'
import { SubtitlesService } from 'infrastructure/subtitles/SubtitlesService'
import { UpdateVideoOutModel } from 'models/video/updateVideo.out.model'
import { VideoLiteOutModel } from 'models/video/videoLite.out.model'

export type UpdateVideoInput = {
	id: number
	name?: null | string
	originalContent?: null | string
	fileName?: null | string
	fileMimeType?: null | string
	isFileUploaded?: boolean
	fileSizeMb?: number
	durationSec?: number
	languageCode?: Language
	coverFileName?: null | string
	coverFileMimeType?: null | string
	isCoverFileUploaded?: boolean
	subtitlesSource?: 'user' | 'youTube' | 'llm'
	subtitlesStatus?: 'idle' | 'pending' | 'processing' | 'done' | 'failed'
	subtitlesErrorCode?: null | string
	proficiencyLevel?: null | number
	topic?: null | string
	learnabilityScore?: null | number
}

export class UpdateVideoCommand implements ICommand {
	constructor(
		public userId: undefined | number,
		public updateVideoInput: UpdateVideoInput,
	) {}
}

@CommandHandler(UpdateVideoCommand)
export class UpdateVideoHandler extends VideoBase implements ICommandHandler<UpdateVideoCommand> {
	constructor(
		private videoRepository: VideoRepository,
		private videoQueryRepository: VideoQueryRepository,
		private subtitleRepository: SubtitleRepository,
		private sentenceRepository: SentenceRepository,
		private subtitleSentenceInitRepository: SubtitleSentenceInitRepository,
		private dbRepository: DBRepository,
		private cloudflareS3Service: CloudflareS3Service,
		mainConfig: MainConfigService,
		subtitlesService: SubtitlesService,
	) {
		super(mainConfig, subtitlesService)
	}

	async execute(command: UpdateVideoCommand): Promise<UpdateVideoOutModel> {
		const { userId, updateVideoInput } = command

		const videoForUpdating = await this.videoQueryRepository.getVideoById(updateVideoInput.id)
		if (!videoForUpdating) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}

		if (videoForUpdating.type === 'private') {
			if (!userId || videoForUpdating.userId !== userId) {
				throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
			}
		}

		const { fileName, fileS3Key, isFileUploaded, uploadUrl } = await this.getUploadFileUrlAndFileDetails(
			videoForUpdating,
			updateVideoInput,
		)

		const { coverFileName, coverFileS3Key, isCoverFileUploaded, uploadCoverUrl } =
			await this.getUploadCoverUrlAndFileDetails(videoForUpdating, updateVideoInput)

		const preparedContentResult = this.prepareTextContentForSaving({
			originalContent: updateVideoInput.originalContent,
			previousProcessedContent: videoForUpdating.processedContent,
		})

		if (preparedContentResult.shouldUpdateRelatedTextData) {
			const effectiveLanguageCode = (updateVideoInput.languageCode ??
				videoForUpdating.languageCode) as Language | null

			if (preparedContentResult.processedContent !== null && !effectiveLanguageCode) {
				throw new CustomError(errorMessage.nlp.languageRequired, ErrorStatusCode.BadRequest_400)
			}

			// Pre-compute sentences OUTSIDE the transaction to avoid keeping
			// the DB transaction open during the external NLP HTTP call.
			let preComputedSentences: string[] | undefined
			if (preparedContentResult.processedContent && effectiveLanguageCode) {
				preComputedSentences = await divideTextIntoSentences({
					mainConfigService: this.mainConfig,
					text: preparedContentResult.processedContent,
					languageCode: effectiveLanguageCode,
				})
			}

			await this.updateVideoTextData({
				videoId: updateVideoInput.id,
				processedContent: preparedContentResult.processedContent,
				languageCode: effectiveLanguageCode,
				subtitles: preparedContentResult.subtitles,
				preComputedSentences,
			})
		}

		const updatedVideo = await this.videoRepository.updateVideoById(updateVideoInput.id, {
			name: updateVideoInput.name,
			originalContent: preparedContentResult.originalContentForVideoUpdate,
			processedContent: preparedContentResult.processedContentForVideoUpdate,
			contentType: preparedContentResult.contentTypeForVideoUpdate,
			sourceLanguageCode: updateVideoInput.languageCode,
			fileName,
			fileS3Key,
			s3ProviderName: fileS3Key ? 'cloudRu' : null,
			isFileUploaded,
			fileSizeMb: updateVideoInput.fileSizeMb,
			durationSec: updateVideoInput.durationSec,
			coverFileName,
			coverFileS3Key,
			isCoverFileUploaded,
			...(updateVideoInput.subtitlesSource !== undefined
				? { subtitlesSource: updateVideoInput.subtitlesSource }
				: {}),
			subtitlesStatus:
				updateVideoInput.subtitlesStatus ??
				(typeof updateVideoInput.originalContent === 'string' ? 'done' : undefined),
			...(updateVideoInput.subtitlesErrorCode !== undefined
				? { subtitlesErrorCode: updateVideoInput.subtitlesErrorCode }
				: {}),
			proficiencyLevel: updateVideoInput.proficiencyLevel,
			topic: updateVideoInput.topic,
			learnabilityScore: updateVideoInput.learnabilityScore,
		})

		if (!updatedVideo) {
			throw new CustomError(errorMessage.unknownDbError, ErrorStatusCode.InternalServerError_500)
		}

		return {
			id: updatedVideo.id,
			name: updatedVideo.name,
			languageCode: updatedVideo.sourceLanguageCode as Language,
			proficiencyLevel: updatedVideo.proficiencyLevel,
			topic: updatedVideo.topic,
			originalContent: updatedVideo.originalContent,
			processedContent: updatedVideo.processedContent,
			contentType: updatedVideo.contentType,
			userId: videoForUpdating.userId,
			uploadUrl,
			uploadCoverUrl,
			fileSizeMb: updatedVideo.fileSizeMb,
			durationSec: updatedVideo.durationSec,
		}
	}

	private async updateVideoTextData(dto: {
		videoId: number
		processedContent: null | string
		languageCode: null | Language
		subtitles?: CueWithOffset[]
		preComputedSentences?: string[]
	}) {
		await this.dbRepository.wrapIntoPrismaTransaction({
			executableCode: async () => {
				await this.subtitleSentenceInitRepository.deleteByVideoId(dto.videoId)
				await this.subtitleRepository.deleteByVideoId(dto.videoId)
				await this.sentenceRepository.deleteByVideoId(dto.videoId)

				if (dto.processedContent === null) return

				if (!dto.languageCode) {
					throw new CustomError(errorMessage.nlp.languageRequired, ErrorStatusCode.BadRequest_400)
				}

				if (dto.subtitles) {
					await this.saveSubtitlesSentencesAndInit({
						videoId: dto.videoId,
						preparedContent: dto.processedContent,
						languageCode: dto.languageCode,
						subtitles: dto.subtitles,
						sentenceRepository: this.sentenceRepository,
						subtitleRepository: this.subtitleRepository,
						subtitleSentenceInitRepository: this.subtitleSentenceInitRepository,
						preComputedSentences: dto.preComputedSentences,
					})
					return
				}

				await generateSentencesAndSaveToDB({
					mainConfigService: this.mainConfig,
					sentenceRepository: this.sentenceRepository,
					processedContent: dto.processedContent,
					languageCode: dto.languageCode,
					videoId: dto.videoId,
					preComputedSentences: dto.preComputedSentences,
				})
			},
		})
	}

	async getUploadCoverUrlAndFileDetails(
		videoForUpdating: {
			type: 'public' | 'private'
			coverFileS3Key: null | string
			isCoverFileUploaded: boolean
			coverFileName: null | string
		},
		updateVideoInput: UpdateVideoInput,
	): Promise<{
		coverFileName: null | string
		coverFileS3Key: null | string
		isCoverFileUploaded: boolean
		uploadCoverUrl: null | string
	}> {
		// Deleting the cover
		if (updateVideoInput.coverFileName === null || updateVideoInput.isCoverFileUploaded === false) {
			if (videoForUpdating.isCoverFileUploaded && videoForUpdating.coverFileS3Key) {
				await this.cloudflareS3Service.deleteFile(videoForUpdating.coverFileS3Key)
			}

			return {
				coverFileName: null,
				coverFileS3Key: null,
				isCoverFileUploaded: false,
				uploadCoverUrl: null,
			}
		}

		// Confirm that the file has been uploaded
		if (updateVideoInput.isCoverFileUploaded) {
			return {
				coverFileName: videoForUpdating.coverFileName,
				coverFileS3Key: videoForUpdating.coverFileS3Key,
				isCoverFileUploaded: true,
				uploadCoverUrl: null,
			}
		}

		// Generate upload URL for a new cover
		if (
			updateVideoInput.coverFileName &&
			updateVideoInput.coverFileMimeType &&
			!videoForUpdating.isCoverFileUploaded
		) {
			const s3FileKey = this.createCoverFileUrl(updateVideoInput.coverFileName, videoForUpdating.type)
			const uploadCoverUrl = await this.cloudflareS3Service.createUploadUrl(
				s3FileKey,
				updateVideoInput.coverFileMimeType,
			)

			return {
				coverFileName: updateVideoInput.coverFileName,
				coverFileS3Key: s3FileKey,
				isCoverFileUploaded: false,
				uploadCoverUrl,
			}
		}

		return {
			coverFileName: videoForUpdating.coverFileName,
			coverFileS3Key: videoForUpdating.coverFileS3Key,
			isCoverFileUploaded: videoForUpdating.isCoverFileUploaded,
			uploadCoverUrl: null,
		}
	}

	private createCoverFileUrl(coverFileName: string, videoType: 'public' | 'private'): string {
		const isDevMode = ['localtest', 'localdev'].includes(this.mainConfig.get().mode!)
		const prefix = videoType === 'public' ? 'publicVideoCovers' : 'privateVideoCovers'
		const folderName = isDevMode ? `${prefix}Dev` : prefix

		return `${folderName}/${crypto.randomUUID()}-${coverFileName}`
	}

	async getUploadFileUrlAndFileDetails(
		videoForUpdating: VideoLiteOutModel,
		updateVideoInput: UpdateVideoInput,
	): Promise<{
		fileName: null | string
		fileS3Key: null | string
		isFileUploaded: boolean
		uploadUrl: null | string
	}> {
		if (updateVideoInput.fileName === null || updateVideoInput.isFileUploaded === false) {
			if (videoForUpdating.isFileUploaded && videoForUpdating.fileS3Key) {
				await this.cloudflareS3Service.deleteFile(videoForUpdating.fileS3Key)
			}

			return {
				fileName: null,
				fileS3Key: null,
				isFileUploaded: false,
				uploadUrl: null,
			}
		}

		if (updateVideoInput.isFileUploaded) {
			return {
				fileName: videoForUpdating.fileName,
				fileS3Key: videoForUpdating.fileS3Key,
				isFileUploaded: true,
				uploadUrl: null,
			}
		}

		if (updateVideoInput.fileName && updateVideoInput.fileMimeType && !videoForUpdating.isFileUploaded) {
			const { s3FileKey, uploadUrl } = await this.prepareFileKeyAndUploadUrl(
				{
					fileName: updateVideoInput.fileName,
					fileMimeType: updateVideoInput.fileMimeType,
					fileDestinationType: 'video',
				},
				this.cloudflareS3Service,
			)

			return {
				fileName: updateVideoInput.fileName,
				fileS3Key: s3FileKey,
				isFileUploaded: false,
				uploadUrl,
			}
		}

		return {
			fileName: videoForUpdating.fileName,
			fileS3Key: videoForUpdating.fileS3Key,
			isFileUploaded: videoForUpdating.isFileUploaded,
			uploadUrl: null,
		}
	}
}
