export const mainConfig = {
	workingMode: (process.env.MODE ??
		(process.env.NEXT_PUBLIC_WORK_MODE === 'serverMaster'
			? 'servermaster'
			: process.env.NEXT_PUBLIC_WORK_MODE === 'serverDevelop'
				? 'serverdevelop'
				: undefined)) as 'localtest' | 'localdev' | 'localcheckserver' | 'serverdevelop' | 'servermaster',
	region: process.env.NEXT_PUBLIC_REGION as 'ru' | 'intl',
	supportEmail: 'andkozinskiy@yandex.ru',
}

export default mainConfig
