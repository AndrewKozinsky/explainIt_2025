import { useCallback } from 'react'
import { useDialogueVisuals } from '../../../visuals/DialogueVisualsContext'
import { useDialogueImage } from '../../visuals/fn/useDialogueImage'
import { getEmotionCell } from './getEmotionCell'

type Params = { npcId?: string; emotion?: string }

export function useDialogueNpcAvatar({ npcId, emotion }: Params) {
	const { characters, recoverImage } = useDialogueVisuals()
	const sheet = npcId ? characters.get(npcId)?.emotionSheet : null
	const supportedSheet =
		sheet?.layoutVersion === 'emotion-grid-4x3-v1' &&
		sheet.width % 4 === 0 &&
		sheet.height % 3 === 0 &&
		sheet.width / 4 === sheet.height / 3 &&
		sheet.width / 4 >= 160

	const url = supportedSheet ? sheet?.url : undefined
	const assetKey = `character-${sheet?.id ?? npcId}`
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
		imageStyle: { left: `${-column * 100}%`, top: `${-row * 100}%` },
	}
}
