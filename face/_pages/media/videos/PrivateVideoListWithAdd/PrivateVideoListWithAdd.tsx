'use client'

import type { VideoLiteModel } from '@/entites/videos/repository/VideosRepository'
import PrivateVideosList from '@/entites/videos/ui/PrivateVideosList/PrivateVideosList'
import { useGetAddVideo } from './fn/useGetAddVideo'

type PrivateVideosWithAddProps = {
	videos: VideoLiteModel[]
}

/**
 * Клиентский wiring-компонент: берёт {@link useGetAddVideo}
 * и явно передаёт обработчик в {@link PrivateVideosList}.
 */
export function PrivateVideosListWithAdd(props: PrivateVideosWithAddProps) {
	const { videos } = props
	const addVideo = useGetAddVideo()

	return <PrivateVideosList videos={videos} addVideo={addVideo} />
}
