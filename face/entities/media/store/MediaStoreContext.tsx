'use client'

import type { StoreApi, UseBoundStore } from 'zustand'
import type { BaseMediaStore } from './createBaseMediaStore'

const MediaStoreContext = createStrictContext < UseBoundStore<StoreApi<BaseMediaStore>>()

export function MediaStoreProvider({
	store,
	children,
}: {
	store: UseBoundStore<StoreApi<BaseMediaStore>>
	children: React.ReactNode
}) {
	return <MediaStoreContext.Provider value={store}>{children}</MediaStoreContext.Provider>
}

export function useMediaStoreContext() {
	return useStrictContext(MediaStoreContext)
}
