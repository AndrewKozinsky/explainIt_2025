import { createBaseMediaStore } from '@/entities/media/store/createBaseMediaStore'

export function setupDeps() {
	const useMediaStore = createBaseMediaStore()

	return { useMediaStore }
}
