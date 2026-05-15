import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { VideoPrivateSubtitlesStatusOutModel } from 'models/videoPrivate/videoPrivateSubtitlesStatus.out.model'

export class GetSubtitlesGenerationStatusCommand implements ICommand {
	constructor(
		public userId: number,
		public videoId: number,
	) {}
}

@CommandHandler(GetSubtitlesGenerationStatusCommand)
export class GetSubtitlesGenerationStatusHandler implements ICommandHandler<GetSubtitlesGenerationStatusCommand> {
	constructor(private videoRepository: VideoPrivateRepository) {}

	async execute(command: GetSubtitlesGenerationStatusCommand): Promise<VideoPrivateSubtitlesStatusOutModel> {
		const { userId, videoId } = command

		const state = await this.videoRepository.getSubtitlesGenerationState(videoId)
		if (!state) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}
		if (state.userId !== userId) {
			throw new CustomError(errorMessage.userIsNotOwner, ErrorStatusCode.Forbidden_403)
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
