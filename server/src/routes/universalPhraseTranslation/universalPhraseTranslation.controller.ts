import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'
import { GetOrCreateUniversalPhraseTranslationCommand } from 'features/universalPhraseTranslation/GetOrCreateUniversalPhraseTranslation.command'
import { UniversalPhraseTranslationOutModel } from 'models/universalPhraseTranslation/universalPhraseTranslation.out.model'
import { LanguageCode } from 'prisma/generated/enums'
import { GetOrCreateUniversalPhraseTranslationInput } from './inputs/getOrCreateUniversalPhraseTranslation.input'
import { ApiGetOrCreateTranslation } from './openAPI.decorators'

@ApiTags('UniversalPhraseTranslation')
@Controller('universal-phrase-translation')
export class UniversalPhraseTranslationController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetOrCreateTranslation()
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async getOrCreateTranslation(
		@Body() input: GetOrCreateUniversalPhraseTranslationInput,
	): Promise<UniversalPhraseTranslationOutModel> {
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
