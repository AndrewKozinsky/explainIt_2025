'use client'

import { useState } from 'react'

type Props = { name: string; imageUrl: string | null }

/** CSS обрезает нейтральную верхнюю левую ячейку общего спрайта. */
export default function CharacterFace({ name, imageUrl }: Props) {
	const [failedUrl, setFailedUrl] = useState<string | null>(null)

	return (
		<span className='character-avatars__face' title={name} aria-label={name} role='listitem'>
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
