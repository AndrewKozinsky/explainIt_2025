// import axios, { CreateAxiosDefaults } from 'axios'
// import { createAdminTokenString, isServerComponent } from './utils'

/*type CreateApiSettings = {
	// Нужно ли включать заголовок авторизации от имени администратора authorization с 'Bearer ...'
	adminAuth?: boolean
}*/

/**
 * Функция создающая объект запроса
 * @param settings
 */
/*export function createApi(settings: CreateApiSettings) {
	const host = isServerComponent() ? 'explain-api:3001' : 'localhost'
	const baseURL = `http://${host}/api/`

	const headers = {
		authorization: settings.adminAuth ? createAdminTokenString() : undefined,
	}

	const axiosConfig: CreateAxiosDefaults = {
		baseURL,
		headers,
	}

	return axios.create(axiosConfig)
}*/

// const api = createApi({})
// export default api
