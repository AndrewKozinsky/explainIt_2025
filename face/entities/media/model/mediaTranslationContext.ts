import type { SentenceModel } from '@/entities/media/repository/SentenceTypes'
import { LanguageCode } from '@/shared/utils/languages'
import type { BaseMediaStore } from '../store/createBaseMediaStore'
import type { StoreApi, UseBoundStore } from 'zustand'

export type MediaTranslationContext = {
	bookName?: null | string
	bookAuthor?: null | string
	videoName?: null | string
	languageCode?: null | LanguageCode
	sentences?: SentenceModel[] | null
	selectedSentenceId: null | number
	selectedWordId: null | number
	mediaStore: UseBoundStore<StoreApi<BaseMediaStore>>
}
