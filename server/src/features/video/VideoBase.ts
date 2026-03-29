import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { divideTextIntoSentences } from 'features/common/divideTextIntoSentences'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { dryText, removeBOM } from '../mediaCommon'

type FileDestinationType = 'privateVideo' | 'publicVideo'
type VideoTextContentType = 'text' | 'subtitles'

export class VideoBase {
	constructor(protected mainConfig: MainConfigService) {}

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

	protected isLikelySrt(text: string): boolean {
		if (!text.includes('-->')) return false
		return /\d{2}:\d{2}:\d{2}(?:[,.]\d{1,3})?\s*-->\s*\d{2}:\d{2}:\d{2}(?:[,.]\d{1,3})?/.test(text)
	}

	protected parseSrtToPreparedContent(srt: string): {
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
			const cueText = dryText(textLines.join(' '))
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
			throw new CustomGraphQLError(errorMessage.invalidSrtFormat, ErrorCode.BadRequest_400)
		}

		return { preparedContent: preparedContent.trim(), subtitles }
	}

	private parseSrtTimeToMs(time: string): number {
		const t = time.replace(',', '.')
		const match = t.match(/^(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?$/)
		if (!match) {
			throw new CustomGraphQLError(errorMessage.invalidSrtTimeFormat, ErrorCode.BadRequest_400)
		}

		const hours = Number(match[1])
		const minutes = Number(match[2])
		const seconds = Number(match[3])
		const msPart = match[4] ?? '0'
		const ms = Number(msPart.padEnd(3, '0'))

		return hours * 3_600_000 + minutes * 60_000 + seconds * 1_000 + ms
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
		subtitles?: Array<{
			startTimeMs: number
			endTimeMs: number
			startOffset: number
			length: number
			orderIndex: number
		}>
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

		const normalizedRaw = removeBOM(dto.originalContent)
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

		if (this.isLikelySrt(trimmed)) {
			const { preparedContent, subtitles } = this.parseSrtToPreparedContent(trimmed)

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
				contentTypeForVideoUpdate: 'subtitles',
				processedContent: preparedContent,
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
		videoType: 'private' | 'public'
		videoId: number
		preparedContent: string
		subtitles: Array<{
			startTimeMs: number
			endTimeMs: number
			startOffset: number
			length: number
			orderIndex: number
		}>
		sentenceRepository: SentenceRepository
		subtitleRepository: SubtitleRepository
		subtitleSentenceInitRepository: SubtitleSentenceInitRepository
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

			const createdSentence = await dto.sentenceRepository.createSentence({
				startOffset,
				length: sentenceText.length,
				orderIndex: i,
				videoPrivateId: dto.videoType === 'private' ? dto.videoId : undefined,
				videoPublicId: dto.videoType === 'public' ? dto.videoId : undefined,
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
				videoPrivateId: dto.videoType === 'private' ? dto.videoId : undefined,
				videoPublicId: dto.videoType === 'public' ? dto.videoId : undefined,
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
