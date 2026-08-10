// import type { SentenceModel } from '@/entities/media/repository/SentenceTypes'
// import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
// import { LanguageCode } from '@/shared/utils/languages'
// import DetailsBlockWrapper from '../ViewRouter/DetailsBlockWrapper'
// import { useClearDataOnUnmount } from './fn/clearDataOnUnmount'
// import { useFetchCurrentPhraseTranslation } from './fn/fetchPhraseTranslation'
// import { useFetchCurrentSentenceTranslation } from './fn/fetchSentenceTranslation'
// import { useInitStore } from './fn/initStore'
// import { usePopulateStore } from './fn/populateStore'
// import { useApplySelection } from './fn/setSentenceIdAndWordId'
// import { useShowCurrentTranslation } from './fn/showCurrentTranslation'
// import './DetailsBlock.scss'

/** Метаданные о медиа, раньше брались из Zustand-хранилищ страниц через useInitStore */
/*export type DetailsBlockMediaMetadata = {
	bookName?: null | string
	bookAuthor?: null | string
	chapterId?: null | number
	videoId?: null | number
	videoName?: null | string
	languageCode?: null | LanguageCode
	/!** Предложения с переводами — страница передаёт уже загруженные с сервера данные *!/
	sentences?: SentenceModel[] | null
}*/

/*type DetailsBlockProps = DetailsBlockMediaMetadata & {
	selectedSentenceId: null | number
	selectedWordId: null | number
}*/

/*function DetailsBlock(props: DetailsBlockProps) {
	useInitStore(props)
	usePopulateStore(props.sentences, props.languageCode ?? null)
	useShowCurrentTranslation()
	useApplySelection(props)
	useFetchCurrentSentenceTranslation()
	useFetchCurrentPhraseTranslation()
	useClearDataOnUnmount()

	return (
		<ViewportSyncedHeight extraClass='details-block'>
			<DetailsBlockWrapper />
		</ViewportSyncedHeight>
	)
}*/

// export default DetailsBlock
