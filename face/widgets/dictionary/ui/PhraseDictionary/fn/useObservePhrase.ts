// import { useEffect } from 'react'
// import { fetchDictionaryArticle } from '@/widgets/dictionary/lib/fetchDictionaryArticle'

/**
 * Реактивно запускает перевод, когда извне приходит новая фраза (например, клик по слову).
 * Сама фраза приходит через пропсы, а не читается из состояния панели деталей.
 */
/*export function useObservePhrase(phrase?: string) {
	useEffect(
		function () {
			if (!phrase) return

			void fetchDictionaryArticle(phrase)
		},
		[phrase],
	)
}*/
