import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'

/**
 * Определяет видимость кнопки "Нажмите Enter для перевода"
 */
export function useIsShowPressEnterVisible() {
	const selectedSentenceId = useReadingStoreNext((s) => s.selectedSentenceId)

	return !!selectedSentenceId
}
