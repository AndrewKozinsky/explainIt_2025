import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse, ApiCookieAuth } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { SentenceChatMessageOutModel } from 'models/sentenceChat/sentenceChatMessage.out.model'
import { SentenceChatThreadOutModel } from 'models/sentenceChat/sentenceChatThread.out.model'
import { CreateSentenceChatThreadInput } from './inputs/createSentenceChatThread.input'
import { CreateSentenceChatUserMessageInput } from './inputs/createSentenceChatUserMessage.input'

export function ApiGetThread() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get sentence chat thread',
			description: 'Get existing chat thread for a sentence (read-only, does not create).',
		}),
		ApiCookieAuth(),
		ApiResponse({
			status: 200,
			description: 'OK',
			type: SentenceChatThreadOutModel,
			nullable: true,
		}),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiCreateThread() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create sentence chat thread',
			description: 'Create a new chat thread for a sentence.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: CreateSentenceChatThreadInput }),
		ApiResponse({ status: 201, description: 'Created', type: SentenceChatThreadOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({
			status: 400,
			description: errorMessage.sentenceChat.threadAlreadyExists.errorMessageCode,
		}),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.sentence.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiCreateUserMessage() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create user message in thread',
			description: 'Send a user question in an existing chat thread.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: CreateSentenceChatUserMessageInput }),
		ApiResponse({ status: 201, description: 'Created', type: SentenceChatMessageOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({
			status: 400,
			description: [
				errorMessage.sentenceChat.questionIsEmpty.errorMessageCode,
				errorMessage.sentenceChat.previousAnswerNotReady.errorMessageCode,
			].join(' | '),
		}),
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 403, description: errorMessage.user.isNotOwner.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.sentenceChat.threadNotFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}
