import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'

/**
 * Определяет видимость кнопки "Нажмите Enter для перевода"
 */
export function useIsShowPressEnterVisible() {
	const selectedSentence = useReadingStoreNext((s) => s.selectedSentence)
	console.log(selectedSentence)

	return !!selectedSentence.id
}
