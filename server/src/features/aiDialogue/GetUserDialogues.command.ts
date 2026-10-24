import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueListQueryRepository } from 'repo/aiDialogue/aiDialogueList.queryRepository'
import { AiDialoguesPageOutModel } from 'models/aiDialogue/aiDialogueList.out.model'
import type { PaginationParams } from 'types/pagination'

export class GetUserDialoguesCommand implements ICommand {
	constructor(
		public userId: number,
		public pagination: PaginationParams,
	) {}
}

@CommandHandler(GetUserDialoguesCommand)
export class GetUserDialoguesHandler implements ICommandHandler<GetUserDialoguesCommand, AiDialoguesPageOutModel> {
	constructor(private aiDialogueListQueryRepository: AiDialogueListQueryRepository) {}

	async execute(command: GetUserDialoguesCommand): Promise<AiDialoguesPageOutModel> {
		return this.aiDialogueListQueryRepository.getUserDialogues(command.userId, command.pagination)
	}
}
