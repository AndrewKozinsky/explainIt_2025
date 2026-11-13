declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_WORK_MODE: 'development' | 'serverDevelop' | 'serverMaster'
		NEXT_PUBLIC_REGION: 'ru' | 'intl'
		/** Публичный токен проекта PostHog; используется только в регионе intl. */
		NEXT_PUBLIC_POSTHOG_KEY?: string
	}
}
