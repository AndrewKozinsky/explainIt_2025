import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoCollectionQueryRepository } from 'repo/videoCollection/videoCollection.queryRepository'

export class GetPublicVideoCollectionCommand implements ICommand {
	constructor(public collectionId: number) {}
}

@CommandHandler(GetPublicVideoCollectionCommand)
export class GetPublicVideoCollectionHandler implements ICommandHandler<GetPublicVideoCollectionCommand> {
	constructor(private videoCollectionQueryRepository: VideoCollectionQueryRepository) {}

	async execute(command: GetPublicVideoCollectionCommand) {
		const { collectionId } = command

		return await this.videoCollectionQueryRepository.getVideoCollectionById(collectionId)
	}
}
