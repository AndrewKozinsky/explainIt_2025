'use client'

import { useDialogueUserAvatar } from './fn/useDialogueUserAvatar'
import './DialogueUserAvatar.scss'

type Props = { name: string }

function DialogueUserAvatar({ name }: Props) {
	const { loadedUrl, handleDisplayError } = useDialogueUserAvatar()

	return (
		<div className='dialogue-user-avatar' role='img' aria-label={`Аватар: ${name}`}>
			{loadedUrl && (
				<img onError={handleDisplayError} src={loadedUrl} alt='' className='dialogue-user-avatar__image' />
			)}
		</div>
	)
}

export default DialogueUserAvatar
