import { useMemo } from 'react'
import { MediaItemsGridConfig } from '_pages/bookAndVideoCommon/MediaItemsGrid/types'
import { useVideosStore } from '../../videosStore'
import { createMediaIdUrl, pageUrls } from 'сonsts/pageUrls'

export function useGetContentConfig() {
	const privateVideos = useVideosStore((s) => s.privateVideos)
	const publicVideos = useVideosStore((s) => s.publicVideos)

	return useMemo(
		function (): {
			loading: boolean
			error: null | string
			config: null | MediaItemsGridConfig
		} {
			const errorMessage = privateVideos.errorMessage || publicVideos.errorMessage
			const isLoading = privateVideos.loading || publicVideos.loading

			if (errorMessage) {
				return {
					loading: false,
					error: errorMessage,
					config: null,
				}
			} else if (isLoading) {
				return {
					loading: false,
					error: null,
					config: null,
				}
			}

			return {
				loading: false,
				error: null,
				config: {
					privateItems: privateVideos.data.map((video) => {
						const videoId = createMediaIdUrl(video.id, 'private')

						return {
							name: video.name,
							subName: video.year,
							url: pageUrls.videos.video(videoId).path,
						}
					}),
					publicItems: publicVideos.data.map((video) => {
						const videoId = createMediaIdUrl(video.id, 'public')

						return {
							name: video.name,
							subName: video.year,
							url: pageUrls.videos.video(videoId).path,
							// backgroundColor: video.backgroundColor,
							backgroundColor: '#313B3C',
							languageCode: video.languageCode,
							coverUrl: video.covers[0],
						}
					}),
				},
			}
		},
		[privateVideos, publicVideos],
	)
}
