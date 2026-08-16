import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoRepository } from 'repo/video/video.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { VideoSubtitlesStatusOutModel } from 'models/video/videoSubtitlesStatus.out.model'

export class GetSubtitlesGenerationStatusCommand implements ICommand {
	constructor(public videoId: number) {}
}

@CommandHandler(GetSubtitlesGenerationStatusCommand)
export class GetSubtitlesGenerationStatusHandler implements ICommandHandler<GetSubtitlesGenerationStatusCommand> {
	constructor(private videoRepository: VideoRepository) {}

	async execute(command: GetSubtitlesGenerationStatusCommand): Promise<VideoSubtitlesStatusOutModel> {
		const { videoId } = command

		const state = await this.videoRepository.getSubtitlesState(videoId)
		if (!state) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}

		return {
			videoId,
			source: state.source,
			status: state.status,
			errorCode: state.errorCode,
			jobId: state.jobId,
		}
	}
}
