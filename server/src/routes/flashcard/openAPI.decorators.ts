import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse, ApiCookieAuth } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { FlashcardOutModel } from 'models/flashcard/flashcard.out.model'
import { AddFlashcardInput } from './inputs/addFlashcard.input'
import { RemoveFlashcardInput } from './inputs/removeFlashcard.input'

export function ApiGetMyFlashcards() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get my flashcards',
			description: 'Get all flashcards for the current user, optionally filtered by language.',
		}),
		ApiCookieAuth(),
		ApiResponse({ status: 200, description: 'OK', type: [FlashcardOutModel] }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiAddFlashcard() {
	return applyDecorators(
		ApiOperation({
			summary: 'Add flashcard',
			description: 'Create a flashcard from a sentence phrase translation.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: AddFlashcardInput }),
		ApiResponse({ status: 201, description: 'Created', type: FlashcardOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({
			status: 400,
			description: [
				errorMessage.flashcard.alreadyExists.errorMessageCode,
				errorMessage.flashcard.sourceLanguageNotFound.errorMessageCode,
			].join(' | '),
		}),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({
			status: 404,
			description: [
				errorMessage.flashcard.sourcePhraseNotFound.errorMessageCode,
				errorMessage.flashcard.sourceSentenceNotFound.errorMessageCode,
			].join(' | '),
		}),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiRemoveFlashcard() {
	return applyDecorators(
		ApiOperation({
			summary: 'Remove flashcard',
			description: 'Delete a flashcard by ID.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: RemoveFlashcardInput }),
		ApiResponse({ status: 200, description: 'OK' }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.flashcard.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}
