import { useMemo } from 'react'
import { useChapterStore } from '_pages/media/chapter/chapterStore'
import { bookConfig } from '_pages/media/commonComponents/bookConfig'

export function useGetHeader() {
	const chapter = useChapterStore((s) => s.chapter)

	return useMemo(
		function () {
			return chapter?.data?.header ?? bookConfig.emptyChapterName
		},
		[chapter],
	)
}
