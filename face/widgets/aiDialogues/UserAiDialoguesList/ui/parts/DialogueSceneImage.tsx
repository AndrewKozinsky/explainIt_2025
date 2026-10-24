'use client'

import { useState } from 'react'

export default function DialogueSceneImage({ url, title }: { url?: string; title: string }) {
	const [failedUrl, setFailedUrl] = useState<string | null>(null)

	return (
		<div className='ai-dialogue-card__scene'>
			{url && url !== failedUrl && (
				<img src={url} alt={`Сцена диалога «${title}»`} loading='lazy' onError={() => setFailedUrl(url)} />
			)}
		</div>
	)
}
