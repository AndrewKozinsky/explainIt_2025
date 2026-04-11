import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { TranslatePhraseCommand } from 'features/sentenceTranslation/translatePhrase/TranslatePhrase.command'
import { TranslateSentenceCommand } from 'features/sentenceTranslation/translateSentence/TranslateSentence.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import RouteNames from 'infrastructure/routeNames'
import { SentencePhraseTranslationOutModel } from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'
import { TranslateSentenceResultOutModel } from 'models/sentenceTranslation/translateSentenceResult.out.model'
import { TranslatePhraseInput } from './inputs/translatePhrase.input'
import { TranslateSentenceInput } from './inputs/translateSentence.input'
import { translateResolversDesc } from './resolverDescriptions'

@Resolver()
export class TranslateResolver {
	constructor(private commandBus: CommandBus) {}

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
}
