import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { charadeSubs } from './publicVideosSubtitles/charadeSubs'
import { hisGirlFridaySubs } from './publicVideosSubtitles/hisGirlFridaySubs'

export class CreateVideosPublicCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreateVideosPublicCommand)
export class CreatePublicVideosHandler implements ICommandHandler<CreateVideosPublicCommand> {
	constructor(private commandBus: CommandBus) {}

	async execute() {
		for (let i = 0; i < this.getVideosData().length; i++) {
			//
		}
	}

	getVideosData() {
		return [
			{
				name: 'Charade', // Charade (1963).mp4
				languageCode: 'en',
				year: 1963,
				fileName: 'Charade (1963).mp4',
				file_s3_key: 'publicVideoDev/Charade (1963).mp4', // privateVideoDev/4adf6f8e-d299-49f5-b144-7171402e6c8a-test.mp4
				s3ProviderName: 'cloudRu',
				originalContent: charadeSubs,
			},
			{
				name: 'His Girl Friday (1940)', // His Girl Friday (1940).mp4
				languageCode: 'en',
				year: 1940,
				fileName: 'His Girl Friday (1940).mp4',
				file_s3_key: 'publicVideoDev/His Girl Friday (1940).mp4',
				s3ProviderName: 'cloudRu',
				originalContent: hisGirlFridaySubs,
			},
		]
	}
}
