import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { CustomError } from './customErrors'
import { errorMessage } from './errorMessage'

/** Преобразует непредвиденные ошибки БД в UNKNOWN_DB_ERROR, сохраняя уже созданный CustomError и его код. */
function CatchDbError() {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value

		descriptor.value = async function (...args: any[]) {
			try {
				return await originalMethod.apply(this, args)
			} catch (error: unknown) {
				if (error instanceof CustomError) throw error
				console.error('[CatchDbError] Original error:', error)
				throw new CustomError(errorMessage.unknownDbError, ErrorStatusCode.InternalServerError_500)
			}
		}

		return descriptor
	}
}

export default CatchDbError
