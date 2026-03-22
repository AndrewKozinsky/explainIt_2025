import { useMemo } from 'react'
import { videoConfig } from '_pages/media/commonComponents/videoConfig'
import { useVideoStore } from '../../videoStore'

export function useGetHeaderAndSubHeader() {
	const publicVideo = useVideoStore((s) => s.publicVideo)
	const privateVideo = useVideoStore((s) => s.privateVideo)

	return useMemo(
		function () {
			if (publicVideo.data) {
				return {
					header: publicVideo.data.name || videoConfig.emptyVideoName,
					subHeader: publicVideo.data.year,
				}
			}

			if (privateVideo.data) {
				return {
					header: privateVideo.data.name || videoConfig.emptyVideoName,
					subHeader: privateVideo.data.year,
				}
			}

			return {
				header: videoConfig.emptyVideoName,
				subHeader: null,
			}
		},
		[publicVideo, privateVideo],
	)
}
