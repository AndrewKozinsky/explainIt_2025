// import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
// import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
// import Paragraph from 'ui/Paragraph/Paragraph'
// import { SectionWithHeader } from '_pages/bookAndVideoCommon/SectionWithHeader/SectionWithHeader'
// import { useVideosStore } from '_pages/video/videos/videosStore'
// import VideoLink from '../VideoLink/VideoLink'

/*function PublicVideosList() {
	return (
		<SectionWithHeader title='Публичные видео'>
			<PublicVideosListContent />
		</SectionWithHeader>
	)
}*/

// export default PublicVideosList

/*function PublicVideosListContent() {
	const publicVideos = useVideosStore((state) => state.publicVideos)

	if (publicVideos.loading) {
		return <LoadingMessage text='Загрузка...' />
	} else if (publicVideos.errorMessage) {
		return <ErrorMessage text={publicVideos.errorMessage} />
	} else if (!publicVideos.data.length) {
		return <Paragraph fontSize={16}>Нет ни одного видео</Paragraph>
	}

	return (
		<>
			{publicVideos.data.map((video) => {
				const videoWithType = { ...video, videoType: 'public' as const }

				return <VideoLink videoData={videoWithType} key={video.id} />
			})}
		</>
	)
}*/
