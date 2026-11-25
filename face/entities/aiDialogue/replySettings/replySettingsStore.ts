import { create } from 'zustand'
import { localStorageManager } from '@/shared/utils/localStorageManager'

type ReplySettingsStore = {
	/** Озвучивать новые реплики и описания сцен автоматически, как только ответ сохранён. */
	isAutoVoiceEnabled: boolean
	/** Показывать текст новых реплик и описаний сцен. Скрытый текст можно открыть вручную. */
	isReplyTextVisible: boolean
	isSceneImageGenerationEnabled: boolean
	/** Читает значения из LocalStorage. Вызывается до открытия SSE, поэтому реплики сразу видят сохранённые значения. */
	loadSettings: () => void
	setAutoVoiceEnabled: (isEnabled: boolean) => void
	setReplyTextVisible: (isVisible: boolean) => void
	setSceneImageGenerationEnabled: (isEnabled: boolean) => void
}

/** Настройки диалога, сохранённые в LocalStorage. */
export const useReplySettingsStore = create<ReplySettingsStore>()((set) => ({
	isAutoVoiceEnabled: true,
	isReplyTextVisible: true,
	isSceneImageGenerationEnabled: true,

	loadSettings: () =>
		set({
			isAutoVoiceEnabled: localStorageManager.aiDialogueReplySettings.getAutoVoice(),
			isReplyTextVisible: localStorageManager.aiDialogueReplySettings.getReplyTextVisible(),
			isSceneImageGenerationEnabled: localStorageManager.aiDialogueReplySettings.getSceneImageGeneration(),
		}),

	setAutoVoiceEnabled: (isEnabled) => {
		localStorageManager.aiDialogueReplySettings.setAutoVoice(isEnabled)
		set({ isAutoVoiceEnabled: isEnabled })
	},

	setReplyTextVisible: (isVisible) => {
		localStorageManager.aiDialogueReplySettings.setReplyTextVisible(isVisible)
		set({ isReplyTextVisible: isVisible })
	},

	setSceneImageGenerationEnabled: (isEnabled) => {
		localStorageManager.aiDialogueReplySettings.setSceneImageGeneration(isEnabled)
		set({ isSceneImageGenerationEnabled: isEnabled })
	},
}))
