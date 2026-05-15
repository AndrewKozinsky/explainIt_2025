import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
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
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.NotFound_404)
		}

		if (video.userId !== userId) {
			throw new CustomError(errorMessage.userIsNotOwner, ErrorStatusCode.Forbidden_403)
		}

		if (video.fileS3Key) {
			try {
				await this.cloudRuS3Service.deleteFile(video.fileS3Key)
			} catch {
				throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
			}
		}

		await this.videoRepository.deleteVideoById(deleteVideoInput.id)

		return true
	}
}
