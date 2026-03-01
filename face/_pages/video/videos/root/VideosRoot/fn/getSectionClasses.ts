import cn from 'classnames'
import { VideosStore } from '../../../videosStore'

export function getSectionClasses(
	mobileContentType: VideosStore.MobileCurrentContentType,
	currentMobileContentType: VideosStore.MobileCurrentContentType,
) {
	const classes = ['videos-root__content-item', `videos-root__content-item--${mobileContentType}`]

	const isThisBlockVisible = currentMobileContentType === mobileContentType

	if (isThisBlockVisible) {
		classes.push('videos-root__content-item--always-visible')
	}

	return cn(classes)
}
