import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

const publicScenarioCoverPrefix = 'ai-dialogue-public-scenarios/covers/'

/** MODE isolates development covers; the same curated assets can be shared by both regions. */
export function getPublicScenarioCoverKey(mode: string | undefined, slug: string): string {
	if (!mode || !/^[a-z]+$/.test(mode) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
		throw new CustomError(errorMessage.aiDialogue.invalidScenarioCoverKey, ErrorStatusCode.InternalServerError_500)
	}

	return `${publicScenarioCoverPrefix}${mode}/${slug}.webp`
}
