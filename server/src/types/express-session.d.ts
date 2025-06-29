import 'express-session'

declare module 'express-session' {
	interface SessionData {
		userId?: number
		clientIP?: string
		clientName?: string
	}
}
