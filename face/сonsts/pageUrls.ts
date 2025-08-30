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
		book(bookId: string | number) {
			return {
				name: 'Книга',
				path: '/books/' + bookId,
				chapter(chapterId: string | number) {
					return {
						name: 'Книга',
						path: '/books/' + bookId + '/' + chapterId,
						reading: {
							name: 'Чтение главы',
							path: '/books/' + bookId + '/' + chapterId + '/reading',
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
}
