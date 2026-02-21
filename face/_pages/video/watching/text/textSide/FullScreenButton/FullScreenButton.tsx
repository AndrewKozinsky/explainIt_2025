import React from 'react'
import Button from 'ui/formRelated/buttons/Button/Button'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import { useWatchingStore } from '_pages/video/watching/watchingStore'

function FullScreenButton() {
	const toggleFullScreen = useWatchingStore((s) => s.toggleFullScreen)

	return <Button icon={publicFolderFilesUrls.icons.fullScreenButtonIcon} onClick={toggleFullScreen} />
}

export default FullScreenButton
