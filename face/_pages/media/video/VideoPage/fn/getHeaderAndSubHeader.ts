// import { useMemo } from 'react'
// import { videoConfig } from '_pages/media/commonComponents/videoConfig'
// import { useVideoStore } from '../../videoStore'

/*export function useGetHeaderAndSubHeader(): {
	header: null | string
	subHeader: null | string
	} {
	const publicVideo = useVideoStore((s) => s.publicVideo)
	const privateVideo = useVideoStore((s) => s.privateVideo)

	return useMemo(
		function () {
			if (publicVideo.data) {
				return {
					header: publicVideo.data.name || videoConfig.newVideoEmptyName,
					subHeader: String(publicVideo.data.year),
				}
			}

			if (privateVideo.data) {
				return {
					header:
						(privateVideo.data.name as unknown as string) ||
						videoConfig.newVideoEmptyName,
					subHeader:
						privateVideo.data.year != null
							? String(privateVideo.data.year)
							: null,
				}
			}

			return {
				header: null,
				subHeader: null,
			}
		},
		[publicVideo, privateVideo],
	)
}*/
