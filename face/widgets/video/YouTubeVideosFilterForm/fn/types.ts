import type { LanguageCode } from '@/shared/utils/languages'
import type { DurationKey } from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterDuration'

export type YouTubeVideosFilterValues = {
	languageCode: LanguageCode | undefined
	durationKey: DurationKey
	topicKey: string
}
