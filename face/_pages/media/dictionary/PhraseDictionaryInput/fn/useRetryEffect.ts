import { useEffect, useRef } from 'react'
import { usePhraseDictionaryStore } from '../../phraseDictionaryStore'

type UseRetryEffectParams = {
	/** Функция перевода */
	fetchTranslation: (text: string) => void
	/** Текущий languageCode */
	languageCode: string | null
	/** Ref к AbortController */
	abortRef: React.MutableRefObject<AbortController | null>
}

/**
 * Следит за `retryTrigger` в сторе.
 * При инкременте (кнопка «Повторить») заново запускает перевод текущего текста.
 */
export function useRetryEffect({ fetchTranslation, languageCode, abortRef }: UseRetryEffectParams) {
	const retryTrigger = usePhraseDictionaryStore((s) => s.retryTrigger)
	const retryTriggerRef = useRef(retryTrigger)

	useEffect(
		function () {
			// Пропускаем первый рендер
			if (retryTriggerRef.current === retryTrigger) return
			retryTriggerRef.current = retryTrigger

			const text = usePhraseDictionaryStore.getState().inputText
			if (!text.trim() || !languageCode) return

			abortRef.current?.abort()
			abortRef.current = new AbortController()

			fetchTranslation(text)
		},
		[retryTrigger, fetchTranslation, languageCode, abortRef],
	)
}
