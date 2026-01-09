import { useWatchingStore, WatchingStoreI } from '_pages/video/watching/watchingStore'

export const tabsConfig = [
	{
		id: 'keyboard',
		label: 'Клавиши',
		onClick: getChangeCurrentMobileContentType('keyboard'),
	},
	{
		id: 'mouse',
		label: 'Мышь',
		onClick: getChangeCurrentMobileContentType('mouse'),
	},
]

function getChangeCurrentMobileContentType(contentType: WatchingStoreI.HelpCurrentContentType) {
	const { updateHelpCurrentContentType } = useWatchingStore.getState()

	return () => {
		updateHelpCurrentContentType(contentType)
	}
}
