import { useVideosStore, VideosStore } from '../../videosStore'

export const tabsConfig = [
	{
		id: 'videos',
		label: 'Видео',
		onClick: getChangeCurrentMobileContentType('videos'),
	},
	{
		id: 'video',
		label: 'Детали видео',
		onClick: getChangeCurrentMobileContentType('video'),
	},
]

function getChangeCurrentMobileContentType(contentType: VideosStore.MobileCurrentContentType) {
	const { updateMobileCurrentContentType } = useVideosStore.getState()

	return () => {
		updateMobileCurrentContentType(contentType)
	}
}
