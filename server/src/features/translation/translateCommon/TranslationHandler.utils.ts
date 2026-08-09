import { CommandBus } from '@nestjs/cqrs'
import { TokenUsageBalanceChargeCommand } from 'features/payment/TokenUsageBalanceCharge.command'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { SentenceTranslationAccess } from './SentenceTranslationAccess.service'
import { TranslationProviderUsage } from './TranslationProvider.types'

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

export async function chargeAfterTranslationIfNeeded(input: {
	userId: null | number
	chargeAfterTranslation: boolean
	usage: null | TranslationProviderUsage
	commandBus: CommandBus
}) {
	if (!input.userId || !input.chargeAfterTranslation || input.usage === null) {
		return
	}

	await input.commandBus.execute(
		new TokenUsageBalanceChargeCommand({
			userId: input.userId,
			aiModelName: input.usage.model,
			inputTokens: input.usage.inputTokens,
			outputTokens: input.usage.outputTokens,
			lowPriority: input.usage.lowPriority,
		}),
	)
}
