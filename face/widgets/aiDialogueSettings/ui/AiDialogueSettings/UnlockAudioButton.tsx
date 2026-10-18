import Button from '@/shared/ui/formRelated/buttons/Button/Button'

type UnlockAudioButtonProps = {
	audioBlocked: boolean
	onUnlockAudio: () => void
}

function UnlockAudioButton({ audioBlocked, onUnlockAudio }: UnlockAudioButtonProps) {
	if (!audioBlocked) return null

	return (
		<Button theme='outline' size='small' onClick={onUnlockAudio}>
			Включить звук
		</Button>
	)
}

export default UnlockAudioButton
