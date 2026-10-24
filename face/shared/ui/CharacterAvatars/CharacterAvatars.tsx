'use client'

import { useState } from 'react'
import cn from 'classnames'
import './CharacterAvatars.scss'

export type CharacterAvatar = {
	id: string
	name: string
	image: { url: string; width: number; height: number; layoutVersion: string | null } | null
}

type Props = { characters: CharacterAvatar[]; size?: 'small' | 'medium'; maxVisible?: number }

/** Нейтральная верхняя левая ячейка; без maxVisible показываются все портреты. */
export default function CharacterAvatars({ characters, size = 'medium', maxVisible }: Props) {
	const visibleCount = maxVisible === undefined ? characters.length : Math.max(0, Math.floor(maxVisible))
	const hidden = Math.max(0, characters.length - visibleCount)

	if (!characters.length) return null

	return (
		<div
			className={cn('character-avatars', `character-avatars--${size}`)}
			role='list'
			aria-label='Участники диалога'
		>
			{characters.slice(0, visibleCount).map((character) => (
				<CharacterFace key={character.id} character={character} />
			))}
			{hidden > 0 && (
				<span className='character-avatars__more' role='listitem' aria-label={`Ещё участников: ${hidden}`}>
					+{hidden}
				</span>
			)}
		</div>
	)
}

function CharacterFace({ character }: { character: CharacterAvatar }) {
	const [failedUrl, setFailedUrl] = useState<string | null>(null)
	const image = character.image

	const valid =
		image?.layoutVersion === 'emotion-grid-4x3-v1' &&
		image.width % 4 === 0 &&
		image.height % 3 === 0 &&
		image.width / 4 === image.height / 3 &&
		image.width / 4 >= 160

	return (
		<span className='character-avatars__face' title={character.name} aria-label={character.name} role='listitem'>
			{valid && image && failedUrl !== image.url ? (
				<img src={image.url} alt='' loading='lazy' onError={() => setFailedUrl(image.url)} />
			) : (
				<span className='character-avatars__placeholder' aria-hidden='true'>
					{character.name.charAt(0)}
				</span>
			)}
		</span>
	)
}
