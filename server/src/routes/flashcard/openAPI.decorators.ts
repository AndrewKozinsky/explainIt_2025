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
	)
}
