import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { UniversalPhraseTranslationOutModel } from 'models/universalPhraseTranslation/universalPhraseTranslation.out.model'
import { GetOrCreateUniversalPhraseTranslationInput } from './inputs/getOrCreateUniversalPhraseTranslation.input'

export function ApiGetOrCreateTranslation() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get or create phrase translation',
			description: 'Get or create translation for a phrase using LLM.',
		}),
		ApiBody({ type: GetOrCreateUniversalPhraseTranslationInput }),
		ApiResponse({ status: 201, description: 'Created', type: UniversalPhraseTranslationOutModel }),
	)
}
