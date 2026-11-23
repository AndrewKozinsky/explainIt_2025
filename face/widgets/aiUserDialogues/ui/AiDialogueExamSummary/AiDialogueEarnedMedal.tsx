import { useState } from 'react'
import './AiDialogueEarnedMedal.scss'

export default function AiDialogueEarnedMedal({ url }: { url: string | null }) {
	const [failedUrl, setFailedUrl] = useState<string | null>(null)
	if (!url || url === failedUrl) return null

	return (
		<img className='ai-dialogue-earned-medal' src={url} alt='' loading='lazy' onError={() => setFailedUrl(url)} />
	)
}
