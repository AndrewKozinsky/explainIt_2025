import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { videoQueries } from '@/entities/video/VideosQueryFacade'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { translateServerError } from '@/shared/utils/fetchData/serverErrorTexts'
import PrivateVideosList from '@/widgets/privateVideo/PrivateVideosList/PrivateVideosList'
import { useGetAddVideo } from './fn/useGetAddVideo'

function PrivateVideosListWithAdd() {
	const { data: allVideos, error } = useQuery(videoQueries.getVideos())
	const addVideo = useGetAddVideo()
	const locale = useLocale()

	if (error) {
		return <ErrorMessage text={translateServerError('UNKNOWN_ERROR', {}, locale)} />
	}

	return <PrivateVideosList videos={allVideos?.private ?? []} addVideo={addVideo} />
}

export default PrivateVideosListWithAdd
