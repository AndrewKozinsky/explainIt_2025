'use client'

import { useTranslations } from 'next-intl'
import { useDialogueUserAvatar } from './fn/useDialogueUserAvatar'

type Props = { name: string }

function DialogueUserAvatar({ name }: Props) {
	const { loadedUrl, handleDisplayError } = useDialogueUserAvatar()
	const t = useTranslations('aiDialogueMessages')

	return (
		<div className='dialogue-user-avatar' role='img' aria-label={t('avatar', { name })}>
			{loadedUrl && (
				<img onError={handleDisplayError} src={loadedUrl} alt='' className='dialogue-user-avatar__image' />
			)}
		</div>
	)
}

export default DialogueUserAvatar
