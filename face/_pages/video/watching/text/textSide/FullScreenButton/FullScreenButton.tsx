import { useWatchingStore } from '_pages/video/watching/watchingStore'
import React from 'react'
import Button from 'ui/formRelated/buttons/Button/Button'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'

function FullScreenButton() {
	const toggleFullScreen = useWatchingStore((s) => s.toggleFullScreen)

	return <Button icon={publicFolderFilesUrls.icons.fullScreenButtonIcon} onClick={toggleFullScreen} />
}

export default FullScreenButton
