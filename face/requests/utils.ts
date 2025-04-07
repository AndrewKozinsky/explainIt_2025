/**
 * Возвращает значение заголовка authorization для создания запросов от имени администратора.
 */
export function createAdminTokenString() {
	let token = 'dGhuYWR6NDUkJTprd2NHVDA5JSQj'

	if (process.env.ADMIN_LOGIN && process.env.ADMIN_PASSWORD) {
		token = Buffer.from(process.env.ADMIN_LOGIN + ':' + process.env.ADMIN_PASSWORD).toString(
			'base64',
		)
	}

	return 'Basic ' + token
}

/**
 * Определяет серверный ли это компонент
 */
export function isServerComponent() {
	try {
		window.blur()
		return false
	} catch (err) {
		return true
	}
}
