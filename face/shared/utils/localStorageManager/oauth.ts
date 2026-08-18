import { setItem } from './storage'

const OAUTH_CSRF_KEY = 'latestCSRFToken'

export const oauth = {
	setCSRFToken(token: string) {
		setItem(OAUTH_CSRF_KEY, token)
	},
}
