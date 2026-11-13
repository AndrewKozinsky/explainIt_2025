import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { SentenceTranslationAccess } from './SentenceTranslationAccess.service'

export async function ensureModeIsAllowedOrThrow(input: {
	mode: SentenceTranslationAccess['createMode']
	deniedReason?: SentenceTranslationAccess['createDeniedReason']
	actionType: 'create' | 'read'
}) {
	if (input.mode !== 'forbidden') {
		return
	}

	if (input.deniedReason === 'userIsNotOwner') {
		throw new CustomError(
			errorMessage.sentenceTranslation.userCannotAccessForeignPrivateMedia,
			ErrorStatusCode.Forbidden_403,
		)
	}

	if (input.actionType === 'read') {
		throw new CustomError(
			errorMessage.sentenceTranslation.anonymousUserCannotTranslate,
			ErrorStatusCode.Unauthorized_401,
		)
	}

	throw new CustomError(
		errorMessage.sentenceTranslation.anonymousUserCannotTranslate,
		ErrorStatusCode.Unauthorized_401,
	)
}
