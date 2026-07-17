import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoRepository } from 'repo/video/video.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { VideoSubtitlesStatusOutModel } from 'models/video/videoSubtitlesStatus.out.model'

export class GetSubtitlesGenerationStatusCommand implements ICommand {
	constructor(
		public userId: number,
		public videoId: number,
	) {}
}

@CommandHandler(GetSubtitlesGenerationStatusCommand)
export class GetSubtitlesGenerationStatusHandler implements ICommandHandler<GetSubtitlesGenerationStatusCommand> {
	constructor(private videoRepository: VideoRepository) {}

	async execute(command: GetSubtitlesGenerationStatusCommand): Promise<VideoSubtitlesStatusOutModel> {
		const { userId, videoId } = command

		const state = await this.videoRepository.getSubtitlesGenerationState(videoId)
		if (!state) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}
		if (state.userId !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		return {
			videoId,
			status: state.status,
			error: state.error,
			startedAt: state.startedAt ? state.startedAt.toISOString() : null,
			jobId: state.jobId,
		}
	}
}
