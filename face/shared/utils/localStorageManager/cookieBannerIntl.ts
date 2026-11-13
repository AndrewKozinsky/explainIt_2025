import { getItem, setItem } from './storage'

const COOKIE_BANNER_INTL_CHOICE_KEY = 'cookieBannerIntlChoice'

/** Ответ пользователя на баннер про cookies и запись сессий. */
export type CookieBannerIntlChoice = 'accepted' | 'rejected'

export const cookieBannerIntl = {
	/** Выбор пользователя или null, если он ещё не отвечал. */
	getChoice(): CookieBannerIntlChoice | null {
		const choice = getItem(COOKIE_BANNER_INTL_CHOICE_KEY)
		return choice === 'accepted' || choice === 'rejected' ? choice : null
	},

	setChoice(choice: CookieBannerIntlChoice) {
		setItem(COOKIE_BANNER_INTL_CHOICE_KEY, choice)
	},
}
