import { useDialogueAvatar } from './fn/useDialogueAvatar'
import './DialogueVisuals.scss'

type Props = { npcId?: string; emotion?: string; name: string; isUser?: boolean }

function DialogueAvatar({ npcId, emotion, name, isUser = false }: Props) {
	const { loadedUrl, handleDisplayError, imageStyle } = useDialogueAvatar({ npcId, emotion, isUser })

	return (
		<div className='ai-dialogue-message__avatar' role='img' aria-label={`Аватар: ${name}`}>
			{loadedUrl && (
				<img
					onError={handleDisplayError}
					src={loadedUrl}
					alt=''
					className={isUser ? 'ai-dialogue-message__avatar-user' : 'ai-dialogue-message__avatar-sheet'}
					style={imageStyle}
				/>
			)}
		</div>
	)
}

export default DialogueAvatar
