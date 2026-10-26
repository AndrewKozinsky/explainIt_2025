import { lastAiDialogProficiency } from './lastAiDialogProficiency'
import { lastAiDialogueIllustrationStyle } from './lastAiDialogueIllustrationStyle'
import { lastBookChapter } from './lastBookChapter'
import { lastMediaTab } from './lastMediaTab'
import { oauth } from './oauth'
import { onboarding } from './onboarding'
import { lastDuration, lastLanguage, lastSort, lastTopic, lastVideoProficiency } from './videoFilters'
import { videoProgress } from './videoProgress'

/** Централизованный доступ к данным приложения в localStorage. */
export const localStorageManager = {
	lastBookChapter,
	videoProgress,
	onboarding,
	lastMediaTab,
	lastDuration,
	lastVideoProficiency,
	lastAiDialogProficiency,
	lastAiDialogueIllustrationStyle,
	lastTopic,
	lastSort,
	lastLanguage,
	oauth,
}
