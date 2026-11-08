import { ParamValue } from 'next/dist/server/request/params'
import pageNameMessages from '@/messages/en/pageUrls.json'

/** Ключ названия страницы в разделе переводов pageUrls (messages/{locale}/pageUrls.json) */
export type PageNameKey = keyof typeof pageNameMessages

// ── Адреса страниц (без языкового префикса — локаль добавляет next-intl) ───────
// nameKey — ключ названия страницы: useTranslations('pageUrls')(nameKey)

export const pageUrls = {
	main: {
		nameKey: 'main' as const satisfies PageNameKey,
		path: '/',
	},
	auth: {
		nameKey: 'auth' as const satisfies PageNameKey,
		path: '/auth',
		login: {
			nameKey: 'authLogin' as const satisfies PageNameKey,
			path: '/auth/login',
		},
		register: {
			nameKey: 'authRegister' as const satisfies PageNameKey,
			path: '/auth/register',
		},
		emailConfirmation: {
			nameKey: 'authEmailConfirmation' as const satisfies PageNameKey,
			path: '/auth/email-confirmation',
		},
		resendConfirmationLetter: {
			nameKey: 'authResendConfirmationLetter' as const satisfies PageNameKey,
			path: '/auth/resend-confirmation-letter',
		},
		oauth: {
			github: {
				getPermissions(input: { clientId: string; redirectUri: string; state: string }) {
					return {
						nameKey: 'oauthGithub' as const satisfies PageNameKey,
						path: `https://github.com/login/oauth/authorize?client_id=${input.clientId}&response_type=code&scope=user&redirect_uri=${input.redirectUri}&state=${input.state}`,
					}
				},
			},
			google: {
				getPermissions(input: { clientId: string; redirectUri: string; state: string }) {
					return {
						nameKey: 'oauthGoogle' as const satisfies PageNameKey,
						path: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${input.clientId}&response_type=code&scope=email profile&redirect_uri=${input.redirectUri}&state=${input.state}`,
					}
				},
			},
			yandex: {
				getPermissions(input: { clientId: string; redirectUri: string; state: string }) {
					return {
						nameKey: 'oauthYandex' as const satisfies PageNameKey,
						path: `https://oauth.yandex.ru/authorize?response_type=code&client_id=${input.clientId}&redirect_uri=${input.redirectUri}&scope=login:email login:info&state=fgg`,
					}
				},
			},
		},
	},
	books: {
		nameKey: 'books' as const satisfies PageNameKey,
		path: '/books',
		book(bookId: number | string) {
			return {
				nameKey: 'book' as const satisfies PageNameKey,
				path: '/books/' + bookId,
				chapter(chapterId: string | number) {
					return {
						nameKey: 'bookChapter' as const satisfies PageNameKey,
						path: '/books/' + bookId + '/' + chapterId,
					}
				},
			}
		},
	},
	videos: {
		nameKey: 'videos' as const satisfies PageNameKey,
		path: '/videos',
		video(videoId: string | number, withDetails?: boolean) {
			const detailsParam = withDetails ? '?details' : ''

			return {
				nameKey: 'video' as const satisfies PageNameKey,
				path: '/videos/' + videoId + detailsParam,
			}
		},
	},
	aiDialogues: {
		nameKey: 'aiDialogues' as const satisfies PageNameKey,
		path: '/dialogues',
		dialog(dialogId: number | string) {
			return {
				nameKey: 'aiDialogue' as const satisfies PageNameKey,
				path: '/dialogues/' + dialogId,
			}
		},
	},
	contacts: {
		nameKey: 'contacts' as const satisfies PageNameKey,
		path: '/contacts',
	},
	help: {
		nameKey: 'help' as const satisfies PageNameKey,
		path: '/help',
	},
	me: {
		nameKey: 'me' as const satisfies PageNameKey,
		path: '/me',
	},
	docs: {
		privacyPolicy: {
			nameKey: 'privacyPolicy' as const satisfies PageNameKey,
			path: '/docs/privacy-policy',
		},
		offer: {
			nameKey: 'offer' as const satisfies PageNameKey,
			path: '/docs/offer',
		},
		contentUsePolicy: {
			nameKey: 'contentUsePolicy' as const satisfies PageNameKey,
			path: '/docs/content-use-policy',
		},
	},
}

/** Добавляет языковой префикс к пути: localizePath('en', '/books') → '/en/books' */
export function localizePath(locale: string, path: string): string {
	return `/${locale}${path === '/' ? '' : path}`
}

// ── Утилиты для работы с media ID ────────────────────────────────────────────

export function getMediaTypePrefixInUrl(mediaType: 'public' | 'private') {
	return mediaType === 'public' ? 'p' : 'u'
}

export function createMediaIdUrl(mediaId: string | number, mediaType: 'public' | 'private') {
	return getMediaTypePrefixInUrl(mediaType) + mediaId
}

export function getMediaTypeByUrlMediaId(
	urlMediaId: ParamValue | undefined | null | string,
): null | 'public' | 'private' {
	if (!urlMediaId || typeof urlMediaId !== 'string') return null

	return urlMediaId.startsWith('p') ? 'public' : 'private'
}

export function extractMediaIdFromUrlBookId(urlMediaId: ParamValue | undefined | null | string): null | number {
	if (!urlMediaId || typeof urlMediaId !== 'string') return null

	const mediaIdStr = urlMediaId.slice(1)
	return parseInt(mediaIdStr)
}
