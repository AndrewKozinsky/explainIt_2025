import { useState } from 'react'
import type { DurationKey } from '@/widgets/video/YouTubeVideosFilterForm/YouTubeVideosFilterDuration'

function useDurationFilter() {
	const [durationKey, setDurationKey] = useState<DurationKey>('')

	return { durationKey, setDurationKey }
}

export default useDurationFilter
