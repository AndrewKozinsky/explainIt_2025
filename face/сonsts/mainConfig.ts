export const mainConfig = {
	getWorkingMode() {
		return process.env.MODE as 'dev' | 'prod'
	},
}

export default mainConfig
