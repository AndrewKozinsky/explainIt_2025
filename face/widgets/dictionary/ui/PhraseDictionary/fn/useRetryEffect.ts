// import { useEffect, useRef } from 'react'
// import { fetchDictionaryArticle } from '@/widgets/dictionary/lib/fetchDictionaryArticle'
// import { usePhraseDictionaryStore } from '@/widgets/dictionary/ui/phraseDictionaryStore'

/**
 * Следит за `retryTrigger` в сторе.
 * При инкременте (кнопка «Повторить» в PhraseDictionaryError) заново запускает перевод текущего текста.
 */
/*export function useRetryEffect() {
	const retryTrigger = usePhraseDictionaryStore((s) => s.retryTrigger)
	const retryTriggerRef = useRef(retryTrigger)

	useEffect(
		function () {
			// Пропускаем первый рендер
			if (retryTriggerRef.current === retryTrigger) return
			retryTriggerRef.current = retryTrigger

			const text = usePhraseDictionaryStore.getState().inputText
			if (!text.trim()) return

			void fetchDictionaryArticle(text)
		},
		[retryTrigger],
	)
}*/
