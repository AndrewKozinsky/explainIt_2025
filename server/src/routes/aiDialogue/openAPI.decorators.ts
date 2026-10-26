import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiCookieAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'
import { AiDialogueAudioOutModel } from 'models/aiDialogue/aiDialogueAudio.out.model'
import { AiDialogueIllustrationStylesOutModel } from 'models/aiDialogue/aiDialogueIllustrationStyles.out.model'
import { AiDialoguesPageOutModel } from 'models/aiDialogue/aiDialogueList.out.model'
import { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { AiDialogueUserMessageCheckOutModel } from 'models/aiDialogue/aiDialogueUserMessageCheck.out.model'
import { AiDialogueVisualsOutModel } from 'models/aiDialogue/aiDialogueVisuals.out.model'
import { CheckAiDialogueUserMessageInput } from './inputs/checkAiDialogueUserMessage.input'
import { CreateAiDialogueInput } from './inputs/createAiDialogue.input'
import { CreateAiDialogueMessageInput } from './inputs/createAiDialogueMessage.input'
import { UpdateAiDialogueInput } from './inputs/updateAiDialogue.input'

export function ApiGetAiDialogueIllustrationStyles() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get available AI dialogue illustration styles',
			description:
				'Public catalog with client translation keys for titles, square signed preview URLs and the default style ID. Does not generate images. URLs last six hours; refresh at urlsExpireAt.',
		}),
		ApiResponse({ status: 200, description: 'OK', type: AiDialogueIllustrationStylesOutModel }),
	)
}

export function ApiCheckAiDialogueUserMessage() {
	return applyDecorators(
		ApiOperation({
			summary: 'Проверить черновик реплики и/или действия',
			description:
				'Проверяет заполненные поля с контекстом диалога. Языки берутся из диалога. Возвращает критические ошибки и рекомендации отдельно для каждого поля. Не сохраняет сообщение, не запускает ответ NPC и не ограничивает отправку сообщений.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'AI dialogue ID', example: 1 }),
		ApiBody({ type: CheckAiDialogueUserMessageInput }),
		ApiResponse({ status: 200, type: AiDialogueUserMessageCheckOutModel }),
		ApiResponse({ status: 400, description: 'Нет текста для проверки или превышен лимит 4000 символов на поле.' }),
		ApiResponse({ status: 401, description: 'Необходима авторизация.' }),
		ApiResponse({ status: 403, description: 'Диалог принадлежит другому пользователю.' }),
		ApiResponse({ status: 404, description: 'Диалог не найден.' }),
		ApiResponse({ status: 500, description: 'Ошибка LLM или некорректный формат результата проверки.' }),
		ApiResponse({ status: 504, description: 'Превышено время ожидания LLM.' }),
	)
}

export function ApiUpdateAiDialogue() {
	return applyDecorators(
		ApiOperation({
			summary: 'Update AI dialogue settings',
			description:
				'Updates settings for the dialogue owner without generating a reply or interrupting SSE. Omit maxCefrLevel to keep it, or send null to disable adaptation. Each turn captures settings once when reading the dialogue; retries retain that snapshot.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'AI dialogue ID', example: 1 }),
		ApiBody({ type: UpdateAiDialogueInput }),
		ApiResponse({ status: 200, description: 'OK', type: AiDialogueOutModel }),
	)
}

export function ApiGetAiDialogueVisuals() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get AI dialogue visuals',
			description: 'Returns visual state and signed image URLs for the dialogue owner.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'AI dialogue ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: AiDialogueVisualsOutModel }),
	)
}

export function ApiCreateAiDialogue() {
	return applyDecorators(
		ApiOperation({
			summary: 'Create AI dialogue',
			description:
				'Creates a new dialogue for the authenticated user. illustrationStyleId is selected once from the public catalog; omission or null uses its default. The style cannot be changed through PATCH.',
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
			description:
				'Returns the current user dialogues ordered by createdAt DESC, id DESC. Page defaults to 1 and pageSize to 3 (maximum 100). Includes the last NPC message, the ready image of the latest scene and all NPCs. Image URLs should be refreshed by urlsExpireAt.',
		}),
		ApiCookieAuth(),
		ApiResponse({ status: 200, description: 'OK', type: AiDialoguesPageOutModel }),
	)
}

export function ApiGetAiDialogue() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get AI dialogue',
			description: 'Returns a single dialogue of the current user by id with its scenario.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'AI dialogue ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: AiDialogueOutModel }),
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

export function ApiCreateAiDialogueMessage() {
	return applyDecorators(
		ApiOperation({
			summary: 'Send a message to AI dialogue',
			description: 'Persists a user event (actions or leaving the NPC) into the dialogue.',
		}),
		ApiCookieAuth(),
		ApiParam({ name: 'id', type: Number, description: 'AI dialogue ID', example: 1 }),
		ApiBody({ type: CreateAiDialogueMessageInput }),
		ApiResponse({ status: 201, description: 'Created', type: AiDialogueMessageOutModel }),
	)
}

export function ApiGetAiDialogueAudio() {
	return applyDecorators(
		ApiOperation({ summary: 'Получить озвучки диалога, включая текущую попытку текстового превью' }),
		ApiCookieAuth(),
		ApiResponse({ status: 200, type: AiDialogueAudioOutModel }),
	)
}
