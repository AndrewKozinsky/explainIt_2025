import { useEffect } from 'react'
import { getDeviceType } from 'utils/utils'
import { useWatchingStore } from '../../watchingStore'

export function useSetDeviceType() {
	const changeDeviceType = useWatchingStore((s) => s.changeDeviceType)

	useEffect(
		function () {
			const deviceType = getDeviceType()
			changeDeviceType(deviceType)
		},
		[changeDeviceType],
	)
}
