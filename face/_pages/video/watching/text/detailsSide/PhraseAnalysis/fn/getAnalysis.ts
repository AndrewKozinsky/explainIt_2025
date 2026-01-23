// import { useEffect } from 'react'
// import { useGetFetchAnalysisAndSetInStore } from '_pages/video/watching/common/useAnalysis'
// import { useWatchingStore } from '_pages/video/watching/watchingStore'

/*export function useGetAnalysisAfterSelectedWordChange() {
	const getAnalysis = useGetFetchAnalysisAndSetInStore()

	const selectedText = useWatchingStore((s) => s.selectedText)
	const selectedItem = selectedText.subtitle ?? selectedText.plainText
	const engText = selectedItem?.wordsTexts.join(' ')

	useEffect(
		function () {
			getAnalysis()
		},
		[engText, getAnalysis],
	)
}*/
