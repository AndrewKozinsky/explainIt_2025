import { SentenceRepository } from 'repo/sentence.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { divideTextIntoSentences } from './divideTextIntoSentences'

export async function generateSentencesAndSaveToDB(params: {
	mainConfigService: MainConfigService
	sentenceRepository: SentenceRepository
	content: string
	bookChapterId?: number
	videoPrivateId?: number
	videoPublicId?: number
}) {
	const hasBookChapterId = typeof params.bookChapterId === 'number'
	const hasVideoPrivateId = typeof params.videoPrivateId === 'number'
	const hasVideoPublicId = typeof params.videoPublicId === 'number'

	const targetsCount = [hasBookChapterId, hasVideoPrivateId, hasVideoPublicId].filter(Boolean).length
	if (targetsCount !== 1) {
		throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
	}

	try {
		const sentences = await divideTextIntoSentences({
			mainConfigService: params.mainConfigService,
			text: params.content,
		})

		let cursor = 0

		for (let i = 0; i < sentences.length; i++) {
			const sentence = sentences[i]
			const startOffset = params.content.indexOf(sentence, cursor)
			if (startOffset === -1) {
				throw new Error('Sentence offset not found')
			}

			await params.sentenceRepository.createSentence({
				startOffset,
				length: sentence.length,
				bookChapterId: params.bookChapterId,
				videoPrivateId: params.videoPrivateId,
				videoPublicId: params.videoPublicId,
				orderIndex: i,
			})

			cursor = startOffset + sentence.length
		}
	} catch (error) {
		throw new CustomGraphQLError(
			errorMessage.nlp.cantDivideTextIntoSentences,
			ErrorCode.InternalServerError_500,
		)
	}
}
