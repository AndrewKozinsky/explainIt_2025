import { useDialogueSceneImage } from './fn/useDialogueSceneImage'
import './DialogueVisuals.scss'

type Props = { messageId?: number; reserveSpace: boolean }

function DialogueSceneImage({ messageId, reserveSpace }: Props) {
	const { slotRef, showSlot, loadedUrl, isError, handleDisplayError, retryDownload, failed } = useDialogueSceneImage(
		messageId,
		reserveSpace,
	)

	if (!showSlot) return null

	return (
		<div className='ai-dialogue-scene-image' ref={slotRef}>
			{loadedUrl && (
				<img src={loadedUrl} onError={handleDisplayError} alt='Иллюстрация сцены' width={1152} height={576} />
			)}
			{failed && (
				<div className='ai-dialogue-scene-image__error'>
					<span>Иллюстрация недоступна</span>
					{isError && (
						<button type='button' onClick={retryDownload}>
							Повторить загрузку
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default DialogueSceneImage
