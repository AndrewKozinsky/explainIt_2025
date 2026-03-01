import { useWatchingStore } from '_pages/video/watching/watchingStore'

export function useGetPageHeader() {
	const name = useWatchingStore((store) => store.video.data.name)
	return name || ''
}
