import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoCollectionQueryRepository } from 'repo/videoCollection/videoCollection.queryRepository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

export class GetVideoCollectionCommand implements ICommand {
	constructor(
		public userId: number,
		public collectionId: number,
	) {}
}

@CommandHandler(GetVideoCollectionCommand)
export class GetVideoCollectionHandler implements ICommandHandler<GetVideoCollectionCommand> {
	constructor(private videoCollectionQueryRepository: VideoCollectionQueryRepository) {}

	async execute(command: GetVideoCollectionCommand) {
		const { userId, collectionId } = command

		const collection = await this.videoCollectionQueryRepository.getVideoCollectionById(collectionId)
		if (!collection) {
			throw new CustomError(errorMessage.videoCollection.notFound, ErrorStatusCode.NotFound_404)
		}

		if (collection.userId !== userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		return collection
	}
}
