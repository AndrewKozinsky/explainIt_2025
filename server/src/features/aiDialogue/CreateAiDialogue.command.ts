import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'

export class CreateAiDialogueCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			scenarioId: number
		},
	) {}
}

@CommandHandler(CreateAiDialogueCommand)
export class CreateAiDialogueHandler implements ICommandHandler<CreateAiDialogueCommand, AiDialogueOutModel> {
	constructor(
		private aiDialogueScenarioRepository: AiDialogueScenarioRepository,
		private aiDialogueRepository: AiDialogueRepository,
		private aiDialogueQueryRepository: AiDialogueQueryRepository,
	) {}

	async execute(command: CreateAiDialogueCommand): Promise<AiDialogueOutModel> {
		const { userId, scenarioId } = command.dto

		const scenario = await this.aiDialogueScenarioRepository.getScenarioById(scenarioId)
		if (!scenario) {
			throw new CustomError(errorMessage.aiDialogue.scenarioNotFound, ErrorStatusCode.NotFound_404)
		}

		// Пользователь может начать диалог только по публичному или своему сценарию.
		if (scenario.user_id !== null && scenario.user_id !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		const dialogue = await this.aiDialogueRepository.createDialogue({ userId, scenarioId })

		const dialogueOut = await this.aiDialogueQueryRepository.getDialogueById(dialogue.id)
		if (!dialogueOut) {
			throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.InternalServerError_500)
		}

		return dialogueOut
	}
}
