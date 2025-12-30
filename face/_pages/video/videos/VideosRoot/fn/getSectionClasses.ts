import cn from 'classnames'

import { VideosStore } from '../../videosStore'

export function getSectionClasses(
	mobileContentType: VideosStore.MobileCurrentContentType,
	currentMobileContentType: VideosStore.MobileCurrentContentType,
) {
	const classes = ['videos-page-content__item', `videos-page-content__item--${mobileContentType}`]

	const isThisBlockVisible = currentMobileContentType === mobileContentType

	if (isThisBlockVisible) {
		classes.push('videos-page-content__item--always-visible')
	}

	return cn(classes)
}
