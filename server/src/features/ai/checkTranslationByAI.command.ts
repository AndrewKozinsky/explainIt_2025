import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

export class CheckTranslationByAiCommand implements ICommand {
	constructor(
		public checkTranslationByAiInput: {
			engText: string
			rusText: string
		},
	) {}
}

@CommandHandler(CheckTranslationByAiCommand)
export class CheckTranslationByAiHandler implements ICommandHandler<CheckTranslationByAiCommand> {
	constructor() {}

	async execute(command: CheckTranslationByAiCommand) {}
}
