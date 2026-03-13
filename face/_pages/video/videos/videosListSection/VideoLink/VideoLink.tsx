// import { createMediaIdUrl, pageUrls } from '@/сonsts/pageUrls'
// import MediaLink from '_pages/bookAndVideoCommon/MediaLink/MediaLink'
// import { videoConfig } from '_pages/video/videos/common/videoConfig'
// import { useGetVideoLinkStatus } from './fn/isPageCurrent'
// import { useGetOnBookLinkClick } from './fn/onClick'

/*type VideoLinkProps = {
	videoData: {
		id: number
		videoType: 'public' | 'private'
		year?: null | number
		name?: null | string
	}
}*/

/*function VideoLink(props: VideoLinkProps) {
	const { id, videoType, year, name } = props.videoData

	const videoLinkStatus = useGetVideoLinkStatus(id, videoType)
	const onVideoLinkClick = useGetOnBookLinkClick()
	const videoIdInUrl = createMediaIdUrl(id, videoType)

	const href =
		videoType === 'public' ? pageUrls.videos.video(videoIdInUrl).path : pageUrls.videos.video(videoIdInUrl).path

	return (
		<MediaLink
			href={href}
			info={year?.toString()}
			name={name ? name : videoConfig.emptyVideoName}
			linkStatus={videoLinkStatus}
			onClick={onVideoLinkClick}
		/>
	)
}*/

// export default VideoLink
