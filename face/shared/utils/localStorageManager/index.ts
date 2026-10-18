import { aiDialogueSettings } from './aiDialogueSettings'
import { lastBookChapter } from './lastBookChapter'
import { lastMediaTab } from './lastMediaTab'
import { oauth } from './oauth'
import { onboarding } from './onboarding'
import { lastDuration, lastLanguage, lastProficiency, lastSort, lastTopic } from './videoFilters'
import { videoProgress } from './videoProgress'

/** Централизованный доступ к данным приложения в localStorage. */
export const localStorageManager = {
	aiDialogueSettings,
	lastBookChapter,
	videoProgress,
	onboarding,
	lastMediaTab,
	lastDuration,
	lastProficiency,
	lastTopic,
	lastSort,
	lastLanguage,
	oauth,
}
