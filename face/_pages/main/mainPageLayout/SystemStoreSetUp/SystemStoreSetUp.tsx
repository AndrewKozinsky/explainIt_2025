'use client'

import { useSetUpSystemStore } from '_pages/main/mainPageLayout/SystemStoreSetUp/fn/setUpSystem'

function SystemStoreSetUp() {
	useSetUpSystemStore()

	// This component doesn't render anything, it just loads user data
	// The error handling is done in the hook itself
	return null
}

export default SystemStoreSetUp
