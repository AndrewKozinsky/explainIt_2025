import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoLiteOutModel } from 'models/video/videoLite.out.model'
import { LanguageCode } from 'prisma/generated/client'

export class GetSavedYoutubeVideosCommand implements ICommand {
	constructor(
		public filters: {
			maxDurationSec?: number
			minDurationSec?: number
			proficiencyLevel?: number
			topic?: string
			languageCode?: LanguageCode
			sortBy?: 'created_at' | 'learnability_score'
			sortDirection?: 'asc' | 'desc'
		},
	) {}
}

@CommandHandler(GetSavedYoutubeVideosCommand)
export class GetSavedYoutubeVideosHandler implements ICommandHandler<GetSavedYoutubeVideosCommand> {
	constructor(private videoQueryRepository: VideoQueryRepository) {}

	async execute(command: GetSavedYoutubeVideosCommand): Promise<VideoLiteOutModel[]> {
		return await this.videoQueryRepository.getSavedYoutubeVideos(command.filters)
	}
}
