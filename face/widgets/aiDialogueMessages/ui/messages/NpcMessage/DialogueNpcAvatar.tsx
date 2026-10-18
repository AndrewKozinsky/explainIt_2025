'use client'

import { useDialogueNpcAvatar } from './fn/useDialogueNpcAvatar'

type Props = { npcId?: string; emotion?: string; name: string }

function DialogueNpcAvatar({ npcId, emotion, name }: Props) {
	const { loadedUrl, handleDisplayError, imageStyle } = useDialogueNpcAvatar({ npcId, emotion })

	return (
		<div className='dialogue-npc-avatar' role='img' aria-label={`Аватар: ${name}`}>
			{loadedUrl && (
				<img
					onError={handleDisplayError}
					src={loadedUrl}
					alt=''
					className='dialogue-npc-avatar__image'
					style={imageStyle}
				/>
			)}
		</div>
	)
}

export default DialogueNpcAvatar
