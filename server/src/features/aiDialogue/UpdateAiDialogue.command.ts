import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueCefrLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'

export class UpdateAiDialogueCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			dialogueId: number
			maxCefrLevel?: AiDialogueCefrLevel | null
		},
	) {}
}

@CommandHandler(UpdateAiDialogueCommand)
export class UpdateAiDialogueHandler implements ICommandHandler<UpdateAiDialogueCommand, AiDialogueOutModel> {
	constructor(
		private aiDialogueRepository: AiDialogueRepository,
		private aiDialogueQueryRepository: AiDialogueQueryRepository,
	) {}

	async execute(command: UpdateAiDialogueCommand): Promise<AiDialogueOutModel> {
		const { userId, dialogueId, maxCefrLevel } = command.dto
		const dialogue = await this.aiDialogueRepository.getDialogueById(dialogueId)
		if (!dialogue) {
			throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		}

		if (dialogue.user_id !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		// undefined — ничего не менять; null — явно снять ограничение. Текущий ход не прерывается.
		if (maxCefrLevel !== undefined) {
			const updated = await this.aiDialogueRepository.updateDialogue(dialogueId, userId, {
				max_cefr_level: maxCefrLevel,
			})

			if (!updated) {
				throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
			}
		}

		const dialogueOut = await this.aiDialogueQueryRepository.getDialogueById(dialogueId)
		if (!dialogueOut) {
			throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		}

		return dialogueOut
	}
}
