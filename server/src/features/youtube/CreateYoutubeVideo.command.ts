import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoRepository } from 'repo/video/video.repository'
import { languages } from 'utils/languages'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { SubtitlesGenerationQueue } from 'infrastructure/queues/subtitlesGeneration.queue'
import { YoutubeService } from 'infrastructure/youtube/youtube.service'
import { VideoOutModel } from 'models/video/video.out.model'
import { Prisma } from 'prisma/generated/client'
import { LanguageCode, SubtitlesStatus } from 'prisma/generated/enums'

export class CreateYoutubeVideoCommand implements ICommand {
	constructor(public videoId: string) {}
}

@CommandHandler(CreateYoutubeVideoCommand)
export class CreateYoutubeVideoHandler implements ICommandHandler<CreateYoutubeVideoCommand> {
	constructor(
		private videoRepository: VideoRepository,
		private videoQueryRepository: VideoQueryRepository,
		private youtubeService: YoutubeService,
		private subtitlesQueue: SubtitlesGenerationQueue,
	) {}

	async execute(command: CreateYoutubeVideoCommand): Promise<VideoOutModel> {
		// 1. Check if already exists
		const existing = await this.videoQueryRepository.getVideoByYoutubeId(command.videoId)
		if (existing) {
			return existing
		}

		// 2. Fetch metadata from YouTube
		const youTubeData = await this.youtubeService.getVideoById(command.videoId)

		// 3. Determine language from YouTube metadata
		const languageCode = this.resolveLanguageCode(youTubeData.defaultAudioLanguage)

		// 4. Create video (handles race with parallel requests)
		const created = await this.createVideoSafe(
			command.videoId,
			youTubeData.title,
			languageCode,
			youTubeData.durationSec,
			youTubeData.thumbnailUrl,
		)

		// 5. Enqueue subtitles fetching (do NOT block response)
		try {
			const jobId = await this.subtitlesQueue.enqueue({
				videoId: created.id,
				source: 'youTube',
			})

			await this.videoRepository.setSubtitlesStatus(created.id, SubtitlesStatus.pending, { jobId })
		} catch {
			await this.videoRepository.setSubtitlesStatus(created.id, SubtitlesStatus.failed, {
				errorCode: 'QUEUE_ENQUEUE_FAILED',
			})
		}

		// 6. Return full video data with YouTube dimensions
		const video = await this.videoQueryRepository.getVideoById(created.id)
		if (!video) {
			throw new CustomError(errorMessage.video.notFound, ErrorStatusCode.InternalServerError_500)
		}

		video.ratio = youTubeData.ratio

		return video
	}

	/**
	 * Creates a video record. If a parallel request already created it
	 * (P2002 unique constraint on youtube_video_id), returns the existing row.
	 */
	private async createVideoSafe(
		videoId: string,
		title: string,
		languageCode: LanguageCode,
		durationSec: number,
		coverUrl: string,
	): Promise<{ id: number }> {
		try {
			return await this.videoRepository.createVideo({
				type: 'public',
				name: title,
				sourceLanguageCode: languageCode,
				youtubeVideoId: videoId,
				durationSec,
				coverUrl,
				subtitlesSource: 'youTube',
				subtitlesStatus: 'pending',
			})
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
				const existing = await this.videoQueryRepository.getVideoByYoutubeId(videoId)
				if (existing) {
					return { id: existing.id }
				}
			}
			throw err
		}
	}

	/**
	 * Map YouTube's defaultAudioLanguage (e.g. "en", "en-US", "fr") to our LanguageCode.
	 * Returns null if the language is not supported.
	 */
	private resolveLanguageCode(defaultAudioLanguage: null | string): LanguageCode {
		if (!defaultAudioLanguage) return 'en'

		// YouTube may return a full locale like "en-US" — take the first 2 chars
		const code = defaultAudioLanguage.slice(0, 2).toLowerCase() as LanguageCode
		if (code in languages) return code

		return 'en'
	}
}
