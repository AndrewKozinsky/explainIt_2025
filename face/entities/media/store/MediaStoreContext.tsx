'use client'

import { createStrictContext, useStrictContext } from '@/shared/utils/context'
import type { BaseMediaStore } from './createBaseMediaStore'
import type { StoreApi, UseBoundStore } from 'zustand'

const MediaStoreContext = createStrictContext<UseBoundStore<StoreApi<BaseMediaStore>>>()

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
