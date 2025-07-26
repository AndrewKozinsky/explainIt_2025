'use client'

import { useFetchCurrentUser } from './fn/fetchCurrentUser'

function CurrentUserLoader() {
	useFetchCurrentUser()

	// This component doesn't render anything, it just loads user data
	// The error handling is done in the hook itself
	return null
}

export default CurrentUserLoader
