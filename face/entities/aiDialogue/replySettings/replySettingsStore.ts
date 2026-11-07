import { create } from 'zustand'
import { localStorageManager } from '@/shared/utils/localStorageManager'

type ReplySettingsStore = {
	/** Озвучивать новые реплики и описания сцен автоматически, как только ответ сохранён. */
	isAutoVoiceEnabled: boolean
	/** Показывать текст новых реплик и описаний сцен. Скрытый текст можно открыть вручную. */
	isReplyTextVisible: boolean
	/** Читает значения из LocalStorage. Вызывается до открытия SSE, поэтому реплики сразу видят сохранённые значения. */
	loadSettings: () => void
	setAutoVoiceEnabled: (isEnabled: boolean) => void
	setReplyTextVisible: (isVisible: boolean) => void
}

/** Переключатели «Автоозвучка» и «Текст реплик». Хранятся в LocalStorage и действуют только на новые реплики. */
export const useReplySettingsStore = create<ReplySettingsStore>()((set) => ({
	isAutoVoiceEnabled: true,
	isReplyTextVisible: true,

	loadSettings: () =>
		set({
			isAutoVoiceEnabled: localStorageManager.aiDialogueReplySettings.getAutoVoice(),
			isReplyTextVisible: localStorageManager.aiDialogueReplySettings.getReplyTextVisible(),
		}),

	setAutoVoiceEnabled: (isEnabled) => {
		localStorageManager.aiDialogueReplySettings.setAutoVoice(isEnabled)
		set({ isAutoVoiceEnabled: isEnabled })
	},

	setReplyTextVisible: (isVisible) => {
		localStorageManager.aiDialogueReplySettings.setReplyTextVisible(isVisible)
		set({ isReplyTextVisible: isVisible })
	},
}))
