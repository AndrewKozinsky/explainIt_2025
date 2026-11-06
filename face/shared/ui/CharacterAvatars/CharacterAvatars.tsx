'use client'

import cn from 'classnames'
import { useTranslations } from 'next-intl'
import CharacterFace from './CharacterFace'
import './CharacterAvatars.scss'

export type CharacterAvatar = {
	id: string
	name: string
	imageUrl: string | null
}

type CharacterAvatarsProps = { characters: CharacterAvatar[]; size?: 'small' | 'medium'; maxVisible?: number }

/** Нейтральная верхняя левая ячейка; без maxVisible показываются все портреты. */
export default function CharacterAvatars(props: CharacterAvatarsProps) {
	const { characters, size = 'medium', maxVisible } = props
	const t = useTranslations('aiDialogue.characterAvatars')

	const visibleCount = maxVisible === undefined ? characters.length : Math.max(0, Math.floor(maxVisible))
	const hidden = Math.max(0, characters.length - visibleCount)

	if (!characters.length) {
		return null
	}

	return (
		<div
			className={cn('character-avatars', `character-avatars--${size}`)}
			role='list'
			aria-label={t('participants')}
		>
			{characters.slice(0, visibleCount).map((character) => (
				<CharacterFace key={character.id} name={character.name} imageUrl={character.imageUrl} />
			))}
			{hidden > 0 && (
				<span
					className='character-avatars__more'
					role='listitem'
					aria-label={t('moreParticipants', { count: hidden })}
				>
					+{hidden}
				</span>
			)}
		</div>
	)
}
