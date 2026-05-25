import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { SubtitlesGenerationQueue } from 'infrastructure/queues/subtitlesGeneration.queue'
import { VideoPrivateSubtitlesStatusOutModel } from 'models/videoPrivate/videoPrivateSubtitlesStatus.out.model'
import { SubtitlesGenerationStatus } from 'prisma/generated/client'
import { calculateSubtitlesGenerationPriceKopecks } from './calculateSubtitlesGenerationPriceKopecks'

export class GenerateSubtitlesCommand implements ICommand {
	constructor(
		public userId: number,
		public videoId: number,
	) {}
}

@CommandHandler(GenerateSubtitlesCommand)
export class StartGenerateSubtitlesHandler implements ICommandHandler<GenerateSubtitlesCommand> {
	constructor(
		private videoRepository: VideoPrivateRepository,
		private subtitlesQueue: SubtitlesGenerationQueue,
		private userBalanceTransactionRepository: UserBalanceTransactionRepository,
		private mainConfig: MainConfigService,
	) {}

	async execute(command: GenerateSubtitlesCommand): Promise<VideoPrivateSubtitlesStatusOutModel> {
		const { userId, videoId } = command

		const state = await this.videoRepository.getSubtitlesGenerationState(videoId)

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
		if (!state.fileDurationSec) {
			throw new CustomError(
				errorMessage.video.subtitlesGenerationDurationRequired,
				ErrorStatusCode.BadRequest_400,
			)
		}

		const { pricePerSecondInKopecks } = this.mainConfig.get().deepgram
		const { asrMarkupMultiplier } = this.mainConfig.get().generateSubtitles

		const amountInKopecks = calculateSubtitlesGenerationPriceKopecks({
			durationSec: state.fileDurationSec,
			pricePerSecondInKopecks,
			asrMarkupMultiplier,
		})

		// Atomic transition: idle/done/failed -> pending. Guards against parallel runs.
		const transitioned = await this.videoRepository.tryStartSubtitlesGeneration(videoId, userId)
		if (!transitioned) {
			throw new CustomError(errorMessage.video.subtitlesGenerationAlreadyRunning, ErrorStatusCode.BadRequest_400)
		}

		let jobId: string

		try {
			await this.userBalanceTransactionRepository.createCharge({ userId, amountInKopecks })
			await this.videoRepository.setSubtitlesGenerationStatus(videoId, SubtitlesGenerationStatus.pending, {
				chargeKopecks: amountInKopecks,
			})
			jobId = await this.subtitlesQueue.enqueue({ videoId, userId })
		} catch (err) {
			if (await this.videoRepository.tryMarkSubtitlesGenerationRefunded(videoId)) {
				await this.userBalanceTransactionRepository.createRefund({ userId, amountInKopecks })
			}

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
