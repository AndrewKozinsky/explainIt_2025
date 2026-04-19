import { CommandBus } from '@nestjs/cqrs'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { DeepSeekTokenUsageBalanceChargeCommand } from 'features/payment/DeepSeekTokenUsageBalanceCharge.command'
import { OpenAiTokenUsageBalanceChargeCommand } from 'features/payment/OpenAiTokenUsageBalanceCharge.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
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
		throw new CustomGraphQLError(
			errorMessage.sentenceTranslation.userCannotAccessForeignPrivateMedia,
			ErrorCode.Forbidden_403,
		)
	}

	if (input.actionType === 'read') {
		throw new CustomGraphQLError(
			errorMessage.sentenceTranslation.anonymousUserCannotTranslate,
			ErrorCode.Unauthorized_401,
		)
	}

	throw new CustomGraphQLError(
		errorMessage.sentenceTranslation.anonymousUserCannotTranslate,
		ErrorCode.Unauthorized_401,
	)
}

export async function ensureCanChargeBalanceOrThrow(input: {
	access: SentenceTranslationAccess
	userId: null | number
	userBalanceTransactionRepository: UserBalanceTransactionRepository
	mainConfigService: MainConfigService
}) {
	if (input.access.createMode === 'chargeBalance' && input.userId) {
		await input.userBalanceTransactionRepository.ensureCanChargeOrThrow({
			userId: input.userId,
			minBalanceInKopecks: input.mainConfigService.get().billing.translationChargeMarkupInKopecks,
		})
	}
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

	if (input.usage.provider === 'deepseek') {
		await input.commandBus.execute(
			new DeepSeekTokenUsageBalanceChargeCommand({
				userId: input.userId,
				inputTokens: input.usage.inputTokens,
				outputTokens: input.usage.outputTokens,
			}),
		)

		return
	} else if (input.usage.provider === 'chatgpt') {
		await input.commandBus.execute(
			new OpenAiTokenUsageBalanceChargeCommand({
				userId: input.userId,
				aiModelName: input.usage.model,
				inputTokens: input.usage.inputTokens,
				outputTokens: input.usage.outputTokens,
				lowPriority: input.usage.lowPriority,
			}),
		)
	}
}
