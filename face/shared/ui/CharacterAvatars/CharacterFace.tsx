'use client'

import { useState } from 'react'
import './CharacterAvatars.scss'

type Props = { name: string; imageUrl: string | null; decorative?: boolean }

/** CSS обрезает нейтральную верхнюю левую ячейку общего спрайта. */
export default function CharacterFace({ name, imageUrl, decorative }: Props) {
	const [failedUrl, setFailedUrl] = useState<string | null>(null)

	return (
		<span
			className='character-avatars__face'
			title={decorative ? undefined : name}
			aria-hidden={decorative}
			aria-label={decorative ? undefined : name}
			role={decorative ? undefined : 'listitem'}
		>
			{imageUrl && failedUrl !== imageUrl ? (
				<img src={imageUrl} alt='' loading='lazy' onError={() => setFailedUrl(imageUrl)} />
			) : (
				<span className='character-avatars__placeholder' aria-hidden='true'>
					{name.charAt(0)}
				</span>
			)}
		</span>
	)
}
