import { useCallback } from 'react'
import { useDialogueVisuals } from '../DialogueVisualsContext'
import { getEmotionCell } from './getEmotionCell'
import { useDialogueImage } from './useDialogueImage'

type Params = { npcId?: string; emotion?: string; isUser: boolean }

export function useDialogueAvatar({ npcId, emotion, isUser }: Params) {
	const { characters, userAvatarUrl, recoverImage } = useDialogueVisuals()
	const sheet = npcId ? characters.get(npcId)?.emotionSheet : null
	const supportedSheet =
		sheet?.layoutVersion === 'emotion-grid-4x3-v1' &&
		sheet.width % 4 === 0 &&
		sheet.height % 3 === 0 &&
		sheet.width / 4 === sheet.height / 3 &&
		sheet.width / 4 >= 120
	const url = isUser ? userAvatarUrl : supportedSheet ? sheet?.url : undefined
	const assetKey = isUser ? 'user-avatar' : `character-${sheet?.id ?? npcId}`
	const onError = useCallback(
		function () {
			recoverImage(assetKey)
		},
		[recoverImage, assetKey],
	)
	const { loadedUrl, handleDisplayError } = useDialogueImage(url, true, onError)
	const { column, row } = getEmotionCell(emotion)

	return {
		loadedUrl,
		handleDisplayError,
		imageStyle: isUser ? undefined : { left: `${-column * 100}%`, top: `${-row * 100}%` },
	}
}
