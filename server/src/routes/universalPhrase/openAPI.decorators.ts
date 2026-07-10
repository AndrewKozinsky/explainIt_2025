import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { UniversalPhraseOutModel } from 'models/universalPhrase/universalPhrase.out.model'
import { CreateUniversalPhraseInput } from './inputs/createUniversalPhrase.input'

export function ApiGetUniversalPhrase() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get universal phrase',
			description: 'Get phrase with transcription and audio pronunciations by text and language.',
		}),
		ApiResponse({ status: 200, description: 'OK', type: UniversalPhraseOutModel, nullable: true }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiCreateUniversalPhrase() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create universal phrase',
			description: 'Create a new phrase or return existing one with transcription and audio pronunciations.',
		}),
		ApiBody({ type: CreateUniversalPhraseInput }),
		ApiResponse({ status: 201, description: 'Created', type: UniversalPhraseOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}
