import { useDialogueSceneImage } from '../visuals/fn/useDialogueSceneImage'

type Props = { messageId?: number; reserveSpace: boolean }

function DialogueSceneImage({ messageId, reserveSpace }: Props) {
	const { slotRef, showSlot, loadedUrl, isError, handleDisplayError, retryDownload, failed } = useDialogueSceneImage(
		messageId,
		reserveSpace,
	)

	if (!showSlot) return null

	return (
		<div className='ai-dialogue-message-scene-update__image' ref={slotRef}>
			{loadedUrl && (
				<img src={loadedUrl} onError={handleDisplayError} alt='Иллюстрация сцены' width={1152} height={576} />
			)}
			{failed && (
				<div className='ai-dialogue-message-scene-update__image-error'>
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
