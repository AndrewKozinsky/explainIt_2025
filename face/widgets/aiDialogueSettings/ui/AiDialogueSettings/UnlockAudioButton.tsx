import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'

type UnlockAudioButtonProps = {
	audioBlocked: boolean
	onUnlockAudio: () => void
}

function UnlockAudioButton({ audioBlocked, onUnlockAudio }: UnlockAudioButtonProps) {
	const t = useTranslations('aiDialogueSettings')

	if (!audioBlocked) return null

	return (
		<Button theme='outline' size='small' onClick={onUnlockAudio}>
			{t('unlockAudio')}
		</Button>
	)
}

export default UnlockAudioButton
