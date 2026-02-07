import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

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
		private cloudRuS3Service: CloudRuS3Service,
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

		if (video.fileS3Key) {
			try {
				await this.cloudRuS3Service.deleteFile(video.fileS3Key)
			} catch {
				throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
			}
		}

		await this.videoRepository.deleteVideoById(deleteVideoInput.id)

		return true
	}
}
