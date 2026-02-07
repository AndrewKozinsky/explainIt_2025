import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { VideoPrivateQueryRepository } from 'repo/videoPrivate.queryRepository'
import { VideoPrivateRepository } from 'repo/videoPrivate.repository'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { VideoPrivateFileUrlBase } from 'features/videoPrivate/VideoPrivateFileUrl.base'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { UpdateVideoPrivateOutModel } from 'models/videoPrivate/updateVideoPrivate.out.model'
import { VideoPrivateLiteOutModel } from 'models/videoPrivate/videoPrivateLiteOut.model'
import { divideTextIntoSentences } from '../common/divideTextIntoSentences'

export type UpdatePrivateVideoInput = {
	id: number
	name?: null | string
	originalContent?: null | string
	fileName?: null | string
	fileMimeType?: null | string
	isFileUploaded?: boolean
	fileSizeMb?: number
}

export class UpdatePrivateVideoCommand implements ICommand {
	constructor(
		public userId: number,
		public updateVideoInput: UpdatePrivateVideoInput,
	) {}
}

@CommandHandler(UpdatePrivateVideoCommand)
export class UpdatePrivateVideoHandler
	extends VideoPrivateFileUrlBase
	implements ICommandHandler<UpdatePrivateVideoCommand>
{
	constructor(
		private videoRepository: VideoPrivateRepository,
		private videoQueryRepository: VideoPrivateQueryRepository,
		private sentenceRepository: SentenceRepository,
		private subtitleRepository: SubtitleRepository,
		private subtitleSentenceInitRepository: SubtitleSentenceInitRepository,
		private dbRepository: DBRepository,
		private cloudRuS3Service: CloudRuS3Service,
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	/**
	 * Updates a private video owned by the user.
	 *
	 * Responsibilities:
	 * - validates access (video exists + ownership)
	 * - computes file upload/delete actions
	 * - prepares text content (plain text or SRT)
	 * - rebuilds related text data (subtitles/sentences/init) when needed
	 * - persists fields to DB and returns GraphQL output model
	 */
	async execute(command: UpdatePrivateVideoCommand): Promise<UpdateVideoPrivateOutModel> {
		const { userId, updateVideoInput } = command

		const videoForUpdating = await this.videoQueryRepository.getVideoById(updateVideoInput.id)
		if (!videoForUpdating) {
			throw new CustomGraphQLError(errorMessage.video.notFound, ErrorCode.NotFound_404)
		}

		if (videoForUpdating.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		const { fileName, fileS3Key, isFileUploaded, uploadUrl } = await this.getUploadFileUrlAndFileDetails(
			videoForUpdating,
			updateVideoInput,
		)

		const preparedContentResult = await this.prepareContentForSaving(videoForUpdating, updateVideoInput)

		if (preparedContentResult.shouldUpdateRelatedTextData) {
			await this.dbRepository.wrapIntoPrismaTransaction({
				executableCode: async () => {
					await this.subtitleSentenceInitRepository.deleteByVideoPrivateId(updateVideoInput.id)
					await this.subtitleRepository.deleteByVideoPrivateId(updateVideoInput.id)
					await this.sentenceRepository.deleteByVideoPrivateId(updateVideoInput.id)

					if (preparedContentResult.preparedContent !== null) {
						if (preparedContentResult.subtitles) {
							await this.saveSubtitlesSentencesAndInit({
								videoPrivateId: updateVideoInput.id,
								preparedContent: preparedContentResult.preparedContent,
								subtitles: preparedContentResult.subtitles,
							})
						} else {
							await generateSentencesAndSaveToDB({
								mainConfigService: this.mainConfig,
								sentenceRepository: this.sentenceRepository,
								content: preparedContentResult.preparedContent,
								videoPrivateId: updateVideoInput.id,
							})
						}
					}
				},
			})
		}

		const updatedVideo = await this.videoRepository.updateVideoById(updateVideoInput.id, {
			name: updateVideoInput.name,
			originalContent: preparedContentResult.originalContentForVideoUpdate,
			processedContent: preparedContentResult.processedContentForVideoUpdate,
			contentType: preparedContentResult.contentTypeForVideoUpdate,
			fileName,
			fileS3Key,
			s3ProviderName: 'cloudRu',
			isFileUploaded,
			fileSizeMb: updateVideoInput.fileSizeMb,
		})

		if (!updatedVideo) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return {
			...updatedVideo,
			languageCode: updatedVideo.languageCode,
			uploadUrl,
		}
	}

	/**
	 * Prepares `originalContent` and `processedContent` for DB update and decides whether
	 * related text data (sentences/subtitles/init) must be rebuilt.
	 *
	 * Notes:
	 * - `originalContentForVideoUpdate` is always what user provided (trimmed + BOM stripped)
	 * - `processedContentForVideoUpdate` is a flattened version used for offsets/sentence splitting
	 *
	 * Examples:
	 * - Plain text:
	 *   - input: "Hello\n\nworld"
	 *   - processedContent: "Hello world"
	 * - SRT:
	 *   - input: "1\n00:00:01,000 --> 00:00:02,000\nHello\n\n2\n00:00:02,000 --> 00:00:03,000\nworld"
	 *   - processedContent: "Hello world"
	 */
	private async prepareContentForSaving(
		videoForUpdating: VideoPrivateLiteOutModel,
		updateVideoInput: UpdatePrivateVideoInput,
	): Promise<{
		shouldUpdateRelatedTextData: boolean
		originalContentForVideoUpdate: undefined | null | string
		processedContentForVideoUpdate: undefined | null | string
		contentTypeForVideoUpdate: undefined | 'text' | 'subtitles'
		preparedContent: null | string
		subtitles?: Array<{
			startTimeMs: number
			endTimeMs: number
			startOffset: number
			length: number
			orderIndex: number
		}>
	}> {
		if (updateVideoInput.originalContent === undefined) {
			return {
				shouldUpdateRelatedTextData: false,
				originalContentForVideoUpdate: undefined,
				processedContentForVideoUpdate: undefined,
				contentTypeForVideoUpdate: undefined,
				preparedContent: null,
			}
		}

		if (updateVideoInput.originalContent === null) {
			return {
				shouldUpdateRelatedTextData: true,
				originalContentForVideoUpdate: null,
				processedContentForVideoUpdate: null,
				contentTypeForVideoUpdate: 'text',
				preparedContent: null,
			}
		}

		const raw = updateVideoInput.originalContent
		const normalizedRaw = raw.replace(/^\uFEFF/, '')
		const trimmed = normalizedRaw.trim()

		if (trimmed === '') {
			return {
				shouldUpdateRelatedTextData: true,
				originalContentForVideoUpdate: '',
				processedContentForVideoUpdate: '',
				contentTypeForVideoUpdate: 'text',
				preparedContent: '',
			}
		}

		if (this.isLikelySrt(trimmed)) {
			const { preparedContent, subtitles } = this.parseSrtToPreparedContent(trimmed)

			if (preparedContent === videoForUpdating.processedContent) {
				return {
					shouldUpdateRelatedTextData: false,
					originalContentForVideoUpdate: undefined,
					processedContentForVideoUpdate: undefined,
					contentTypeForVideoUpdate: undefined,
					preparedContent: null,
				}
			}

			return {
				shouldUpdateRelatedTextData: true,
				originalContentForVideoUpdate: trimmed,
				processedContentForVideoUpdate: preparedContent,
				contentTypeForVideoUpdate: 'subtitles',
				preparedContent,
				subtitles,
			}
		}

		const preparedContent = this.dryText(trimmed)

		if (preparedContent === videoForUpdating.processedContent) {
			return {
				shouldUpdateRelatedTextData: false,
				originalContentForVideoUpdate: undefined,
				processedContentForVideoUpdate: undefined,
				contentTypeForVideoUpdate: undefined,
				preparedContent: null,
			}
		}

		return {
			shouldUpdateRelatedTextData: true,
			originalContentForVideoUpdate: trimmed,
			processedContentForVideoUpdate: preparedContent,
			contentTypeForVideoUpdate: 'text',
			preparedContent,
		}
	}

	/**
	 * Normalizes text into a single line.
	 *
	 * Transform:
	 * - replaces any CR/LF line breaks with spaces
	 * - collapses multiple whitespace into a single space
	 * - trims leading/trailing whitespace
	 *
	 * Example:
	 * - input: " Hello\r\n\nworld\t\t! "
	 * - output: "Hello world !"
	 */
	dryText(text: string) {
		// Replace CRLF/CR/LF with spaces, collapse multiple spaces/tabs, and trim
		return text
			.replace(/[\r\n]+/g, ' ')
			.replace(/\s+/g, ' ')
			.trim()
	}

	/**
	 * Heuristic check whether the input text looks like SRT.
	 *
	 * Example:
	 * - input contains: "00:00:01,000 --> 00:00:02,000" => true
	 */
	private isLikelySrt(text: string): boolean {
		if (!text.includes('-->')) return false

		return /\d{2}:\d{2}:\d{2}(?:[,.]\d{1,3})?\s*-->\s*\d{2}:\d{2}:\d{2}(?:[,.]\d{1,3})?/.test(text)
	}

	/**
	 * Parses SRT into a flattened `preparedContent` string and an array of subtitle ranges.
	 *
	 * Offsets (`startOffset`, `length`) are calculated relative to the returned `preparedContent`.
	 *
	 * Example:
	 * - input (SRT):
	 *   "1\n00:00:01,000 --> 00:00:02,000\nHello\n\n2\n00:00:02,000 --> 00:00:03,000\nworld"
	 * - output:
	 *   preparedContent: "Hello world"
	 *   subtitles:
	 *     [{ startTimeMs: 1000, endTimeMs: 2000, startOffset: 0, length: 5, orderIndex: 0 },
	 *      { startTimeMs: 2000, endTimeMs: 3000, startOffset: 6, length: 5, orderIndex: 1 }]
	 */
	private parseSrtToPreparedContent(srt: string): {
		preparedContent: string
		subtitles: Array<{
			startTimeMs: number
			endTimeMs: number
			startOffset: number
			length: number
			orderIndex: number
		}>
	} {
		const normalized = srt.replace(/\r\n?/g, '\n').trim()
		const blocks = normalized.split(/\n{2,}/)

		const subtitles: Array<{
			startTimeMs: number
			endTimeMs: number
			startOffset: number
			length: number
			orderIndex: number
		}> = []

		let preparedContent = ''
		let globalOffset = 0
		let orderIndex = 0

		for (const block of blocks) {
			const lines = block
				.split('\n')
				.map((l) => l.trim())
				.filter((l) => l.length > 0)
			if (lines.length < 2) continue

			let timeLineIndex = 0
			if (/^\d+$/.test(lines[0])) {
				timeLineIndex = 1
			}

			const timeLine = lines[timeLineIndex]
			const match = timeLine.match(
				/(\d{2}:\d{2}:\d{2}(?:[,.]\d{1,3})?)\s*-->\s*(\d{2}:\d{2}:\d{2}(?:[,.]\d{1,3})?)/,
			)
			if (!match) continue

			const startTimeMs = this.parseSrtTimeToMs(match[1])
			const endTimeMs = this.parseSrtTimeToMs(match[2])

			const textLines = lines.slice(timeLineIndex + 1)
			const cueText = this.dryText(textLines.join(' '))
			if (!cueText) continue

			if (preparedContent.length > 0 && !preparedContent.endsWith(' ')) {
				preparedContent += ' '
				globalOffset += 1
			}

			const startOffset = globalOffset
			preparedContent += cueText
			globalOffset += cueText.length

			subtitles.push({
				startTimeMs,
				endTimeMs,
				startOffset,
				length: cueText.length,
				orderIndex,
			})
			orderIndex++
		}

		if (subtitles.length === 0) {
			throw new CustomGraphQLError('Invalid SRT format', ErrorCode.BadRequest_400)
		}

		return { preparedContent: preparedContent.trim(), subtitles }
	}

	/**
	 * Converts SRT time string into milliseconds.
	 * Supports both comma and dot as a millisecond separator and optional milliseconds.
	 *
	 * Examples:
	 * - input: "00:00:01,000" => 1000
	 * - input: "00:00:01.5"   => 1500
	 * - input: "00:00:01"     => 1000
	 */
	private parseSrtTimeToMs(time: string): number {
		const t = time.replace(',', '.')
		const match = t.match(/^(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?$/)
		if (!match) {
			throw new CustomGraphQLError('Invalid SRT time format', ErrorCode.BadRequest_400)
		}

		const hours = Number(match[1])
		const minutes = Number(match[2])
		const seconds = Number(match[3])
		const msPart = match[4] ?? '0'
		const ms = Number(msPart.padEnd(3, '0'))

		return hours * 3_600_000 + minutes * 60_000 + seconds * 1_000 + ms
	}

	/**
	 * Persists subtitles, sentences, and subtitle-to-sentence intersection ranges.
	 *
	 * Workflow:
	 * - splits `preparedContent` into sentences using NLP
	 * - saves `Sentence` rows with offsets relative to `preparedContent`
	 * - saves `Subtitle` rows using provided SRT timing and text offsets
	 * - creates `SubtitleSentenceInit` rows for every overlapping range
	 */
	private async saveSubtitlesSentencesAndInit(dto: {
		videoPrivateId: number
		preparedContent: string
		subtitles: Array<{
			startTimeMs: number
			endTimeMs: number
			startOffset: number
			length: number
			orderIndex: number
		}>
	}) {
		type SentenceRange = { id: number; start: number; end: number }
		const sentences = await divideTextIntoSentences({
			mainConfigService: this.mainConfig,
			text: dto.preparedContent,
		})

		const sentenceRanges: SentenceRange[] = []
		let cursor = 0
		for (let i = 0; i < sentences.length; i++) {
			const sentenceText = sentences[i]
			const startOffset = dto.preparedContent.indexOf(sentenceText, cursor)

			if (startOffset === -1) {
				throw new CustomGraphQLError(
					errorMessage.nlp.cantDivideTextIntoSentences,
					ErrorCode.InternalServerError_500,
				)
			}

			const created = await this.sentenceRepository.createSentence({
				startOffset,
				length: sentenceText.length,
				videoPrivateId: dto.videoPrivateId,
				orderIndex: i,
			})

			sentenceRanges.push({ id: created.id, start: startOffset, end: startOffset + sentenceText.length })
			cursor = startOffset + sentenceText.length
		}

		let sentencePointer = 0

		for (const subtitle of dto.subtitles) {
			const createdSubtitle = await this.subtitleRepository.createSubtitle({
				videoPrivateId: dto.videoPrivateId,
				startTimeMs: subtitle.startTimeMs,
				endTimeMs: subtitle.endTimeMs,
				orderIndex: subtitle.orderIndex,
				startOffset: subtitle.startOffset,
				length: subtitle.length,
			})

			const subtitleStart = subtitle.startOffset
			const subtitleEnd = subtitle.startOffset + subtitle.length

			while (sentencePointer > 0 && sentenceRanges[sentencePointer - 1].end > subtitleStart) {
				sentencePointer--
			}
			while (sentencePointer < sentenceRanges.length && sentenceRanges[sentencePointer].end <= subtitleStart) {
				sentencePointer++
			}

			const initItems: Array<{ subtitleId: number; sentenceId: number; startOffset: number; length: number }> = []

			let sentPointer = sentencePointer

			while (sentPointer < sentenceRanges.length) {
				const range = sentenceRanges[sentPointer]
				if (range.start >= subtitleEnd) break
				const start = Math.max(subtitleStart, range.start)
				const end = Math.min(subtitleEnd, range.end)
				if (start < end) {
					initItems.push({
						subtitleId: createdSubtitle.id,
						sentenceId: range.id,
						startOffset: start,
						length: end - start,
					})
				}
				sentPointer++
			}

			await this.subtitleSentenceInitRepository.createMany({ items: initItems })
		}
	}

	/**
	 * Computes file-related fields (name/s3Key/url/isUploaded) and a pre-signed upload URL.
	 *
	 * Handles:
	 * - file deletion request (`fileName === null` or `isFileUploaded === false`)
	 * - file marked as uploaded (`isFileUploaded === true`)
	 * - upload URL generation when a file is being attached for the first time
	 */
	async getUploadFileUrlAndFileDetails(
		videoForUpdating: VideoPrivateLiteOutModel,
		updateVideoInput: UpdatePrivateVideoInput,
	): Promise<{
		fileName: null | string
		fileS3Key: null | string
		isFileUploaded: boolean
		uploadUrl: null | string
	}> {
		// If tries to delete the file, so delete it
		if (updateVideoInput.fileName === null || updateVideoInput.isFileUploaded === false) {
			if (videoForUpdating.isFileUploaded && videoForUpdating.fileS3Key) {
				await this.cloudRuS3Service.deleteFile(videoForUpdating.fileS3Key)
			}

			return {
				fileName: null,
				fileS3Key: null,
				isFileUploaded: false,
				uploadUrl: null,
			}
		}

		// If report that the file has been downloaded.
		if (updateVideoInput.isFileUploaded) {
			return {
				fileName: videoForUpdating.fileName,
				fileS3Key: videoForUpdating.fileS3Key,
				isFileUploaded: true,
				uploadUrl: null,
			}
		}

		// Put file name and mime type
		if (updateVideoInput.fileName && updateVideoInput.fileMimeType && !videoForUpdating.isFileUploaded) {
			const { s3FileKey, uploadUrl } = await this.prepareFileKeyAndUploadUrl(
				{
					fileName: updateVideoInput.fileName,
					fileMimeType: updateVideoInput.fileMimeType,
					fileDestinationType: 'privateVideo',
				},
				this.cloudRuS3Service,
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
