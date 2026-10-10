import { useDialogueAvatar } from './fn/useDialogueAvatar'
import './DialogueVisuals.scss'

type Props = { npcId?: string; emotion?: string; name: string; isUser?: boolean }

function DialogueAvatar({ npcId, emotion, name, isUser = false }: Props) {
	const { loadedUrl, handleDisplayError, imageStyle } = useDialogueAvatar({ npcId, emotion, isUser })

	return (
		<div className='ai-dialogue-avatar' role='img' aria-label={`Аватар: ${name}`}>
			{loadedUrl && (
				<img
					onError={handleDisplayError}
					src={loadedUrl}
					alt=''
					className={isUser ? 'ai-dialogue-avatar__user' : 'ai-dialogue-avatar__sheet'}
					style={imageStyle}
				/>
			)}
		</div>
	)
}

export default DialogueAvatar
