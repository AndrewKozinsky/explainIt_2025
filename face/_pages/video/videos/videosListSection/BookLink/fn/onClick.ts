import { useCallback } from 'react'
import { useVideosStore } from '../../../videosStore'

export function useGetOnBookLinkClick() {
	return useCallback(function () {
		useVideosStore.setState({
			mobileCurrentContentType: 'video',
		})
	}, [])
}
