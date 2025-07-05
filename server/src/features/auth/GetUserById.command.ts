import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserQueryRepository } from '../../repo/user.queryRepository'

export class GetUserByIdCommand implements ICommand {
	constructor(public userId: number) {}
}

@CommandHandler(GetUserByIdCommand)
export class GetUserByIdHandler implements ICommandHandler<GetUserByIdCommand> {
	constructor(private adminQueryRepository: UserQueryRepository) {}

	async execute(command: GetUserByIdCommand) {
		const { userId } = command

		return await this.adminQueryRepository.getUserById(userId)
	}
}
