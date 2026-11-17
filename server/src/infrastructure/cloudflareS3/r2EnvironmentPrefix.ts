import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

export function isR2EnvironmentSegment(mode: string | undefined): mode is string {
	return !!mode && /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(mode)
}

export function getR2EnvironmentPrefix(basePath: string, mode: string | undefined): string {
	if (!isR2EnvironmentSegment(mode)) {
		throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
	}

	return `${basePath}/${mode}/`
}
