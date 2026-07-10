import { useWatchingStore } from '_pages/media/watching/watchingStore'

export function useGetPageHeader() {
	const name = useWatchingStore((store) => store.video.data.name) as unknown as string | undefined
	return name || ''
}
