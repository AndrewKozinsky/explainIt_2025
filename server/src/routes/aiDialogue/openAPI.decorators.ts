import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiCookieAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'
import { CreateAiDialogueInput } from './inputs/createAiDialogue.input'

export function ApiCreateAiDialogue() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create AI dialogue',
			description: 'Creates a new dialogue that follows the given scenario for the authenticated user.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: CreateAiDialogueInput }),
		ApiResponse({ status: 201, description: 'Created', type: AiDialogueOutModel }),
	)
}

export function ApiGetAiDialogues() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get current user AI dialogues',
			description: 'Returns the list of dialogues of the current user with their scenarios.',
		}),
		ApiCookieAuth(),
		ApiResponse({ status: 200, description: 'OK', type: [AiDialogueOutModel] }),
	)
}

export function ApiDeleteAiDialogue() {
	return applyDecorators(
		ApiOperation({
			summary: 'Delete AI dialogue',
			description: 'Deletes the dialogue of the current user by id.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'AI dialogue ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK' }),
	)
}
