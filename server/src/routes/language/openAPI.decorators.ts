import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { LanguageOutModel } from 'models/language/language.out.model'

export function ApiGetLanguages() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get all languages',
			description: 'Returns the list of supported languages.',
		}),
		ApiResponse({ status: 200, description: 'OK', type: [LanguageOutModel] }),
		ApiResponse({ status: 500, description: errorMessage.unknownError.errorMessageCode }),
	)
}
