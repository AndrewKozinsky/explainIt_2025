import { WatchingStoreI } from '_pages/video/watching/watchingStore'
import cn from 'classnames'

export function getSectionClasses(
	mobileContentType: WatchingStoreI.MobileCurrentContentType,
	currentMobileContentType: WatchingStoreI.MobileCurrentContentType,
) {
	const classes = ['watching-text-root__item', `watching-text-root__item--${mobileContentType}`]

	const isThisBlockVisible = currentMobileContentType === mobileContentType

	if (isThisBlockVisible) {
		classes.push('watching-text-root__item--always-visible')
	}

	return cn(classes)
}
