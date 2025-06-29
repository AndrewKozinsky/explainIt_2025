import { UserServiceModel } from '../models/service/users.service.model'

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
