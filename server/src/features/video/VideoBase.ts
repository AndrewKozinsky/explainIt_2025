import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { Language } from 'utils/languages'
import { divideTextIntoSentences } from 'features/common/divideTextIntoSentences'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { SubtitlesService } from 'infrastructure/subtitles/SubtitlesService'
import { CueWithOffset } from 'infrastructure/subtitles/subtitles.types'
import { dryText, removeAlignmentTags, removeBOM, removeItalicTags, removeLeadingDashes } from '../mediaCommon'

type FileDestinationType = 'video'
type VideoTextContentType = 'text' | 'subtitles'

export class VideoBase {
	constructor(
		protected mainConfig: MainConfigService,
		protected subtitlesService: SubtitlesService,
	) {}

	protected async prepareFileKeyAndUploadUrl(
		params: {
			fileName: string
			fileMimeType: string
			fileDestinationType: FileDestinationType
		},
		cloudRuS3Service: CloudRuS3Service,
	) {
		const s3FileKey = this.createVideoFileUrl({
			fileName: params.fileName,
			fileDestinationType: params.fileDestinationType,
		})
		const uploadUrl = await cloudRuS3Service.createUploadUrl(s3FileKey, params.fileMimeType)

		return { s3FileKey, uploadUrl }
	}

	protected createVideoFileUrl(input: { fileName: string; fileDestinationType: FileDestinationType }) {
		let folderName = input.fileDestinationType

		const isDevMode = ['localtest', 'localdev'].includes(this.mainConfig.get().mode!)
		if (isDevMode) folderName += 'Dev'

		return `${folderName}/${crypto.randomUUID()}-${input.fileName}`
	}

	protected prepareTextContentForSaving(dto: {
		originalContent: undefined | null | string
		previousProcessedContent: undefined | null | string
	}): {
		shouldUpdateRelatedTextData: boolean
		originalContentForVideoUpdate: undefined | null | string
		processedContentForVideoUpdate: undefined | null | string
		contentTypeForVideoUpdate: undefined | VideoTextContentType
		processedContent: null | string
		subtitles?: CueWithOffset[]
	} {
		if (dto.originalContent === undefined) {
			return {
				shouldUpdateRelatedTextData: false,
				originalContentForVideoUpdate: undefined,
				processedContentForVideoUpdate: undefined,
				contentTypeForVideoUpdate: undefined,
				processedContent: null,
			}
		}

		if (dto.originalContent === null) {
			return {
				shouldUpdateRelatedTextData: true,
				originalContentForVideoUpdate: null,
				processedContentForVideoUpdate: null,
				contentTypeForVideoUpdate: 'text',
				processedContent: null,
			}
		}

		let normalizedRaw = removeBOM(dto.originalContent)
		normalizedRaw = removeAlignmentTags(normalizedRaw)
		normalizedRaw = removeLeadingDashes(normalizedRaw)
		normalizedRaw = removeItalicTags(normalizedRaw)
		const trimmed = normalizedRaw.trim()

		if (trimmed === '') {
			return {
				shouldUpdateRelatedTextData: true,
				originalContentForVideoUpdate: '',
				processedContentForVideoUpdate: '',
				contentTypeForVideoUpdate: 'text',
				processedContent: '',
			}
		}

		if (this.subtitlesService.isLikelySrt(trimmed)) {
			const cues = this.subtitlesService.stringToSrtStructure(trimmed)
			if (!cues) {
				throw new CustomError(errorMessage.invalidSrtFormat, ErrorStatusCode.BadRequest_400)
			}

			const { plainText, cues: subtitles } = this.subtitlesService.cuesToPlainText(cues)

			if (plainText === dto.previousProcessedContent) {
				return {
					shouldUpdateRelatedTextData: false,
					originalContentForVideoUpdate: undefined,
					processedContentForVideoUpdate: undefined,
					contentTypeForVideoUpdate: undefined,
					processedContent: null,
				}
			}

			return {
				shouldUpdateRelatedTextData: true,
				originalContentForVideoUpdate: trimmed,
				processedContentForVideoUpdate: plainText,
				contentTypeForVideoUpdate: 'subtitles',
				processedContent: plainText,
				subtitles,
			}
		}

		const preparedContent = dryText(trimmed)

		if (preparedContent === dto.previousProcessedContent) {
			return {
				shouldUpdateRelatedTextData: false,
				originalContentForVideoUpdate: undefined,
				processedContentForVideoUpdate: undefined,
				contentTypeForVideoUpdate: undefined,
				processedContent: null,
			}
		}

		return {
			shouldUpdateRelatedTextData: true,
			originalContentForVideoUpdate: trimmed,
			processedContentForVideoUpdate: preparedContent,
			contentTypeForVideoUpdate: 'text',
			processedContent: preparedContent,
		}
	}

	protected async saveSubtitlesSentencesAndInit(dto: {
		videoId: number
		preparedContent: string
		languageCode: Language
		subtitles: CueWithOffset[]
		sentenceRepository: SentenceRepository
		subtitleRepository: SubtitleRepository
		subtitleSentenceInitRepository: SubtitleSentenceInitRepository
		preComputedSentences?: string[]
	}) {
		type SentenceRange = { id: number; start: number; end: number }

		const sentences =
			dto.preComputedSentences ??
			(await divideTextIntoSentences({
				mainConfigService: this.mainConfig,
				text: dto.preparedContent,
				languageCode: dto.languageCode,
			}))

		const sentenceRanges: SentenceRange[] = []
		let cursor = 0

		for (let i = 0; i < sentences.length; i++) {
			const sentenceText = sentences[i]
			const startOffset = dto.preparedContent.indexOf(sentenceText, cursor)

			if (startOffset === -1) {
				throw new CustomError(
					errorMessage.nlp.cantDivideTextIntoSentences,
					ErrorStatusCode.InternalServerError_500,
				)
			}

			const createdSentence = await dto.sentenceRepository.createSentence({
				startOffset,
				length: sentenceText.length,
				orderIndex: i,
				videoId: dto.videoId,
			})

			sentenceRanges.push({
				id: createdSentence.id,
				start: startOffset,
				end: startOffset + sentenceText.length,
			})

			cursor = startOffset + sentenceText.length
		}

		let sentencePointer = 0

		for (const subtitle of dto.subtitles) {
			const createdSubtitle = await dto.subtitleRepository.createSubtitle({
				startTimeMs: subtitle.startTimeMs,
				endTimeMs: subtitle.endTimeMs,
				orderIndex: subtitle.orderIndex,
				startOffset: subtitle.startOffset,
				length: subtitle.length,
				videoId: dto.videoId,
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

			await dto.subtitleSentenceInitRepository.createMany({ items: initItems })
		}
	}
}
