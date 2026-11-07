import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Разделы переводов. Каждый раздел — отдельный файл messages/{locale}/{раздел}.json,
// а его имя — ключ верхнего уровня: useTranslations('mainPageBanner')
const messageNamespaces = [
	'aiDialogue',
	'aiDialogueForm',
	'aiDialogueMessages',
	'aiDialoguePage',
	'aiDialogueSettings',
	'aiDialoguesPage',
	'aiDialogueScenariosList',
	'auth',
	'dictionary',
	'fileDropzone',
	'mainPageAnyLevel',
	'mainPageBanner',
	'mainPageCallToAction',
	'mainPageFaq',
	'mainPageFeatures',
	'mainPageNoTrip',
	'mainPageScenarios',
	'mePage',
	'pageUrls',
	'siteMeta',
	'userAiDialogues',
] as const

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale
	const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

	return {
		locale,
		messages: await loadMessages(locale),
	}
})

/** Собирает файлы разделов языка в один объект переводов */
async function loadMessages(locale: string) {
	const namespaceMessages = await Promise.all(
		messageNamespaces.map(async function (namespace) {
			const messages = (await import(`../messages/${locale}/${namespace}.json`)).default
			return [namespace, messages] as const
		}),
	)

	return Object.fromEntries(namespaceMessages)
}
