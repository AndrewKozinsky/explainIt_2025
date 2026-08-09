import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoOutModel } from 'models/video/video.out.model'

export class GetVideoByYoutubeIdCommand implements ICommand {
	constructor(public videoId: string) {}
}

@CommandHandler(GetVideoByYoutubeIdCommand)
export class GetVideoByYoutubeIdHandler implements ICommandHandler<GetVideoByYoutubeIdCommand> {
	constructor(private videoQueryRepository: VideoQueryRepository) {}

	async execute(command: GetVideoByYoutubeIdCommand): Promise<null | VideoOutModel> {
		return await this.videoQueryRepository.getVideoByYoutubeId(command.videoId)
	}
}
