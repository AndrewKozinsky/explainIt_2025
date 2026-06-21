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
		GET_SENTENCE_TRANSLATION: 'translate_get_sentence_translation',
		GET_PHRASE_TRANSLATION: 'translate_get_phrase_translation',
		GET_PHRASE_TRANSLATIONS_BY_SENTENCE: 'translate_get_phrase_translations_by_sentence',
		TRANSLATE_SENTENCE: 'translate_translate_sentence',
		TRANSLATE_PHRASE: 'translate_translate_phrase',
	},
	// REST
	DB: {
		ALL_DATA: 'testing/all-data',
		SEED: 'testing/seed',
	},
	WEBHOOK: {
		YOOKASSA: 'webhook/yookassa',
	},
	BOOK_PRIVATE: {
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
		GENERATE_SUBTITLES: 'video_private_generate_subtitles',
		GET_SUBTITLES_GENERATION_STATUS: 'video_private_get_subtitles_generation_status',
	},
	VIDEO_PUBLIC: {
		GET_VIDEOS: 'video_public_get_videos',
		GET: 'video_public_get',
	},
	SENTENCE_TRANSLATION: {
		GET: 'sentence_translation_get',
		GET_BY_SENTENCE_ID: 'sentence_translation_get_by_sentence_id',
	},
	UNIVERSAL_PHRASE: {
		GET: 'universal_phrase_get',
		CREATE: 'universal_phrase_create',
	},
	UNIVERSAL_PHRASE_TRANSCRIPTION: {
		GET_OR_CREATE: 'universal_phrase_transcription_get_or_create',
	},
	UNIVERSAL_PHRASE_TRANSLATION: {
		GET_OR_CREATE: 'universal_phrase_translation_get_or_create',
	},
	UNIVERSAL_PHRASE_AUDIO: {
		GET: 'universal_phrase_audio_get',
		GET_OR_CREATE: 'universal_phrase_audio_get_or_create',
	},
	LANGUAGE: {
		GET_ALL: 'language_get_languages',
	},
	FLASHCARD: {
		ADD: 'flashcard_add',
		REMOVE: 'flashcard_remove',
		GET_MY: 'flashcard_get_my',
	},
	SENTENCE_CHAT: {
		GET_THREAD: 'sentence_chat_get_thread',
		CREATE_THREAD: 'sentence_chat_create_thread',
		CREATE_USER_MESSAGE: 'sentence_chat_create_user_message',
		// REST SSE: :threadId идёт параметром пути
		STREAM_ASSISTANT_REPLY: 'sentence-chat/threads/:threadId/assistant-stream',
	},
}

export default RouteNames
