import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TranslateResolver } from 'routes/translate/translate.resolver'
import { TranslatePhraseHandler } from 'features/translate/TranslatePhrase.command'
import { TranslateSentenceHandler } from 'features/translate/TranslateSentence.command'

const commandHandlers = [TranslatePhraseHandler, TranslateSentenceHandler]
const resolvers = [TranslateResolver]

@Module({
	imports: [CqrsModule],
	providers: [...commandHandlers, ...resolvers],
})
export class YandexTranslateRouteModule {}
