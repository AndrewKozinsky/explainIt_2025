import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { subDays } from 'date-fns'
import { UserSubscriptionRepository } from 'repo/userSubscription.repository'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'

export class CleanupExpiredPrivateMediaCommand implements ICommand {}

@CommandHandler(CleanupExpiredPrivateMediaCommand)
export class CleanupExpiredPrivateMediaHandler implements ICommandHandler<CleanupExpiredPrivateMediaCommand> {
	constructor(
		private userSubscriptionRepository: UserSubscriptionRepository,
		private videoPrivateRepository: VideoPrivateRepository,
		private cloudRuS3Service: CloudRuS3Service,
	) {}

	async execute(): Promise<boolean> {
		const now = new Date()
		const subscriptionCutOffDate = subDays(now, 30)

		const userIdsForCleanup =
			await this.userSubscriptionRepository.getUserIdsWhoseLastPrivateMediaSubscriptionEndedBefore(
				subscriptionCutOffDate,
			)

		if (!userIdsForCleanup.length) {
			return true
		}

		const videosForDeletions =
			await this.videoPrivateRepository.getVideosWithUploadedFilesByUserIds(userIdsForCleanup)

		for (const video of videosForDeletions) {
			const fileKey = video.fileS3Key

			try {
				await this.cloudRuS3Service.deleteFile(fileKey)
			} catch {}

			await this.videoPrivateRepository.clearVideoFileFieldsById(video.id)
		}

		return true
	}
}
