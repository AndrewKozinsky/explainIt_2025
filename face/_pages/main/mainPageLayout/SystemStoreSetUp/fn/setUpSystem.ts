import { useEffect } from 'react'
import { useSystemStore } from 'stores/systemStore'
import { getDeviceType } from 'utils/utils'

export function useSetUpSystemStore() {
	const setDeviceType = useSystemStore((s) => s.setDeviceType)

	useEffect(
		function () {
			const deviceType = getDeviceType()
			setDeviceType(deviceType)
		},
		[setDeviceType],
	)
}
