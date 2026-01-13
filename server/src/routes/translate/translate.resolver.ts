import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { TranslatePhraseInput } from 'routes/translate/inputs/translatePhrase.input'
import { TranslatePhraseCommand } from 'features/translate/TranslatePhrase.command'
import { TranslateSentenceCommand } from 'features/translate/TranslateSentence.command'
import RouteNames from 'infrastructure/routeNames'
import { TranslateTextOutModel } from 'models/yandexTranslate/translateText.out.model'
import { TranslateSentenceInput } from './inputs/translateSentence.input'

@Resolver()
export class TranslateResolver {
	constructor(private commandBus: CommandBus) {}

	@Mutation(() => TranslateTextOutModel, {
		name: RouteNames.TRANSLATE.TRANSLATE_PHRASE,
	})
	async translatePhrase(@Args('input') input: TranslatePhraseInput) {
		return await this.commandBus.execute(
			new TranslatePhraseCommand({
				text: input.text,
				targetLanguageCode: input.targetLanguageCode,
				sourceLanguageCode: input.sourceLanguageCode,
			}),
		)
	}

	@Mutation(() => TranslateTextOutModel, {
		name: RouteNames.TRANSLATE.TRANSLATE_SENTENCE,
	})
	async translateSentence(@Args('input') input: TranslateSentenceInput) {
		return await this.commandBus.execute(
			new TranslateSentenceCommand({
				sentence: input.text,
				targetLanguageCode: input.targetLanguageCode,
				sourceLanguageCode: input.sourceLanguageCode,
			}),
		)
	}
}
