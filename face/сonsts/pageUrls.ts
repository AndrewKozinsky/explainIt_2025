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
		/*forgetPassword: {
			name: 'Вспомнить пароль',
			path: '/auth/forget-password',
		},*/
		emailConfirmation: {
			name: 'Подтверждение эл. почты',
			path: '/auth/email-confirmation',
		},
		resendConfirmationLetter: {
			name: 'Повторная отправка письма подтверждения почты',
			path: '/auth/resend-confirmation-letter',
		},
	},
	llm: {
		name: 'LLM',
		path: '/llm',
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
