import { useWatchingStore, WatchingStoreI } from '../../../watchingStore'

export const tabsConfig = [
	{
		id: 'text',
		label: 'Текст',
		onClick: getChangeCurrentMobileContentType('text'),
	},
	{
		id: 'details',
		label: 'Детали',
		onClick: getChangeCurrentMobileContentType('details'),
	},
]

function getChangeCurrentMobileContentType(contentType: WatchingStoreI.MobileCurrentContentType) {
	const { updateMobileCurrentContentType } = useWatchingStore.getState()

	return () => {
		updateMobileCurrentContentType(contentType)
	}
}
