import { getR2EnvironmentPrefix, isR2EnvironmentSegment } from 'infrastructure/cloudflareS3/r2EnvironmentPrefix'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

/** MODE isolates covers; the same curated assets can be shared by both regions. */
export function getPublicScenarioCoverKey(mode: string | undefined, slug: string): string {
	if (!isR2EnvironmentSegment(mode) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
		throw new CustomError(errorMessage.aiDialogue.invalidScenarioCoverKey, ErrorStatusCode.InternalServerError_500)
	}

	return `${getR2EnvironmentPrefix('ai-dialogue-public-scenarios/covers', mode)}${slug}.webp`
}
