export const mainConfig = {
	workingMode: resolveWorkingMode(),
	region: process.env.NEXT_PUBLIC_REGION as 'ru' | 'intl',
	supportEmail: 'andkozinsky@gmail.com',
}

export default mainConfig

type WorkingMode = 'localtest' | 'localdev' | 'localcheckserver' | 'serverdevelop' | 'servermaster'

function resolveWorkingMode(): WorkingMode {
	if (process.env.MODE) return process.env.MODE as WorkingMode

	const modeMap: Record<string, 'servermaster' | 'serverdevelop'> = {
		serverMaster: 'servermaster',
		serverDevelop: 'serverdevelop',
	}

	return modeMap[process.env.NEXT_PUBLIC_WORK_MODE ?? '']
}
