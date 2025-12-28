import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { YandexCloudS3Service } from 'src/infrastructure/yandexCloudS3/yandexCloudS3.service'
import { VideoPrivateRepository } from 'src/repo/videoPrivate.repository'

type DeletePrivateVideoInput = {
	id: number
}

export class DeletePrivateVideoCommand implements ICommand {
	constructor(
		public userId: number,
		public deleteVideoInput: DeletePrivateVideoInput,
	) {}
}

@CommandHandler(DeletePrivateVideoCommand)
export class DeletePrivateVideoHandler implements ICommandHandler<DeletePrivateVideoCommand> {
	constructor(
		private videoRepository: VideoPrivateRepository,
		private yandexCloudS3Service: YandexCloudS3Service,
	) {}

	async execute(command: DeletePrivateVideoCommand) {
		const { userId, deleteVideoInput } = command

		const video = await this.videoRepository.getVideoOwnerAndUrlByVideoId(deleteVideoInput.id)
		if (!video) {
			throw new CustomGraphQLError(errorMessage.video.notFound, ErrorCode.NotFound_404)
		}

		if (video.userId !== userId) {
			throw new CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)
		}

		if (video.url) {
			try {
				await this.yandexCloudS3Service.deleteFile(video.url)
			} catch {
				throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
			}
		}

		await this.videoRepository.deleteVideoById(deleteVideoInput.id)

		return true
	}
}
