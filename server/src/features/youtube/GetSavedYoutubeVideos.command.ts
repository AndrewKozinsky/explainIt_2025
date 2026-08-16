import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { PaginationParams } from 'types/pagination'
import { SavedYoutubeVideosPageOutModel } from 'models/video/savedYoutubeVideosPage.out.model'
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
		public pagination: PaginationParams,
	) {}
}

@CommandHandler(GetSavedYoutubeVideosCommand)
export class GetSavedYoutubeVideosHandler implements ICommandHandler<GetSavedYoutubeVideosCommand> {
	constructor(private videoQueryRepository: VideoQueryRepository) {}

	async execute(command: GetSavedYoutubeVideosCommand): Promise<SavedYoutubeVideosPageOutModel> {
		return await this.videoQueryRepository.getSavedYoutubeVideos(command.filters, command.pagination)
	}
}
