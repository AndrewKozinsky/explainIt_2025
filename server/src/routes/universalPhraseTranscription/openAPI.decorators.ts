import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'
import { CreateUniversalPhraseTranscriptionInput } from './inputs/createUniversalPhraseTranscription.input'

export function ApiGetOrCreateTranscription() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get or create transcription',
			description: 'Get or create transcription for a word using DeepSeek.',
		}),
		ApiBody({ type: CreateUniversalPhraseTranscriptionInput }),
		ApiResponse({ status: 201, description: 'Created', type: TranscriptionOutModel }),
		ApiResponse({
			status: 400,
			description: [
				'Validation error',
				errorMessage.universalTranscription.alreadyExists.errorMessageCode,
				errorMessage.universalTranscription.languageNotSupported.errorMessageCode,
			].join(' | '),
		}),
		ApiResponse({ status: 404, description: errorMessage.universalPhrase.notFound.errorMessageCode }),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.unknownDbError.errorMessageCode,
				errorMessage.universalTranscription.cannotGetTranscriptionFromLLM.errorMessageCode,
			].join(' | '),
		}),
	)
}
