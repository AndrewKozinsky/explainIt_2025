// 'use client'

// import { createContext, useContext } from 'react'
// import type { StoreApi, UseBoundStore } from 'zustand'
// import type { BaseMediaStore } from './createBaseMediaStore'

// const MediaStoreContext = createContext<UseBoundStore<StoreApi<BaseMediaStore>> | null>(null)

/*export function MediaStoreProvider({
	store,
	children,
}: {
	store: UseBoundStore<StoreApi<BaseMediaStore>>
	children: React.ReactNode
}) {
	return <MediaStoreContext.Provider value={store}>{children}</MediaStoreContext.Provider>
}*/

/*export function useMediaStoreContext(): UseBoundStore<StoreApi<BaseMediaStore>> {
	const store = useContext(MediaStoreContext)
	if (!store) {
		throw new Error('useMediaStoreContext must be used inside MediaStoreProvider')
	}

	return store
}*/
