export const RouteNames = {
	AUTH: {
		REGISTER: 'auth_register',
		CONFIRM_EMAIL: 'auth_confirmEmail',
		LOGIN: 'auth_login',
		RESEND_CONFIRMATION_EMAIL: 'auth_resendConfirmationEmail',
		GET_ME: 'auth_getMe',
		LOGOUT: 'auth_logout',
	},
	AI: {
		CHECK_TRANSLATION: 'ai_checkTranslation',
		GET_TRANSCRIPTION: 'ai_getTranscription',
	},
	// REST
	DB: {
		ALL_DATA: 'testing/all-data',
		// SEED: 'testing/seed',
		// USER: 'testing/user',
	},
}

export default RouteNames
