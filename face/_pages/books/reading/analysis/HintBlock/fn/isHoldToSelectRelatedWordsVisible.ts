import { isMacOS } from 'utils/utils'

export function getHotKeyName() {
	const isMac = isMacOS()

	return isMac ? 'Cmd ⌘' : 'Ctrl'
}
