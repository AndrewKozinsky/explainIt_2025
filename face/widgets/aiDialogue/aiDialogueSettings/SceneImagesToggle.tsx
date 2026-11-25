import { useTranslations } from 'next-intl'
import { useReplySettingsStore } from '@/entities/aiDialogue/replySettings/replySettingsStore'
import Toggle from '@/shared/ui/formRelated/Toggle/Toggle'

function SceneImagesToggle() {
	const t = useTranslations('aiDialogueSettings')
	const isSceneImageGenerationEnabled = useReplySettingsStore((state) => state.isSceneImageGenerationEnabled)
	const setSceneImageGenerationEnabled = useReplySettingsStore((state) => state.setSceneImageGenerationEnabled)

	return (
		<Toggle
			label={t('sceneImages')}
			checked={isSceneImageGenerationEnabled}
			inputProps={{ onChange: (event) => setSceneImageGenerationEnabled(event.target.checked) }}
		/>
	)
}

export default SceneImagesToggle
