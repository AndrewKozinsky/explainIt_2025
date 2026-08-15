import type { LanguageCode } from '@/shared/utils/languages'
import type { SortKey } from '@/widgets/video/VideosFilterForm/VideosFilterSort'
import type { DurationKey } from '@/widgets/video/VideosFilterForm/YouTubeVideosFilterDuration'
import type { ProficiencyKey } from '@/widgets/video/VideosFilterForm/YouTubeVideosFilterProficiency'

export type YouTubeVideosFilterValues = {
	languageCode: LanguageCode | undefined
	durationKey: DurationKey
	topicKey: string
	proficiencyKey: ProficiencyKey
	sortKey: SortKey
}
