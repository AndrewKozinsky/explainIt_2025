import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GetOrCreateUniversalPhraseTranslationInput } from 'routes/universalPhraseTranslation/inputs/getOrCreateUniversalPhraseTranslation.input'
import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'
import { GetOrCreateUniversalPhraseTranslationCommand } from 'features/universalPhraseTranslation/GetOrCreateUniversalPhraseTranslation.command'
import RouteNames from 'infrastructure/routeNames'
import { UniversalPhraseTranslationOutModel } from 'models/universalPhraseTranslation/universalPhraseTranslation.out.model'
import { LanguageCode } from 'prisma/generated/enums'
import { universalPhraseTranslationResolversDesc } from './resolverDescriptions'

@Resolver()
export class UniversalPhraseTranslationResolver {
	constructor(private commandBus: CommandBus) {}

	@Mutation(() => UniversalPhraseTranslationOutModel, {
		name: RouteNames.UNIVERSAL_PHRASE_TRANSLATION.GET_OR_CREATE,
		description: universalPhraseTranslationResolversDesc.getOrCreateUniversalPhraseTranslation,
	})
	async getOrCreateUniversalPhraseTranslation(@Args('input') input: GetOrCreateUniversalPhraseTranslationInput) {
		return await this.commandBus.execute(
			new GetOrCreateUniversalPhraseTranslationCommand({
				universalPhraseId: input.universalPhraseId,
				phraseText: input.phraseText,
				sourceLanguageCode: input.sourceLanguageCode,
				targetLanguageCode: input.targetLanguageCode as LanguageCode,
				provider: input.provider as TranslationProviderName,
			}),
		)
	}
}
