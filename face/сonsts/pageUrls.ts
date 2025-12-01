import { ParamValue } from 'next/dist/server/request/params'

export const pageUrls = {
	main: {
		name: 'Главная',
		path: '/',
	},
	auth: {
		name: 'Авторизация',
		path: '/auth',
		login: {
			name: 'Вход',
			path: '/auth/login',
		},
		register: {
			name: 'Регистрация',
			path: '/auth/register',
		},
		emailConfirmation: {
			name: 'Подтверждение эл. почты',
			path: '/auth/email-confirmation',
		},
		resendConfirmationLetter: {
			name: 'Повторная отправка письма подтверждения почты',
			path: '/auth/resend-confirmation-letter',
		},
		oauth: {
			github: {
				getPermissions(input: { clientId: string; redirectUri: string; state: string }) {
					return {
						name: 'Получение прав на запрос данных пользователя у GutHub',
						path: `https://github.com/login/oauth/authorize?client_id=${input.clientId}&response_type=code&scope=user&redirect_uri=${input.redirectUri}&state=${input.state}`,
					}
				},
			},
			google: {
				getPermissions(input: { clientId: string; redirectUri: string; state: string }) {
					return {
						name: 'Получение прав на запрос данных пользователя у Google',
						path: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${input.clientId}&response_type=code&scope=email profile&redirect_uri=${input.redirectUri}&state=${input.state}`,
					}
				},
			},
			yandex: {
				getPermissions(input: { clientId: string; redirectUri: string; state: string }) {
					return {
						name: 'Получение прав на запрос данных пользователя у Google',
						path: `https://oauth.yandex.ru/authorize?response_type=code&client_id=${input.clientId}&redirect_uri=${input.redirectUri}&scope=login:email login:info&state=fgg`,
					}
				},
			},
		},
	},
	books: {
		name: 'Книги',
		path: '/books',
		book(bookId: string | number, bookType: 'public' | 'private') {
			const bookTypePrefix = getBookTypePrefixInUrl(bookType)

			return {
				name: 'Книга',
				path: '/books/' + bookTypePrefix + bookId,
				chapter(chapterId: string | number) {
					return {
						name: 'Книга',
						path: '/books/' + bookTypePrefix + bookId + '/' + chapterId,
						reading: {
							segment: 'reading',
							name: 'Чтение главы',
							path: '/books/' + bookTypePrefix + bookId + '/' + chapterId + '/reading',
						},
					}
				},
			}
		},
	},
	course: {
		name: 'Курс',
		path: '/course',
	},
	courseArticle(articleSlug: string) {
		return {
			name: 'Курс',
			path: '/course/' + articleSlug,
		}
	},
	howToSayItInRussian: {
		name: 'Как это сказать по-русски',
		path: '/how-to-say-it-in-russian',
	},
	contacts: {
		name: 'Контакты',
		path: '/contacts',
	},
	me: {
		name: 'Моя учётная запись',
		path: '/me',
	},
	docs: {
		privacyPolicy: {
			name: 'Политика обработки персональных данных',
			path: '/docs/privacy-policy',
		},
		offer: {
			name: 'Пользовательское соглашение (Оферта)',
			path: '/docs/offer',
		},
		contentUsePolicy: {
			name: 'Политика использования контента',
			path: '/docs/content-use-policy',
		},
	},
}

export function getBookTypePrefixInUrl(bookType: 'public' | 'private') {
	return bookType === 'public' ? 'p' : 'u'
}

export function getBookTypeByUrlBookId(urlBookId: ParamValue | undefined | null | string): null | 'public' | 'private' {
	if (!urlBookId || typeof urlBookId !== 'string') return null

	return urlBookId.startsWith('p') ? 'public' : 'private'
}

export function extractBookIdFromUrlBookId(urlBookId: ParamValue | undefined | null | string): null | number {
	if (!urlBookId || typeof urlBookId !== 'string') return null

	const bookIdStr = urlBookId.slice(1)
	return parseInt(bookIdStr)
}
