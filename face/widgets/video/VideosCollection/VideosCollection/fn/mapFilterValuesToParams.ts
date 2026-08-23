// import type { GetSavedYoutubeVideosParams } from '@/entities/youtube/YoutubeService'
// import type { YouTubeVideosFilterValues } from '@/widgets/video/VideosFilterForm/fn/types'

/*const DURATION_TO_SECONDS: Record<string, { minDurationSec?: number; maxDurationSec?: number }> = {
	'': {},
	'0-5': { maxDurationSec: 300 },
	'5-15': { minDurationSec: 300, maxDurationSec: 900 },
	'15-30': { minDurationSec: 900, maxDurationSec: 1800 },
	'30-60': { minDurationSec: 1800, maxDurationSec: 3600 },
}*/

/*export function mapFilterValuesToParams(values: YouTubeVideosFilterValues): GetSavedYoutubeVideosParams {
	const duration = DURATION_TO_SECONDS[values.durationKey] ?? {}

	return {
		...duration,
		proficiencyLevel: values.proficiencyKey ? Number(values.proficiencyKey) : undefined,
		topic: values.topicKey || undefined,
		languageCode: values.languageCode,
		sortBy: values.sortKey || undefined,
		sortDirection: values.sortKey ? 'desc' : undefined,
	}
}*/
