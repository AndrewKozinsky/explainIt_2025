import { SentenceRepository } from 'repo/sentence.repository'
import { Language } from 'utils/languages'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { divideTextIntoSentences } from './divideTextIntoSentences'

export async function generateSentencesAndSaveToDB(params: {
	mainConfigService: MainConfigService
	sentenceRepository: SentenceRepository
	processedContent: string
	languageCode: Language
	bookChapterId?: number
	videoId?: number
}) {
	const hasBookChapterId = typeof params.bookChapterId === 'number'
	const hasVideoId = typeof params.videoId === 'number'

	const targetsCount = [hasBookChapterId, hasVideoId].filter(Boolean).length
	if (targetsCount !== 1) {
		throw new CustomError(errorMessage.unknownDbError, ErrorStatusCode.InternalServerError_500)
	}

	try {
		const sentences = await divideTextIntoSentences({
			mainConfigService: params.mainConfigService,
			text: params.processedContent,
			languageCode: params.languageCode,
		})

		let cursor = 0

		for (let i = 0; i < sentences.length; i++) {
			const sentence = sentences[i]
			const startOffset = params.processedContent.indexOf(sentence, cursor)
			if (startOffset === -1) {
				throw new Error('Sentence offset not found')
			}

			await params.sentenceRepository.createSentence({
				startOffset,
				length: sentence.length,
				bookChapterId: params.bookChapterId,
				videoId: params.videoId,
				orderIndex: i,
			})

			cursor = startOffset + sentence.length
		}
	} catch (error) {
		throw new CustomError(errorMessage.nlp.cantDivideTextIntoSentences, ErrorStatusCode.InternalServerError_500)
	}
}
