import type { LanguageCode } from '@/shared/utils/languages'
import { DurationKey } from './duration'
import { ProficiencyKey } from './proficiency'
import { SortKey } from './sort'

export type YouTubeVideosFilterValues = {
	languageCode: LanguageCode | undefined
	durationKey: DurationKey
	topicKey: string
	proficiencyKey: ProficiencyKey
	sortKey: SortKey
}
