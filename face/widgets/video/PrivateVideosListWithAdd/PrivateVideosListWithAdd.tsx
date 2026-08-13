// 'use client'

import { useQuery } from '@tanstack/react-query'
import { videoQueries } from '@/entities/video/VideosQueryFacade'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { errorMessages } from '@/shared/utils/fetchData/errorMessages'
import PrivateVideosList from '@/widgets/video/PrivateVideosList/PrivateVideosList'
import { useGetAddVideo } from './fn/useGetAddVideo'

function PrivateVideosListWithAdd() {
	const { data: allVideos, error } = useQuery(videoQueries.getVideos())
	const addVideo = useGetAddVideo()

	if (error) {
		return <ErrorMessage text={errorMessages.unknownServerError} />
	}

	return <PrivateVideosList videos={allVideos?.private ?? []} addVideo={addVideo} />
}

export default PrivateVideosListWithAdd
