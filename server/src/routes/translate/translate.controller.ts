import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { SentencePhraseTranslationRepository } from 'repo/sentencePhraseTranslation.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import {
	SentenceTranslationAccessMode,
	SentenceTranslationAccessService,
} from 'features/translation/translateCommon/SentenceTranslationAccess.service'
import { TranslatePhraseCommand } from 'features/translation/translatePhrase/TranslatePhrase.command'
import { TranslateSentenceCommand } from 'features/translation/translateSentence/TranslateSentence.command'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import { SentencePhraseTranslationServiceModel } from 'models/sentenceTranslation/sentencePhraseTranslation.service.model'
import { TranslateSentenceResultOutModel } from 'models/sentenceTranslation/translateSentenceResult.out.model'
import { GetPhraseTranslationInput } from './inputs/getPhraseTranslation.input'
import { GetPhraseTranslationsBySentenceInput } from './inputs/getPhraseTranslationsBySentence.input'
import { GetSentenceTranslationInput } from './inputs/getSentenceTranslation.input'
import { TranslatePhraseInput } from './inputs/translatePhrase.input'
import { TranslateSentenceInput } from './inputs/translateSentence.input'
import {
	ApiGetPhraseTranslation,
	ApiGetPhraseTranslationsBySentence,
	ApiGetSentenceTranslation,
	ApiTranslatePhrase,
	ApiTranslateSentence,
} from './openAPI.decorators'

@ApiTags('Translate')
@Controller('translate')
export class TranslateController {
	constructor(
		private commandBus: CommandBus,
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private sentencePhraseTranslationRepository: SentencePhraseTranslationRepository,
		private sentenceTranslationAccessService: SentenceTranslationAccessService,
	) {}

	@ApiGetSentenceTranslation()
	@UseGuards(OptionalSessionUserGuard)
	@HttpCode(HttpStatus.OK)
	@Post('get-sentence-translation')
	async getSentenceTranslation(
		@Body() input: GetSentenceTranslationInput,
		@Req() request: Request,
	): Promise<null | TranslateSentenceResultOutModel> {
		const access = await this.sentenceTranslationAccessService.resolveAccessOrThrow({
			userId: request.user?.id ?? null,
			sentenceId: input.sentenceId,
		})

		await this.ensureModeIsAllowedOrThrow({
			mode: access.readMode,
			deniedReason: access.readDeniedReason,
			actionType: 'read',
		})

		const translation =
			await this.sentenceTranslationRepository.getSentenceTranslationBySentenceIdAndTargetLanguageCode({
				sentenceId: input.sentenceId,
				targetLanguageCode: input.targetLanguageCode,
			})
		if (!translation) {
			return null
		}

		return {
			sentenceId: translation.sentenceId,
			translation: translation.translation,
		}
	}

	@ApiGetPhraseTranslation()
	@UseGuards(OptionalSessionUserGuard)
	@HttpCode(HttpStatus.OK)
	@Post('get-phrase-translation')
	async getPhraseTranslation(
		@Body() input: GetPhraseTranslationInput,
		@Req() request: Request,
	): Promise<null | SentencePhraseTranslationServiceModel> {
		const access = await this.sentenceTranslationAccessService.resolveAccessOrThrow({
			userId: request.user?.id ?? null,
			sentenceId: input.sentenceId,
		})

		await this.ensureModeIsAllowedOrThrow({
			mode: access.readMode,
			deniedReason: access.readDeniedReason,
			actionType: 'read',
		})

		const phrase = await this.sentencePhraseTranslationRepository.getPhraseContainingOffset({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
			selectedWordStartOffset: input.selectedWordStartOffset,
			selectedWordEndOffset: input.selectedWordEndOffset,
		})

		return phrase
	}

	@ApiGetPhraseTranslationsBySentence()
	@UseGuards(OptionalSessionUserGuard)
	@HttpCode(HttpStatus.OK)
	@Post('get-phrase-translations-by-sentence')
	async getPhraseTranslationsBySentence(
		@Body() input: GetPhraseTranslationsBySentenceInput,
		@Req() request: Request,
	): Promise<SentencePhraseTranslationServiceModel[]> {
		const access = await this.sentenceTranslationAccessService.resolveAccessOrThrow({
			userId: request.user?.id ?? null,
			sentenceId: input.sentenceId,
		})

		await this.ensureModeIsAllowedOrThrow({
			mode: access.readMode,
			deniedReason: access.readDeniedReason,
			actionType: 'read',
		})

		const phrases = await this.sentencePhraseTranslationRepository.getReadyPhrasesBySentenceIdAndTargetLanguageCode(
			{
				sentenceId: input.sentenceId,
				targetLanguageCode: input.targetLanguageCode,
			},
		)

		return phrases
	}

	@ApiTranslateSentence()
	@UseGuards(OptionalSessionUserGuard)
	@HttpCode(HttpStatus.OK)
	@Post('translate-sentence')
	async translateSentence(
		@Body() input: TranslateSentenceInput,
		@Req() request: Request,
	): Promise<TranslateSentenceResultOutModel> {
		const result = await this.commandBus.execute(
			new TranslateSentenceCommand({
				...input,
				userId: request.user?.id ?? null,
			}),
		)

		return {
			sentenceId: input.sentenceId,
			translation: result.translatedText,
		}
	}

	@ApiTranslatePhrase()
	@UseGuards(OptionalSessionUserGuard)
	@HttpCode(HttpStatus.OK)
	@Post('translate-phrase')
	async translatePhrase(
		@Body() input: TranslatePhraseInput,
		@Req() request: Request,
	): Promise<SentencePhraseTranslationServiceModel> {
		const result: SentencePhraseTranslationServiceModel = await this.commandBus.execute(
			new TranslatePhraseCommand({
				...input,
				userId: request.user?.id ?? null,
			}),
		)

		return result
	}

	private async ensureModeIsAllowedOrThrow(input: {
		mode: SentenceTranslationAccessMode
		deniedReason?: string
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
}
