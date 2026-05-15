import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

const errorCodeByStatusCode: Record<ErrorStatusCode, string> = {
	[ErrorStatusCode.BadRequest_400]: 'BAD_REQUEST',
	[ErrorStatusCode.Unauthorized_401]: 'UNAUTHORIZED',
	[ErrorStatusCode.Forbidden_403]: 'FORBIDDEN',
	[ErrorStatusCode.NotFound_404]: 'NOT_FOUND',
	[ErrorStatusCode.InternalServerError_500]: 'INTERNAL_SERVER_ERROR',
}

export class CustomError extends Error {
	public readonly code: string

	constructor(
		message: string,
		public readonly statusCode: ErrorStatusCode,
	) {
		super(message)
		this.code = errorCodeByStatusCode[statusCode]
	}
}
