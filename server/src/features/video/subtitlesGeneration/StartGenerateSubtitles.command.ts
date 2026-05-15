import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { SubtitlesGenerationQueue } from 'infrastructure/queues/subtitlesGeneration.queue'
import { VideoPrivateSubtitlesStatusOutModel } from 'models/videoPrivate/videoPrivateSubtitlesStatus.out.model'
import { SubtitlesGenerationStatus } from 'prisma/generated/client'

export class StartGenerateSubtitlesCommand implements ICommand {
	constructor(
		public userId: number,
		public videoId: number,
	) {}
}

@CommandHandler(StartGenerateSubtitlesCommand)
export class StartGenerateSubtitlesHandler implements ICommandHandler<StartGenerateSubtitlesCommand> {
	constructor(
		private videoRepository: VideoPrivateRepository,
		private subtitlesQueue: SubtitlesGenerationQueue,
	) {}

	async execute(command: StartGenerateSubtitlesCommand): Promise<VideoPrivateSubtitlesStatusOutModel> {
		const { userId, videoId } = command

		const state = await this.videoRepository.getSubtitlesGenerationState(videoId)

		if (!state) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}
		if (state.userId !== userId) {
			throw new CustomError(errorMessage.userIsNotOwner, ErrorStatusCode.Forbidden_403)
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

		// Atomic transition: idle/done/failed -> pending. Guards against parallel runs.
		const transitioned = await this.videoRepository.tryStartSubtitlesGeneration(videoId, userId)
		if (!transitioned) {
			throw new CustomError(errorMessage.video.subtitlesGenerationAlreadyRunning, ErrorStatusCode.BadRequest_400)
		}

		let jobId: string

		try {
			jobId = await this.subtitlesQueue.enqueue({ videoId, userId })
		} catch (err) {
			// Roll back status if enqueue fails, so the user can retry.
			await this.videoRepository.setSubtitlesGenerationStatus(videoId, SubtitlesGenerationStatus.failed, {
				error: err instanceof Error ? err.message : 'Failed to enqueue subtitles generation job',
			})
			throw err
		}

		await this.videoRepository.setSubtitlesGenerationStatus(videoId, SubtitlesGenerationStatus.pending, {
			jobId,
		})

		return {
			videoId,
			status: SubtitlesGenerationStatus.pending,
			error: null,
			startedAt: new Date().toISOString(),
			jobId,
		}
	}
}
