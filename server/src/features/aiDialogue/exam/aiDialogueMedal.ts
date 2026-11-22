import type { AiDialogueExamLevel } from '../aiDialogueLanguageLevel'
import { getPublicFileUrl } from 'infrastructure/cloudflareS3/publicFileUrl'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

/** Medal of the original scenario, selected by the saved result, never by the LLM. */
export function getExamMedalUrl(json: string | null | undefined, level: AiDialogueExamLevel): string | null {
	if (level === 'A0' || !json) return null
	try {
		const medals: unknown = JSON.parse(json)
		if (!medals || typeof medals !== 'object' || Array.isArray(medals))
			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
		const key = (medals as Record<string, unknown>)[level]
		return typeof key === 'string' && key.trim() ? getPublicFileUrl(key) : null
	} catch (error) {
		if (error instanceof CustomError) throw error
		throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
	}
}
