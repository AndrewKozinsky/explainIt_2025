import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPrivateQueryRepository } from 'src/repo/videoPrivate.queryRepository'

export class GetUserVideosPrivateCommand implements ICommand {
	constructor(public userId: number) {}
}

@CommandHandler(GetUserVideosPrivateCommand)
export class GetUserVideosPrivateHandler implements ICommandHandler<GetUserVideosPrivateCommand> {
	constructor(private videoQueryRepository: VideoPrivateQueryRepository) {}

	async execute(command: GetUserVideosPrivateCommand) {
		const { userId } = command
		return await this.videoQueryRepository.getUserVideos(userId)
	}
}
