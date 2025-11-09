import { useEffect } from 'react'
import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import { getDeviceType } from 'utils/utils'

export function useSetDeviceType() {
	const changeDeviceType = useReadingStoreNext((s) => s.changeDeviceType)

	useEffect(
		function () {
			const deviceType = getDeviceType()

			changeDeviceType(deviceType)
		},
		[changeDeviceType],
	)
}
