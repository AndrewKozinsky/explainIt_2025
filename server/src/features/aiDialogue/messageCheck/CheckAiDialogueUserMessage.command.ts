import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueMessageRepository } from 'repo/aiDialogue/aiDialogueMessage.repository'
import { parseAiDialogueSummary } from 'types/aiDialogueSummary'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { AiDialogueUserMessageCheckOutModel } from 'models/aiDialogue/aiDialogueUserMessageCheck.out.model'
import { buildAiDialogueUserMessageCheckPrompt } from './buildAiDialogueUserMessageCheckPrompt'
import { parseAiDialogueUserMessageCheck } from './parseAiDialogueUserMessageCheck'

type CheckUserMessageDto = {
	userId: number
	dialogueId: number
	speech?: string | null
	action?: string | null
}

/** Проверяет грамматику и стиль ещё не отправленной реплики и/или действия пользователя. */
export class CheckAiDialogueUserMessageCommand implements ICommand {
	constructor(public dto: CheckUserMessageDto) {}
}

@CommandHandler(CheckAiDialogueUserMessageCommand)
export class CheckAiDialogueUserMessageHandler implements ICommandHandler<
	CheckAiDialogueUserMessageCommand,
	AiDialogueUserMessageCheckOutModel
> {
	constructor(
		private dialogueRepository: AiDialogueRepository,
		private messageRepository: AiDialogueMessageRepository,
		private llmAdapter: LlmAdapterService,
	) {}

	async execute({ dto }: CheckAiDialogueUserMessageCommand): Promise<AiDialogueUserMessageCheckOutModel> {
		const dialogue = await this.dialogueRepository.getDialogueById(dto.dialogueId)
		if (!dialogue) throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)

		if (dialogue.user_id !== dto.userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		const speech = dto.speech?.trim() ?? ''
		const action = dto.action?.trim() ?? ''
		if (!speech && !action) {
			throw new CustomError(errorMessage.aiDialogue.checkTextRequired, ErrorStatusCode.BadRequest_400)
		}

		const context = await this.messageRepository.getTextCheckContext(dto.dialogueId)
		const summary = parseAiDialogueSummary(dialogue.summary)?.at(-1)
		const messages = buildAiDialogueUserMessageCheckPrompt({
			speech,
			action,
			sourceLanguageCode: dialogue.source_language_code,
			targetLanguageCode: dialogue.target_language_code,
			context: { ...context, summary: summary?.history?.slice(-3_000) ?? '' },
		})

		const output = await this.llmAdapter.generate({ messages, responseFormat: 'text', timeoutMs: 45_000 })
		const result = parseAiDialogueUserMessageCheck(output.content)

		if (!result || (!speech && hasIssues(result.speech)) || (!action && hasIssues(result.action))) {
			throw new CustomError(
				errorMessage.aiDialogue.cannotParseMessageCheck,
				ErrorStatusCode.InternalServerError_500,
			)
		}

		return result
	}
}

function hasIssues(field: AiDialogueUserMessageCheckOutModel['speech']): boolean {
	return field.critical.length > 0 || field.suggestions.length > 0
}
