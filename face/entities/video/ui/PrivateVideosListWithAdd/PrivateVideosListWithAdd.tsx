// 'use client'

// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
// import PrivateVideosList from '@/entities/video/ui/PrivateVideosList/PrivateVideosList'
// import { videoQueries } from '@/entities/video/VideosQueryFacade'
// import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
// import { errorMessages } from '@/shared/utils/fetchData/errorMessages'
// import { useGetAddVideo } from './fn/useGetAddVideo'

/*
function PrivateVideosListWithAdd() {
	const { data: allVideos, error } = useQuery(videoQueries.getVideos())
	const addVideo = useGetAddVideo()

	if (error) {
		return <ErrorMessage text={errorMessages.unknownServerError} />
	}

	return <PrivateVideosList videos={allVideos?.private ?? []} addVideo={addVideo} />
}
*/

// export default PrivateVideosListWithAdd
