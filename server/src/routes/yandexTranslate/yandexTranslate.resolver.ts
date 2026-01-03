import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { TranslateTextCommand } from 'features/yandexTranslate/TranslateText.command'
import RouteNames from 'infrastructure/routeNames'
import { TranslateTextOutModel } from 'models/yandexTranslate/translateText.out.model'
import { TranslateTextInput } from './inputs/translateText.input'

@Resolver()
export class YandexTranslateResolver {
	constructor(private commandBus: CommandBus) {}

	@Mutation(() => TranslateTextOutModel, {
		name: RouteNames.TRANSLATE.TRANSLATE,
	})
	async translateText(@Args('input') input: TranslateTextInput) {
		return await this.commandBus.execute(
			new TranslateTextCommand({
				text: input.text,
				targetLanguageCode: input.targetLanguageCode,
				sourceLanguageCode: input.sourceLanguageCode,
			}),
		)
	}
}
