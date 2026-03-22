import { UserServiceModel } from '../models/auth/auth.service.model'

declare global {
	namespace Express {
		export interface Request {
			user: null | UserServiceModel
		}
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MODE: 'TEST'
		}
	}
}
