// import { useReadingStore } from '_pages/books/reading/readingStore'
// import { useMemo } from 'react'
import { isMacOS } from 'utils/utils'

export function getHotKeyName() {
	const isMac = isMacOS()

	return isMac ? 'Cmd ⌘' : 'Ctrl'
}
