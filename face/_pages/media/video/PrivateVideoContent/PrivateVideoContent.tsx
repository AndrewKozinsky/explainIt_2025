import EditPrivateVideoForm from '_pages/media/video/editPrivateVideo/EditPrivateVideoForm/EditPrivateVideoForm'
import { useVideoStore } from '../videoStore'

export default function PrivateVideoContent() {
	const privateVideo = useVideoStore((s) => s.privateVideo)

	if (!privateVideo.data) {
		return null
	}

	return <EditPrivateVideoForm />
}
