import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoRepository } from 'repo/video/video.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { SubtitlesGenerationQueue } from 'infrastructure/queues/subtitlesGeneration.queue'
import { VideoSubtitlesStatusOutModel } from 'models/video/videoSubtitlesStatus.out.model'
import { SubtitlesStatus } from 'prisma/generated/client'

export class GenerateSubtitlesCommand implements ICommand {
	constructor(
		public userId: number,
		public videoId: number,
	) {}
}

@CommandHandler(GenerateSubtitlesCommand)
export class StartGenerateSubtitlesHandler implements ICommandHandler<GenerateSubtitlesCommand> {
	constructor(
		private videoRepository: VideoRepository,
		private subtitlesQueue: SubtitlesGenerationQueue,
	) {}

	async execute(command: GenerateSubtitlesCommand): Promise<VideoSubtitlesStatusOutModel> {
		const { userId, videoId } = command

		const state = await this.videoRepository.getSubtitlesState(videoId)

		if (!state) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}

		if (state.userId !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		if (!state.isFileUploaded || !state.fileS3Key) {
			throw new CustomError(errorMessage.video.subtitlesGenerationFileNotUploaded, ErrorStatusCode.BadRequest_400)
		}

		if (!state.languageCode) {
			throw new CustomError(
				errorMessage.video.subtitlesGenerationLanguageRequired,
				ErrorStatusCode.BadRequest_400,
			)
		}

		if (!state.durationSec) {
			throw new CustomError(
				errorMessage.video.subtitlesGenerationDurationRequired,
				ErrorStatusCode.BadRequest_400,
			)
		}

		// Atomic transition: idle/done/failed -> pending. Guards against parallel runs.
		const transitioned = await this.videoRepository.tryStartSubtitlesProcessing(videoId, userId)
		if (!transitioned) {
			throw new CustomError(errorMessage.video.subtitlesGenerationAlreadyRunning, ErrorStatusCode.BadRequest_400)
		}

		let jobId: string

		try {
			jobId = await this.subtitlesQueue.enqueue({ videoId, userId, source: 'userUpload' })
		} catch (err) {
			await this.videoRepository.setSubtitlesStatus(videoId, SubtitlesStatus.failed, {
				errorCode: 'QUEUE_ENQUEUE_FAILED',
			})

			throw err
		}

		await this.videoRepository.setSubtitlesStatus(videoId, SubtitlesStatus.pending, {
			jobId,
		})

		return {
			videoId,
			source: 'user',
			status: SubtitlesStatus.pending,
			errorCode: null,
			jobId,
		}
	}
}
