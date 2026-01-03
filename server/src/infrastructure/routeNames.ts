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
	TRANSLATE: {
		TRANSLATE: 'translate_translate',
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
		GET: 'book_get',
		CREATE: 'book_create',
		UPDATE: 'book_update',
		DELETE: 'book_delete',
		GET_USER_BOOKS: 'book_user_books',
	},
	BOOK_PUBLIC: {
		GET_BOOKS: 'book_public_get_books',
		GET_BOOK: 'book_public_get_book',
	},
	BOOK_CHAPTER: {
		GET: 'book_chapter_get',
		CREATE: 'book_chapter_create',
		UPDATE: 'book_chapter_update',
		DELETE: 'book_chapter_delete',
		ANALYSE_PHRASE: 'book_chapter_AnalysePhrase',
		TRANSLATE_SENTENCES: 'book_chapter_TranslateSentences',
		DELETE_BOOK_CHAPTER_PHRASES: 'book_chapter_DeleteBookChapterPhrases',
	},
	VIDEO_PRIVATE: {
		CREATE: 'video_private_create',
		UPDATE: 'video_private_update',
		DELETE: 'video_private_delete',
		GET_USER_VIDEOS: 'video_private_user_videos',
		GET: 'video_private_get',
	},
}

export default RouteNames
