import { useEffect, useState } from 'react'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import type { DurationKey } from '@/widgets/video/VideosFilterForm/YouTubeVideosFilterDuration'

function useDurationFilter() {
	const [durationKey, setDurationKey] = useState<DurationKey>(function () {
		return localStorageManager.lastDuration.get() as DurationKey
	})

	useEffect(
		function () {
			localStorageManager.lastDuration.set(durationKey)
		},
		[durationKey],
	)

	return { durationKey, setDurationKey }
}

export default useDurationFilter
