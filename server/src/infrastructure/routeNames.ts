export const RouteNames = {
	AUTH: {
		REGISTER: 'auth_register',
		CONFIRM_EMAIL: 'auth_confirmEmail',
		LOGIN: 'auth_login',
		LOGIN_WITH_OAUTH: 'auth_login_with_OAuth',
		RESEND_CONFIRMATION_EMAIL: 'auth_resendConfirmationEmail',
		FORGET_PASSWORD: 'auth_forgetPassword',
		GET_ME: 'auth_getMe',
		LOGOUT: 'auth_logout',
	},
	PAYMENT: {
		YOOKASSA: {
			TOP_UP_BALANCE: 'payment_yookassa_top_up_balance',
		},
	},
	AI: {
		CHECK_TRANSLATION: 'ai_checkTranslation',
		GET_TRANSCRIPTION: 'ai_getTranscription',
	},
	// REST
	DB: {
		ALL_DATA: 'testing/all-data',
		SEED: 'testing/seed',
	},
	WEBHOOK: {
		YOOKASSA: 'webhook/yookassa',
	},
	BOOK: {
		CREATE: 'book_create',
		UPDATE: 'book_update',
		DELETE: 'book_delete',
		GET_USER_BOOKS: 'book_user_books',
	},
	BOOK_CHAPTER: {
		CREATE: 'book_chapter_create',
		UPDATE: 'book_chapter_update',
		DELETE: 'book_chapter_delete',
	},
}

export default RouteNames
