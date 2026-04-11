import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { SentencePhraseTranslationRepository } from 'repo/sentencePhraseTranslation.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { DailyTranslationLimitService } from 'features/sentenceTranslation/translate/DailyTranslationLimit.service'
import {
	SentenceTranslationAccess,
	SentenceTranslationAccessService,
} from 'features/sentenceTranslation/translate/SentenceTranslationAccess.service'
import { TranslatePhraseCommand } from 'features/sentenceTranslation/translatePhrase/TranslatePhrase.command'
import { TranslateSentenceCommand } from 'features/sentenceTranslation/translateSentence/TranslateSentence.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import RouteNames from 'infrastructure/routeNames'
import { SentencePhraseTranslationOutModel } from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'
import { TranslateSentenceResultOutModel } from 'models/sentenceTranslation/translateSentenceResult.out.model'
import { GetPhraseTranslationInput } from './inputs/getPhraseTranslation.input'
import { GetSentenceTranslationInput } from './inputs/getSentenceTranslation.input'
import { TranslatePhraseInput } from './inputs/translatePhrase.input'
import { TranslateSentenceInput } from './inputs/translateSentence.input'
import { translateResolversDesc } from './resolverDescriptions'

@Resolver()
export class TranslateResolver {
	constructor(
		private commandBus: CommandBus,
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private sentencePhraseTranslationRepository: SentencePhraseTranslationRepository,
		private sentenceTranslationAccessService: SentenceTranslationAccessService,
		private dailyTranslationLimitService: DailyTranslationLimitService,
	) {}

	@UseGuards(OptionalSessionUserGuard)
	@Query(() => TranslateSentenceResultOutModel, {
		name: RouteNames.TRANSLATE.GET_SENTENCE_TRANSLATION,
		description: translateResolversDesc.getSentenceTranslation,
		nullable: true,
	})
	async getSentenceTranslation(@Args('input') input: GetSentenceTranslationInput, @Context('req') request: Request) {
		const access = await this.sentenceTranslationAccessService.resolveAccessOrThrow({
			userId: request.user?.id ?? null,
			currentSubscription: request.user?.currentSubscription ?? null,
			sentenceId: input.sentenceId,
		})

		await this.ensureModeIsAllowedOrThrow({
			mode: access.readMode,
			deniedReason: access.readDeniedReason,
			actionType: 'read',
		})

		if (access.readMode === 'dailyLimit') {
			await this.consumeDailyLimitOrThrow({
				userId: request.user?.id ?? null,
				sentenceId: input.sentenceId,
			})
		}

		const translation = await this.sentenceTranslationRepository.getFirstSentenceTranslationBySentenceId(
			input.sentenceId,
		)
		if (!translation) {
			return null
		}

		return {
			sentenceId: translation.sentenceId,
			translation: translation.translation,
		}
	}

	@UseGuards(OptionalSessionUserGuard)
	@Query(() => SentencePhraseTranslationOutModel, {
		name: RouteNames.TRANSLATE.GET_PHRASE_TRANSLATION,
		description: translateResolversDesc.getPhraseTranslation,
		nullable: true,
	})
	async getPhraseTranslation(@Args('input') input: GetPhraseTranslationInput, @Context('req') request: Request) {
		const access = await this.sentenceTranslationAccessService.resolveAccessOrThrow({
			userId: request.user?.id ?? null,
			currentSubscription: request.user?.currentSubscription ?? null,
			sentenceId: input.sentenceId,
		})

		await this.ensureModeIsAllowedOrThrow({
			mode: access.readMode,
			deniedReason: access.readDeniedReason,
			actionType: 'read',
		})

		if (access.readMode === 'dailyLimit') {
			await this.consumeDailyLimitOrThrow({
				userId: request.user?.id ?? null,
				sentenceId: input.sentenceId,
			})
		}

		return this.sentencePhraseTranslationRepository.getPhraseByExactRange({
			sentenceId: input.sentenceId,
			phraseStartOffset: input.selectedWordStartOffset,
			phraseEndOffset: input.selectedWordEndOffset,
		})
	}

	@UseGuards(OptionalSessionUserGuard)
	@Mutation(() => TranslateSentenceResultOutModel, {
		name: RouteNames.TRANSLATE.TRANSLATE_SENTENCE,
		description: translateResolversDesc.translateSentence,
	})
	async translateSentence(@Args('input') input: TranslateSentenceInput, @Context('req') request: Request) {
		const result = await this.commandBus.execute(
			new TranslateSentenceCommand({
				...input,
				userId: request.user?.id ?? null,
				currentSubscription: request.user?.currentSubscription ?? null,
			}),
		)

		return {
			sentenceId: input.sentenceId,
			translation: result.translatedText,
		}
	}

	@UseGuards(OptionalSessionUserGuard)
	@Mutation(() => SentencePhraseTranslationOutModel, {
		name: RouteNames.TRANSLATE.TRANSLATE_PHRASE,
		description: translateResolversDesc.translatePhrase,
	})
	async translatePhrase(@Args('input') input: TranslatePhraseInput, @Context('req') request: Request) {
		return this.commandBus.execute(
			new TranslatePhraseCommand({
				...input,
				userId: request.user?.id ?? null,
				currentSubscription: request.user?.currentSubscription ?? null,
			}),
		)
	}

	private async ensureModeIsAllowedOrThrow(input: {
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

		if (input.deniedReason === 'privateTranslationRequiresStandardBalance') {
			throw new CustomGraphQLError(
				errorMessage.sentenceTranslation.privateTranslationRequiresStandardSubscriptionBalance,
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

	private async consumeDailyLimitOrThrow(input: { userId: null | number; sentenceId: number }) {
		if (!input.userId) {
			throw new CustomGraphQLError(
				errorMessage.sentenceTranslation.anonymousUserCannotTranslate,
				ErrorCode.Unauthorized_401,
			)
		}

		const limitResult = await this.dailyTranslationLimitService.tryCountSentenceToday({
			userId: input.userId,
			sentenceId: input.sentenceId,
		})

		if (!limitResult.allowed) {
			throw new CustomGraphQLError(errorMessage.sentenceTranslation.dailyLimitReached, ErrorCode.Forbidden_403)
		}
	}
}
