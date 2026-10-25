import CatchDbError from './CatchDBErrors'
import { CustomError } from './customErrors'
import { errorMessage } from './errorMessage'
import { ErrorStatusCode } from './errorStatusCode'

class ExampleRepository {
	@CatchDbError()
	async fail(error: Error): Promise<never> {
		throw error
	}
}

describe('CatchDbError', () => {
	it('preserves an existing CustomError instance, translation key and HTTP status', async () => {
		const repository = new ExampleRepository()
		const error = new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		const log = jest.spyOn(console, 'error').mockImplementation(() => undefined)
		try {
			await expect(repository.fail(error)).rejects.toBe(error)
			expect(log).not.toHaveBeenCalled()
		} finally {
			log.mockRestore()
		}
	})

	it('logs an unexpected DB failure and returns UNKNOWN_DB_ERROR without exposing its original text', async () => {
		const repository = new ExampleRepository()
		const error = new Error('Simulated database failure')
		const log = jest.spyOn(console, 'error').mockImplementation(() => undefined)
		try {
			await expect(repository.fail(error)).rejects.toMatchObject({
				constructor: CustomError,
				errorMessage: errorMessage.unknownDbError,
				statusCode: ErrorStatusCode.InternalServerError_500,
				message: JSON.stringify(errorMessage.unknownDbError),
			})
			expect(log).toHaveBeenCalledWith('[CatchDbError] Original error:', error)
		} finally {
			log.mockRestore()
		}
	})
})
