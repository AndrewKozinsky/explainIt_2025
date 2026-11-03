import { useLocale, useTranslations } from 'next-intl'
import FaqTypes from '@/shared/ui/FAQ/fn/faqTypes'
import { useLanguagesToLearn } from '@/shared/utils/useLanguagesToLearn'

type FaqMessage = { question: string; answer: string[] }

/** Собирает заголовок и вопросы с ответами главной страницы из переводов */
export function useMainPageFaqConfig() {
	const t = useTranslations('mainPageFaq')
	const languages = useLanguagesToLearnText()

	const config: FaqTypes.Config = (t.raw('items') as FaqMessage[]).map(function (item) {
		return {
			question: { type: 'plain', value: item.question },
			answer: { type: 'plain', value: item.answer.map((text) => text.replace('{languages}', languages)) },
		}
	})

	return { header: t('header'), config }
}

/**
 * Перечисляет изучаемые языки на языке интерфейса: «английский, испанский и турецкий».
 * Список собирается из кода, как и флаги на странице, чтобы ответ не расходился с ними.
 */
function useLanguagesToLearnText() {
	const locale = useLocale()
	const languagesToLearn = useLanguagesToLearn()

	const languageNames = new Intl.DisplayNames(locale, { type: 'language' })

	return new Intl.ListFormat(locale, { type: 'conjunction' }).format(
		languagesToLearn.map((code) => languageNames.of(code) ?? code),
	)
}
