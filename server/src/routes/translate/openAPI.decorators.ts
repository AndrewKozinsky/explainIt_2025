import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { SentencePhraseTranslationOutModel } from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'
import { TranslateSentenceResultOutModel } from 'models/sentenceTranslation/translateSentenceResult.out.model'
import { GetPhraseTranslationInput } from './inputs/getPhraseTranslation.input'
import { GetPhraseTranslationsBySentenceInput } from './inputs/getPhraseTranslationsBySentence.input'
import { GetSentenceTranslationInput } from './inputs/getSentenceTranslation.input'
import { TranslatePhraseInput } from './inputs/translatePhrase.input'
import { TranslateSentenceInput } from './inputs/translateSentence.input'

export function ApiGetSentenceTranslation() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get sentence translation',
			description: 'Get existing sentence translation by sentence ID and target language.',
		}),
		ApiBody({ type: GetSentenceTranslationInput }),
		ApiResponse({ status: 200, description: 'OK', type: TranslateSentenceResultOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({
			status: 401,
			description: errorMessage.sentenceTranslation.anonymousUserCannotTranslate.errorMessageCode,
		}),
		ApiResponse({
			status: 403,
			description: errorMessage.sentenceTranslation.userCannotAccessForeignPrivateMedia.errorMessageCode,
		}),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.unknownDbError.errorMessageCode,
				errorMessage.unknownError.errorMessageCode,
			].join(' | '),
		}),
	)
}

export function ApiGetPhraseTranslation() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get phrase translation',
			description: 'Get existing phrase translation by sentence ID, target language, and word offsets.',
		}),
		ApiBody({ type: GetPhraseTranslationInput }),
		ApiResponse({ status: 200, description: 'OK', type: SentencePhraseTranslationOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({
			status: 401,
			description: errorMessage.sentenceTranslation.anonymousUserCannotTranslate.errorMessageCode,
		}),
		ApiResponse({
			status: 403,
			description: errorMessage.sentenceTranslation.userCannotAccessForeignPrivateMedia.errorMessageCode,
		}),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.unknownDbError.errorMessageCode,
				errorMessage.unknownError.errorMessageCode,
			].join(' | '),
		}),
	)
}

export function ApiGetPhraseTranslationsBySentence() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get all phrase translations by sentence',
			description: 'Get all existing phrase translations for a sentence by sentence ID and target language.',
		}),
		ApiBody({ type: GetPhraseTranslationsBySentenceInput }),
		ApiResponse({
			status: 200,
			description: 'OK',
			type: [SentencePhraseTranslationOutModel],
		}),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({
			status: 401,
			description: errorMessage.sentenceTranslation.anonymousUserCannotTranslate.errorMessageCode,
		}),
		ApiResponse({
			status: 403,
			description: errorMessage.sentenceTranslation.userCannotAccessForeignPrivateMedia.errorMessageCode,
		}),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.unknownDbError.errorMessageCode,
				errorMessage.unknownError.errorMessageCode,
			].join(' | '),
		}),
	)
}

export function ApiTranslateSentence() {
	return applyDecorators(
		ApiOperation({
			summary: 'Translate sentence',
			description: 'Translate a sentence to the target language. Creates or returns existing translation.',
		}),
		ApiBody({ type: TranslateSentenceInput }),
		ApiResponse({ status: 200, description: 'OK', type: TranslateSentenceResultOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({
			status: 401,
			description: errorMessage.sentenceTranslation.anonymousUserCannotTranslate.errorMessageCode,
		}),
		ApiResponse({
			status: 403,
			description: errorMessage.sentenceTranslation.userCannotAccessForeignPrivateMedia.errorMessageCode,
		}),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.unknownDbError.errorMessageCode,
				errorMessage.unknownError.errorMessageCode,
			].join(' | '),
		}),
	)
}

export function ApiTranslatePhrase() {
	return applyDecorators(
		ApiOperation({
			summary: 'Translate phrase',
			description:
				'Translate a phrase within a sentence by selected word offsets. Creates or returns existing translation.',
		}),
		ApiBody({ type: TranslatePhraseInput }),
		ApiResponse({ status: 200, description: 'OK', type: SentencePhraseTranslationOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({
			status: 401,
			description: errorMessage.sentenceTranslation.anonymousUserCannotTranslate.errorMessageCode,
		}),
		ApiResponse({
			status: 403,
			description: errorMessage.sentenceTranslation.userCannotAccessForeignPrivateMedia.errorMessageCode,
		}),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.unknownDbError.errorMessageCode,
				errorMessage.unknownError.errorMessageCode,
			].join(' | '),
		}),
	)
}
