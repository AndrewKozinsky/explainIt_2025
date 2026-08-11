import type { LanguageCode } from '@/shared/utils/languages'
import type { DurationKey } from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterDuration'
import type { ProficiencyKey } from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterProficiency'

export type YouTubeVideosFilterValues = {
	languageCode: LanguageCode | undefined
	durationKey: DurationKey
	topicKey: string
	proficiencyKey: ProficiencyKey
}
