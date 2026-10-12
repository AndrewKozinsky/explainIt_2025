import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

export class GetUserByIdCommand implements ICommand {
	constructor(public userId: number) {}
}

@CommandHandler(GetUserByIdCommand)
export class GetUserByIdHandler implements ICommandHandler<GetUserByIdCommand> {
	constructor(private userQueryRepository: UserQueryRepository) {}

	async execute(command: GetUserByIdCommand) {
		const { userId } = command

		const user = await this.userQueryRepository.getUserById(userId)
		if (!user) throw new CustomError(errorMessage.user.notFound, ErrorStatusCode.NotFound_404)

		return user
	}
}
