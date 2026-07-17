declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_WORK_MODE: 'development' | 'serverDevelop' | 'serverMaster'
		NEXT_PUBLIC_REGION: 'ru' | 'intl'
	}
}
