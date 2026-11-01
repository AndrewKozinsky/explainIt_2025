import { useState } from 'react'
import { LanguageCode } from '@/shared/utils/languages'

/**
 * Запоминает предыдущий язык, чтобы его название могло анимированно уйти.
 * previousCode — null до первой смены языка.
 */
export function useLanguageTransition(languageCode: LanguageCode) {
	const [transition, setTransition] = useState<{ currentCode: LanguageCode; previousCode: null | LanguageCode }>({
		currentCode: languageCode,
		previousCode: null,
	})

	// Язык сменился — обновляем состояние прямо во время рендера, без лишнего кадра со старым словом
	if (transition.currentCode !== languageCode) {
		setTransition({ currentCode: languageCode, previousCode: transition.currentCode })
	}

	return transition
}
