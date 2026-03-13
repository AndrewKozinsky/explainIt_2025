import { useWatchingStore } from '../../../watchingStore'

export function useGetPageHeader() {
	const name = useWatchingStore((store) => store.video.data.name)
	return name || ''
}
