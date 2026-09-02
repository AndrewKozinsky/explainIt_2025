import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueOutModel } from 'models/aiDialogue/aiDialogue.out.model'

export class GetUserDialoguesCommand implements ICommand {
	constructor(public userId: number) {}
}

@CommandHandler(GetUserDialoguesCommand)
export class GetUserDialoguesHandler implements ICommandHandler<GetUserDialoguesCommand, AiDialogueOutModel[]> {
	constructor(private aiDialogueQueryRepository: AiDialogueQueryRepository) {}

	async execute(command: GetUserDialoguesCommand): Promise<AiDialogueOutModel[]> {
		return await this.aiDialogueQueryRepository.getUserDialogues(command.userId)
	}
}
