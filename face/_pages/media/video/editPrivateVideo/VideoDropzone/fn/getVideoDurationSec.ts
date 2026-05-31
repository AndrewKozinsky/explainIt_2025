export function getVideoDurationSec(file: File): Promise<number> {
	return new Promise((resolve, reject) => {
		const videoElement = document.createElement('video')
		const objectUrl = URL.createObjectURL(file)

		videoElement.preload = 'metadata'

		videoElement.onloadedmetadata = () => {
			URL.revokeObjectURL(objectUrl)
			resolve(Math.ceil(videoElement.duration))
		}

		videoElement.onerror = () => {
			URL.revokeObjectURL(objectUrl)
			reject(new Error('Cannot read video duration'))
		}

		videoElement.src = objectUrl
	})
}
